import React from "react";
import type { Metadata } from "next";
import IntroPageHeader from "@/components/IntroPageHeader";

export const metadata: Metadata = {
  title: "훈련",
  description: "수원하나교회 훈련 과정 소개 — 새로운삶부터 수요훈련까지, 예수 그리스도의 제자로 자라가는 여정입니다.",
};

/* ─────────────────────────────
   데이터
───────────────────────────── */
const JOURNEY = [
  { step: "1", name: "새로운 삶", desc: "새가족을 위한 첫 번째 과정. 신앙의 기초와 교회 공동체를 소개합니다." },
  { step: "2", name: "제자의 삶", desc: "말씀과 기도, 전도와 교제를 통해 예수님의 제자로 세워지는 과정입니다." },
  { step: "3", name: "수요 훈련", desc: "봄·가을 학기제로 운영되는 심화 훈련. 셀리더와 상의 후 선택해 수강하실 수 있습니다." },
];

const BOOKS = [
  { title: "창조주를\n소개합니다!", subtitle: "초신자 과정" },
  { title: "성경적\n세계관", subtitle: "기초 과정" },
  { title: "말씀의 삶\n구약", subtitle: "삶 시리즈" },
  { title: "말씀의 삶\n신약", subtitle: "삶 시리즈" },
  { title: "증인의 삶", subtitle: "삶 시리즈" },
  { title: "목자의 삶", subtitle: "삶 시리즈" },
  { title: "변화의 삶", subtitle: "삶 시리즈" },
  { title: "하나님을\n경험하는 삶", subtitle: "삶 시리즈" },
];

/* ─────────────────────────────
   Book 컴포넌트 (저서 스타일)
───────────────────────────── */
function BookCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col group cursor-default">
      {/* 책 표지 — 저서와 동일한 aspect-[1/1.45] */}
      <div className="relative aspect-[1/1.45] w-full overflow-hidden shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500 mb-4 flex flex-col justify-between bg-slate-900 p-4">
        {/* 등(spine) 세로선 */}
        <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-white/10" />
        {/* 상단 장식 선 */}
        <div className="w-6 h-[2px] bg-white/30" />
        {/* 제목 */}
        <p className="text-white font-bold text-[13px] sm:text-[14px] leading-snug whitespace-pre-line tracking-tight">
          {title}
        </p>
        {/* 하단 */}
        <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">
          {subtitle}
        </p>
      </div>
      {/* 제목 (표지 하단) */}
      <p className="text-[14px] font-bold text-slate-900 leading-snug whitespace-pre-line px-0.5">
        {title}
      </p>
    </div>
  );
}

/* ─────────────────────────────
   Page
───────────────────────────── */
export default function DiscipleshipPage() {
  return (
    <div className="bg-white pb-32 font-sans">
      <IntroPageHeader label="Discipleship Training" title="훈련" />

      <div className="animate-fade-in max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* ── 훈련 여정 ── */}
        <section>
          <h3 className="text-xl font-bold text-slate-900 mb-2">훈련 여정</h3>
          <div className="border-t border-slate-200">
            {JOURNEY.map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-6 py-5 border-b border-slate-100"
              >
                <span className="text-2xl font-black text-slate-200 w-6 shrink-0 leading-none mt-0.5">
                  {item.step}
                </span>
                <div>
                  <p className="font-bold text-slate-900 text-base mb-1">{item.name}</p>
                  <p className="text-sm text-slate-500 leading-relaxed break-keep">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 수요 훈련 안내 ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">수요 훈련</h3>
            <div className="border-t border-slate-200">
              {[
                { label: "봄학기", value: "3월 — 5월" },
                { label: "가을학기", value: "9월 — 12월" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-4 border-b border-slate-100">
                  <p className="font-bold text-slate-900 text-base">{label}</p>
                  <p className="text-slate-600 tabular-nums">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">일정 안내</h3>
              <div className="border-t border-slate-200">
                {[
                  { label: "일시", value: "매주 수요일 저녁 8시" },
                  { label: "장소", value: "본당 2층 대예배실 및 소그룹실" },
                  { label: "대상", value: "등록교인 누구나" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between py-4 border-b border-slate-100">
                    <p className="font-bold text-slate-900 text-base">{label}</p>
                    <p className="text-slate-600 text-right text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 훈련 과목 ── */}
        <section>
          <h3 className="text-xl font-bold text-slate-900 mb-2">훈련 과목</h3>
          <p className="text-sm text-slate-500 mb-10">
            매 학기 개설 과목은 교회 공지를 통해 안내됩니다.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-5 gap-y-10">
            {BOOKS.map((book) => (
              <BookCard key={book.title} title={book.title} subtitle={book.subtitle} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
