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
      <section className="relative w-full bg-slate-950 flex flex-col md:h-[85vh] md:min-h-[600px]">
        {/* 모바일: 이미지 영역 스켈레톤 */}
        <div className="w-full h-[62vw] min-h-[260px] max-h-[440px] md:hidden bg-slate-900 animate-pulse" />
        {/* 모바일: 텍스트 영역 스켈레톤 */}
        <div className="flex flex-col gap-3 px-5 py-6 md:hidden animate-pulse">
          <div className="w-32 h-3 bg-slate-800 rounded" />
          <div className="w-56 h-8 bg-slate-800 rounded" />
          <div className="w-40 h-8 bg-slate-800 rounded" />
          <div className="w-28 h-9 bg-slate-800 rounded-full mt-2" />
        </div>
        {/* 데스크톱: 기존 스켈레톤 */}
        <div className="hidden md:flex flex-col justify-end h-full px-12 lg:px-20 pb-28 animate-pulse">
          <div className="w-36 h-3 bg-slate-800 rounded mb-5" />
          <div className="w-72 h-10 bg-slate-800 rounded mb-3" />
          <div className="w-52 h-10 bg-slate-800 rounded mb-10" />
        </div>
      </section>
    );
  }

  const currentSlide = displaySlides[currentIndex];
  if (!currentSlide) return null;

  return (
    /*
     * 레이아웃 전략
     * ─────────────────────────────────────────────────────────────
     * [모바일] flex-col 스택
     *   ┌─ 이미지 영역 (56vw, object-cover, 크로스페이드) ─┐
     *   │  하단 페이드 그라디언트                           │
     *   └──────────────────────────────────────────────────┘
     *   ┌─ 텍스트+버튼 (어두운 배경) ──────────────────────┐
     *   └──────────────────────────────────────────────────┘
     *   ┌─ 인디케이터 ──────────────────────────────────────┐
     *   └──────────────────────────────────────────────────┘
     *
     * [PC, md 이상] 풀스크린 오버레이
     *   이미지 full + 그라디언트 + 텍스트 좌하단 오버레이
     * ─────────────────────────────────────────────────────────────
     */
    <section className="relative w-full bg-slate-950 flex flex-col md:block md:h-[85vh] md:min-h-[600px] overflow-hidden selection:bg-blue-100 selection:text-blue-900">

      {/* ══════════════════════════════════════════
          [공통] 이미지 크로스페이드 레이어
          모바일: 상대 높이 56vw 고정 컨테이너 내 절대 위치
          PC:     section 에 절대 위치 (full-screen)
      ══════════════════════════════════════════ */}
      <div className="relative w-full h-[62vw] min-h-[260px] max-h-[440px] shrink-0 md:absolute md:inset-0 md:h-auto md:max-h-none">
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
              {/* 이미지 — object-cover + object-center (모바일/PC 공통) */}
              <img
                src={slide.imageUrl}
                alt=""
                className="w-full h-full object-cover object-center"
              />
              {/* PC 전용 그라디언트 (텍스트 가독성) */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
              <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>
          );
        })}

        {/* 모바일 전용: 그라데이션 없음 — 이미지 끝이 배경색과 자연스럽게 이어짐 */}

        {/* 모바일 + PC 공통: 이미지 클릭 → 링크 이동 (투명 Link 레이어, z-[15]) */}
        {currentSlide.link && (
          <Link
            href={currentSlide.link}
            target={currentSlide.link.startsWith("http") ? "_blank" : "_self"}
            className="absolute inset-0 z-[15] cursor-pointer"
            aria-label="슬라이드 자세히 보기"
            tabIndex={-1}
          />
        )}
      </div>

      {/* ══════════════════════════════════════════
          [모바일] 텍스트 + 버튼 영역 (이미지 아래)
          PC 에서는 아래 오버레이 섹션으로 대체
      ══════════════════════════════════════════ */}
      <div className="md:hidden bg-slate-950 px-5 pt-2 pb-3">
        {/* LIVE 배지 */}
        {currentSlide.isLive && (
          <div className="mb-3 flex items-center w-max">
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

        {/* 캡션 + 제목 (모바일) */}
        <div
          className="
            [&>p:first-child]:text-[10px] [&>p:first-child]:font-bold
            [&>p:first-child]:text-white/60 [&>p:first-child]:uppercase [&>p:first-child]:tracking-[0.18em]
            [&>p:first-child]:mb-1.5

            [&>h1]:text-[1.55rem] [&>h1]:font-extrabold [&>h1]:text-white
            [&>h1]:tracking-tight [&>h1]:break-keep [&>h1]:leading-snug
          "
          dangerouslySetInnerHTML={{ __html: currentSlide.caption }}
        />

        {/* 버튼 (모바일) */}
        {currentSlide.buttonText && (
          <Link
            href={currentSlide.link || "#"}
            target={currentSlide.link?.startsWith("http") ? "_blank" : "_self"}
            className="mt-1.5 inline-flex items-center justify-center gap-2
                       px-4 py-2 w-max rounded-full
                       border border-white/30 bg-white/10
                       text-white text-xs font-bold
                       hover:bg-white hover:text-slate-900
                       transition-all duration-300 group/btn"
          >
            <span>{currentSlide.buttonText}</span>
            <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      {/* ══════════════════════════════════════════
          [모바일] 인디케이터 (텍스트 섹션 바로 아래)
      ══════════════════════════════════════════ */}
      {totalSlides > 1 && (
        <div className="md:hidden bg-slate-950 flex items-center justify-center gap-3 py-3">
          <div className="flex items-center gap-2">
            {displaySlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`슬라이드 ${idx + 1}`}
                className={`rounded-full transition-all duration-500 ${
                  idx === currentIndex
                    ? "w-5 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
          <div className="w-px h-4 bg-white/20" />
          <button
            onClick={() => setIsPlaying((p) => !p)}
            aria-label={isPlaying ? "자동재생 일시정지" : "자동재생 재개"}
            className="text-white/50 hover:text-white transition-colors"
          >
            {isPlaying ? (
              <Pause size={12} className="fill-current" />
            ) : (
              <Play size={12} className="fill-current ml-0.5" />
            )}
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════════
          [PC] 텍스트 오버레이 (z-[20])
          pointer-events-none → z-[15] 투명 Link 클릭 통과
      ══════════════════════════════════════════ */}
      <div className="hidden md:flex relative z-[20] w-full max-w-7xl mx-auto h-full px-10 lg:px-14 items-end pb-24 pointer-events-none">
        <div className="flex flex-col max-w-2xl w-full">

          {/* LIVE 배지 (PC) */}
          {currentSlide.isLive && (
            <div className="mb-4 flex items-center w-max">
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

          {/* 캡션 + 제목 (PC) */}
          <div
            className="
              [&>p:first-child]:text-xs [&>p:first-child]:md:text-sm
              [&>p:first-child]:font-bold
              [&>p:first-child]:text-white/70 [&>p:first-child]:uppercase [&>p:first-child]:tracking-[0.22em]
              [&>p:first-child]:mb-3

              [&>h1]:text-5xl [&>h1]:lg:text-6xl
              [&>h1]:font-extrabold [&>h1]:text-white
              [&>h1]:tracking-tight [&>h1]:break-keep [&>h1]:leading-snug
            "
            dangerouslySetInnerHTML={{ __html: currentSlide.caption }}
          />

          {/* 버튼 (PC) — pointer-events-auto 복원 */}
          {currentSlide.buttonText && (
            <Link
              href={currentSlide.link || "#"}
              target={currentSlide.link?.startsWith("http") ? "_blank" : "_self"}
              className="pointer-events-auto mt-5 inline-flex items-center justify-center gap-2
                         px-6 py-3 w-max rounded-full
                         border border-white/40 bg-white/10
                         backdrop-blur-sm text-white text-base font-bold
                         hover:bg-white hover:text-slate-900
                         transition-all duration-300 group/btn"
            >
              <span>{currentSlide.buttonText}</span>
              <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          [PC] 인디케이터 (z-[40])
      ══════════════════════════════════════════ */}
      {totalSlides > 1 && (
        <div className="hidden md:flex absolute bottom-7 left-1/2 -translate-x-1/2 z-[40] items-center gap-3">
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
