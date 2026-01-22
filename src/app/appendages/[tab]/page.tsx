"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  ArrowRight,
  BookOpen,
  Quote,
  CalendarCheck,
  Info,
} from "lucide-react";

export default function AppendagesContentPage() {
  const params = useParams();
  const router = useRouter();
  const tab = params.tab as string;

  return (
    <>
      {/* =========================================================
          TAB: COUNSELING (하나 상담실)
      ========================================================= */}
      {tab === "counseling" && (
        <div className="animate-fade-in space-y-20">
          {/* 1. 헤더 섹션 */}
          <div className="text-center space-y-4">
            <span className="inline-block py-1 px-3 rounded text-blue-600 bg-blue-50 text-xs font-bold tracking-widest uppercase">
              Hana Counseling Center
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
              하나 상담실
            </h2>
          </div>

          {/* 2. 사명 및 목표 (박스형) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
            {/* 배경 장식 */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 opacity-60 transform translate-x-1/2 -translate-y-1/2"></div>

            <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
              <Quote size={40} className="text-blue-200 fill-blue-50" />

              <h3 className="text-xl md:text-xl font-serif font-bold text-slate-800 leading-relaxed">
                "평강의 하나님이 친히 너희를 온전히 거룩하게 하시고 또 너희의 온
                영과 혼과 몸이 우리 주 예수 그리스도께서 강림하실 때에 흠 없게
                보전되기를 원하노라"
                <span className="block text-sm text-slate-400 font-sans font-normal mt-2 not-italic">
                  (데살로니가전서 5:23)
                </span>
              </h3>

              <p className="text-slate-600 leading-loose break-keep text-left">
                상담을 통하여 개인과 가정에 대한{" "}
                <strong className="text-blue-600">
                  하나님의 창조 질서가 회복되는 것
                </strong>
                을 사명으로 하며, 하나님의 말씀과 예수님의 사랑과 성령님의
                역사하심 안에서 전문적인 지식으로 개인이 직면한 문제를
                해결하도록 돕는 것을 목표로 하고 있습니다. 하나상담실은 찾아
                주시는 모든 분과 하나님과의 사랑의 관계 가운데 치유와 회복과
                성장을 경험하는 과정들을 함께 할 것입니다. 하나님 안에서
                수고하고 무거운 짐을 내려놓고 기쁘고 풍성한 삶을 누리게 되시길
                기도하고 축복합니다.
              </p>

              {/* 대상 안내 박스 */}
              <div className="flex items-start gap-4 bg-slate-50 p-6 rounded-xl text-left w-full border border-slate-200/60">
                <div className="bg-white p-2 rounded-full shadow-sm shrink-0 text-blue-600">
                  <Info size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">
                    상담 신청 대상
                  </h4>
                  <p className="text-slate-600 text-sm">
                    수원하나교회 등록 교인 또는 셀리더의 추천을 받은 분
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. 예약하기 버튼 (CTA) */}
          <div className="text-center">
            <button
              onClick={() => router.push("/counseling/apply")}
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200 hover:-translate-y-1"
            >
              <CalendarCheck size={20} />
              <span>상담 예약 신청하기</span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform opacity-70 group-hover:opacity-100"
              />
            </button>
            <p className="mt-4 text-sm text-slate-400">
              * 상담은 사전 예약제로 운영됩니다.
            </p>
          </div>

          {/* 4. 오시는 길 (지도) */}
          <div className="space-y-8 pt-8 border-t border-slate-100">
            <div className="flex flex-col items-center text-center space-y-2">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-900 mb-2">
                <MapPin size={24} />
              </span>
              <h3 className="text-2xl font-bold text-slate-900">
                찾아오시는 길
              </h3>
              <p className="text-slate-500">
                경기도 용인시 기흥구 서그내로 53번길 30 하나교회 교육관 1층
              </p>
            </div>

            <div className="w-full h-[450px] bg-slate-100 rounded-3xl overflow-hidden shadow-md border border-slate-200 relative group">
              <iframe
                width="100%"
                height="100%"
                id="gmap_canvas"
                src="https://maps.google.com/maps?q=%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%9A%A9%EC%9D%B8%EC%8B%9C%20%EA%B8%B0%ED%9D%A5%EA%B5%AC%20%EC%84%9C%EA%B7%B8%EB%82%B4%EB%A1%9C%2053%EB%B2%88%EA%B8%B8%2030&t=&z=15&ie=UTF8&iwloc=&output=embed"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                title="counseling-map"
                className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
              ></iframe>
              {/* 지도 위 안내 뱃지 */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg border border-slate-100">
                <p className="font-bold text-slate-900 text-sm">
                  하나 상담실 (교육관 1층)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB: DANIEL AMATZ (준비중 페이지 개선)
      ========================================================= */}
      {tab === "daniel-amatz" && (
        <div className="animate-fade-in flex flex-col items-center justify-center py-20 text-center space-y-6">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-100">
            <BookOpen size={40} className="text-slate-300" />
          </div>

          <div className="space-y-2">
            <span className="text-brand font-bold tracking-wide uppercase text-sm block">
              Coming Soon
            </span>
            <h2 className="text-3xl font-bold text-slate-900">다니엘 아마츠</h2>
          </div>

          <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
            다니엘 선교원과 훈련센터에 대한 자세한 내용은
            <br />곧 업데이트 될 예정입니다.
          </p>
        </div>
      )}
    </>
  );
}
