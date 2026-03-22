import React from "react";
import BulletinFlipbook from "@/components/BulletinFlipbook";
import { BookOpen } from "lucide-react";

const WP_DOMAIN =
  process.env.NEXT_PUBLIC_WORDPRESS_DOMAIN || "http://suwonhana.local";

interface AcfImage {
  url?: string;
  full_url?: string;
  sizes?: { large?: string; full?: string };
  alt?: string;
  width?: number;
  height?: number;
}

interface WPPage {
  id: number;
  acf?: {
    bulletin_pages?: AcfImage[] | number[];
    bulletin_date?: string;
    bulletin_title?: string;
  } | false;
}

async function getBulletinImages(): Promise<{
  images: { url: string; alt?: string }[];
  date?: string;
  title?: string;
}> {
  try {
    const res = await fetch(
      `${WP_DOMAIN}/wp-json/wp/v2/pages?slug=jubo&_fields=id,acf`,
      { next: { revalidate: 3600 } }   // 1시간 캐시 (매주 갱신)
    );
    if (!res.ok) return { images: [] };

    const pages: WPPage[] = await res.json();
    if (!pages.length || !pages[0].acf) return { images: [] };

    const acf = pages[0].acf as Exclude<WPPage["acf"], false>;
    const rawPages = acf.bulletin_pages;
    const date = acf.bulletin_date;
    const title = acf.bulletin_title;

    if (!rawPages || !rawPages.length) return { images: [], date, title };

    // ACF 갤러리 응답 형식 처리: 객체 배열 or ID 배열
    const images: { url: string; alt?: string }[] = [];

    for (const item of rawPages) {
      if (typeof item === "number") {
        // ID 형식 → media API로 URL 조회
        const mr = await fetch(`${WP_DOMAIN}/wp-json/wp/v2/media/${item}`, {
          next: { revalidate: 3600 },
        }).catch(() => null);
        if (mr?.ok) {
          const m = await mr.json();
          if (m.source_url) images.push({ url: m.source_url, alt: m.alt_text });
        }
      } else {
        // 객체 형식
        const img = item as AcfImage;
        const url =
          img.url ||
          img.full_url ||
          img.sizes?.large ||
          img.sizes?.full ||
          "";
        if (url) images.push({ url, alt: img.alt });
      }
    }

    return { images, date, title };
  } catch (err) {
    console.error("[주보] fetch 실패:", err);
    return { images: [] };
  }
}

export default async function JuboPage() {
  const { images, date, title } = await getBulletinImages();

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
            {title || "온라인 주보"}
          </h1>
          {date && (
            <p className="mt-2 text-slate-400 text-sm">{date}</p>
          )}
        </div>
      </section>

      {/* 플립북 */}
      <section className="py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {images.length > 0 ? (
            <BulletinFlipbook images={images} />
          ) : (
            /* 이미지 없음 안내 */
            <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
              <BookOpen size={48} className="text-slate-200" />
              <p className="text-slate-400 text-base">
                아직 업로드된 주보가 없습니다.
              </p>
              <p className="text-slate-300 text-sm">
                워드프레스 관리자에서{" "}
                <strong className="text-slate-400">jubo</strong> 페이지에
                이미지를 업로드해 주세요.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
