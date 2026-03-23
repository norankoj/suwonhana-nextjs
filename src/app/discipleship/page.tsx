import React from "react";
import type { Metadata } from "next";
import { fetchTrainingData } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "훈련",
  description: "수원하나교회 훈련 과정 소개 — 새로운삶부터 수요훈련까지, 예수 그리스도의 제자로 자라가는 여정입니다.",
};

/* ─────────────────────────────
   데이터
───────────────────────────── */
const JOURNEY = [
  { name: "새로운 삶", desc: "새가족을 위한 첫 번째 과정. 신앙의 기초와 교회 공동체를 소개합니다." },
  { name: "제자의 삶", desc: "말씀과 기도, 전도와 교제를 통해 예수님의 제자로 세워지는 과정입니다." },
  { name: "수요 훈련", desc: "봄·가을 학기제로 운영되는 심화 훈련. 셀리더와 상의 후 선택해 수강하실 수 있습니다." },
];

const COURSES: { title: string; label: string | null; group: "foundation" | "life" }[] = [
  { title: "창조주를\n소개합니다!", label: "초신자 과정", group: "foundation" },
  { title: "성경적\n세계관",        label: null,          group: "foundation" },
  { title: "말씀의삶\n(구약)",      label: null,          group: "life" },
  { title: "말씀의삶\n(신약)",      label: null,          group: "life" },
  { title: "증인의 삶",             label: null,          group: "life" },
  { title: "목자의 삶",             label: null,          group: "life" },
  { title: "변화의 삶",             label: null,          group: "life" },
  { title: "하나님을\n경험하는 삶", label: null,          group: "life" },
];

/* ─────────────────────────────
   타이틀 컴포넌트
───────────────────────────── */
/** 훈련 과정 / 훈련 과목 — 큰 타이틀, 가운데 정렬, 짧은 선 */
function BigSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{children}</h2>
      <div className="w-12 h-[2px] bg-slate-300 mx-auto" />
    </div>
  );
}

/** 수요 훈련 / 일정 안내 — 작은 타이틀, 좌측 정렬 */
function SmallSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-extrabold text-slate-900 mb-1">{children}</h2>
    </div>
  );
}

/* ─────────────────────────────
   Page
───────────────────────────── */
export default async function DiscipleshipPage() {
  const { heroImageUrl } = await fetchTrainingData();
  const finalHeroImage = heroImageUrl ?? "/images/pastor_ko2.jpg";

  return (
    <div className="bg-white pb-32 font-sans">

      {/* ── 히어로 ── */}
      <div className="relative w-full h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        {finalHeroImage ? (
          <img
            src={finalHeroImage}
            alt="수원하나교회 훈련"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 w-full max-w-content mx-auto px-6 pb-14 md:pb-20">
          <p className="text-white/60 text-sm font-medium tracking-[0.2em] uppercase mb-3">
            Discipleship Training
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            훈련
          </h1>
        </div>
      </div>

      <div className="animate-fade-in max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pt-20 md:pt-28">

        {/* ── 훈련 과정 ── */}
        <section>
          <BigSectionTitle>훈련 과정</BigSectionTitle>
          <div className="flex flex-col md:flex-row">
            {JOURNEY.map((item, i) => (
              <React.Fragment key={item.name}>
                <div className="flex-1 py-8 md:py-0 md:px-4 first:md:pl-0 last:md:pr-0">
                  <div className="border border-slate-200 rounded-2xl px-6 py-7 h-full hover:border-slate-400 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-default">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 leading-tight">{item.name}</h3>
                    <p className="text-base text-slate-500 leading-relaxed break-keep">{item.desc}</p>
                  </div>
                </div>
                {i < JOURNEY.length - 1 && (
                  <div className="flex md:flex-col items-center justify-center md:py-0 py-2 md:px-2 shrink-0">
                    <svg className="block md:hidden w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                    <svg className="hidden md:block w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* ── 수요 훈련 안내 ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <SmallSectionTitle>수요 훈련</SmallSectionTitle>
            <div className="border-t border-slate-200">
              {[
                { label: "봄학기",   value: "3월 — 5월" },
                { label: "가을학기", value: "9월 — 12월" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-slate-100">
                  <p className="font-bold text-slate-900 text-base">{label}</p>
                  <p className="text-slate-600 text-base tabular-nums">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SmallSectionTitle>일정 안내</SmallSectionTitle>
            <div className="border-t border-slate-200">
              {[
                { label: "일시", value: "매주 수요일 저녁 8시" },
                { label: "장소", value: "2층 본당, 중예배실 및 소그룹실" },
                { label: "대상", value: "제자의 삶을 수료하고 훈련을 듣기 희망하는 수원하나교회 성도" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between py-3 border-b border-slate-100 gap-8">
                  <p className="font-bold text-slate-900 text-base shrink-0">{label}</p>
                  <p className="text-slate-600 text-sm text-right break-keep">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 훈련 과목 ── */}
        <section>
          <BigSectionTitle>훈련 과목</BigSectionTitle>
          <p className="text-sm text-slate-400 text-center -mt-6 mb-10">
            매 학기 개설 과목은 교회 공지를 통해 안내됩니다.
          </p>
          {/* 책 표지 그리드 — 4열 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {COURSES.map((course) => (
              <div
                key={course.title}
                className={`relative aspect-[1/1.45] flex flex-col justify-end overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-default ${
                  course.group === "foundation"
                    ? "bg-amber-800"
                    : "bg-slate-800"
                }`}
              >
                {/* 책 등(spine) 강조선 */}
                <div className={`absolute top-0 left-0 w-[6px] h-full ${
                  course.group === "foundation" ? "bg-amber-600" : "bg-slate-600"
                }`} />
                {/* 상단 장식선 */}
                <div className={`absolute top-5 left-5 right-5 h-px ${
                  course.group === "foundation" ? "bg-amber-600/60" : "bg-slate-500/60"
                }`} />
                {/* 타이틀 영역 */}
                <div className="px-5 pb-5 pt-3">
                  <p className="text-white font-extrabold text-base md:text-lg leading-snug break-keep whitespace-pre-line">
                    {course.title}
                  </p>
                  {course.label && (
                    <p className={`text-xs mt-1.5 ${
                      course.group === "foundation" ? "text-amber-300/80" : "text-slate-400"
                    }`}>{course.label}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
