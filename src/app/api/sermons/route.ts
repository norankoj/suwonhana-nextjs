// ==========================================
// 설교 목록 API 프록시 (WP 직접 호출 차단 + 캐싱)
// ==========================================
// 클라이언트 → Next.js API Route → WordPress
// Next.js fetch 캐시(revalidate: 60) + Cache-Control 헤더로 이중 캐싱

import { NextRequest, NextResponse } from "next/server";

const WP_DOMAIN =
  process.env.NEXT_PUBLIC_WORDPRESS_DOMAIN || "http://suwonhana.local";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  // WP REST API 쿼리 빌드
  const wpParams = new URLSearchParams();
  wpParams.set("_embed", "");
  wpParams.set("per_page", searchParams.get("per_page") || "9");
  wpParams.set("page", searchParams.get("page") || "1");

  // 선택적 필터 파라미터 전달
  const forwardParams = [
    "risen_multimedia_tag",
    "risen_multimedia_category",
    "search",
    "after",
    "before",
  ];
  forwardParams.forEach((key) => {
    const val = searchParams.get(key);
    if (val) wpParams.set(key, val);
  });

  const wpUrl = `${WP_DOMAIN}/wp-json/wp/v2/risen_multimedia?${wpParams.toString()}`;

  try {
    const res = await fetch(wpUrl, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { data: [], totalPages: 0 },
        { status: res.status },
      );
    }

    const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "0");
    const data = await res.json();

    return NextResponse.json(
      { data, totalPages },
      {
        headers: {
          "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  } catch (error) {
    console.error("Sermon API proxy error:", error);
    return NextResponse.json({ data: [], totalPages: 0 }, { status: 500 });
  }
}
