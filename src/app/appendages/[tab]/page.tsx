"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { MapPin, ArrowRight, BookOpen } from "lucide-react";

export default function AppendagesContentPage() {
  const params = useParams();
  const router = useRouter();
  const tab = params.tab as string;

  return (
    <>
      {tab === "counseling" && (
        <div className="animate-fade-in space-y-10">
          <div className="border-b border-slate-200 pb-6">
            <span className="text-brand font-bold tracking-wide uppercase text-sm mb-2 block">
              Hana Counseling Center
            </span>
            <h2 className="text-3xl font-bold text-slate-900">하나 상담실</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-6 text-slate-600 leading-relaxed text-lg">
              <p>
                <strong className="text-slate-900 text-xl block mb-2">
                  평강의 하나님이 친히 너희를 온전히 거룩하게 하시고... (살전
                  5:23)
                </strong>
                <br />
                상담을 통하여 개인과 가정에 대한 하나님의 창조 질서가 회복되는
                것을 그 사명으로 하며, 하나님의 말씀과 예수님의 사랑과 성령님의
                역사하심 안에서 전문적인 지식으로 개인이 직면한 문제를
                해결하도록 돕는 것을 목표로 하고 있습니다.
              </p>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-lg space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-700">신청대상</span>
                  <span>
                    수원하나교회 등록 교인 또는 셀리더의 추천을 받은 분
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center py-6">
            <button
              onClick={() => router.push("/counseling/apply")}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-brand text-white rounded-full font-bold text-lg hover:bg-brand-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              상담 예약 신청하기
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="text-slate-900" /> 찾아오시는 길
            </h3>
            <div className="w-full h-[400px] bg-slate-100 rounded-2xl overflow-hidden shadow-sm border border-slate-200 relative">
              <iframe
                width="100%"
                height="100%"
                id="gmap_canvas"
                src="https://maps.google.com/maps?q=경기도%20용인시%20기흥구%20서그내로%2053번길%2030&t=&z=15&ie=UTF8&iwloc=&output=embed"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                title="counseling-map"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
            <p className="text-slate-500 text-center">
              경기도 용인시 기흥구 서그내로 53번길 30 하나교회 교육관 1층
            </p>
          </div>
        </div>
      )}

      {tab === "daniel-amatz" && (
        <div className="animate-fade-in space-y-10">
          <div className="border-b border-slate-200 pb-6">
            <span className="text-brand font-bold tracking-wide uppercase text-sm mb-2 block">
              Daniel AMATZ
            </span>
            <h2 className="text-3xl font-bold text-slate-900">다니엘 아마츠</h2>
          </div>
          <div className="bg-slate-50 rounded-2xl p-12 text-center border border-slate-100">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-slate-400">
              <BookOpen size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">
              페이지 준비중입니다
            </h3>
            <p className="text-slate-500">
              다니엘 선교원과 훈련센터에 대한 자세한 내용은 곧 업데이트 될
              예정입니다.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
