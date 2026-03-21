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
      {/* 히어로 섹션 */}
      <section className="bg-slate-900 pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-6">
            {visionStatementText}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-[1.2] tracking-tight break-keep">
            {mainTitleText
              .split(/<br\s*\/?>|\n/i)
              .map((line: string, i: number, array: string[]) => (
                <React.Fragment key={i}>
                  {line.trim()}
                  {i < array.length - 1 && <br />}
                </React.Fragment>
              ))}
          </h1>
        </div>
      </section>

      {/* Vision 항목들 */}
      <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 mt-24 md:mt-32">
        <div className="flex flex-col gap-24 md:gap-36">
          {vision.map((item, idx) => {
            const index = idx + 1;
            const mainText = item.desc || "";
            const isEven = idx % 2 === 0;

            return (
              <div
                key={`vision-${idx}`}
                className={`flex flex-col md:flex-row gap-10 md:gap-20 items-center ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                <div className="w-full md:w-1/2">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 rounded-3xl shadow-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <div className="w-10 h-1 bg-blue-600 mb-6 rounded-full"></div>
                  <span className="text-blue-600 font-bold tracking-widest text-xs mb-3 uppercase font-mono">
                    Vision 0{index}
                  </span>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-8 leading-tight break-keep tracking-tight">
                    {item.title}
                  </h3>

                  <div className="text-base md:text-lg text-slate-600 leading-loose text-justify mb-8 space-y-4">
                    {mainText
                      .split("\n")
                      .map((paragraph: string, pIdx: number) => {
                        if (!paragraph.trim()) return null;
                        return <p key={pIdx}>{paragraph}</p>;
                      })}
                  </div>

                  {item.verse && (
                    <div className="border-l-2 border-slate-200 pl-6 py-1">
                      <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed whitespace-pre-wrap italic">
                        &ldquo;{item.verse}&rdquo;
                      </p>
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
