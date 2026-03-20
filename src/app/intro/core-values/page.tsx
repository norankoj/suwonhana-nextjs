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
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] mb-6">
          {valueStatementText}
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.45] tracking-normal mb-8">
          {mainTitle}
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium break-keep whitespace-pre-wrap">
          {subDesc}
        </p>
      </section>

      {/* 2. 핵심가치 아코디언 리스트 */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
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
