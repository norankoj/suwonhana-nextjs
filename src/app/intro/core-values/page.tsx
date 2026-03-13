"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { coreValuePart1, coreValuePart2 } from "@/data/data";

// --- 아코디언 개별 컴포넌트 ---
const CoreValueAccordion = ({ item, index }: { item: any; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-8 text-left group transition-colors"
      >
        <div className="flex items-center gap-6 md:gap-10">
          {/* 번호 타이포그래피 */}
          <span
            className={`text-3xl md:text-4xl font-light font-serif transition-colors duration-300 ${
              isOpen
                ? "text-blue-600"
                : "text-slate-300 group-hover:text-slate-400"
            }`}
          >
            {index < 10 ? `0${index}` : index}.
          </span>

          {/* 타이틀 및 서브타이틀 */}
          <div>
            <h3
              className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
                isOpen
                  ? "text-blue-600"
                  : "text-slate-900 group-hover:text-blue-600"
              }`}
            >
              {item.title}
            </h3>
            <p className="text-sm md:text-base text-slate-500 font-medium mt-1">
              {item.sub}
            </p>
          </div>
        </div>

        {/* 열기/닫기 아이콘 */}
        <div className="shrink-0 ml-4">
          {isOpen ? (
            <ChevronUp className="text-blue-600" size={24} />
          ) : (
            <ChevronDown
              className="text-slate-300 group-hover:text-blue-600 transition-colors"
              size={24}
            />
          )}
        </div>
      </button>

      {/* 펼쳐지는 본문 영역 */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 pb-8"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="bg-slate-50 rounded-xl p-6 md:p-10 ml-0 md:ml-[5.5rem]">
            {/* 🔥 글씨 크기(text-sm md:text-base) 및 문단 간격(space-y-8) 축소 🔥 */}
            <div className="text-sm md:text-base text-slate-700 leading-loose break-keep space-y-8">
              {/* 1. 엔터 두 번(\n\n)을 기준으로 큰 문단 블록을 나눕니다 */}
              {item.desc.split(/\n\s*\n/).map((block: string, bIdx: number) => {
                if (!block.trim()) return null;

                // 2. 블록 안에서 엔터 한 번(\n)을 기준으로 줄을 나눕니다
                const lines = block
                  .split("\n")
                  .filter((line: string) => line.trim() !== "");
                if (lines.length === 0) return null;

                const titleLine = lines[0];
                const descLines = lines.slice(1);

                return (
                  <div key={bIdx} className="space-y-2">
                    <strong className="block text-slate-900 font-bold text-base md:text-md leading-snug">
                      {titleLine.trim()}
                    </strong>

                    {/* 나머지 부연 설명들 */}
                    {descLines.map((line: string, lIdx: number) => (
                      <p key={lIdx} className="text-slate-600 text-base">
                        {line.trim()}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CoreValuesPage() {
  return (
    <div className="bg-white pb-32">
      {/* 1. 페이지 헤더 */}
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] mb-6">
          Value Statement
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.45] tracking-normal mb-8">
          핵심가치들
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium break-keep">
          수원하나교회는 다음의 12가지 가치들을 중요하게 여깁니다.
        </p>
      </section>

      {/* 2. 핵심가치 아코디언 리스트 */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        {/* Part 1 */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-lg font-bold text-slate-900 tracking-widest uppercase">
              Part 1. 6가지 핵심가치
            </h2>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          <div className="border-t border-slate-900">
            {coreValuePart1.map((item: any, idx: number) => (
              <CoreValueAccordion key={idx} item={item} index={idx + 1} />
            ))}
          </div>
        </div>

        {/* Part 2 */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-lg font-bold text-slate-900 tracking-widest uppercase">
              Part 2. 6가지 핵심가치
            </h2>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          <div className="border-t border-slate-900">
            {coreValuePart2.map((item: any, idx: number) => (
              <CoreValueAccordion
                key={idx}
                item={item}
                index={coreValuePart1.length + idx + 1}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
