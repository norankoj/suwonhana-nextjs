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
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-1.5">
              Message
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              최근 설교
            </h2>
          </div>
          <Link
            href="/sermon"
            className="flex items-center gap-1 text-sm font-semibold text-slate-400 hover:text-slate-900 transition-colors"
          >
            전체보기 <ChevronRight size={14} />
          </Link>
        </div>

        {/* 로딩 스켈레톤 */}
        {isLoading ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="animate-pulse aspect-[16/9] bg-slate-100" />
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-slate-100" />
                  <div className="pt-2 space-y-1.5">
                    <div className="h-3 bg-slate-100 rounded w-1/3" />
                    <div className="h-4 bg-slate-100 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : sermons.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Play size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-medium">최근 설교를 불러올 수 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 상단 - 2개 큰 카드 (이미지 안에 텍스트) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sermons.slice(0, 2).map((item) => {
                const vidId = getYouTubeId(item.sermon_meta?.video_url);
                const thumb = vidId
                  ? `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg`
                  : item._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
                const title =
                  item.sermon_meta?.clean_title || getCleanTitle(item.title.rendered);
                const tags = item.sermon_meta?.tags || [];

                return (
                  <Link
                    key={item.id}
                    href="/sermon"
                    className="group relative block aspect-[4/3] overflow-hidden bg-slate-900"
                  >
                    {/* 썸네일 */}
                    {thumb && (
                      <img
                        src={thumb}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                    )}
                    {/* 그라디언트 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* 플레이 버튼 */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play size={18} className="text-white fill-white ml-0.5" />
                    </div>

                    {/* 텍스트 오버레이 */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      <div className="flex items-center gap-2 mb-2">
                        {tags[0] && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-white/20 text-white/90 uppercase tracking-wide backdrop-blur-sm">
                            {tags[0]}
                          </span>
                        )}
                        {tags[1] && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-white/10 text-white/70 uppercase tracking-wide">
                            {tags[1]}
                          </span>
                        )}
                      </div>
                      <h3 className="font-extrabold text-lg md:text-xl text-white leading-snug mb-2 line-clamp-2">
                        {title}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] text-white/60 font-medium">
                        {item.sermon_meta?.scripture && (
                          <>
                            <span>{item.sermon_meta.scripture}</span>
                            <span className="w-px h-2.5 bg-white/30" />
                          </>
                        )}
                        {item.sermon_meta?.speaker && (
                          <>
                            <span>{item.sermon_meta.speaker}</span>
                            <span className="w-px h-2.5 bg-white/30" />
                          </>
                        )}
                        <span>{formatDate(item.date)}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* 하단 - 4열 소카드 */}
            {sermons.length > 2 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sermons.slice(2, 6).map((item) => {
                  const vidId = getYouTubeId(item.sermon_meta?.video_url);
                  const thumb = vidId
                    ? `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg`
                    : item._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
                  const title =
                    item.sermon_meta?.clean_title || getCleanTitle(item.title.rendered);
                  const tags = item.sermon_meta?.tags || [];

                  return (
                    <Link
                      key={item.id}
                      href="/sermon"
                      className="group flex flex-col"
                    >
                      <div className="relative aspect-video bg-slate-100 overflow-hidden">
                        {thumb ? (
                          <img
                            src={thumb}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Play size={20} className="text-slate-300" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Play size={12} className="text-slate-900 fill-slate-900 ml-0.5" />
                          </div>
                        </div>
                      </div>
                      <div className="pt-2.5 flex flex-col gap-1">
                        {tags[0] && (
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                            {tags[0]}
                          </span>
                        )}
                        <h3 className="font-bold text-sm text-slate-900 leading-snug line-clamp-2">
                          {title}
                        </h3>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {formatDate(item.date)}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
