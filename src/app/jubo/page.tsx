import React from "react";
import BulletinFlipbook from "@/components/BulletinFlipbook";
import { BookOpen } from "lucide-react";

const WP_DOMAIN =
  process.env.NEXT_PUBLIC_WORDPRESS_DOMAIN || "http://suwonhana.local";

interface WPPage {
  id: number;
  title: { rendered: string };
  date: string;
}

interface WPMedia {
  id: number;
  source_url: string;
  alt_text?: string;
  media_details?: { width: number; height: number };
}

async function getBulletinImages(): Promise<{
  images: { url: string; alt?: string }[];
  pageTitle?: string;
  pageDate?: string;
}> {
  try {
    // 1. jubo 슬러그 페이지 ID 가져오기
    const pageRes = await fetch(
      `${WP_DOMAIN}/wp-json/wp/v2/pages?slug=jubo&_fields=id,title,date`,
      { cache: "no-store" }
    );
    if (!pageRes.ok) return { images: [] };

    const pages: WPPage[] = await pageRes.json();
    if (!pages.length) return { images: [] };

    const page = pages[0];

    // 2. 해당 페이지에 첨부된 이미지 목록 가져오기 (업로드 순서대로)
    const mediaRes = await fetch(
      `${WP_DOMAIN}/wp-json/wp/v2/media?parent=${page.id}&per_page=100&mime_type=image&orderby=date&order=asc`,
      { cache: "no-store" }
    );
    if (!mediaRes.ok) return { images: [], pageTitle: page.title.rendered };

    const mediaList: WPMedia[] = await mediaRes.json();

    const images = mediaList.map((m) => ({
      url: m.source_url,
      alt: m.alt_text || undefined,
    }));

    // 날짜를 한국식으로 포맷
    const d = new Date(page.date);
    const pageDate = `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;

    return { images, pageTitle: page.title.rendered, pageDate };
  } catch (err) {
    console.error("[주보] fetch 실패:", err);
    return { images: [] };
  }
}

export default async function JuboPage() {
  const { images, pageTitle, pageDate } = await getBulletinImages();

  return (
    <main className="min-h-screen bg-slate-50">
      {/* 헤더 */}
      <section className="bg-white border-b border-slate-100 py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
            <BookOpen size={14} />
            Weekly Bulletin
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {pageTitle || "온라인 주보"}
          </h1>
          {pageDate && (
            <p className="mt-2 text-slate-400 text-sm">{pageDate}</p>
          )}
        </div>
      </section>

      {/* 플립북 */}
      <section className="py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {images.length > 0 ? (
            <BulletinFlipbook images={images} />
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center gap-5">
              <BookOpen size={48} className="text-slate-200" />
              <div>
                <p className="text-slate-400 text-base font-medium mb-1">
                  아직 업로드된 주보가 없습니다.
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  워드프레스 관리자 → <strong className="text-slate-400">페이지 &gt; 주보</strong>에서
                  <br />이미지를 업로드해 주세요.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
