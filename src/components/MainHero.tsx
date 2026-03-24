"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export interface MainHeroData {
  imageUrl: string;
  caption: string;
  link?: string;
  buttonText?: string;
}

const DEFAULT_DATA: MainHeroData[] = [
  {
    imageUrl: "/images/background02.jpg",
    caption: `<h1 class="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md leading-tight">하나님을 즐거워하는<br/>공동체</h1><p class="text-slate-200 text-base md:text-lg font-light opacity-90 leading-relaxed">주님이 주신 기쁨으로 세상을 섬깁니다.</p>`,
    link: "/intro/vision",
    buttonText: "자세히 보기",
  },
  {
    imageUrl: "/images/background03.jpg",
    caption: `<h1 class="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md leading-tight">말씀과 성령으로<br/>새로워지는 교회</h1><p class="text-slate-200 text-base md:text-lg font-light opacity-90 leading-relaxed">매일의 삶에서 경험하는 하나님의 은혜</p>`,
    link: "/sermon",
    buttonText: "설교 말씀 듣기",
  },
];

interface MainHeroProps {
  slidesData?: MainHeroData[] | null;
}

export const MainHero = ({ slidesData }: MainHeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const isLoading = slidesData === null;

  const displaySlides =
    !isLoading && slidesData && slidesData.length > 0
      ? slidesData.map((item, idx) => ({ ...item, id: idx }))
      : DEFAULT_DATA.map((item, idx) => ({ ...item, id: idx + 100 }));

  const totalSlides = displaySlides.length;

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const nextSlide = () => goToSlide((currentIndex + 1) % totalSlides);
  const prevSlide = () => goToSlide((currentIndex - 1 + totalSlides) % totalSlides);

  useEffect(() => {
    if (isLoading || totalSlides <= 1) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 6000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, totalSlides, isLoading]);

  // 헤더가 fixed+transparent로 위에 올라오므로 margin 없이 top:0에서 시작
  const sectionClass =
    "relative w-full h-[580px] md:h-[880px] overflow-hidden group bg-slate-950";

  // 로딩 스켈레톤
  if (isLoading) {
    return (
      <section className={`${sectionClass} flex items-center justify-center`}>
        <div className="text-center animate-pulse">
          <div className="w-48 h-8 bg-slate-800 rounded mx-auto mb-4" />
          <div className="w-32 h-4 bg-slate-800 rounded mx-auto" />
        </div>
      </section>
    );
  }

  const currentSlide = displaySlides[currentIndex];
  if (!currentSlide) return null;

  return (
    <section className={sectionClass}>
      {/* ── 슬라이드 트랙 ── */}
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out will-change-transform"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {displaySlides.map((slide) => (
          <div key={slide.id} className="w-full h-full flex-shrink-0 relative flex flex-col md:flex-row">

            {/* 전체 배경: 이미지 블러 + 어두운 오버레이 */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <img
                src={slide.imageUrl}
                alt=""
                className="w-full h-full object-cover scale-110 blur-lg opacity-20"
              />
              <div className="absolute inset-0 bg-slate-950/75" />
            </div>

            {/* ── 좌측: 텍스트 영역 ── */}
            <div className="relative z-10 w-full md:w-[52%] flex items-end md:items-center px-6 md:px-12 lg:px-20 pb-28 md:pb-0 pt-[5rem] md:pt-0">
              {/* 우측으로 자연스럽게 연결되는 그라디언트 */}
              <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-r from-transparent to-slate-950/60 hidden md:block" />

              <div key={currentSlide.id} className="animate-fade-in w-full">
                <div
                  className="text-white mb-8 prose prose-invert max-w-none
                    [&>h1]:text-3xl [&>h1]:md:text-5xl [&>h1]:font-bold [&>h1]:leading-tight [&>h1]:mb-4 [&>h1]:drop-shadow-lg
                    [&>p]:text-base [&>p]:md:text-lg [&>p]:text-slate-200 [&>p]:font-light [&>p]:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: currentSlide.caption }}
                />

                {currentSlide.buttonText && (
                  <Link
                    href={currentSlide.link || "#"}
                    target={currentSlide.link?.startsWith("http") ? "_blank" : "_self"}
                    className="inline-flex items-center gap-2 text-white border border-white/40 bg-white/10 backdrop-blur-sm hover:bg-white hover:text-slate-900 px-6 py-3 md:px-8 md:py-4 rounded-full transition-all duration-300 group/btn"
                  >
                    <span className="text-sm md:text-base font-bold">{currentSlide.buttonText}</span>
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </div>

            {/* ── 우측: 이미지 (PC에서만) ── */}
            <div className="hidden md:flex md:w-[48%] relative z-10 items-center justify-center px-8 py-10">
              {slide.link && slide.link !== "#" ? (
                <Link href={slide.link} className="block w-full h-full">
                  <img
                    src={slide.imageUrl}
                    alt="slide"
                    className="w-full h-full object-contain drop-shadow-2xl"
                    style={{ filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.6))" }}
                  />
                </Link>
              ) : (
                <img
                  src={slide.imageUrl}
                  alt="slide"
                  className="w-full h-full object-contain drop-shadow-2xl"
                  style={{ filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.6))" }}
                />
              )}
            </div>

            {/* 모바일: 이미지 하단 배경으로 살짝 노출 */}
            <div className="md:hidden absolute bottom-0 left-0 right-0 h-40 pointer-events-none">
              <img
                src={slide.imageUrl}
                alt=""
                className="w-full h-full object-cover object-top opacity-20"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
            </div>

          </div>
        ))}
      </div>

      {/* ── 화살표 (PC에서만) ── */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="hidden md:block absolute left-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* ── 하단 인디케이터 ── */}
      {totalSlides > 1 && (
        <div className="absolute bottom-8 left-6 md:left-12 lg:left-20 z-40 flex gap-2 md:gap-3">
          {displaySlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
                idx === currentIndex
                  ? "w-6 md:w-8 bg-white"
                  : "w-1.5 md:w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
