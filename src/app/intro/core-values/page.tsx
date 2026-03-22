import React from "react";
import type { Metadata } from "next";
import CoreValueGrid from "./CoreValueGrid";
import IntroPageHeader from "@/components/IntroPageHeader";
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
      <IntroPageHeader label={valueStatementText} title={mainTitle} />
      {subDesc && (
        <p className="text-base md:text-lg text-slate-500 font-medium break-keep whitespace-pre-wrap max-w-2xl mx-auto leading-relaxed text-center px-4 -mt-8 mb-12">
          {subDesc}
        </p>
      )}

      {/* 2. 핵심가치 그리드 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <CoreValueGrid
          part1Title={part1Title}
          part2Title={part2Title}
          part1Items={coreValuePart1}
          part2Items={coreValuePart2}
        />
      </section>
    </div>
  );
}
