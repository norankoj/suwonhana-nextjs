"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Play, Pause, ArrowRight } from "lucide-react";

export interface MainHeroData {
  imageUrl: string;
  caption: string;
  link?: string;
  buttonText?: string;
  isLive?: boolean;
}

const DEFAULT_DATA: MainHeroData[] = [
  {
    imageUrl: "/images/background02.jpg",
    caption: `<p>SUNDAY WORSHIP SERVICE</p><h1>수원하나교회 주일예배</h1>`,
    link: "/intro/vision",
    buttonText: "자세히 보기",
    isLive: true,
  },
  {
    imageUrl: "/images/background03.jpg",
    caption: `<p>WORD & SPIRIT RENEWAL</p><h1>말씀과 성령으로<br/>새로워지는 교회</h1>`,
    link: "/sermon",
    buttonText: "설교 말씀 듣기",
    isLive: false,
  },
];

interface MainHeroProps {
  slidesData?: MainHeroData[] | null;
}

export const MainHero = ({ slidesData }: MainHeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const isLoading = slidesData === null;

  const displaySlides =
    !isLoading && slidesData && slidesData.length > 0
      ? slidesData.map((item, idx) => ({ ...item, id: idx }))
      : DEFAULT_DATA.map((item, idx) => ({ ...item, id: idx + 100 }));

  const totalSlides = displaySlides.length;

  const goToSlide = (index: number) => setCurrentIndex(index);

  useEffect(() => {
    if (isLoading || totalSlides <= 1 || !isPlaying) return;
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(id);
  }, [totalSlides, isLoading, isPlaying]);

  if (isLoading) {
    return (
      <section className="relative w-full h-[80vh] md:h-[90vh] min-h-[600px] bg-slate-950 flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-32">
        <div className="animate-pulse w-full max-w-xl">
          <div className="w-36 h-3 bg-slate-800 rounded mb-5" />
          <div className="w-72 h-12 bg-slate-800 rounded mb-3" />
          <div className="w-52 h-12 bg-slate-800 rounded mb-10" />
        </div>
      </section>
    );
  }

  const currentSlide = displaySlides[currentIndex];
  if (!currentSlide) return null;

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] object-center min-h-[600px] overflow-hidden bg-slate-950 selection:bg-blue-100 selection:text-blue-900">
      {/* ── 슬라이드 배경 ── */}
      {displaySlides.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
            aria-hidden={!isActive}
          >
            <img
              src={slide.imageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        );
      })}

      {/* ── 콘텐츠 컨테이너 ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto h-full px-3 md:px-6 flex items-center">
        {/* ── 텍스트 오버레이 영역 ── */}
        <div className="flex flex-col flex-1 max-w-3xl animate-fade-in">
          {currentSlide.isLive && (
            <div className="ml-2 mb-5 flex items-center w-max">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-600 rounded-sm shadow-lg">
                {/* 깜빡이는 하얀 점 */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                {/* 텍스트 */}
                <span className="text-white text-[11px] font-black tracking-widest leading-none mt-[1px]">
                  LIVE
                </span>
              </div>
            </div>
          )}

          {/* 타이틀 및 캡션 */}
          <div
            className="
              [&>p:first-child]:text-sm [&>p:first-child]:md:text-base [&>p:first-child]:font-bold
              [&>p:first-child]:text-white/70 [&>p:first-child]:uppercase [&>p:first-child]:tracking-[0.25em]
              [&>p:first-child]:mb-3
              
              [&>h1]:text-4xl [&>h1]:md:text-5xl [&>h1]:lg:text-6xl
              [&>h1]:font-extrabold [&>h1]:text-white 
              [&>h1]:tracking-tight 
              [&>h1]:break-keep
              
              [&>h1+p]:mt-4 [&>h1+p]:text-sm [&>h1+p]:text-white/50
            "
            dangerouslySetInnerHTML={{ __html: currentSlide.caption }}
          />

          {/* 버튼 */}
          {currentSlide.buttonText && currentSlide.link && (
            <Link
              href={currentSlide.link}
              target={currentSlide.link.startsWith("http") ? "_blank" : "_self"}
              className="mt-1 md:mt-2 inline-flex items-center justify-center gap-2
                         px-4 py-2 md:px-6 md:py-3 w-max rounded-full
                         border border-white/40 bg-white/10
                         backdrop-blur-sm text-white text-sm md:text-base font-bold
                         hover:bg-white hover:text-slate-900
                         transition-all duration-300 group/btn"
            >
              <span>{currentSlide.buttonText}</span>
              <ArrowRight
                size={18}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </Link>
          )}
        </div>
      </div>

      {/* ── 슬라이드 이동 버튼 ── */}
      {totalSlides > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3">
          {/* 도트 */}
          <div className="flex items-center gap-2">
            {displaySlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`슬라이드 ${idx + 1}`}
                className={`rounded-full transition-all duration-500 ${
                  idx === currentIndex
                    ? "w-6 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <div className="w-px h-5 bg-white/20" />
          <button
            onClick={() => setIsPlaying((p) => !p)}
            aria-label={isPlaying ? "자동재생 일시정지" : "자동재생 재개"}
            className="text-white/60 hover:text-white transition-colors"
          >
            {isPlaying ? (
              <Pause size={14} className="fill-current" />
            ) : (
              <Play size={14} className="fill-current ml-0.5" />
            )}
          </button>
        </div>
      )}
    </section>
  );
};
