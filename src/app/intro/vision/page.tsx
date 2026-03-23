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
    (pageData as { heroImageUrl?: string | null }).heroImageUrl ??
    "/images/pastor_ko2.jpg";

  const mainTitleText =
    fields.mainTitle || "하나님을 즐거워하고\n그 분의 목적에 헌신하는 공동체";
  const visionStatementText = fields.visionStatement || "Vision Statement";

  const getImageUrl = (imageField: WPImageField | undefined, fallbackIndex: number) => {
    if (imageField?.node?.sourceUrl) return imageField.node.sourceUrl;
    const fallbacks = [
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ];
    return fallbacks[fallbackIndex];
  };

  const vision: VisionItem[] = [
    {
      title: fields.value1Title || "",
      desc: fields.value1Desc || "",
      verse: fields.value1Verse,
      image: getImageUrl(fields.value1Image, 0),
    },
    {
      title: fields.value2Title || "",
      desc: fields.value2Desc || "",
      verse: fields.value2Verse,
      image: getImageUrl(fields.value2Image, 1),
    },
    {
      title: fields.value3Title || "",
      desc: fields.value3Desc || "",
      verse: fields.value3Verse,
      image: getImageUrl(fields.value3Image, 2),
    },
  ].filter((item) => item.title);

  return (
    <div className="bg-white pb-32">
      {/* 히어로 섹션 - 단체 사진 풀블리드 */}
      <section className="relative w-full h-screen md:h-[90vh] min-h-[500px] overflow-hidden bg-slate-900">
        <img
          src={heroImageUrl}
          alt="수원하나교회 공동체"
          className="w-full h-full object-cover object-center opacity-70"
        />
        {/* 그라데이션: 하단 왼쪽 강조 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        {/* 텍스트: 좌하단 배치 */}
        <div className="absolute bottom-0 left-0 right-0 px-8 sm:px-12 lg:px-20 pb-14 md:pb-20 max-w-content">
          <p className="text-[11px] md:text-xs font-bold tracking-[0.35em] text-white/60 uppercase mb-4">
            Vision
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight break-keep">
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
      <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="flex flex-col gap-20 md:gap-32">
          {vision.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={`vision-${idx}`}
                className={`flex flex-col md:flex-row gap-10 md:gap-16 items-center ${isEven ? "" : "md:flex-row-reverse"}`}
              >
                {/* 이미지 */}
                <div className="w-full md:w-1/2 aspect-[4/3] overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
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
