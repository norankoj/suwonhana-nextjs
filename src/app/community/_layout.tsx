"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { HeroSub } from "@/components/Common";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const currentTab = params.tab as string;

  const tabs = [
    { slug: "light", name: "빛의 군대" },
    { slug: "joshua", name: "여호수아의 군대" },
    { slug: "moses", name: "모세의 군대" },
    { slug: "em", name: "EM" },
  ];

  return (
    <div className="bg-white min-h-screen">
      <HeroSub
        title="공동체"
        subtitle={tabs.find((t) => t.slug === currentTab)?.name || "빛의 군대"}
      />

      {/* 레이아웃 변경: 사이드바 제거 및 상단 탭 메뉴 적용 */}
      <div className="flex flex-col">
        {/* 1. 상단 탭 메뉴 (Sticky Navigation) */}
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((t) => (
                <Link
                  key={t.slug}
                  href={`/community/${t.slug}`}
                  className={`
                    whitespace-nowrap py-4 px-4 md:px-6 text-sm md:text-[15px] font-bold border-b-2 transition-all duration-200
                    ${
                      currentTab === t.slug
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }
                  `}
                >
                  {t.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 2. 본문 영역 (넓게 사용) */}
        <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20 animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
}
