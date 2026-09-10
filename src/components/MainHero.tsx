"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Play, Pause, ArrowRight } from "lucide-react";

export interface MainHeroData {
  imageUrl: string;
  /** 제목 위 작은 영문 문구. 비우면 미표시 */
  eyebrow?: string;
  /** 큰 제목(평문). 줄바꿈은 \n. 이미지에 제목이 그려져 있으면 비움 */
  title?: string;
  link?: string;
  buttonText?: string;
  isLive?: boolean;
  scripture?: string;
}

const DEFAULT_DATA: MainHeroData[] = [
  {
    imageUrl: "",
    eyebrow: "SUNDAY WORSHIP SERVICE",
    title: "수원하나교회\n주일예배",
    link: "/intro/vision",
    buttonText: "자세히 보기",
    isLive: true,
  },
  {
    imageUrl: "",
    eyebrow: "WORD & SPIRIT RENEWAL",
    title: "말씀과 성령으로\n새로워지는 교회",
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
    <section className="relative w-full bg-slate-950 h-[72vh] min-h-[460px] md:h-auto md:aspect-video md:max-h-[86vh] md:min-h-0 overflow-hidden selection:bg-accent-100 selection:text-accent-900">
      {/* ══════════════════════════════════════════
          이미지 크로스페이드 레이어 (절대 위치)
      ══════════════════════════════════════════ */}
      {displaySlides.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive
                ? "opacity-100 z-[10]"
                : "opacity-0 z-[1] pointer-events-none"
            }`}
            aria-hidden={!isActive}
          >
            {slide.imageUrl ? (
              <img
                src={slide.imageUrl}
                alt=""
                className="w-full h-full object-cover object-[77%] md:object-center"
              />
            ) : (
              <div className="w-full h-full bg-slate-900" />
            )}
          </div>
        );
      })}

      {/* ══════════════════════════════════════════
          그라디언트 레이어 — 텍스트 가독성
          모바일: 하단 진하게 (오버레이 텍스트)
          PC:     좌측 + 하단 이중 그라디언트
      ══════════════════════════════════════════ */}
      {/* 스크림은 모든 슬라이드에 동일하게 적용한다 (통일성).
          제목이 이미지에 그려진 슬라이드도 예외 없이 같은 톤을 유지. */}
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
          className="absolute inset-0 z-[12] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
          aria-label={
            currentSlide.title?.replace(/\n/g, " ") || "슬라이드 자세히 보기"
          }
          /* 버튼이 있으면 같은 곳으로 가는 탭 스톱이 둘이 되므로 건너뛰고,
             버튼이 없는 슬라이드에서만 이 레이어가 키보드 진입점이 된다. */
          tabIndex={currentSlide.buttonText ? -1 : 0}
        />
      )}

      {/* ══════════════════════════════════════════
          텍스트 + 버튼 오버레이 (좌하단)
          pointer-events-none → 버튼만 auto 복원
      ══════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[20] flex flex-col justify-end pointer-events-none">
        {/* PC: max-w-content 컨테이너로 좌측 여백 이전 버전과 동일하게 */}
        <div className="w-full md:max-w-content md:mx-auto px-5 pb-20 md:px-10 lg:px-14 md:pb-24">
          <div className="flex flex-col max-w-2xl">
            {/* LIVE 배지 */}
            {currentSlide.isLive && (
              <div className="mb-3 md:mb-4 flex items-center w-max">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-red-600 rounded-lg shadow-lg">
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

            {/* 윗줄 문구 — WP에서 평문으로 입력.
                자간이 넓은 Outfit + 대문자가 영문 eyebrow 의 톤을 잡는다. */}
            {currentSlide.eyebrow?.trim() && (
              <p className="font-display text-[10px] md:text-sm font-semibold text-white/75 uppercase tracking-[0.34em] md:tracking-[0.42em] mb-2.5 md:mb-5 drop-shadow">
                {currentSlide.eyebrow}
              </p>
            )}

            {/* 큰 제목 — 평문. 줄바꿈(\n)은 whitespace-pre-line 이 처리.
                크기는 clamp 로 뷰포트에 따라 연속 변화(md/lg 단차 없음).
                히어로가 aspect-video 라 bold 브랜치(최대 5.6rem)보다 한 단계 낮췄다. */}
            {currentSlide.title?.trim() && (
              <h1
                className="font-display font-black text-white tracking-[-0.03em] leading-[1.05] break-keep drop-shadow-lg whitespace-pre-line"
                style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
              >
                {currentSlide.title}
              </h1>
            )}

            {/* 성경 구절 / 본문 출처.
                "갈라디아서" 처럼 짧은 라벨이 들어오면 11px 로는 제목(최대 72px)
                옆에서 눌려 버려서, 앞에 짧은 룰을 두고 크기를 키웠다.
                긴 구절이 들어와도 medium 굵기라 무겁지 않다. */}
            {currentSlide.scripture && (
              <div className="mt-5 md:mt-7 flex items-start gap-3 md:gap-5">
                <span
                  aria-hidden
                  className="block w-7 md:w-14 h-px bg-white/55 shrink-0 mt-[0.72em]"
                />
                <p
                  className="font-medium text-white/85 leading-relaxed break-keep max-w-sm md:max-w-xl drop-shadow"
                  style={{ fontSize: "clamp(0.95rem, 1.55vw, 1.5rem)" }}
                >
                  {currentSlide.scripture}
                </p>
              </div>
            )}

            {/* 버튼 */}
            {currentSlide.buttonText && (
              <Link
                href={currentSlide.link || "#"}
                target={
                  currentSlide.link?.startsWith("http") ? "_blank" : "_self"
                }
                className="pointer-events-auto mt-3 md:mt-5 inline-flex items-center justify-center gap-2
                         px-4 py-2 md:px-6 md:py-3 w-max rounded-full
                         border border-white/40 bg-white/10
                         backdrop-blur-sm text-white text-sm md:text-base font-bold
                         hover:bg-white hover:text-slate-900
                         transition-all duration-300 group/btn"
              >
                <span>{currentSlide.buttonText}</span>
                <ArrowRight
                  size={14}
                  className="group-hover/btn:translate-x-1 transition-transform md:w-4 md:h-4"
                />
              </Link>
            )}
          </div>
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
              <Play
                size={12}
                className="fill-current ml-0.5 md:w-3.5 md:h-3.5"
              />
            )}
          </button>
        </div>
      )}
    </section>
  );
};
