'use client';

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// 커스텀 재생 버튼 컴포넌트
export const CustomPlayButton = ({ size = 64, className = "" }: { size?: number, className?: string }) => (
  <div
    className={`flex items-center justify-center transition-transform duration-300 hover:scale-110 drop-shadow-lg cursor-pointer ${className}`}
    style={{ width: size, height: size }}
  >
    <svg width="100%" height="100%" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 15L0 30V0L24 15Z" fill="white" />
    </svg>
  </div>
);

// 서브 페이지용 헤더
export const HeroSub = ({ title, subtitle, image }: { title: string, subtitle: string, image: string }) => (
  <div className="relative h-[300px] flex items-center justify-center bg-slate-900 overflow-hidden">
    <img
      src={image}
      alt="bg"
      className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
    <div className="relative z-10 text-center">
      <h2 className="text-4xl font-bold text-white mb-2">{title}</h2>
      <p className="text-sky-300 font-medium tracking-wide uppercase">
        {subtitle}
      </p>
    </div>
  </div>
);

// 히어로 캐러셀 (메인 화면 배경 슬라이드)
export const HeroCarousel = ({ slides, interval = 5000 }: { slides: string[], interval?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [slides, interval]);

  return (
    <div className="absolute inset-0 bg-slate-900">
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-60" : "opacity-0"
          }`}
          alt={`Hero Slide ${index + 1}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent"></div>
    </div>
  );
};

// 일반 캐러셀 (비전, 소그룹 소개 등)
export const SimpleCarousel = ({ items }: { items: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[400px] md:h-[600px] group bg-slate-100">
      {items.map((item, index) => (
        <div
          key={item.key || index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={item.src}
            alt={item.altText}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100 duration-300"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100 duration-300"
      >
        <ChevronRight size={32} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === activeIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};