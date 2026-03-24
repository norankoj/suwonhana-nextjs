"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Play, Pause, ArrowRight } from "lucide-react";

export interface MainHeroData {
  imageUrl: string;
  caption: string;
  link?: string;
  buttonText?: string;
}

const DEFAULT_DATA: MainHeroData[] = [
  {
    imageUrl: "/images/background02.jpg",
    caption: `<p>주일예배 | 수원하나교회</p><h1>하나님을 즐거워하는<br/>공동체</h1>`,
    link: "/intro/vision",
    buttonText: "자세히 보기",
  },
  {
    imageUrl: "/images/background03.jpg",
    caption: `<p>말씀뱅크 | 수원하나교회</p><h1>말씀과 성령으로<br/>새로워지는 교회</h1>`,
    link: "/sermon",
    buttonText: "설교 말씀 듣기",
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

  // 수동 슬라이드 이동
  const goToSlide = (index: number) => setCurrentIndex(index);

  // 자동 슬라이드 — setInterval + 함수형 업데이터로 stale closure 방지
  useEffect(() => {
    if (isLoading || totalSlides <= 1 || !isPlaying) return;
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(id);
  }, [totalSlides, isLoading, isPlaying]);

  // 로딩 스켈레톤
  if (isLoading) {
    return (
      <section className="relative w-full h-screen min-h-[600px] bg-slate-950 flex items-end px-6 md:px-12 lg:px-20 pb-32">
        <div className="animate-pulse w-full max-w-xl">
          <div className="w-36 h-3 bg-slate-800 rounded mb-5" />
          <div className="w-72 h-12 bg-slate-800 rounded mb-3" />
          <div className="w-52 h-12 bg-slate-800 rounded mb-10" />
          <div className="w-14 h-14 bg-slate-800 rounded-full" />
        </div>
      </section>
    );
  }

  const currentSlide = displaySlides[currentIndex];
  if (!currentSlide) return null;

  return (
    <section className="relative w-full h-screen object-center  min-h-[600px] overflow-hidden bg-slate-950">
      {/* ── 슬라이드 배경 (크로스페이드) ── */}
      {displaySlides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={idx !== currentIndex}
        >
          <img
            src={slide.imageUrl}
            alt=""
            className="w-full h-full object-cover object-center"
          />
          {/* 오버레이 2겹: 하단 어둠 + 좌측 어둠 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        </div>
      ))}

      {/* ── 텍스트 오버레이 (좌측 하단) ── */}
      <div
        key={`text-${currentSlide.id}`}
        className="absolute bottom-28 md:bottom-32 left-0 z-20
                   px-6 md:px-12 lg:px-20
                   max-w-full md:max-w-2xl
                   animate-fade-in"
      >
        <div
          className="
            [&>p]:text-[11px] [&>p]:md:text-xs [&>p]:font-bold
            [&>p]:text-white/60 [&>p]:uppercase [&>p]:tracking-[0.25em]
            [&>p]:mb-4 [&>p]:leading-none
            [&>h1]:!text-3xl [&>h1]:md:!text-5xl [&>h1]:lg:!text-6xl
            [&>h1]:!font-extrabold [&>h1]:!text-white [&>h1]:!leading-tight
            [&>h1]:!drop-shadow-lg [&>h1]:!tracking-tight [&>h1]:!mb-0
            [&>h1]:break-keep
          "
          dangerouslySetInnerHTML={{ __html: currentSlide.caption }}
        />

        {/* 버튼 — buttonText 있을 때만 표시 */}
        {currentSlide.buttonText && currentSlide.link && (
          <Link
            href={currentSlide.link}
            target={currentSlide.link.startsWith("http") ? "_blank" : "_self"}
            className="mt-8 inline-flex items-center gap-2
                       px-6 py-3 md:px-8 md:py-4 rounded-full
                       border border-white/40 bg-white/10
                       backdrop-blur-sm text-white text-sm md:text-base font-bold
                       hover:bg-white hover:text-slate-900
                       transition-all duration-300 group/btn"
          >
            <span>{currentSlide.buttonText}</span>
            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      {/* ── 좌측 하단 인디케이터 + 일시정지 ── */}
      {totalSlides > 1 && (
        <div className="absolute bottom-10 left-6 md:left-12 lg:left-20 z-40 flex items-center gap-3">
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

          {/* 구분선 */}
          <div className="w-px h-4 bg-white/30" />

          {/* 일시정지/재생 버튼 */}
          <button
            onClick={() => setIsPlaying((p) => !p)}
            aria-label={isPlaying ? "자동재생 일시정지" : "자동재생 재개"}
            className="text-white/60 hover:text-white transition-colors"
          >
            {isPlaying ? (
              <Pause size={14} className="fill-white/60" />
            ) : (
              <Play size={14} className="fill-white/60 ml-0.5" />
            )}
          </button>
        </div>
      )}
    </section>
  );
};
