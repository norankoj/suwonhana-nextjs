import React from "react";
import type { Metadata } from "next";
import CoreValueAccordion from "./CoreValueAccordion";
import type { CoreValueItem } from "@/lib/types";
import { fetchCoreValuesData } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "핵심가치",
  description: "수원하나교회가 중요하게 여기는 12가지 핵심가치",
};

export default async function CoreValuesPage() {
  const pageData = await fetchCoreValuesData();

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        워드프레스 데이터를 불러올 수 없습니다. GraphQL 설정을 확인해 주세요.
      </div>
    );
  }

  const fields = pageData.coreValueFields || {};

  const valueStatementText = fields.valueStatement || "Value Statement";
  const mainTitle = fields.mainTitle || "핵심가치들";
  const subDesc =
    fields.subDesc ||
    "수원하나교회는 다음의 12가지 가치들을 중요하게 여깁니다.";
  const part1Title = fields.part1Title || "Part 1. 6가지 핵심가치";
  const part2Title = fields.part2Title || "Part 2. 6가지 핵심가치";

  const buildCoreValues = (startIdx: number, count: number): CoreValueItem[] => {
    const result: CoreValueItem[] = [];
    for (let i = startIdx; i < startIdx + count; i++) {
      const title = fields[`value${i}Title`];
      if (title) {
        result.push({
          title,
          sub: fields[`value${i}Sub`] || "",
          desc: fields[`value${i}Desc`] || "",
        });
      }
    }
    return result;
  };

  const coreValuePart1 = buildCoreValues(1, 6);
  const coreValuePart2 = buildCoreValues(7, 6);

  return (
    <div className="bg-white pb-32">
      {/* 1. 페이지 헤더 */}
      <section className="bg-white pt-32 md:pt-40 pb-12 md:pb-16 border-b border-slate-100">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">
            {valueStatementText}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.2] tracking-tight break-keep mb-6">
            {mainTitle}
          </h1>
          <p className="text-base md:text-lg text-slate-500 font-medium break-keep whitespace-pre-wrap max-w-2xl mx-auto leading-relaxed">
            {subDesc}
          </p>
        </div>
      </section>

      {/* 2. 핵심가치 아코디언 리스트 */}
      <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
        {/* Part 1 */}
        {coreValuePart1.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-lg font-bold text-slate-900 tracking-widest uppercase">
                {part1Title}
              </h2>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            <div className="border-t border-slate-900">
              {coreValuePart1.map((item, idx) => (
                <CoreValueAccordion key={idx} item={item} index={idx + 1} />
              ))}
            </div>
          </div>
        )}

        {/* Part 2 */}
        {coreValuePart2.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-lg font-bold text-slate-900 tracking-widest uppercase">
                {part2Title}
              </h2>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            <div className="border-t border-slate-900">
              {coreValuePart2.map((item, idx) => (
                <CoreValueAccordion
                  key={idx}
                  item={item}
                  index={coreValuePart1.length + idx + 1}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
