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
      <section className="relative w-full h-[60vh] md:h-[85vh] min-h-[480px] bg-slate-950 flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-24">
        <div className="animate-pulse w-full max-w-xl">
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
    <section className="relative w-full h-[60vh] md:h-[85vh] min-h-[480px] overflow-hidden bg-slate-950 selection:bg-blue-100 selection:text-blue-900">

      {/* ══════════════════════════════════════════
          슬라이드 배경 이미지 레이어
          ① 블러 배경  → object-contain 사용 시 좌우/상하 여백 채움
          ② 블러 오버레이 (블러 위 어두움)
          ③ 메인 이미지  → object-contain, 원본 비율 그대로 잘림 없음
          ④ 텍스트 가독성 그라디언트
      ══════════════════════════════════════════ */}
      {displaySlides.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-[10]" : "opacity-0 z-[1] pointer-events-none"
            }`}
            aria-hidden={!isActive}
          >
            {/* ① 블러 배경 — 빈 여백(상하 또는 좌우)을 자연스럽게 채워줌 */}
            <img
              src={slide.imageUrl}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-55"
              style={{ filter: "blur(36px)", transform: "scale(1.18)" }}
            />
            {/* ② 블러 위 어두운 오버레이 */}
            <div className="absolute inset-0 bg-black/40" />
            {/* ③ 메인 이미지 — 원본 비율 유지, 잘림 없음 */}
            <img
              src={slide.imageUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-contain"
            />
            {/* ④ 텍스트 가독성 그라디언트 (좌→우 + 하단) */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          </div>
        );
      })}

      {/* ══════════════════════════════════════════
          이미지 클릭 → 페이지 이동 (투명 Link 레이어)
          z-[15]: 이미지(z-10) 위, 콘텐츠(z-20) 아래
          콘텐츠 영역 pointer-events-none 덕분에
          이미지 빈 곳 클릭 시 이 Link 가 동작함
      ══════════════════════════════════════════ */}
      {currentSlide.link && (
        <Link
          href={currentSlide.link}
          target={currentSlide.link.startsWith("http") ? "_blank" : "_self"}
          className="absolute inset-0 z-[15] cursor-pointer"
          aria-label="슬라이드 자세히 보기"
          tabIndex={-1}
        />
      )}

      {/* ══════════════════════════════════════════
          텍스트 + 버튼 콘텐츠 (z-[20])
          pointer-events-none  → 클릭이 z-[15] 투명 Link 로 통과
          내부 버튼은 pointer-events-auto 로 복원
      ══════════════════════════════════════════ */}
      <div className="relative z-[20] w-full max-w-7xl mx-auto h-full px-4 sm:px-6 md:px-10 lg:px-14 flex items-end pb-16 sm:pb-20 md:pb-24 pointer-events-none">
        <div className="flex flex-col max-w-2xl w-full">

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

          {/* 캡션 + 제목
              모바일:    p(10px bold) + h1(2xl)
              태블릿:    p(xs)        + h1(3xl)
              데스크톱:  p(sm)        + h1(5xl~6xl)
          */}
          <div
            className="
              [&>p:first-child]:text-[10px] [&>p:first-child]:sm:text-xs [&>p:first-child]:md:text-sm
              [&>p:first-child]:font-bold
              [&>p:first-child]:text-white/70 [&>p:first-child]:uppercase [&>p:first-child]:tracking-[0.2em]
              [&>p:first-child]:mb-1.5 [&>p:first-child]:md:mb-3

              [&>h1]:text-2xl [&>h1]:sm:text-3xl [&>h1]:md:text-5xl [&>h1]:lg:text-6xl
              [&>h1]:font-extrabold [&>h1]:text-white
              [&>h1]:tracking-tight [&>h1]:break-keep [&>h1]:leading-snug

              [&>h1+p]:mt-3 [&>h1+p]:text-sm [&>h1+p]:text-white/50
            "
            dangerouslySetInnerHTML={{ __html: currentSlide.caption }}
          />

          {/* 버튼
              ✅ buttonText 만 있으면 표시 (link 없어도 됨 → href="#" 폴백)
              ✅ pointer-events-auto 복원 — 버튼 클릭 정상 동작
          */}
          {currentSlide.buttonText && (
            <Link
              href={currentSlide.link || "#"}
              target={currentSlide.link?.startsWith("http") ? "_blank" : "_self"}
              className="pointer-events-auto mt-3 md:mt-5 inline-flex items-center justify-center gap-2
                         px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 w-max rounded-full
                         border border-white/40 bg-white/10
                         backdrop-blur-sm text-white text-xs sm:text-sm md:text-base font-bold
                         hover:bg-white hover:text-slate-900
                         transition-all duration-300 group/btn"
            >
              <span>{currentSlide.buttonText}</span>
              <ArrowRight
                size={15}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </Link>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          도트 인디케이터 + 재생/정지 (z-[40])
          pointer-events-auto — 이미지 클릭 Link 방해 안 함
      ══════════════════════════════════════════ */}
      {totalSlides > 1 && (
        <div className="absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 z-[40] flex items-center gap-3">
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
