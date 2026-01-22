"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { HeroSub } from "@/components/Common";

export default function IntroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const currentTab = params.tab as string;

  const tabs = [
    { slug: "vision", name: "비전" },
    { slug: "core-values", name: "핵심가치" },
    { slug: "history", name: "교회연혁" },
    { slug: "pastor", name: "담임목사 소개" },
    { slug: "staff", name: "섬기는 이들" },
    { slug: "worship", name: "예배안내" },
    { slug: "location", name: "오시는 길" },
  ];

  return (
    <div className="bg-white min-h-screen">
      <HeroSub
        title="교회소개"
        subtitle={tabs.find((t) => t.slug === currentTab)?.name || "비전"}
      />

      {/* 레이아웃 변경: 
         flex-row (좌우 배치) 제거 -> flex-col (상하 배치) 
         max-w-7xl 유지하되 사이드바 제거
      */}
      <div className="flex flex-col">
        {/* 1. 상단 탭 메뉴 (Sticky Navigation) */}
        {/* sticky top-0: 스크롤 내려도 상단에 고정됨 */}
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            {/* scrollbar-hide: 가로 스크롤바 숨김 */}
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((t) => (
                <Link
                  key={t.slug}
                  href={`/intro/${t.slug}`}
                  className={`
                    whitespace-nowrap py-4 px-4 md:px-6 text-sm md:text-[15px] font-bold border-b-2 transition-all duration-200
                    ${
                      currentTab === t.slug
                        ? "border-blue-600 text-blue-600" // 선택됨: 파란색 밑줄 + 글씨
                        : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50" // 기본
                    }
                  `}
                >
                  {t.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 2. 본문 영역 */}
        {/* 사이드바가 없으므로 중앙 정렬 및 여백 확보 */}
        <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20 animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
}
