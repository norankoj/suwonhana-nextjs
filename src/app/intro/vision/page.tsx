"use client";

import React from "react";
import { vision } from "@/data/data";

export default function VisionPage() {
  // 지그재그 레이아웃용 서브 이미지 (실제 교회 사진 경로로 교체 필요)
  const visionImages = [
    "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ];

  // 요청하신 성경 구절 매핑 함수
  const getBibleVerse = (index: number) => {
    if (index === 1)
      return "내가 여호와께 청하였던 한 가지 일 곧 그것을 구하리니 곧 나로 내 생전에 여호와의 집에 거하여 여호와의 아름다움을 앙망하며 그 전에서 사모하게 하실 것이라 (시편 27:4)";
    if (index === 2)
      return "그러므로 너희는 가서 모든 족속으로 제자를 삼아 아버지와 아들과 성령의 이름으로 침례를 주고 내가 너희에게 분부한 모든 것을 가르쳐 지키게 하라 볼지어다 내가 세상 끝날까지 너희와 항상 함께 있으리라 하시니라 (마태복음 28:19~20)";
    if (index === 3)
      return "너희가 외인도 아니요 손도 아니요 오직 성도들과 동일한 시민이요 하나님의 권속(가족)이라 (에베소서 2:19)";
    return "";
  };

  return (
    <div className="bg-white pb-32">
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center border-b border-slate-100">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] mb-6">
          Vision Statement
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.45] tracking-normal">
          하나님을 즐거워하고
          <br className="hidden md:block" />그 분의 목적에 헌신하는 공동체
        </h1>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex flex-col gap-24 md:gap-32">
          {vision?.map((item: any, idx: number) => {
            const index = idx + 1;

            const mainText = item.desc;
            const bibleVerse = getBibleVerse(index);

            // 짝수는 사진 왼쪽, 홀수는 사진 오른쪽
            const isEven = idx % 2 === 0;

            return (
              <div
                key={`vision-${idx}`}
                className={`flex flex-col md:flex-row gap-10 md:gap-16 items-center ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* 이미지 영역 */}
                <div className="w-full md:w-1/2">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 rounded-lg">
                    <img
                      src={visionImages[idx % visionImages.length]}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>

                {/* 텍스트 영역 */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <span className="text-blue-600 font-bold tracking-widest text-sm mb-4 uppercase">
                    Vision 0{index}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                    {item.title}
                  </h3>

                  {/* 본문 텍스트 (줄바꿈 반영) */}
                  <div className="text-lg text-slate-600 leading-loose text-justify  mb-8 space-y-4">
                    {mainText
                      .split("\n")
                      .map((paragraph: string, pIdx: number) => {
                        if (!paragraph.trim()) return null;
                        return <p key={pIdx}>{paragraph}</p>;
                      })}
                  </div>

                  {/* 요청하신 성경 구절 매핑 (미니멀 인용구 스타일) */}
                  {bibleVerse && (
                    <div className="relative bg-slate-50 rounded-sm p-6 pr-8">
                      <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed text-justify ">
                        "{bibleVerse}"
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
