"use client";

import React from "react";
import { HeroSub } from "@/components/Common";
import { groups } from "@/data/data"; // 기존 데이터 연동

export default function CommunityPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      {/* 1. 상단 히어로 영역 */}
      <HeroSub title="공동체" subtitle="우리가 함께 세워가는 하나님 나라" />

      {/* 2. 본문 영역 (빛의 군대 -> 여호수아 -> 모세 -> EM 순차 노출) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24 space-y-32">
        {groups.map((group, groupIdx) => (
          <section key={groupIdx} className="animate-fade-in">
            {/* 카테고리 타이틀 (예: 빛의 군대) */}
            <div className="mb-12 flex flex-col items-center text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                {group.subtitle}
              </h2>
              <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
            </div>

            {/* 개별 부서 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-slate-100"
                >
                  {/* 카드 상단 이미지 */}
                  <div className="aspect-[4/3] relative overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* 연령대 뱃지 (왼쪽 위) */}
                    {item.age && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                        {item.age}
                      </div>
                    )}
                  </div>

                  {/* 카드 하단 텍스트 정보 */}
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <div className="mb-4">
                      {/* 영문 이름 */}
                      {item?.eng && (
                        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-1 block">
                          {item?.eng}
                        </span>
                      )}
                      {/* 부서 이름 */}
                      <h3 className="text-2xl font-bold text-slate-900">
                        {item.name}
                      </h3>
                    </div>

                    {/* 부제 (파란색 강조) */}
                    {item.sub && (
                      <p className="text-sm font-semibold text-blue-600 mb-4 leading-relaxed break-keep">
                        {item.sub}
                      </p>
                    )}

                    {/* 상세 설명 (4줄까지만 보이고 자름) */}
                    <p className="text-[15px] text-slate-600 leading-relaxed break-keep line-clamp-4 mt-auto">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
