import React from "react";
import type { Metadata } from "next";
import CoreValueGrid from "./CoreValueGrid";
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
  const heroImageUrl =
    (pageData as { heroImageUrl?: string | null }).heroImageUrl ??
    "/images/worship01.png";

  const valueStatementText = fields.valueStatement || "Core Values";
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
      {/* 1. 히어로 섹션 */}
      <section className="relative w-full h-screen md:h-[90vh] min-h-[500px] overflow-hidden bg-slate-900">
        <img
          src={heroImageUrl}
          alt="수원하나교회 핵심가치"
          className="w-full h-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-8 sm:px-12 lg:px-20 pb-14 md:pb-20 max-w-content">
          <p className="text-[11px] md:text-xs font-bold tracking-[0.35em] text-white/60 uppercase mb-4">
            {valueStatementText}
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight break-keep">
            {mainTitle.split(/<br\s*\/?>|\n/i).map((line: string, i: number, arr: string[]) => (
              <React.Fragment key={i}>
                {line.trim()}
                {i < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          {subDesc && (
            <p className="mt-5 text-sm md:text-base text-white/70 font-medium max-w-xl leading-relaxed">
              {subDesc}
            </p>
          )}
        </div>
      </section>

      {/* 2. 핵심가치 그리드 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
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
