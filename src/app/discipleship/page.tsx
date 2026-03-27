import React from "react";
import type { Metadata } from "next";
import { fetchTrainingData } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "훈련",
  description:
    "수원하나교회 훈련 과정 소개 — 새로운삶부터 수요훈련까지, 예수 그리스도의 제자로 자라가는 여정입니다.",
};

/* ─────────────────────────────
   데이터
───────────────────────────── */
const JOURNEY = [
  {
    name: "새로운 삶",
    desc: "새가족을 위한 첫 번째 과정. 신앙의 기초와 교회 공동체를 소개합니다.",
  },
  {
    name: "제자의 삶",
    desc: "말씀과 기도, 전도와 교제를 통해 예수님의 제자로 세워지는 과정입니다.",
  },
  {
    name: "성경 훈련 학교",
    desc: "봄·가을 학기제로 운영되는 성경 훈련 학교. 셀리더와 상의 후 선택해 수강하실 수 있습니다.",
  },
];

const COURSES: {
  title: string;
  label: string | null;
  req: string | null;
  desc: string | null;
  reqNote?: string;
}[] = [
  {
    title: "창조주를\n소개합니다!",
    label: "초신자 과정",
    req: null,
    desc: null,
  },
  {
    title: "제자의 삶",
    label: null,
    req: "새로운 삶 수료자",
    desc: "말씀과 성령 안에서 예수님의 제자로 세워지는 핵심 성경훈련 과정. 매일 말씀을 공부하고 삶 전체의 변화를 경험하며, '하나님만남수양회'를 통해 하나님을 깊이 만나는 훈련입니다.",
  },
  {
    title: "증인의 삶",
    label: null,
    req: "제자의 삶 수료자",
    desc: "한 영혼을 향한 하나님의 사랑과 열정에 동참하는 전도 훈련. 말씀 묵상과 전도 실습, 중보기도를 통해 복음을 삶으로 전하는 증인의 자리로 세워지는 과정입니다.",
  },
  {
    title: "말씀의삶\n(구약)",
    label: null,
    req: "제자의 삶 수료자",
    desc: "구약성경 전체의 큰 흐름과 각 권의 배경·메시지를 함께 살피는 구약개론 훈련. 창세기부터 선지서까지 스토리라인과 하나님 나라의 역사 속으로 들어가는 과정입니다.",
  },
  {
    title: "말씀의삶\n(신약)",
    label: null,
    req: "제자의 삶 수료자",
    desc: "신약성경 전체의 흐름과 각 권의 메시지를 살피는 신약개론 훈련. 복음서·사도행전·서신서·요한계시록을 통해 예수 그리스도의 사역과 초대교회의 역사를 배우는 과정입니다.",
  },
  {
    title: "변화의 삶",
    label: null,
    req: "제자의 삶 수료자",
    desc: "삶의 실제적 기초가 되는 가치관을 다루는 훈련. 옛 세상 가치관에서 벗어나 하나님 나라의 가치관을 가진 자로 변화되는 과정입니다.",
  },
  {
    title: "목자의 삶",
    label: null,
    req: null,
    desc: null,
  },
  {
    title: "하나님을\n경험하는 삶",
    label: null,
    req: null,
    desc: null,
  },
  {
    title: "성경적\n세계관",
    label: null,
    req: "제자의삶 + 변화의삶 + 말씀의삶(구약·신약) 수료자",
    desc: "근현대 사상과 세계관(세속적 인본주의, 포스트모더니즘, 문화맑시즘 등)을 검토하며 우리가 맞닥뜨린 영적 싸움의 실체를 이해하고 분별하는 심화 훈련입니다.",
    reqNote: undefined,
  },
];

/* ─────────────────────────────
   타이틀 컴포넌트
───────────────────────────── */
/** 훈련 과정 / 훈련 과목 — 큰 타이틀, 가운데 정렬, 짧은 선 */
function BigSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
        {children}
      </h2>
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
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
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-base text-slate-500 leading-relaxed break-keep">
                      {item.desc}
                    </p>
                  </div>
                </div>
                {i < JOURNEY.length - 1 && (
                  <div className="flex md:flex-col items-center justify-center md:py-0 py-2 md:px-2 shrink-0">
                    <svg
                      className="block md:hidden w-5 h-5 text-slate-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    <svg
                      className="hidden md:block w-5 h-5 text-slate-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
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
                { label: "봄학기", value: "3월 — 5월 (12주)" },
                { label: "가을학기", value: "9월 — 12월 (12주)" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-3 border-b border-slate-100"
                >
                  <p className="font-bold text-slate-900 text-base">{label}</p>
                  <p className="text-slate-600 text-base tabular-nums">
                    {value}
                  </p>
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
                {
                  label: "대상",
                  value:
                    "제자의 삶을 수료하고 훈련을 듣기 희망하는 수원하나교회 성도",
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-start justify-between py-3 border-b border-slate-100 gap-8"
                >
                  <p className="font-bold text-slate-900 text-base">{label}</p>
                  <p className="text-slate-600 text-base tabular-nums">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 훈련 과목 ── */}
        <section>
          <BigSectionTitle>훈련 과목</BigSectionTitle>
          <p className="text-sm text-slate-400 text-center -mt-6 mb-12">
            매 학기 개설 과목은 교회 공지를 통해 안내됩니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {COURSES.map((course) => (
              <div
                key={course.title}
                className="flex flex-col bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                {/* 수강요건 변경 공지 */}
                {course.reqNote && (
                  <p className="text-xs text-amber-600 font-medium mb-3 break-keep">
                    ※ {course.reqNote}
                  </p>
                )}
                {/* 제목 */}
                <h4 className="text-xl font-extrabold text-slate-900 leading-snug break-keep whitespace-pre-line mb-2">
                  {course.title}
                </h4>
                {/* 라벨 (초신자 과정 등) */}
                {course.label && (
                  <p className="text-xs text-slate-400 mb-2">{course.label}</p>
                )}
                {/* 설명 */}
                {course.desc && (
                  <p className="text-sm text-slate-500 leading-relaxed break-keep flex-1">
                    {course.desc}
                  </p>
                )}
                {/* 수강요건 태그 */}
                {course.req && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-xs text-slate-400">
                      <span className="font-semibold text-slate-600">
                        수강요건
                      </span>{" "}
                      {course.req}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
