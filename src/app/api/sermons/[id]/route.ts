// ==========================================
// 단일 설교 API 프록시 (상세 페이지 + URL 복원용)
// ==========================================

import { NextRequest, NextResponse } from "next/server";
import { wpBase } from "@/lib/wp-base";
import { readServerFixture, restKeyFromPath } from "@/lib/fixtures";

const WP_DOMAIN = wpBase();

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  // 서버에서는 스냅샷을 바로 읽는다
  const snap = readServerFixture<unknown>(
    "rest",
    restKeyFromPath(`wp/v2/risen_multimedia/${id}?_embed`),
  );
  if (snap !== null) {
    return NextResponse.json(snap, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  }

  try {
    const res = await fetch(
      `${WP_DOMAIN}/wp-json/wp/v2/risen_multimedia/${id}?_embed`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) {
      return NextResponse.json(null, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error(`Sermon [${id}] fetch error:`, error);
    return NextResponse.json(null, { status: 500 });
  }
}
