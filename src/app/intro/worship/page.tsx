"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import IntroPageHeader from "@/components/IntroPageHeader";

// 라인형 → PC에서 3열 카드로 전환 (주일 예배용)
const ServiceRow = ({
  name,
  englishName,
  schedule,
  place,
}: {
  name: string;
  englishName: string;
  schedule: string;
  place?: string;
}) => (
  <div className="py-5 border-b border-slate-100 last:border-0 md:border-b-0 md:border-l md:first:border-l-0 md:pl-8 md:first:pl-0 md:py-0">
    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-2">
      {englishName}
    </p>
    <p className="font-bold text-slate-900 text-lg mb-1">{name}</p>
    <p className="text-3xl font-bold text-slate-900 tabular-nums mb-2">{schedule}</p>
    {place && <p className="text-sm text-slate-500">{place}</p>}
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
        {/* 주일 예배 — 모바일: 세로 라인, PC: 3열 나란히 */}
        <section>
          <h3 className="text-xl font-bold text-slate-900 mb-2 md:mb-8">주일 예배</h3>
          <div className="border-t border-slate-200 md:border-t-0 md:flex md:gap-0">
            <ServiceRow
              name="주일 1부"
              englishName="Sunday Worship"
              schedule="09:00"
              place="본당 2층 대예배실"
            />
            <ServiceRow
              name="주일 2부"
              englishName="Sunday Worship"
              schedule="11:00"
              place="본당 2층 대예배실"
            />
            <ServiceRow
              name="주일 3부"
              englishName="Sunday Worship"
              schedule="14:30"
              place="본당 2층 대예배실 · 청년 및 일반"
            />
          </div>
          <p className="mt-6 text-sm text-slate-500 break-keep">
            모든 주일 예배는 자녀들과 함께 드리며, '복음과 구원'에 초점을 맞추어 드려집니다.
          </p>
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

        {/* 멤버십 예배 */}
        <section>
          <h3 className="text-xl font-bold text-slate-900 mb-8">멤버십 예배</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {/* 금요 예배 */}
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-2">
                Friday Worship Service
              </p>
              <p className="font-bold text-slate-900 text-lg mb-1">금요 예배</p>
              <p className="text-sm text-slate-500">금요일 오후 9시</p>
              <p className="text-sm text-slate-500">본당 2층 대예배실</p>
            </div>

            {/* 온라인 예배 */}
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-2">
                Online Worship
              </p>
              <p className="font-bold text-slate-900 text-lg mb-1">온라인 예배</p>
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
        </section>
      </div>
    </div>
  );
}
