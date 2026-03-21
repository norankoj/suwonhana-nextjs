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
          `${WP_DOMAIN}/wp-json/wp/v2/risen_multimedia?per_page=5&_embed`,
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
    <section className="py-16 md:py-24 bg-white border-t border-slate-100">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="flex items-end justify-between mb-8 pb-5 border-b border-slate-100">
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
            className="flex items-center gap-1 text-sm font-semibold text-slate-400 hover:text-slate-900 transition-colors pb-1"
          >
            전체보기 <ChevronRight size={14} />
          </Link>
        </div>

        {/* 로딩 스켈레톤 */}
        {isLoading ? (
          <div className="space-y-4">
            <div className="w-full aspect-[16/7] bg-slate-100 animate-pulse" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-slate-100" />
                  <div className="pt-3 space-y-1.5">
                    <div className="h-3 bg-slate-100 rounded w-1/3" />
                    <div className="h-4 bg-slate-100 rounded w-3/4" />
                    <div className="h-3 bg-slate-100 rounded w-1/4" />
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
            {/* 상단 - 1개 큰 카드 */}
            {sermons[0] && (() => {
              const item = sermons[0];
              const vidId = getYouTubeId(item.sermon_meta?.video_url);
              const thumb = vidId
                ? `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg`
                : item._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
              const title =
                item.sermon_meta?.clean_title || getCleanTitle(item.title.rendered);
              const tags = item.sermon_meta?.tags || [];

              return (
                <Link href="/sermon" className="group block">
                  <div className="flex flex-col md:flex-row border border-slate-100 hover:border-slate-300 transition-colors duration-200">
                    {/* 썸네일 */}
                    <div className="relative md:w-[55%] aspect-video overflow-hidden bg-slate-100 shrink-0">
                      {thumb ? (
                        <img
                          src={thumb}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100">
                          <Play size={40} className="text-slate-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Play size={22} className="text-slate-900 fill-slate-900 ml-0.5" />
                        </div>
                      </div>
                    </div>
                    {/* 텍스트 정보 */}
                    <div className="flex flex-col justify-center p-6 md:p-8 md:w-[45%]">
                      <div className="flex items-center gap-2 mb-3">
                        {tags[0] && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 uppercase tracking-wide">
                            {tags[0]}
                          </span>
                        )}
                        {tags[1] && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-50 text-slate-500 uppercase tracking-wide">
                            {tags[1]}
                          </span>
                        )}
                      </div>
                      <h3 className="font-extrabold text-xl md:text-2xl lg:text-3xl text-slate-900 leading-snug mb-4 line-clamp-3">
                        {title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                        {item.sermon_meta?.scripture && (
                          <>
                            <span>{item.sermon_meta.scripture}</span>
                            <span className="w-px h-3 bg-slate-200" />
                          </>
                        )}
                        {item.sermon_meta?.speaker && (
                          <>
                            <span>{item.sermon_meta.speaker}</span>
                            <span className="w-px h-3 bg-slate-200" />
                          </>
                        )}
                        <span>{formatDate(item.date)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })()}

            {/* 하단 - 4열 소카드 */}
            {sermons.length > 1 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-1">
                {sermons.slice(1, 5).map((item) => {
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
                      {/* 썸네일 */}
                      <div className="relative aspect-video bg-slate-100 overflow-hidden border border-slate-100 group-hover:border-slate-300 transition-colors duration-200">
                        {thumb ? (
                          <img
                            src={thumb}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-100">
                            <Play size={20} className="text-slate-300" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <div className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Play size={14} className="text-slate-900 fill-slate-900 ml-0.5" />
                          </div>
                        </div>
                      </div>
                      {/* 텍스트 */}
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
