import React from "react";
import type { Metadata } from "next";
import type { VisionItem, WPImageField } from "@/lib/types";
import { fetchVisionData } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "비전",
  description: "수원하나교회의 비전 — 하나님을 즐거워하고 그 분의 목적에 헌신하는 공동체",
};

export default async function VisionPage() {
  const pageData = await fetchVisionData();

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        워드프레스 데이터를 불러올 수 없습니다. GraphQL 엔드포인트와 필드명을
        확인해 주세요.
      </div>
    );
  }

  const fields = pageData.visionFields || {};
  const heroImageUrl =
    (pageData as { heroImageUrl?: string | null }).heroImageUrl ?? "";

  const mainTitleText =
    fields.mainTitle || "하나님을 즐거워하고\n그 분의 목적에 헌신하는 공동체";
  const visionStatementText = fields.visionStatement || "Vision Statement";

  const getImageUrl = (imageField: WPImageField | undefined) => {
    return imageField?.node?.sourceUrl ?? "";
  };

  const vision: VisionItem[] = [
    {
      title: fields.value1Title || "",
      desc: fields.value1Desc || "",
      verse: fields.value1Verse,
      image: getImageUrl(fields.value1Image),
    },
    {
      title: fields.value2Title || "",
      desc: fields.value2Desc || "",
      verse: fields.value2Verse,
      image: getImageUrl(fields.value2Image),
    },
    {
      title: fields.value3Title || "",
      desc: fields.value3Desc || "",
      verse: fields.value3Verse,
      image: getImageUrl(fields.value3Image),
    },
  ].filter((item) => item.title);

  return (
    <div className="bg-white pb-32">
      {/* 히어로 섹션 - 단체 사진 풀블리드 */}
      <section className="relative w-full h-screen md:h-[90vh] min-h-[500px] overflow-hidden bg-slate-900">
        {heroImageUrl && (
          <img
            src={heroImageUrl}
            alt="수원하나교회 공동체"
            className="w-full h-full object-cover object-center opacity-70"
          />
        )}
        {/* 그라데이션: 하단 왼쪽 강조 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        {/* 텍스트: 좌하단 배치 */}
        <div className="absolute bottom-0 left-0 right-0 px-8 sm:px-12 lg:px-20 pb-14 md:pb-20 max-w-content">
          <p className="text-[11px] md:text-xs font-bold tracking-[0.35em] text-white/60 uppercase mb-4">
            Vision
          </p>
          <h1 className="text-3xl/[1.4] md:text-5xl/[1.4] lg:text-6xl/[1.4] font-extrabold text-white break-keep">
            {mainTitleText
              .split(/<br\s*\/?>|\n/i)
              .map((line: string, i: number, array: string[]) => (
                <React.Fragment key={i}>
                  {line.trim()}
                  {i < array.length - 1 && <br />}
                </React.Fragment>
              ))}
          </h1>
          {visionStatementText && visionStatementText !== "Vision Statement" && (
            <p className="mt-5 text-sm md:text-base text-white/70 font-medium max-w-xl leading-relaxed">
              {visionStatementText}
            </p>
          )}
        </div>
      </section>

      {/* Vision 항목들 */}
      <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col gap-20 md:gap-32">
          {vision.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={`vision-${idx}`}
                className={`flex flex-col md:flex-row gap-10 md:gap-16 items-center ${isEven ? "" : "md:flex-row-reverse"}`}
              >
                {/* 이미지 */}
                <div className="w-full md:w-1/2 aspect-[4/3] overflow-hidden bg-slate-200 shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* 텍스트 패널 */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight break-keep tracking-tight mb-6">
                    {item.title}
                  </h3>
                  <div className="text-slate-600 text-base md:text-lg leading-loose space-y-4 mb-8">
                    {(item.desc || "")
                      .split("\n")
                      .filter((p: string) => p.trim())
                      .map((p: string, i: number) => (
                        <p key={i}>{p}</p>
                      ))}
                  </div>
                  <hr className="border-slate-200 mb-8" />
                  {item.verse && (
                    <div className="text-slate-500 text-sm md:text-base leading-relaxed space-y-1">
                      {item.verse
                        .split("\n")
                        .filter((l: string) => l.trim())
                        .map((line: string, i: number) => (
                          <p key={i}>{line}</p>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
