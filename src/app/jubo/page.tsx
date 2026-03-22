import React from "react";
import BulletinFlipbook from "@/components/BulletinFlipbook";
import { BookOpen } from "lucide-react";

// 항상 동적 렌더링 (캐시 완전 차단)
export const dynamic = "force-dynamic";

const WP_DOMAIN =
  process.env.NEXT_PUBLIC_WORDPRESS_DOMAIN || "http://suwonhana.local";

interface WPPage {
  id: number;
  title: { rendered: string };
  date: string;
  content: { rendered: string };
}

async function getBulletinImages(): Promise<{
  images: { url: string }[];
  pageTitle?: string;
  pageDate?: string;
}> {
  try {
    const ts = Date.now();
    const res = await fetch(
      `${WP_DOMAIN}/wp-json/wp/v2/pages?slug=jubo&_fields=id,title,date,content&_=${ts}`,
      { cache: "no-store", headers: { "Cache-Control": "no-cache", Pragma: "no-cache" } }
    );
    if (!res.ok) return { images: [] };

    const pages: WPPage[] = await res.json();
    if (!pages.length) return { images: [] };

    const page = pages[0];

    // 페이지 본문 HTML에서 이미지 URL 추출
    const html = page.content.rendered;
    const images: { url: string }[] = [];
    const seen = new Set<string>();

    const addImage = (url: string) => {
      if (!seen.has(url)) { seen.add(url); images.push({ url }); }
    };

    // 1순위: 갤러리 <a href="원본이미지"> 링크에서 추출 (썸네일의 원본)
    const hrefRegex = /href="([^"]+\.(?:jpg|jpeg|png|webp))"/gi;
    let match;
    while ((match = hrefRegex.exec(html)) !== null) {
      addImage(match[1]);
    }

    // 2순위: href에서 못 찾았을 때(직접 삽입 이미지) img src에서 추출
    if (images.length === 0) {
      const imgRegex = /<img[^>]+src="([^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/gi;
      while ((match = imgRegex.exec(html)) !== null) {
        const url = match[1].split("?")[0]; // 쿼리스트링 제거
        if (!/-\d+x\d+\./.test(url)) addImage(url); // 썸네일 제외
      }
    }

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
                  <br />이미지 블록을 추가해 주세요.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
