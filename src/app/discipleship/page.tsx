import type { Metadata } from "next";
import { fetchTrainingData } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "훈련",
  description: "수원하나교회 훈련 과정 소개 — 새로운삶부터 수요훈련까지, 예수 그리스도의 제자로 자라가는 여정입니다.",
};

/* ─────────────────────────────
   데이터
───────────────────────────── */
const BOOKS = [
  { title: "창조주를\n소개합니다!", label: "초신자 과정" },
  { title: "성경적\n세계관", label: null },
  { title: "말씀의 삶\n구약", label: null },
  { title: "말씀의 삶\n신약", label: null },
  { title: "증인의 삶", label: null },
  { title: "목자의 삶", label: null },
  { title: "변화의 삶", label: null },
  { title: "하나님을\n경험하는 삶", label: null },
];

/* ─────────────────────────────
   Book 컴포넌트 (저서 스타일)
───────────────────────────── */
function BookCard({ title, label }: { title: string; label: string | null }) {
  return (
    <div className="flex flex-col group cursor-default">
      <div className="relative aspect-[1/1.45] w-full overflow-hidden shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500 mb-4 flex flex-col justify-between bg-slate-900 p-4">
        <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-white/10" />
        <div className="w-6 h-[2px] bg-white/30" />
        <p className="text-white font-bold text-[13px] sm:text-[14px] leading-snug whitespace-pre-line tracking-tight">
          {title}
        </p>
        <div className="h-3" />
      </div>
      <p className="text-[14px] font-bold text-slate-900 leading-snug whitespace-pre-line px-0.5">
        {title}
      </p>
      {label && (
        <p className="text-[11px] text-slate-400 mt-1 px-0.5">{label}</p>
      )}
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

      {/* ── 히어로 (하나상담실 동일 패턴) ── */}
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

      <div className="animate-fade-in max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-20 pt-20 md:pt-28">

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

          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">일정 안내</h3>
            <div className="border-t border-slate-200">
              {[
                { label: "일시", value: "매주 수요일 저녁 8시" },
                { label: "장소", value: "2층 본당, 중예배실 및 소그룹실" },
                { label: "대상", value: "제자의 삶을 수료하고 훈련을 듣기 희망하는 수원하나교회 성도" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between py-4 border-b border-slate-100 gap-6">
                  <p className="font-bold text-slate-900 text-base shrink-0">{label}</p>
                  <p className="text-slate-600 text-sm text-right break-keep">{value}</p>
                </div>
              ))}
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
              <BookCard key={book.title} title={book.title} label={book.label} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
