/**
 * WP 응답 스냅샷 — 팀 공유용 배포에서 워드프레스 없이 사이트를 띄우기 위한 장치.
 *
 * 동작
 *   개발(기록):  WP_UPSTREAM 이 설정돼 있으면 실제 WP로 요청을 넘기고,
 *                응답을 fixtures/*.json 에 저장한 뒤 그대로 돌려준다.
 *   배포(재생):  WP_UPSTREAM 이 없으면 저장된 스냅샷만 돌려준다.
 *
 * 앱 코드는 손대지 않는다. NEXT_PUBLIC_WORDPRESS_DOMAIN 을 배포본 자기 주소로
 * 두면 서버 렌더링이든 브라우저 fetch든 전부 이 경로로 들어온다.
 */
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

export const FIXTURE_DIR = path.join(process.cwd(), "fixtures");

/** 기록 모드일 때만 값이 있다 (서버 전용 환경변수) */
export const WP_UPSTREAM = process.env.WP_UPSTREAM || "";

/** 쿼리 순서가 달라도 같은 키가 되도록 정렬해서 키를 만든다 */
export function restKey(segments: string[], search: URLSearchParams): string {
  const qs = [...search.entries()]
    .filter(([k]) => k !== "_") // 캐시버스터 제거 (jubo 페이지가 붙임)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  const base = segments.join("/");
  return qs ? `${base}?${qs}` : base;
}

/** 파일명으로 쓸 수 없는 문자를 치환 */
function toFileName(key: string): string {
  return key.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 180) + ".json";
}

export interface Fixture {
  status: number;
  headers: Record<string, string>;
  body: unknown;
}

export function readFixture(kind: "rest" | "graphql", key: string): Fixture | null {
  try {
    const file = path.join(FIXTURE_DIR, kind, toFileName(key));
    if (!fs.existsSync(file)) return null;
    return JSON.parse(fs.readFileSync(file, "utf8")) as Fixture;
  } catch {
    return null;
  }
}

export function writeFixture(kind: "rest" | "graphql", key: string, fx: Fixture): void {
  try {
    const dir = path.join(FIXTURE_DIR, kind);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, toFileName(key)),
      JSON.stringify(fx, null, 0),
      "utf8",
    );
    // 어떤 키가 어떤 파일인지 사람이 확인할 수 있게 색인도 남긴다
    const idx = path.join(dir, "_index.json");
    const map: Record<string, string> = fs.existsSync(idx)
      ? JSON.parse(fs.readFileSync(idx, "utf8"))
      : {};
    map[key] = toFileName(key);
    fs.writeFileSync(idx, JSON.stringify(map, null, 2), "utf8");
  } catch (e) {
    console.error("[fixtures] 저장 실패:", key, e);
  }
}

/**
 * 서버(빌드·SSR·ISR 재생성)에서 스냅샷을 HTTP 없이 바로 읽는다.
 *
 * 왜 필요한가 — 서버가 자기 자신의 /wp-json 을 fetch 하려면 절대 URL이
 * 필요한데, Vercel 에서 그 값은 배포별 고유 주소(VERCEL_URL)가 되고
 * 이 주소는 배포 보호(Deployment Protection)에 걸려 403 이 난다.
 * 빌드 시점에는 아예 서빙 전이라 접속 자체가 불가능하다.
 * 결과적으로 정적 페이지가 매번 빈 데이터로 생성됐다.
 *
 * 기록 모드(WP_UPSTREAM 설정)에서는 null 을 반환해 평소대로 HTTP 를 타게 한다.
 */
export function readServerFixture<T>(kind: "rest" | "graphql", key: string): T | null {
  if (typeof window !== "undefined") return null; // 브라우저는 HTTP 로
  if (WP_UPSTREAM) return null; // 기록 모드는 실제 WP 로
  const fx = readFixture(kind, key);
  return fx ? (fx.body as T) : null;
}

/** GraphQL 쿼리 → 스냅샷 키 (라우트 핸들러와 동일 규칙) */
export function graphqlKey(query: string): string {
  const norm = query.replace(/\s+/g, " ").trim();
  return createHash("sha1").update(norm).digest("hex").slice(0, 16);
}

/** REST 경로 문자열(`pages?slug=x`) → 스냅샷 키 */
export function restKeyFromPath(pathWithQuery: string): string {
  const [p, q = ""] = pathWithQuery.split("?");
  return restKey(p.split("/").filter(Boolean), new URLSearchParams(q));
}

/**
 * WP REST GET 공통 진입점.
 * 서버에서는 스냅샷을 바로 읽고, 없으면(또는 브라우저면) HTTP 로 간다.
 * `pathWithQuery` 는 `wp/v2/` 이후 부분 — 예: `pages?slug=jubo&_fields=id`
 */
export async function wpGetJson<T>(
  pathWithQuery: string,
  init?: RequestInit & { next?: { revalidate?: number } },
): Promise<T | null> {
  const snap = readServerFixture<T>("rest", restKeyFromPath(`wp/v2/${pathWithQuery}`));
  if (snap !== null) return snap;
  try {
    const { wpBase } = await import("@/lib/wp-base");
    const res = await fetch(`${wpBase()}/wp-json/wp/v2/${pathWithQuery}`, init);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (e) {
    console.error("[wpGetJson] 실패:", pathWithQuery, e);
    return null;
  }
}

/** WP REST 가 페이지네이션에 쓰는 헤더만 보존한다 */
const KEEP_HEADERS = ["x-wp-total", "x-wp-totalpages", "content-type"];

export function pickHeaders(h: Headers): Record<string, string> {
  const out: Record<string, string> = {};
  for (const k of KEEP_HEADERS) {
    const v = h.get(k);
    if (v) out[k] = v;
  }
  return out;
}
