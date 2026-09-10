import React from "react";
import Link from "next/link";
import { Tag } from "lucide-react";
import { formatDate } from "@/utils/format";

/** 홈 교회소식 섹션과 /news 목록이 쓰던 마크업이 같아 한 곳으로 모았다.
 *  카테고리·날짜·주보 기본 이미지 규칙도 양쪽이 동일했다. */
export interface NewsCardPost {
  id: number;
  title: { rendered: string };
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
    "wp:term"?: Array<Array<{ name: string; slug?: string }>>;
  };
}

/**
 * 모바일은 가로 목록, sm 이상은 세로 카드.
 * 모바일에서 4:3 카드가 화면 절반을 먹어 한 번에 1.5개밖에 안 보였다.
 */
export default function NewsCard({ post }: { post: NewsCardPost }) {
  const category = post._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "공지사항";
  const img =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    (category === "주보" ? "/images/jubo-default-2026.jpg" : null);

  return (
    <Link
      href={`/news/${post.id}`}
      className="group overflow-hidden border border-slate-100 bg-white flex flex-row sm:flex-col hover:border-slate-300 transition-colors"
    >
      <div className="w-24 shrink-0 aspect-square sm:w-auto sm:aspect-[4/3] overflow-hidden bg-slate-100">
        {img ? (
          <img
            src={img}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Tag size={24} className="text-slate-200 sm:hidden" />
            <Tag size={40} className="text-slate-200 hidden sm:block" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1 flex flex-col justify-center p-3.5 sm:p-4 md:p-5">
        <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-3">
          <span className="text-[11px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 tracking-wider shrink-0">
            {category}
          </span>
          <span className="text-xs sm:text-sm text-slate-500">
            {formatDate(post.date)}
          </span>
        </div>
        <h3
          className="font-bold text-[15px] sm:text-lg md:text-xl text-slate-900 line-clamp-2 leading-snug break-keep group-hover:text-accent-600 transition-colors"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
      </div>
    </Link>
  );
}
