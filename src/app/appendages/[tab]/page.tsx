"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  ArrowRight,
  Quote,
  CalendarCheck,
  Info,
  Heart,
  BookOpen,
  Lightbulb,
  Users,
} from "lucide-react";

const WP = process.env.NEXT_PUBLIC_WORDPRESS_DOMAIN || "http://suwonhana.local";

interface CounselingWPData {
  heroImage: string;
  reservationUrl: string;
}

export default function AppendagesContentPage() {
  const params = useParams();
  const router = useRouter();
  const tab = params.tab as string;

  const [wpData, setWpData] = useState<CounselingWPData | null>(null);

  useEffect(() => {
    if (tab !== "counseling") return;
    const load = async () => {
      try {
        const res = await fetch(
          `${WP}/wp-json/wp/v2/pages?slug=hana-counseling&_fields=acf,_links&_embed=wp:featuredmedia`,
          { cache: "no-store" }
        );
        const pages = res.ok ? await res.json() : [];
        if (!pages.length) return;
        const page = pages[0];
        const heroImage =
          page._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "";
        const reservationUrl = page.acf?.reservation_url ?? "";
        setWpData({ heroImage, reservationUrl });
      } catch {
        setWpData({ heroImage: "", reservationUrl: "" });
      }
    };
    load();
  }, [tab]);

  return (
    <>
      {/* =========================================================
          TAB: COUNSELING (하나 상담실)
      ========================================================= */}
      {tab === "counseling" && (
        <div className="animate-fade-in">

          {/* ── 1. 히어로 섹션 (대표이미지 + 타이틀) ── */}
          <div className="relative w-full h-[60vh] min-h-[400px] flex items-end overflow-hidden">
            {/* 배경 이미지 */}
            {wpData?.heroImage ? (
              <img
                src={wpData.heroImage}
                alt="하나 상담실"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-slate-800" />
            )}
            {/* 그라디언트 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* 타이틀 */}
            <div className="relative z-10 w-full max-w-content mx-auto px-6 pb-14 md:pb-20">
              <p className="text-white/60 text-sm font-medium tracking-[0.2em] uppercase mb-3">
                Hana Counseling Center
              </p>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                하나 상담실
              </h1>
            </div>
          </div>

          {/* ── 2. 본문 ── */}
          <div className="max-w-content mx-auto px-6 py-16 md:py-24 space-y-20">

            {/* 사명 및 목표 */}
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-10">
              <Quote size={36} className="text-slate-200 fill-slate-100" />

              <blockquote className="text-xl md:text-2xl font-serif font-bold text-slate-800 leading-relaxed break-keep">
                "평강의 하나님이 친히 너희를 온전히 거룩하게 하시고 또 너희의
                온 영과 혼과 몸이 우리 주 예수 그리스도께서 강림하실 때에 흠
                없게 보전되기를 원하노라"
                <cite className="block text-sm text-slate-400 font-sans font-normal mt-3 not-italic">
                  데살로니가전서 5:23
                </cite>
              </blockquote>

              <p className="text-slate-600 leading-loose break-keep text-left text-base md:text-lg">
                상담을 통하여 개인과 가정에 대한{" "}
                <strong className="text-slate-900">
                  하나님의 창조 질서가 회복되는 것
                </strong>
                을 사명으로 하며, 하나님의 말씀과 예수님의 사랑과 성령님의
                역사하심 안에서 전문적인 지식으로 개인이 직면한 문제를
                해결하도록 돕는 것을 목표로 하고 있습니다. 하나상담실은 찾아
                주시는 모든 분과 하나님과의 사랑의 관계 가운데 치유와 회복과
                성장을 경험하는 과정들을 함께 할 것입니다.
              </p>

              <div className="flex items-start gap-4 bg-slate-50 p-6 rounded-xl text-left w-full border border-slate-100">
                <Info size={20} className="text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">상담 신청 대상</h4>
                  <p className="text-slate-500 text-sm">
                    수원하나교회 등록 교인 또는 셀리더의 추천을 받은 분
                  </p>
                </div>
              </div>
            </div>

            {/* 예약 CTA */}
            <div className="text-center">
              {wpData?.reservationUrl ? (
                <a
                  href={wpData.reservationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-700 transition-all shadow-lg hover:-translate-y-1"
                >
                  <CalendarCheck size={20} />
                  <span>상담 예약 신청하기</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
              ) : (
                <button
                  onClick={() => router.push("/counseling/apply")}
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-700 transition-all shadow-lg hover:-translate-y-1"
                >
                  <CalendarCheck size={20} />
                  <span>상담 예약 신청하기</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              )}
              <p className="mt-4 text-sm text-slate-400">
                * 상담은 사전 예약제로 운영됩니다.
              </p>
            </div>

            {/* 오시는 길 */}
            <div className="space-y-8 pt-8 border-t border-slate-100">
              <div className="flex flex-col items-center text-center space-y-2">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-900 mb-2">
                  <MapPin size={24} />
                </span>
                <h3 className="text-2xl font-bold text-slate-900">찾아오시는 길</h3>
                <p className="text-slate-500">
                  경기도 용인시 기흥구 서그내로 53번길 30 하나교회 교육관 1층
                </p>
              </div>

              <div className="w-full h-[400px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 relative group">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://maps.google.com/maps?q=%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%9A%A9%EC%9D%B8%EC%8B%9C%20%EA%B8%B0%ED%9D%A5%EA%B5%AC%20%EC%84%9C%EA%B7%B8%EB%82%B4%EB%A1%9C%2053%EB%B2%88%EA%B8%B8%2030&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  frameBorder="0"
                  scrolling="no"
                  title="counseling-map"
                  className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-md border border-slate-100">
                  <p className="font-bold text-slate-900 text-sm">하나 상담실 (교육관 1층)</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================
          TAB: ENTREPRENEURSHIP (창업보육센터)
      ========================================================= */}
      {tab === "entrepreneurship" && (
        <div className="animate-fade-in space-y-16">
          {/* 헤더 */}
          <div className="text-center space-y-4">
            <span className="inline-block py-1 px-3 rounded text-slate-500 bg-slate-100 text-xs font-bold tracking-widest uppercase">
              Business Incubation Center
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
              창업보육센터
            </h2>
          </div>

          {/* 소개 */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center">
                  <Lightbulb size={32} className="text-amber-500" />
                </div>
                <p className="text-slate-600 leading-loose break-keep text-base">
                  수원하나교회 창업보육센터는 하나님의 나라를 위한 비즈니스 창업을 지원하고,
                  크리스천 창업가들이 신앙과 사업을 통합하여 세상에 선한 영향력을 끼칠 수 있도록 돕습니다.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                {[
                  { icon: <Users size={24} />, label: "멘토링", desc: "경험 있는 크리스천 비즈니스 리더의 멘토링" },
                  { icon: <Lightbulb size={24} />, label: "교육 프로그램", desc: "창업 실무 및 신앙 통합 교육 지원" },
                  { icon: <Heart size={24} />, label: "네트워크", desc: "크리스천 창업가 커뮤니티 연결" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-700 mb-4">
                      {item.icon}
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">{item.label}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 안내 */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-center">
            <p className="text-slate-500 text-base">
              창업보육센터에 대한 자세한 내용은 곧 업데이트될 예정입니다.
            </p>
            <p className="text-slate-400 text-sm mt-2">
              문의: 교회 사무실 031-203-3693
            </p>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB: DANIEL AMATZ (다니엘 아마츠)
      ========================================================= */}
      {tab === "daniel-amatz" && (
        <div className="animate-fade-in space-y-20">
          {/* 헤더 */}
          <div className="text-center space-y-4">
            <span className="inline-block py-1 px-3 rounded text-slate-500 bg-slate-100 text-xs font-bold tracking-widest uppercase">
              Daniel Amatz
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
              다니엘 아마츠
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
              다음 세대를 양육하고 훈련하는 수원하나교회의 교육 기관입니다.
            </p>
          </div>

          {/* 다니엘 선교원 */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
              <div className="lg:w-1/4 flex flex-col items-center lg:items-start text-center lg:text-left shrink-0">
                <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-4">
                  <Heart size={32} className="text-rose-500" />
                </div>
                <span className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2 block">
                  Daniel Missionary School
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                  다니엘 선교원
                </h3>
              </div>

              <div className="lg:w-3/4 space-y-6">
                <p className="text-slate-600 leading-loose break-keep text-base">
                  다니엘 선교원은 영아 및 유아를 위한 기독교 교육 기관으로, 말씀과 사랑으로 다음 세대를 양육합니다.
                  어린 시절부터 하나님을 알고 경험하는 신앙의 기초를 세워가는 곳입니다.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "대상", value: "영아 ~ 유아 (만 0-7세)" },
                    { label: "운영", value: "평일 운영 (월-금)" },
                    { label: "위치", value: "수원하나교회 내" },
                    { label: "문의", value: "교회 사무실 031-203-3693" },
                  ].map((info, i) => (
                    <div key={i} className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider w-12 shrink-0 pt-0.5">{info.label}</span>
                      <span className="text-sm font-bold text-slate-700">{info.value}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-700">
                  자세한 프로그램 안내는 곧 업데이트될 예정입니다.
                </div>
              </div>
            </div>
          </div>

          {/* 다니엘 훈련센터 */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
              <div className="lg:w-1/4 flex flex-col items-center lg:items-start text-center lg:text-left shrink-0">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
                  <BookOpen size={32} className="text-indigo-500" />
                </div>
                <span className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2 block">
                  Daniel Training Center
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                  다니엘 훈련센터
                </h3>
              </div>

              <div className="lg:w-3/4 space-y-6">
                <p className="text-slate-600 leading-loose break-keep text-base">
                  다니엘 훈련센터는 아동 및 청소년을 대상으로 신앙 훈련과 리더십을 양성하는 교육 기관입니다.
                  말씀과 기도를 통해 하나님의 사람으로 세워지는 훈련의 장을 제공합니다.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "대상", value: "초등 ~ 고등학생" },
                    { label: "과정", value: "신앙 훈련 및 리더십 과정" },
                    { label: "위치", value: "수원하나교회 내" },
                    { label: "문의", value: "교회 사무실 031-203-3693" },
                  ].map((info, i) => (
                    <div key={i} className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider w-12 shrink-0 pt-0.5">{info.label}</span>
                      <span className="text-sm font-bold text-slate-700">{info.value}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-700">
                  자세한 프로그램 안내는 곧 업데이트될 예정입니다.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
