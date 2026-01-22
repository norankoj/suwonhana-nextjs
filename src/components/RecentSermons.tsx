"use client";

import React, { useState, useEffect } from "react";
import { Play, Calendar, ChevronRight, Loader2, Users } from "lucide-react";
import Link from "next/link";

const WP_API_DOMAIN = "http://suwonhana.local";

interface Sermon {
  id: number;
  title: { rendered: string };
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
  sermon_meta?: {
    video_url?: string;
    speaker?: string;
    scripture?: string;
  };
}

export default function RecentSermons() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [currentSermon, setCurrentSermon] = useState<Sermon | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await fetch(
          `${WP_API_DOMAIN}/wp-json/wp/v2/risen_multimedia?per_page=5&_embed`,
        );
        if (res.ok) {
          const data = await res.json();
          setSermons(data);
          if (data.length > 0) setCurrentSermon(data[0]);
        }
      } catch (error) {
        console.error("최근 설교 로딩 실패", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecent();
  }, []);

  const getYouTubeId = (url?: string) => {
    if (!url) return null;
    let videoId = "";
    if (url.includes("youtu.be/"))
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    else if (url.includes("v=")) videoId = url.split("v=")[1]?.split("&")[0];
    else if (url.includes("/embed/"))
      videoId = url.split("/embed/")[1]?.split("?")[0];
    return videoId || null;
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-slate-400" />
      </div>
    );
  if (sermons.length === 0) return null;

  const currentVideoId = getYouTubeId(currentSermon?.sermon_meta?.video_url);
  const currentEmbedUrl = currentVideoId
    ? `https://www.youtube.com/embed/${currentVideoId}`
    : "";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
      {/* 헤더: 영어 삭제 및 정렬 */}
      <div className="flex items-end justify-between mb-8 pb-4 border-b border-slate-100">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
          최근 설교
        </h2>
        <Link
          href="/sermon"
          className="flex items-center text-sm font-medium text-slate-400 hover:text-blue-600 transition-colors pb-1"
        >
          전체보기 <ChevronRight size={14} className="ml-0.5" />
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* [왼쪽] 메인 플레이어 */}
        <div className="w-full lg:w-2/3">
          <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-xl">
            {currentEmbedUrl ? (
              <iframe
                width="100%"
                height="100%"
                src={currentEmbedUrl}
                title="Main Sermon"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                영상 링크가 없습니다.
              </div>
            )}
          </div>
          {currentSermon && (
            <div className="mt-5 animate-fade-in">
              <div className="flex items-center gap-3 text-sm text-slate-500 mb-2 font-medium">
                <span className="text-blue-600 font-bold">
                  {formatDate(currentSermon.date)}
                </span>
                <span className="w-px h-3 bg-slate-300"></span>
                <span className="flex items-center text-slate-700">
                  {currentSermon.sermon_meta?.speaker || "담임목사"}
                </span>
              </div>
              <h3
                className="text-2xl font-bold text-slate-900 leading-snug break-keep"
                dangerouslySetInnerHTML={{
                  __html: currentSermon.title.rendered,
                }}
              />
              <p className="mt-2 text-slate-600 font-medium">
                {currentSermon.sermon_meta?.scripture}
              </p>
            </div>
          )}
        </div>

        {/* [오른쪽] 리스트 */}
        <div className="w-full lg:w-1/3 flex flex-col gap-3 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {sermons.map((item) => {
            const isActive = currentSermon?.id === item.id;
            const vidId = getYouTubeId(item.sermon_meta?.video_url);
            const thumb = vidId
              ? `https://img.youtube.com/vi/${vidId}/mqdefault.jpg`
              : item._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

            return (
              <div
                key={item.id}
                onClick={() => setCurrentSermon(item)}
                className={`flex gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200 border ${isActive ? "bg-slate-50 border-blue-200" : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-100"}`}
              >
                {/* 썸네일 */}
                <div className="relative w-28 h-16 bg-slate-200 rounded overflow-hidden shrink-0">
                  {thumb ? (
                    <img
                      src={thumb}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100">
                      <Play size={16} className="text-slate-300" />
                    </div>
                  )}
                  {isActive && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center pl-0.5">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  )}
                </div>
                {/* 정보 */}
                <div className="flex flex-col justify-center min-w-0">
                  <span
                    className={`text-[11px] font-bold mb-0.5 ${isActive ? "text-blue-600" : "text-slate-400"}`}
                  >
                    {formatDate(item.date)}
                  </span>
                  <h4
                    className={`text-sm font-bold leading-tight line-clamp-2 ${isActive ? "text-slate-900" : "text-slate-600"}`}
                    dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
