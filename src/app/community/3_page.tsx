"use client";

import React from "react";
import { HeroSub } from "@/components/Common";
import { groups } from "@/data/data";

export default function CommunityPage() {
  return (
    <div className="bg-white min-h-screen pb-32 font-sans text-black selection:bg-black selection:text-white">
      {/* 1. 상단 히어로 영역 */}
      <HeroSub title="COMMUNITY" />

      {/* 2. 본문 영역 */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-32 space-y-32 md:space-y-48">
        {groups.map((group, groupIdx) => (
          <section
            key={groupIdx}
            className="animate-fade-in border-t-4 border-black pt-8 md:pt-16"
          >
            {/* 카테고리 타이틀 (초거대 폰트 적용) */}
            <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end">
              <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter uppercase leading-none">
                {group.subtitle}
              </h2>
              <span className="text-sm font-bold tracking-[0.3em] text-gray-400 mt-6 md:mt-0 uppercase">
                Section 0{groupIdx + 1}
              </span>
            </div>

            {/* 타이포그래피 호버 리스트 */}
            <div className="border-t border-black">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  // 🔥 핵심: 마우스를 올리면 배경이 검은색, 글씨가 흰색으로 반전됩니다.
                  className="group border-b border-black py-10 md:py-16 flex flex-col lg:flex-row justify-between items-start gap-8 md:gap-16 hover:bg-black hover:text-white transition-colors duration-500 px-4 md:px-8 -mx-4 md:-mx-8"
                >
                  {/* [좌측] 거대한 부서명 */}
                  <div className="w-full lg:w-[45%] flex flex-col">
                    <span className="text-xs font-bold tracking-widest text-gray-500 group-hover:text-gray-400 uppercase mb-4 transition-colors duration-500">
                      {item.age} {"eng" in item && item.eng ? `| ${item.eng}` : ""}
                    </span>
                    <h3 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter break-keep leading-none">
                      {item.name}
                    </h3>
                  </div>

                  {/* [우측] 부제, 숨겨진 이미지, 설명 */}
                  <div className="w-full lg:w-[55%] flex flex-col justify-center">
                    {/* 부제 (슬로건) */}
                    {item.sub && (
                      <p className="text-xl md:text-2xl font-medium mb-8 leading-snug break-keep text-gray-800 group-hover:text-white transition-colors duration-500">
                        {item.sub}
                      </p>
                    )}

                    {/* 🔥 아코디언 이미지 (PC: 마우스 올리면 스르륵 열림 / 모바일: 항상 노출) */}
                    <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]">
                      <div className="overflow-hidden">
                        <div className="pb-8">
                          <img
                            src={item.img}
                            alt={item.name}
                            // 사진은 완전한 직사각형(비율 21:9의 파노라마)이며, 호버 시 흑백에서 컬러로 변합니다.
                            className="w-full aspect-video md:aspect-[21/9] object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 본문 설명 */}
                    <div className="text-[15px] text-gray-600 group-hover:text-gray-300 leading-loose break-keep space-y-4 transition-colors duration-500">
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
