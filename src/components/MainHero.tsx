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

  // ── 로딩 스켈레톤 ──
  if (isLoading) {
    return (
      <section className="relative w-full bg-slate-950 h-[75vh] min-h-[480px] md:h-[85vh] md:min-h-[600px] animate-pulse">
        <div className="absolute inset-0 bg-slate-900" />
        <div className="absolute bottom-16 left-5 md:left-14 flex flex-col gap-3">
          <div className="w-32 h-3 bg-slate-800 rounded" />
          <div className="w-56 h-8 bg-slate-800 rounded" />
          <div className="w-40 h-8 bg-slate-800 rounded" />
          <div className="w-28 h-9 bg-slate-800 rounded-full mt-2" />
        </div>
      </section>
    );
  }

  const currentSlide = displaySlides[currentIndex];
  if (!currentSlide) return null;

  return (
    /*
     * 레이아웃 전략 (모바일/PC 통합 오버레이)
     * ─────────────────────────────────────────────────────────────
     * section: 모바일 h-[75vh], PC h-[85vh] — 풀스크린 단일 블록
     *
     * [공통] 이미지 absolute inset-0 (크로스페이드)
     * [공통] 그라디언트 레이어 (텍스트 가독성)
     * [공통] 투명 클릭 링크 레이어
     * [공통] 텍스트+버튼 오버레이 (좌하단 절대 위치)
     * [공통] 인디케이터 (하단 중앙 절대 위치)
     * ─────────────────────────────────────────────────────────────
     */
    <section className="relative w-full bg-slate-950 h-[75vh] min-h-[480px] md:h-[85vh] md:min-h-[600px] overflow-hidden selection:bg-blue-100 selection:text-blue-900">

      {/* ══════════════════════════════════════════
          이미지 크로스페이드 레이어 (절대 위치)
      ══════════════════════════════════════════ */}
      {displaySlides.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-[10]" : "opacity-0 z-[1] pointer-events-none"
            }`}
            aria-hidden={!isActive}
          >
            <img
              src={slide.imageUrl}
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
        );
      })}

      {/* ══════════════════════════════════════════
          그라디언트 레이어 — 텍스트 가독성
          모바일: 하단 진하게 (오버레이 텍스트)
          PC:     좌측 + 하단 이중 그라디언트
      ══════════════════════════════════════════ */}
      {/* 공통: 하단 그라디언트 */}
      <div className="absolute inset-0 z-[11] bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      {/* PC 전용: 좌측 그라디언트 */}
      <div className="hidden md:block absolute inset-0 z-[11] bg-gradient-to-r from-black/50 via-black/10 to-transparent" />

      {/* ══════════════════════════════════════════
          이미지 클릭 → 링크 이동 (투명 레이어)
      ══════════════════════════════════════════ */}
      {currentSlide.link && (
        <Link
          href={currentSlide.link}
          target={currentSlide.link.startsWith("http") ? "_blank" : "_self"}
          className="absolute inset-0 z-[12] cursor-pointer"
          aria-label="슬라이드 자세히 보기"
          tabIndex={-1}
        />
      )}

      {/* ══════════════════════════════════════════
          텍스트 + 버튼 오버레이 (좌하단)
          pointer-events-none → 버튼만 auto 복원
      ══════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[20] flex flex-col justify-end px-5 pb-14 md:px-14 md:pb-24 pointer-events-none">
        <div className="flex flex-col max-w-2xl">

          {/* LIVE 배지 */}
          {currentSlide.isLive && (
            <div className="mb-3 md:mb-4 flex items-center w-max">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-600 rounded-sm shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                <span className="text-white text-[11px] font-black tracking-widest leading-none mt-[1px]">
                  LIVE
                </span>
              </div>
            </div>
          )}

          {/* 캡션 + 제목 */}
          <div
            className="
              [&>p:first-child]:text-[10px] [&>p:first-child]:md:text-sm
              [&>p:first-child]:font-bold
              [&>p:first-child]:text-white/70 [&>p:first-child]:uppercase [&>p:first-child]:tracking-[0.18em] [&>p:first-child]:md:tracking-[0.22em]
              [&>p:first-child]:mb-1.5 [&>p:first-child]:md:mb-3

              [&>h1]:text-[1.7rem] [&>h1]:md:text-5xl [&>h1]:lg:text-6xl
              [&>h1]:font-extrabold [&>h1]:text-white
              [&>h1]:tracking-tight [&>h1]:break-keep [&>h1]:leading-snug
            "
            dangerouslySetInnerHTML={{ __html: currentSlide.caption }}
          />

          {/* 버튼 */}
          {currentSlide.buttonText && (
            <Link
              href={currentSlide.link || "#"}
              target={currentSlide.link?.startsWith("http") ? "_blank" : "_self"}
              className="pointer-events-auto mt-3 md:mt-5 inline-flex items-center justify-center gap-2
                         px-4 py-2 md:px-6 md:py-3 w-max rounded-full
                         border border-white/40 bg-white/10
                         backdrop-blur-sm text-white text-sm md:text-base font-bold
                         hover:bg-white hover:text-slate-900
                         transition-all duration-300 group/btn"
            >
              <span>{currentSlide.buttonText}</span>
              <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform md:w-4 md:h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          인디케이터 (하단 중앙 절대 위치)
      ══════════════════════════════════════════ */}
      {totalSlides > 1 && (
        <div className="absolute bottom-4 md:bottom-7 left-1/2 -translate-x-1/2 z-[40] flex items-center gap-3">
          <div className="flex items-center gap-2">
            {displaySlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`슬라이드 ${idx + 1}`}
                className={`rounded-full transition-all duration-500 ${
                  idx === currentIndex
                    ? "w-5 md:w-6 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
          <div className="w-px h-4 md:h-5 bg-white/25" />
          <button
            onClick={() => setIsPlaying((p) => !p)}
            aria-label={isPlaying ? "자동재생 일시정지" : "자동재생 재개"}
            className="text-white/50 hover:text-white transition-colors"
          >
            {isPlaying ? (
              <Pause size={12} className="fill-current md:w-3.5 md:h-3.5" />
            ) : (
              <Play size={12} className="fill-current ml-0.5 md:w-3.5 md:h-3.5" />
            )}
          </button>
        </div>
      )}
    </section>
  );
};
