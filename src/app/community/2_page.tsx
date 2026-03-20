"use client";

import React from "react";
import { HeroSub } from "@/components/Common";
import { groups } from "@/data/data";

export default function CommunityPage() {
  return (
    <div className="bg-white min-h-screen pb-32 font-sans text-black selection:bg-black selection:text-white">
      {/* 1. 상단 히어로 영역 (초심플) */}
      <HeroSub title="COMMUNITY" subtitle="우리가 함께 세워가는 하나님 나라" />

      {/* 2. 본문 영역 */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-32 space-y-32 md:space-y-48">
        {groups.map((group, groupIdx) => (
          <section key={groupIdx} className="animate-fade-in">
            {/* 그룹 타이틀 (빛의 군대, 여호수아의 군대 등) - 얇고 시크한 라인 */}
            <div className="mb-16 md:mb-24 border-b border-black pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
                {group.subtitle}
              </h2>
              <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
                Suwon Hana Church
              </p>
            </div>

            {/* 개별 부서 리스트 (지그재그 교차 배열) */}
            <div className="space-y-20 md:space-y-32">
              {group.items.map((item, itemIdx) => (
                <div
                  key={item.id}
                  // 🔥 핵심: 짝수/홀수 인덱스에 따라 좌우 배치를 뒤집습니다 (지그재그)
                  className={`flex flex-col gap-8 md:gap-16 lg:gap-24 group ${
                    itemIdx % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  {/* 사진 영역 (모서리 완전 직각, 흑백 호버 효과) */}
                  <div className="w-full md:w-1/2 relative overflow-hidden bg-gray-100 aspect-[4/3] lg:aspect-square">
                    <img
                      src={item.img}
                      alt={item.name}
                      // 마우스 올리면 살짝 확대되면서 흑백 -> 컬러로 변하는 고급스러운 효과
                      className="w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-105"
                    />
                    {/* 연령대 태그 (심플한 블랙 박스) */}
                    {item.age && (
                      <div className="absolute top-0 left-0 bg-black text-white text-xs font-bold px-4 py-2 uppercase tracking-widest">
                        {item.age}
                      </div>
                    )}
                  </div>

                  {/* 텍스트 영역 (여백 극대화, 모노톤) */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center py-4">
                    {/* 영문명 */}
                    {"eng" in item && item.eng && (
                      <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4 block">
                        {"eng" in item ? item.eng : ""}
                      </span>
                    )}

                    {/* 한글 부서명 */}
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-6 tracking-tight leading-tight">
                      {item.name}
                    </h3>

                    {/* 부제 (슬로건) - 다크 그레이 */}
                    {item.sub && (
                      <p className="text-lg md:text-xl font-medium text-gray-800 mb-8 leading-relaxed break-keep">
                        {item.sub}
                      </p>
                    )}

                    {/* 구분선 */}
                    <div className="w-12 h-px bg-black mb-8"></div>

                    {/* 본문 설명 */}
                    <div className="text-[15px] text-gray-600 leading-loose break-keep space-y-4">
                      {item.desc.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
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
