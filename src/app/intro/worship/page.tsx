"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import IntroPageHeader from "@/components/IntroPageHeader";

const ServiceRow = ({
  time,
  name,
  place,
  target,
}: {
  time: string;
  name: string;
  place: string;
  target?: string;
}) => (
  <div className="flex items-start gap-6 py-4">
    <span className="text-2xl font-bold text-slate-900 tabular-nums w-20 shrink-0 leading-tight">
      {time}
    </span>
    <div>
      <p className="font-semibold text-slate-900 text-sm leading-snug">{name}</p>
      <p className="text-xs text-slate-400 mt-0.5">
        {place}
        {target && <span className="ml-2 text-slate-300">·</span>}
        {target && <span className="ml-2">{target}</span>}
      </p>
    </div>
  </div>
);

export default function WorshipPage() {
  return (
    <div className="bg-white pb-32 font-sans">
      <IntroPageHeader label="Worship Guide" title="예배 안내" />

      <div className="animate-fade-in max-w-content mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* 주일 예배 */}
        <section className="mb-16">
          <h3 className="text-xl font-bold text-slate-900 mb-6">주일 예배</h3>
          <div>
            <ServiceRow
              time="09:00"
              name="주일 1부"
              place="본당 2층 대예배실"
              target="전 세대"
            />
            <ServiceRow
              time="11:00"
              name="주일 2부"
              place="본당 2층 대예배실"
              target="전 세대"
            />
            <ServiceRow
              time="14:30"
              name="주일 3부"
              place="본당 2층 대예배실"
              target="청년 및 일반"
            />
          </div>
          <p className="mt-4 text-xs text-slate-400 leading-relaxed break-keep">
            모든 주일 예배는 자녀들과 함께 드리며, '복음과 구원'에 초점을 맞추어 드려집니다.
          </p>
        </section>

        {/* 다음세대 / 멤버십 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* 다음세대 예배 */}
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-6">다음세대 예배</h3>
            <div>
              <ServiceRow
                time="09:30"
                name="영아부 (조이베이비)"
                place="NGC 지하예배실"
                target="36개월 미만 + 부모님"
              />
              <ServiceRow
                time="13:00"
                name="유치부 (조이코너)"
                place="본당 2층"
                target="36개월 이상 미취학 + 부모님"
              />
              <ServiceRow
                time="화 19:00"
                name="초등부 (조이랜드)"
                place="NGC 지하예배실"
                target="초등학생"
              />
              <ServiceRow
                time="16:30"
                name="중고등부 (YCM)"
                place="본당 2층"
                target="청소년"
              />
            </div>
          </section>

          {/* 멤버십 예배 */}
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-6">멤버십 예배</h3>
            <div>
              <ServiceRow
                time="금 21:00"
                name="금요 예배"
                place="본당 2층 대예배실"
                target="전 세대"
              />
            </div>
            <div className="mt-8">
              <p className="text-sm font-semibold text-slate-900 mb-1">온라인 예배</p>
              <p className="text-xs text-slate-400 mb-3">
                모든 공예배는 유튜브를 통해 실시간으로 중계됩니다.
              </p>
              <a
                href="https://youtube.com/@수원하나교회"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 hover:text-slate-500 transition-colors"
              >
                유튜브 채널 바로가기 <ArrowRight size={14} />
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
