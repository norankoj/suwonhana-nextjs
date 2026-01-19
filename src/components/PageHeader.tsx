// src/components/PageHeader.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

interface PageHeaderProps {
  depth1: string;
  depth2: string;
  pageTitle: string;
  pageDesc?: string;
  bgImage: string;
}

export const PageHeader = ({
  depth1,
  depth2,
  pageTitle,
  pageDesc,
  bgImage,
}: PageHeaderProps) => {
  return (
    // pt-[80px]: 고정 헤더 높이만큼 상단 여백 유지
    // pb-16: 배너 아래 여백을 늘려 본문과의 간격 확보 (안정감)
    <div className="w-full pt-[80px] bg-white animate-fade-in pb-16">
      {/* 1. 브레드크럼 & 대제목 영역 */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center text-sm text-slate-500 mb-6">
          <Link
            href="/"
            className="hover:text-brand transition-colors flex items-center"
          >
            <Home size={15} />
          </Link>
          <ChevronRight size={14} className="mx-2 text-slate-300" />
          <span className="font-medium text-slate-600">{depth1}</span>
          <ChevronRight size={14} className="mx-2 text-slate-300" />
          <span className="font-bold text-brand">{depth2}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
          {depth1}
        </h1>
      </div>
      {/* 2. 와이드 이미지 배너 */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative w-full h-[240px] md:h-[320px] rounded-3xl overflow-hidden shadow-sm group">
          {/* 배경 이미지 (hover 시 부드럽게 확대) */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          {/* 어두운 오버레이 */}
          <div className="absolute inset-0 bg-slate-900/50" />
          {/* 배너 내용 (중앙 정렬) */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 drop-shadow-md">
              {pageTitle}
            </h2>
            {pageDesc && (
              <p className="text-slate-100 text-sm md:text-base font-light opacity-90 max-w-2xl break-keep leading-relaxed">
                {pageDesc}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
