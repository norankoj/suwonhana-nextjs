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
    caption: `<h1 class="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-md leading-tight">하나님을 즐거워하는<br/>공동체</h1><p class="text-slate-300 text-base md:text-lg font-light opacity-90">주님이 주신 기쁨으로 세상을 섬깁니다.</p>`,
    link: "/intro/vision",
    buttonText: "자세히 보기",
  },
  {
    imageUrl: "/images/background03.jpg",
    caption: `<h1 class="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-md leading-tight">말씀과 성령으로<br/>새로워지는 교회</h1><p class="text-slate-300 text-base md:text-lg font-light opacity-90">매일의 삶에서 경험하는 하나님의 은혜</p>`,
    link: "/sermon",
    buttonText: "설교 말씀 듣기",
  },
];

// 이미지에서 대표 어두운 색상 추출
function extractDarkColor(img: HTMLImageElement): string {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 40;
    canvas.height = 40;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "#0f172a";
    ctx.drawImage(img, 0, 0, 40, 40);
    const data = ctx.getImageData(0, 0, 40, 40).data;
    let r = 0, g = 0, b = 0;
    const count = data.length / 4;
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }
    // 평균값의 30%로 어둡게
    r = Math.floor((r / count) * 0.3);
    g = Math.floor((g / count) * 0.3);
    b = Math.floor((b / count) * 0.3);
    return `rgb(${r},${g},${b})`;
  } catch {
    return "#0f172a";
  }
}

interface MainHeroProps {
  slidesData?: MainHeroData[] | null;
}

export const MainHero = ({ slidesData }: MainHeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [bgColors, setBgColors] = useState<Record<number, string>>({});

  if (slidesData === null) {
    return (
      <section className="relative w-full aspect-video min-h-[260px] bg-slate-900 flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="w-48 h-8 bg-slate-800 rounded mx-auto mb-4" />
          <div className="w-32 h-4 bg-slate-800 rounded mx-auto" />
        </div>
      </section>
    );
  }

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
  const prevSlide = () => goToSlide((currentIndex - 1 + totalSlides) % totalSlides);

  useEffect(() => {
    if (totalSlides <= 1) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(nextSlide, 6000);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [currentIndex, totalSlides]);

  const currentSlide = displaySlides[currentIndex];
  if (!currentSlide) return null;

  const currentBg = bgColors[currentSlide.id] ?? "#0f172a";

  return (
    <section
      className="relative w-full aspect-video min-h-[260px] overflow-hidden group transition-colors duration-700"
      style={{ backgroundColor: currentBg }}
    >
      {/* 슬라이드 트랙 */}
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out will-change-transform"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {displaySlides.map((slide) => {
          const slideBg = bgColors[slide.id] ?? "#0f172a";
          return (
            <div
              key={slide.id}
              className="w-full h-full flex-shrink-0 relative transition-colors duration-700"
              style={{ backgroundColor: slideBg }}
            >
              {/* ── 데스크탑: 이미지 오른쪽 크게 ── */}
              <div className="hidden md:block absolute right-0 top-0 w-[70%] h-full">
                {slide.link && slide.link !== "#" ? (
                  <Link href={slide.link} className="block w-full h-full">
                    <img
                      src={slide.imageUrl}
                      alt="slide"
                      crossOrigin="anonymous"
                      className="w-full h-full object-cover object-center"
                      onLoad={(e) => {
                        const color = extractDarkColor(e.currentTarget);
                        setBgColors((prev) => ({ ...prev, [slide.id]: color }));
                      }}
                    />
                  </Link>
                ) : (
                  <img
                    src={slide.imageUrl}
                    alt="slide"
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover object-center"
                    onLoad={(e) => {
                      const color = extractDarkColor(e.currentTarget);
                      setBgColors((prev) => ({ ...prev, [slide.id]: color }));
                    }}
                  />
                )}
                {/* 왼쪽 그라데이션 블렌드 (배경색 → 투명) */}
                <div
                  className="absolute inset-y-0 left-0 w-[55%] pointer-events-none"
                  style={{
                    background: `linear-gradient(to right, ${slideBg} 0%, ${slideBg}99 20%, transparent 100%)`,
                  }}
                />
                {/* 상하 미세 페이드 */}
                <div
                  className="absolute inset-x-0 top-0 h-[20%] pointer-events-none"
                  style={{ background: `linear-gradient(to bottom, ${slideBg}88 0%, transparent 100%)` }}
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-[15%] pointer-events-none"
                  style={{ background: `linear-gradient(to top, ${slideBg}88 0%, transparent 100%)` }}
                />
              </div>

              {/* ── 모바일: 전체 배경 이미지 ── */}
              <div className="md:hidden absolute inset-0">
                <img
                  src={slide.imageUrl}
                  alt="slide"
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover object-center"
                  onLoad={(e) => {
                    const color = extractDarkColor(e.currentTarget);
                    setBgColors((prev) => ({ ...prev, [slide.id]: color }));
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 텍스트 콘텐츠 */}
      <div className="absolute inset-0 flex items-center pb-16 md:pb-0 z-30 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pointer-events-auto">
          {/* 텍스트는 왼쪽 30% 영역에 */}
          <div className="max-w-xs md:max-w-sm" key={currentSlide.id}>
            <div
              className="text-white mb-6 animate-fade-in prose prose-invert max-w-none
                [&>h1]:text-3xl [&>h1]:md:text-5xl [&>h1]:font-bold [&>h1]:leading-tight [&>h1]:mb-3 [&>h1]:drop-shadow-lg
                [&>p]:text-sm [&>p]:md:text-base [&>p]:text-slate-300 [&>p]:font-light"
              dangerouslySetInnerHTML={{ __html: currentSlide.caption }}
            />
            {currentSlide.buttonText && (
              <Link
                href={currentSlide.link || "#"}
                target={currentSlide.link?.startsWith("http") ? "_blank" : "_self"}
                className="inline-flex items-center gap-2 text-white border border-white/40 bg-white/10 backdrop-blur-sm hover:bg-white hover:text-slate-900 px-5 py-2.5 md:px-6 md:py-3 rounded-full transition-all duration-300 group/btn"
              >
                <span className="text-sm font-bold">{currentSlide.buttonText}</span>
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 화살표 */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="hidden md:block absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-40 p-2.5 rounded-full bg-white/10 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/25"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:block absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 p-2.5 rounded-full bg-white/10 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/25"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* 인디케이터 */}
      {totalSlides > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 flex gap-2">
          {displaySlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
