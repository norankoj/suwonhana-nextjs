"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Clock, MapPin, Users } from "lucide-react";

export default function TrainingContentPage() {
  const params = useParams();
  const tab = params.tab as string;

  return (
    <>
      {tab === "wednesday" && (
        <div className="animate-fade-in space-y-8">
          <div className="border-b border-slate-200 pb-6 mb-8">
            <span className="text-brand font-bold tracking-wide uppercase text-sm mb-2 block">
              Wednesday Training
            </span>
            <h2 className="text-3xl font-bold text-slate-900">수요 훈련</h2>
          </div>

          <div className="prose max-w-none text-slate-600 leading-relaxed">
            <p className="text-lg mb-6">
              수원하나교회 훈련은 성도님들이 말씀 안에서 깊이 뿌리 내리고, 예수
              그리스도의 참된 제자로 성장하도록 돕는 훈련 과정입니다.
            </p>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 my-8">
              <h4 className="text-xl font-bold text-slate-900 mb-4">
                훈련 안내
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock size={14} className="text-brand" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block mb-1">일시</strong>
                    <span>매주 수요일 저녁 8시</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={14} className="text-brand" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block mb-1">장소</strong>
                    <span>본당 2층 대예배실 및 소그룹실</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Users size={14} className="text-brand" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block mb-1">대상</strong>
                    <span>등록교인 누구나</span>
                  </div>
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              커리큘럼 소개
            </h3>
            <p className="mb-4">
              체계적인 성경 공부와 나눔을 통해 신앙의 기초를 다지고, 삶의
              현장에서 말씀을 적용하는 훈련을 진행합니다. 제자훈련, 사역훈련 등
              단계별 과정을 통해 평신도 리더를 세우는 것을 목표로 합니다.
            </p>
          </div>
        </div>
      )}

      {tab === "dsm" && (
        <div className="animate-fade-in">
          <div className="border-b border-slate-200 pb-6 mb-8">
            <span className="text-brand font-bold tracking-wide uppercase text-sm mb-2 block">
              Daniel School of Ministry
            </span>
            <h2 className="text-3xl font-bold text-slate-900">DSM</h2>
          </div>
          <div className="bg-slate-50 rounded-2xl p-10 text-center border border-slate-100">
            <p className="text-slate-500 text-lg">준비중인 페이지입니다.</p>
          </div>
        </div>
      )}
    </>
  );
}
