import React from "react";
import type { Metadata } from "next";
import { Clock, MapPin, Users, ArrowRight, BookOpen, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "훈련",
  description: "수원하나교회 훈련 과정 소개 — 새로운삶부터 수요훈련까지, 예수 그리스도의 제자로 자라가는 여정입니다.",
};

/* ─────────────────────────────────────────
   훈련 데이터
───────────────────────────────────────── */
const JOURNEY = [
  {
    step: "01",
    name: "새로운 삶",
    en: "New Life",
    desc: "새가족을 위한 첫 번째 과정. 신앙의 기초와 교회 공동체를 소개합니다.",
    color: "from-sky-500 to-blue-600",
    badge: "bg-sky-50 text-sky-700 border-sky-200",
    tag: "새가족",
  },
  {
    step: "02",
    name: "제자의 삶",
    en: "Discipleship",
    desc: "말씀과 기도, 전도와 교제를 통해 예수님의 제자로 세워지는 과정입니다.",
    color: "from-violet-500 to-purple-600",
    badge: "bg-violet-50 text-violet-700 border-violet-200",
    tag: "기초 제자훈련",
  },
  {
    step: "03",
    name: "수요 훈련",
    en: "Wednesday Training",
    desc: "봄·가을 학기제로 운영되는 심화 훈련. 다양한 과정 중 선택 수강합니다.",
    color: "from-amber-500 to-orange-500",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    tag: "심화 과정",
  },
];

const SEMESTER_INFO = [
  { icon: "🌱", label: "봄학기", period: "3월 — 5월", color: "bg-emerald-50 border-emerald-100" },
  { icon: "🍂", label: "가을학기", period: "9월 — 12월", color: "bg-orange-50 border-orange-100" },
];

const BOOKS = [
  {
    id: 1,
    title: "창조주를\n소개합니다!",
    subtitle: "초신자 과정",
    spine: "#E87B35",
    cover: "#FFF4ED",
    text: "#9A3A00",
    dot: "#E87B35",
    tag: "입문",
    desc: "처음 믿음의 길을 걷는 분을 위한 하나님 소개 과정",
    group: null,
  },
  {
    id: 2,
    title: "성경적\n세계관",
    subtitle: "기초 과정",
    spine: "#2563EB",
    cover: "#EFF6FF",
    text: "#1E3A8A",
    dot: "#2563EB",
    tag: "기초",
    desc: "성경의 렌즈로 세상을 바라보는 관점을 정립합니다",
    group: null,
  },
  {
    id: 3,
    title: "말씀의 삶\n구약",
    subtitle: "삶 시리즈",
    spine: "#7C3AED",
    cover: "#F5F3FF",
    text: "#4C1D95",
    dot: "#7C3AED",
    tag: "삶 시리즈",
    desc: "구약 성경을 통해 하나님의 구원 역사를 깊이 탐구합니다",
    group: "life",
  },
  {
    id: 4,
    title: "말씀의 삶\n신약",
    subtitle: "삶 시리즈",
    spine: "#6D28D9",
    cover: "#EDE9FE",
    text: "#4C1D95",
    dot: "#6D28D9",
    tag: "삶 시리즈",
    desc: "신약 성경을 통해 예수 그리스도의 복음을 묵상합니다",
    group: "life",
  },
  {
    id: 5,
    title: "증인의 삶",
    subtitle: "삶 시리즈",
    spine: "#0891B2",
    cover: "#ECFEFF",
    text: "#164E63",
    dot: "#0891B2",
    tag: "삶 시리즈",
    desc: "삶의 현장에서 복음의 증인으로 살아가는 훈련입니다",
    group: "life",
  },
  {
    id: 6,
    title: "목자의 삶",
    subtitle: "삶 시리즈",
    spine: "#059669",
    cover: "#ECFDF5",
    text: "#064E3B",
    dot: "#059669",
    tag: "삶 시리즈",
    desc: "소그룹을 섬기는 목자로 준비되는 리더십 훈련입니다",
    group: "life",
  },
  {
    id: 7,
    title: "변화의 삶",
    subtitle: "삶 시리즈",
    spine: "#DB2777",
    cover: "#FDF2F8",
    text: "#831843",
    dot: "#DB2777",
    tag: "삶 시리즈",
    desc: "성령의 능력으로 삶이 변화되는 은혜를 경험합니다",
    group: "life",
  },
  {
    id: 8,
    title: "하나님을\n경험하는 삶",
    subtitle: "삶 시리즈",
    spine: "#D97706",
    cover: "#FFFBEB",
    text: "#92400E",
    dot: "#D97706",
    tag: "삶 시리즈",
    desc: "일상에서 살아계신 하나님을 경험하는 신앙 훈련입니다",
    group: "life",
  },
];

/* ─────────────────────────────────────────
   Book 컴포넌트
───────────────────────────────────────── */
function BookCard({ book }: { book: (typeof BOOKS)[0] }) {
  return (
    <div className="flex flex-col items-center gap-3 group">
      {/* 책 본체 */}
      <div
        className="relative w-[100px] h-[140px] sm:w-[110px] sm:h-[154px] transition-transform duration-300 group-hover:-translate-y-3 group-hover:scale-105 cursor-pointer"
        style={{ perspective: "600px" }}
      >
        {/* 책 등(spine) */}
        <div
          className="absolute left-0 top-0 w-[14px] h-full rounded-l-sm"
          style={{ backgroundColor: book.spine }}
        />
        {/* 책 표지 */}
        <div
          className="absolute left-[14px] right-0 top-0 h-full rounded-r-sm flex flex-col justify-between p-3 shadow-lg"
          style={{
            backgroundColor: book.cover,
            boxShadow: `3px 3px 12px rgba(0,0,0,0.15), inset -1px 0 0 rgba(0,0,0,0.05)`,
          }}
        >
          {/* 상단 점 장식 */}
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: book.dot, opacity: 0.6 }}
          />
          {/* 제목 */}
          <div className="flex-1 flex items-center px-0.5 py-2">
            <p
              className="text-[11px] sm:text-[12px] font-extrabold leading-snug whitespace-pre-line tracking-tight"
              style={{ color: book.text }}
            >
              {book.title}
            </p>
          </div>
          {/* 하단 시리즈명 */}
          <p
            className="text-[9px] font-bold tracking-wider uppercase opacity-60"
            style={{ color: book.text }}
          >
            {book.subtitle}
          </p>
        </div>
      </div>
      {/* 책 설명 */}
      <p className="text-center text-xs text-slate-500 leading-relaxed break-keep max-w-[110px]">
        {book.desc}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
export default function DiscipleshipPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero ── */}
      <section className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #6366f1 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, #06b6d4 0%, transparent 40%)`,
          }}
        />
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <p className="text-xs font-bold text-white/50 uppercase tracking-[0.25em] mb-5">
            Suwon Hana Baptist Church
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-6 tracking-tight">
            예수님의 제자로<br />자라가는 여정
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-xl leading-loose break-keep">
            새가족으로 시작해 말씀과 훈련을 통해 성숙한 제자로 세워지는,
            수원하나교회의 체계적인 훈련 과정을 소개합니다.
          </p>
        </div>
      </section>

      {/* ── 훈련 여정 ── */}
      <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center mb-14">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">Training Journey</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">훈련 과정 여정</h2>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-0">
          {JOURNEY.map((step, i) => (
            <React.Fragment key={step.step}>
              <div className="flex-1 relative group">
                <div className="h-full bg-white border border-slate-100 rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                  {/* 스텝 번호 */}
                  <p className="text-4xl font-black text-slate-100 mb-4 leading-none">{step.step}</p>
                  {/* 배지 */}
                  <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full border mb-4 ${step.badge}`}>
                    {step.tag}
                  </span>
                  {/* 그라디언트 선 */}
                  <div className={`w-8 h-1 rounded-full bg-gradient-to-r ${step.color} mb-4`} />
                  <h3 className="text-xl font-extrabold text-slate-900 mb-1">{step.name}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{step.en}</p>
                  <p className="text-sm text-slate-600 leading-relaxed break-keep">{step.desc}</p>
                </div>
              </div>
              {/* 화살표 */}
              {i < JOURNEY.length - 1 && (
                <div className="flex items-center justify-center px-2 py-4 md:py-0 md:px-1">
                  <ArrowRight size={22} className="text-slate-300 rotate-90 md:rotate-0" strokeWidth={1.5} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ── 수요 훈련 안내 ── */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            {/* 좌측 */}
            <div className="lg:w-2/5">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-[0.2em] mb-3">Wednesday Training</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-5 leading-tight">
                수요 훈련
              </h2>
              <p className="text-slate-600 leading-loose break-keep text-[15px]">
                봄·가을 두 학기로 운영되는 수요 훈련은<br />
                매주 수요일 저녁 8시에 진행됩니다.<br />
                각 학기마다 다양한 과정이 열리며,<br />
                원하는 과정을 선택해 수강하실 수 있습니다.
              </p>
            </div>
            {/* 우측 */}
            <div className="lg:w-3/5 space-y-5 w-full">
              {/* 학기 뱃지 */}
              <div className="flex gap-3 flex-wrap mb-2">
                {SEMESTER_INFO.map((s) => (
                  <div key={s.label} className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border ${s.color}`}>
                    <span className="text-xl">{s.icon}</span>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{s.label}</p>
                      <p className="text-slate-500 text-xs">{s.period}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* 정보 그리드 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { Icon: Clock, title: "일시", desc: "매주 수요일\n저녁 8시" },
                  { Icon: MapPin, title: "장소", desc: "본당 2층\n대예배실 및 소그룹실" },
                  { Icon: Users, title: "대상", desc: "등록교인\n누구나" },
                ].map(({ Icon, title, desc }) => (
                  <div key={title} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center mb-3">
                      <Icon size={18} className="text-amber-600" strokeWidth={1.5} />
                    </div>
                    <p className="font-bold text-slate-900 text-sm mb-1">{title}</p>
                    <p className="text-slate-500 text-xs leading-relaxed whitespace-pre-line">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 교재 책꽂이 ── */}
      <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center mb-5">
          <p className="text-xs font-bold text-violet-600 uppercase tracking-[0.2em] mb-3">Curriculum</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">훈련 교재</h2>
          <p className="text-slate-500 text-[15px] leading-relaxed">
            각 과정은 전문 교재와 함께 진행됩니다.<br className="hidden sm:block" />
            학기마다 개설 과목이 달라질 수 있습니다.
          </p>
        </div>

        {/* 책꽂이 받침대 */}
        <div className="relative mt-12">
          {/* 입문·기초 */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={14} className="text-amber-500" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">입문 · 기초</span>
              <div className="flex-1 h-px bg-slate-100 ml-2" />
            </div>
            <div className="flex flex-wrap gap-8 sm:gap-10 justify-start">
              {BOOKS.filter((b) => b.group === null).map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>

          {/* 삶 시리즈 */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen size={14} className="text-violet-500" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">삶 시리즈</span>
              <div className="flex-1 h-px bg-slate-100 ml-2" />
            </div>
            <div className="flex flex-wrap gap-8 sm:gap-10 justify-start">
              {BOOKS.filter((b) => b.group === "life").map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>

          {/* 책꽂이 하단 선반 */}
          <div className="mt-10 h-2 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-full shadow-sm" />
        </div>

        {/* 안내 문구 */}
        <p className="mt-8 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-slate-300 inline-block" />
          매 학기 개설 과목은 교회 공지를 통해 안내됩니다
          <span className="w-1 h-1 rounded-full bg-slate-300 inline-block" />
        </p>
      </section>
    </div>
  );
}
