import { NextRequest, NextResponse } from "next/server";
import {
  WP_UPSTREAM,
  restKey,
  readFixture,
  writeFixture,
  pickHeaders,
  type Fixture,
} from "@/lib/fixtures";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ path: string[] }> };

function respond(fx: Fixture) {
  return new NextResponse(JSON.stringify(fx.body), {
    status: fx.status,
    headers: { "content-type": "application/json; charset=utf-8", ...fx.headers },
  });
}

export async function GET(req: NextRequest, ctx: Ctx) {
  const { path: segments } = await ctx.params;
  const key = restKey(segments, req.nextUrl.searchParams);

  // 기록 모드: 실제 WP 로 넘기고 저장
  if (WP_UPSTREAM) {
    try {
      const target = `${WP_UPSTREAM}/wp-json/${segments.join("/")}${req.nextUrl.search}`;
      const r = await fetch(target, { cache: "no-store" });
      const body = await r.json();
      const fx: Fixture = { status: r.status, headers: pickHeaders(r.headers), body };
      writeFixture("rest", key, fx);
      return respond(fx);
    } catch (e) {
      console.error("[wp-json] 업스트림 실패:", key, e);
    }
  }

  // 재생 모드
  const fx = readFixture("rest", key);
  if (fx) return respond(fx);

  // 스냅샷에 없는 요청 — 앱이 빈 배열을 기대하는 곳이 많아 200/[] 로 응답한다.
  // (404 를 주면 목록 컴포넌트가 에러 상태로 빠짐)
  console.warn("[wp-json] 스냅샷 없음:", key);
  return NextResponse.json([], { status: 200 });
}

/** 문의 등록 같은 쓰기는 스냅샷 배포에서 지원하지 않는다 */
export async function POST() {
  return NextResponse.json(
    { message: "데모 배포에서는 등록/수정이 지원되지 않습니다." },
    { status: 501 },
  );
}
