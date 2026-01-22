"use client";

import React, { useState, useEffect } from "react";
import { MainHeroData } from "@/components/MainHero";

interface EventBannerProps {
  slidesData?: MainHeroData[];
}

export const EventBanner = ({ slidesData }: EventBannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 훅 실행 순서 보장을 위해 조건문 위치 유지
  useEffect(() => {
    if (!slidesData || slidesData.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slidesData.length);
    }, 4000); // 4초마다 변경

    return () => clearInterval(timer);
  }, [slidesData]);

  // 데이터 체크
  if (!slidesData || slidesData.length === 0) return null;

  // 인덱스 안전 장치
  const safeIndex = currentIndex % slidesData.length;
  const currentSlide = slidesData[safeIndex];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* 둥근 모서리 컨테이너 */}
        <div className="relative rounded-[2.5rem] overflow-hidden h-[320px] md:h-[450px] shadow-sm border border-slate-100 group bg-slate-50">
          {/* 1. 우측 상단 페이지 카운터 (Badge) - 유지 */}
          <div className="absolute top-6 right-6 z-20 bg-slate-900/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold font-mono tracking-wider pointer-events-none transition-opacity group-hover:bg-slate-900/40">
            {safeIndex + 1} / {slidesData.length}
          </div>

          {/* 2. 이미지 슬라이드 영역 (전체 꽉 채움) */}
          <div className="w-full h-full relative">
            {/* 이미지가 부드럽게 전환되도록 key를 추가하고 
                object-cover로 박스를 가득 채웁니다.
             */}
            <img
              key={currentSlide.imageUrl} // 이미지가 바뀔 때 페이드 효과를 위해 키값 부여
              src={currentSlide.imageUrl}
              alt="banner slide"
              className="w-full h-full object-cover object-center transition-all duration-700 hover:scale-105 animate-fade-in"
            />

            {/* (선택사항) 이미지 위에 텍스트가 없으므로 그림자를 제거해서 더 밝게 보이게 함.
                 만약 이미지가 너무 밝아서 카운터가 안 보이면 아래 주석을 해제하세요. */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none"></div> */}
          </div>
        </div>
      </div>
    </section>
  );
};
