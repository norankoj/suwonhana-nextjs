"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link"; // 링크 이동을 위해 필수
import { ArrowRight } from "lucide-react";

// 슬라이드 데이터
const SLIDE_DATA = [
  {
    id: 1,
    image: "/images/background02.jpg",
    link: "/intro/vision", // 클릭 시 이동할 주소
    alt: "비전 설명",
  },
  {
    id: 2,
    image: "/images/background03.jpg",
    link: "/sermon", // 클릭 시 이동할 주소
    alt: "설교 바로가기",
  },
];

export const MainHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 자동 슬라이드 기능
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDE_DATA.length);
    }, 5000); // 5초마다 변경
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* 배경 슬라이드 (클릭 가능하게 변경) */}
      <div className="absolute inset-0 bg-slate-900">
        {SLIDE_DATA.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-60 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* 이미지를 Link로 감싸서 클릭 가능하게 만듦 */}
            <Link
              href={slide.link}
              className="block w-full h-full cursor-pointer"
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        ))}
        {/* 어두운 그라데이션 오버레이 (글씨 잘 보이게) */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent z-20 pointer-events-none"></div>
      </div>

      {/* 텍스트 내용 */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-30 mt-10">
        {/* ⭐ h1에 text-white를 직접 지정하여 글로벌 스타일 덮어쓰기 */}
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 drop-shadow-lg text-white">
          하나님을 즐거워하고
          <br />그 분의 목적에 헌신하는 공동체
        </h1>

        {/* ⭐ p 태그들도 text-white 또는 밝은 색으로 지정 */}
        <div className="flex flex-col gap-1 mb-10 text-slate-100 font-light text-sm md:text-base">
          <p className="text-slate-100">
            주일예배 매주 1부(9:00), 2부(11:00), 3부(14:30)
          </p>
          <p className="text-slate-100">금요예배 매주 9:00</p>
        </div>

        <Link
          href="/intro/vision"
          className="inline-flex items-center gap-2 text-white border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white hover:text-slate-900 px-8 py-3 rounded-full transition-all duration-300 group"
        >
          자세히 보기{" "}
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </section>
  );
};
