import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { WP_UPSTREAM, readFixture, writeFixture, type Fixture } from "@/lib/fixtures";

export const dynamic = "force-dynamic";

/** 쿼리 문자열의 공백만 정규화한 뒤 해시 — 들여쓰기가 달라도 같은 키가 된다 */
function gqlKey(query: string): string {
  const norm = query.replace(/\s+/g, " ").trim();
  return crypto.createHash("sha1").update(norm).digest("hex").slice(0, 16);
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  let query = "";
  try {
    query = (JSON.parse(raw) as { query?: string }).query || "";
  } catch {
    return NextResponse.json({ errors: [{ message: "잘못된 요청" }] }, { status: 400 });
  }
  const key = gqlKey(query);

  // 기록 모드
  if (WP_UPSTREAM) {
    try {
      const r = await fetch(`${WP_UPSTREAM}/graphql`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: raw,
        cache: "no-store",
      });
      const body = await r.json();
      const fx: Fixture = { status: r.status, headers: {}, body };
      writeFixture("graphql", key, fx);
      return NextResponse.json(body, { status: r.status });
    } catch (e) {
      console.error("[graphql] 업스트림 실패:", key, e);
    }
  }

  // 재생 모드
  const fx = readFixture("graphql", key);
  if (fx) return NextResponse.json(fx.body, { status: fx.status });

  console.warn("[graphql] 스냅샷 없음:", key, query.slice(0, 80));
  return NextResponse.json({ data: null }, { status: 200 });
}
