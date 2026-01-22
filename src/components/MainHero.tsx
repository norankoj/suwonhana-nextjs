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
    caption: `<h1 class="text-4xl md:text-7xl font-bold mb-4 md:mb-6 text-white drop-shadow-md leading-tight">하나님을 즐거워하는<br/>공동체</h1><p class="text-slate-100 text-lg md:text-xl font-light opacity-90">주님이 주신 기쁨으로 세상을 섬깁니다.</p>`,
    link: "/intro/vision",
    buttonText: "자세히 보기",
  },
  {
    imageUrl: "/images/background03.jpg",
    caption: `<h1 class="text-4xl md:text-7xl font-bold mb-4 md:mb-6 text-white drop-shadow-md leading-tight">말씀과 성령으로<br/>새로워지는 교회</h1><p class="text-slate-100 text-lg md:text-xl font-light opacity-90">매일의 삶에서 경험하는 하나님의 은혜</p>`,
    link: "/sermon",
    buttonText: "설교 말씀 듣기",
  },
];

interface MainHeroProps {
  slidesData?: MainHeroData[];
}

export const MainHero = ({ slidesData }: MainHeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const displaySlides =
    slidesData && slidesData.length > 0
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
  const prevSlide = () =>
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides);

  useEffect(() => {
    if (totalSlides <= 1) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 6000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, totalSlides]);

  const currentSlide = displaySlides[currentIndex];
  if (!currentSlide) return null;

  return (
    // [수정 포인트 1] 높이 설정
    // 모바일: h-[calc(100vh-5rem)] -> 헤더(5rem/80px)를 뺀 나머지 화면을 꽉 채움
    // PC: h-[85vh] -> 적당한 비율 유지
    <section className="relative mt-20 md:mt-24 h-[calc(100vh-5rem)] md:h-[85vh] min-h-[500px] overflow-hidden group bg-slate-900">
      {/* 1. 슬라이드 트랙 */}
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out will-change-transform"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {displaySlides.map((slide) => (
          <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
            {slide.link && slide.link !== "#" ? (
              <Link
                href={slide.link}
                className="block w-full h-full cursor-pointer"
              >
                <img
                  src={slide.imageUrl}
                  alt="slide background"
                  className="w-full h-full object-cover object-center"
                />
                <span
                  className="absolute inset-0 z-10"
                  aria-hidden="true"
                ></span>
              </Link>
            ) : (
              <img
                src={slide.imageUrl}
                alt="slide background"
                className="w-full h-full object-cover object-center"
              />
            )}
            {/* [수정 포인트 2] 모바일 가독성을 위해 하단 그라데이션을 더 진하게 처리 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none md:bg-gradient-to-r md:from-slate-900/70 md:via-slate-900/30 md:to-transparent"></div>
          </div>
        ))}
      </div>

      {/* 2. 텍스트 콘텐츠 */}
      <div className="absolute inset-0 flex items-end md:items-center pb-20 md:pb-0 z-30 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 w-full pointer-events-auto">
          <div key={currentSlide.id} className="animate-fade-in">
            {/* 캡션 스타일: 모바일에서는 하단 배치 느낌을 위해 글자 크기와 여백 조정 */}
            <div
              className="text-white mb-8 md:mb-10 prose prose-invert max-w-none 
                [&>h1]:text-4xl [&>h1]:md:text-7xl [&>h1]:font-bold [&>h1]:leading-tight [&>h1]:mb-4 [&>h1]:drop-shadow-lg
                [&>p]:text-lg [&>p]:md:text-xl [&>p]:text-slate-100 [&>p]:font-light
                md:[&>br]:block"
              dangerouslySetInnerHTML={{ __html: currentSlide.caption }}
            />

            {/* [수정 포인트 3] 버튼 부활! (hidden 제거) */}
            {currentSlide.buttonText && (
              <Link
                href={currentSlide.link || "#"}
                target={
                  currentSlide.link?.startsWith("http") ? "_blank" : "_self"
                }
                className="inline-flex items-center gap-2 text-white border border-white/40 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-slate-900 px-6 py-3 md:px-8 md:py-4 rounded-full transition-all duration-300 group/btn"
              >
                <span className="text-sm md:text-base font-bold">
                  {currentSlide.buttonText}
                </span>
                <ArrowRight
                  size={18}
                  className="group-hover/btn:translate-x-1 transition-transform"
                />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 3. 화살표 (PC에서만 보임) */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30 md:left-8"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30 md:right-8"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* 4. 하단 인디케이터 */}
      {totalSlides > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-2 md:gap-3">
          {displaySlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
                idx === currentIndex
                  ? "w-6 md:w-8 bg-white"
                  : "w-1.5 md:w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
