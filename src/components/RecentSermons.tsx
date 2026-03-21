"use client";

import React, { useState, useEffect } from "react";
import { Play, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { WPSermon } from "@/lib/types";
import { getYouTubeId } from "@/utils/youtube";
import { formatDate, getCleanTitle } from "@/utils/format";

const WP_DOMAIN =
  process.env.NEXT_PUBLIC_WORDPRESS_DOMAIN || "http://suwonhana.local";

export default function RecentSermons() {
  const [sermons, setSermons] = useState<WPSermon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await fetch(
          `${WP_DOMAIN}/wp-json/wp/v2/risen_multimedia?per_page=6&_embed`,
        );
        if (res.ok) {
          const data = await res.json();
          setSermons(data);
        }
      } catch (error) {
        console.error("최근 설교 로딩 실패", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecent();
  }, []);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="flex items-end justify-between mb-10 pb-5 border-b border-slate-100">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-2">
              Message
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              최근 설교
            </h2>
          </div>
          <Link
            href="/sermon"
            className="flex items-center gap-1 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors pb-1"
          >
            전체보기 <ChevronRight size={15} />
          </Link>
        </div>

        {/* 카드 그리드 */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-slate-100" />
                <div className="pt-4 space-y-2">
                  <div className="h-3 bg-slate-100 rounded w-1/4" />
                  <div className="h-5 bg-slate-100 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : sermons.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Play size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-medium">최근 설교를 불러올 수 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {sermons.map((item) => {
              const vidId = getYouTubeId(item.sermon_meta?.video_url);
              const thumb = vidId
                ? `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg`
                : item._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
              const title =
                item.sermon_meta?.clean_title ||
                getCleanTitle(item.title.rendered);
              const tags = item.sermon_meta?.tags || [];

              return (
                <Link
                  key={item.id}
                  href="/sermon"
                  className="group flex flex-col cursor-pointer"
                >
                  {/* 썸네일 */}
                  <div className="relative aspect-video bg-slate-100 rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                    {thumb ? (
                      <img
                        src={thumb}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100">
                        <Play size={32} className="text-slate-300" />
                      </div>
                    )}
                    {/* 플레이 버튼 오버레이 */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100">
                        <Play size={18} className="text-slate-900 fill-slate-900 ml-0.5" />
                      </div>
                    </div>
                    {/* 태그 뱃지 */}
                    {tags[0] && (
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-bold px-2 py-1 bg-white/90 backdrop-blur-sm text-slate-700 rounded-full shadow-sm">
                          {tags[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 텍스트 정보 */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="font-medium">{formatDate(item.date)}</span>
                      {item.sermon_meta?.speaker && (
                        <>
                          <span className="w-px h-3 bg-slate-200"></span>
                          <span>{item.sermon_meta.speaker}</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-bold text-base text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {title}
                    </h3>
                    {item.sermon_meta?.scripture && (
                      <p className="text-xs text-slate-400 font-medium">
                        {item.sermon_meta.scripture}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
