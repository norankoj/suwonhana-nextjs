"use client";

import React from "react";
import IntroPageHeader from "@/components/IntroPageHeader";

// 주일예배 행 (이름 좌 | 시간 우)
const SundayRow = ({
  name,
  schedule,
  place,
}: {
  name: string;
  schedule: string;
  place?: string;
}) => (
  <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
    <div>
      <p className="font-bold text-slate-900 text-base">{name}</p>
      {place && <p className="text-sm text-slate-500 mt-0.5">{place}</p>}
    </div>
    <p className="text-2xl font-bold text-slate-900 tabular-nums shrink-0 ml-6">{schedule}</p>
  </div>
);

// 이미지 카드형 (다음세대용)
const ServiceCard = ({
  image,
  name,
  englishName,
  schedule,
  place,
}: {
  image: string;
  name: string;
  englishName: string;
  schedule: string;
  place?: string;
}) => (
  <div>
    <div className="w-full aspect-[4/3] overflow-hidden rounded-sm bg-slate-100 mb-4">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
    <p className="font-bold text-slate-900 text-base leading-snug">{name}</p>
    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mt-1 mb-2">
      {englishName}
    </p>
    <p className="text-sm text-slate-700">{schedule}</p>
    {place && <p className="text-sm text-slate-500 mt-0.5">{place}</p>}
  </div>
);

export default function WorshipPage() {
  return (
    <div className="bg-white pb-32 font-sans">
      <IntroPageHeader label="Worship Guide" title="예배 안내" />

      <div className="animate-fade-in max-w-content mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16">

        {/* 주일예배 + 멤버십/온라인 — 2열 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* 좌: 주일 예배 */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">주일 예배</h3>
            <div className="border-t border-slate-200">
              <SundayRow name="주일 1부" schedule="09:00" place="본당 2층 대예배실" />
              <SundayRow name="주일 2부" schedule="11:00" place="본당 2층 대예배실" />
              <SundayRow name="주일 3부" schedule="14:30" place="본당 2층 대예배실 · 청년 및 일반" />
            </div>
            <p className="mt-4 text-sm text-slate-500 break-keep">
              모든 주일 예배는 자녀들과 함께 드리며, '복음과 구원'에 초점을 맞추어 드려집니다.
            </p>
          </div>

          {/* 우: 멤버십 예배 + 온라인 예배 */}
          <div className="space-y-8">
            {/* 멤버십 예배 */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">멤버십 예배</h3>
              <div className="border-t border-slate-200">
                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-bold text-slate-900 text-base">금요 예배</p>
                    <p className="text-sm text-slate-500 mt-0.5">본당 2층 대예배실</p>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 tabular-nums shrink-0 ml-6">금 21:00</p>
                </div>
              </div>
            </div>

            {/* 온라인 예배 */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">온라인 예배</h3>
              <div className="border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-500 mb-4">모든 공예배 유튜브 실시간 중계</p>
                <a
                  href="https://youtube.com/@수원하나교회"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF0000] text-white text-sm font-semibold rounded hover:opacity-90 transition-opacity"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/>
                  </svg>
                  유튜브 채널 바로가기
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 다음세대 예배 — 이미지 카드형 */}
        <section>
          <h3 className="text-xl font-bold text-slate-900 mb-8">다음세대 예배</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <ServiceCard
              image="/images/temp01.jpg"
              name="영아부 (조이베이비)"
              englishName="Infant Ministry"
              schedule="주일 오전 9시 30분"
              place="NGC 지하예배실 · 36개월 미만 + 부모님"
            />
            <ServiceCard
              image="/images/temp02.jpg"
              name="유치부 (조이코너)"
              englishName="Kids Corner"
              schedule="주일 오후 1시"
              place="본당 2층 · 36개월 이상 미취학 + 부모님"
            />
            <ServiceCard
              image="/images/temp03.jpg"
              name="초등부 (조이랜드)"
              englishName="Joyland"
              schedule="화요일 오후 7시"
              place="NGC 지하예배실 · 초등학생"
            />
            <ServiceCard
              image="/images/worship01.png"
              name="중고등부 (YCM)"
              englishName="Youth Church Ministry"
              schedule="주일 오후 4시 30분"
              place="본당 2층 · 청소년"
            />
          </div>
        </section>

      </div>
    </div>
  );
}
