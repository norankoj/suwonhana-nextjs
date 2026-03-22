"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import IntroPageHeader from "@/components/IntroPageHeader";

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
  <div className="flex gap-5 items-start">
    <div className="w-40 h-28 shrink-0 overflow-hidden rounded-sm bg-slate-100">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="pt-1">
      <p className="font-bold text-slate-900 text-base leading-snug">{name}</p>
      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-1 mb-4">
        {englishName}
      </p>
      <p className="text-sm text-slate-700">{schedule}</p>
      {place && <p className="text-xs text-slate-400 mt-0.5">{place}</p>}
    </div>
  </div>
);

export default function WorshipPage() {
  return (
    <div className="bg-white pb-32 font-sans">
      <IntroPageHeader label="Worship Guide" title="예배 안내" />

      <div className="animate-fade-in max-w-content mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16">
        {/* 주일 예배 */}
        <section>
          <h3 className="text-xl font-bold text-slate-900 mb-8">주일 예배</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <ServiceCard
              image="/images/background02.jpg"
              name="주일 1부"
              englishName="Sunday Worship Service"
              schedule="주일 오전 9시"
              place="본당 2층 대예배실"
            />
            <ServiceCard
              image="/images/background03.jpg"
              name="주일 2부"
              englishName="Sunday Worship Service"
              schedule="주일 오전 11시"
              place="본당 2층 대예배실"
            />
            <ServiceCard
              image="/images/background04.jpg"
              name="주일 3부"
              englishName="Sunday Worship Service"
              schedule="주일 오후 2시 30분"
              place="본당 2층 대예배실 · 청년 및 일반"
            />
          </div>
          <p className="mt-8 text-xs text-slate-400 break-keep">
            모든 주일 예배는 자녀들과 함께 드리며, '복음과 구원'에 초점을 맞추어 드려집니다.
          </p>
        </section>

        {/* 다음세대 예배 */}
        <section>
          <h3 className="text-xl font-bold text-slate-900 mb-8">다음세대 예배</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
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
            <ServiceCard
              image="/images/background01.jpg"
              name="금요 예배"
              englishName="Friday Worship Service"
              schedule="금요일 오후 9시"
              place="본당 2층 대예배실"
            />
            <div className="flex gap-5 items-start">
              <div className="w-40 h-28 shrink-0 overflow-hidden rounded-sm bg-slate-100">
                <img
                  src="/images/corner.jpg"
                  alt="온라인 예배"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-1">
                <p className="font-bold text-slate-900 text-base leading-snug">온라인 예배</p>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-1 mb-4">
                  Online Worship
                </p>
                <p className="text-sm text-slate-700 mb-3">모든 공예배 실시간 중계</p>
                <a
                  href="https://youtube.com/@수원하나교회"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-slate-500 transition-colors"
                >
                  유튜브 채널 바로가기 <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
