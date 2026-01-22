"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Clock, MapPin, Users, BookOpen, ChevronRight } from "lucide-react";

export default function TrainingContentPage() {
  const params = useParams();
  const tab = params.tab as string;

  return (
    <>
      {/* ==============================================
          TAB 1: 수요 훈련 (Wednesday Training)
      =============================================== */}
      {tab === "wednesday" && (
        <div className="animate-fade-in">
          {/* 1. 인트로 섹션 (중앙 정렬로 시선 집중) */}
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-6">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase">
              Wednesday Training
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              수요 훈련
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed break-keep">
              수원하나교회 훈련은 성도님들이 말씀 안에서 깊이 뿌리 내리고,
              <br className="hidden md:block" />
              예수 그리스도의 참된 제자로 성장하도록 돕는 훈련 과정입니다.
            </p>
          </div>

          {/* 2. 정보 그리드 카드 (기존 리스트를 카드로 변환) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {/* 카드 1: 일시 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4 text-blue-600">
                <Clock size={24} strokeWidth={1.5} />
              </div>
              <h4 className="text-slate-900 font-bold text-lg mb-1">일시</h4>
              <p className="text-slate-600">매주 수요일 저녁 8시</p>
            </div>

            {/* 카드 2: 장소 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4 text-blue-600">
                <MapPin size={24} strokeWidth={1.5} />
              </div>
              <h4 className="text-slate-900 font-bold text-lg mb-1">장소</h4>
              <p className="text-slate-600">
                본당 2층 대예배실
                <br />및 소그룹실
              </p>
            </div>

            {/* 카드 3: 대상 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4 text-blue-600">
                <Users size={24} strokeWidth={1.5} />
              </div>
              <h4 className="text-slate-900 font-bold text-lg mb-1">대상</h4>
              <p className="text-slate-600">등록교인 누구나</p>
            </div>
          </div>

          {/* 3. 커리큘럼 섹션 (좌우 배치로 변경) */}
          <div className="bg-white border-t border-slate-100 pt-16">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
              <div className="md:w-1/3">
                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="text-blue-600" size={24} />
                  커리큘럼 소개
                </h3>
              </div>
              <div className="md:w-2/3 space-y-6">
                <p className="text-slate-600 leading-8 text-lg">
                  체계적인 성경 공부와 나눔을 통해 신앙의 기초를 다지고, 삶의
                  현장에서 말씀을 적용하는 훈련을 진행합니다. 제자훈련, 사역훈련
                  등 단계별 과정을 통해 평신도 리더를 세우는 것을 목표로 합니다.
                </p>

                {/* 추후 링크 연결을 위한 버튼 예시 */}
                <button className="group flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  훈련 신청방법 알아보기
                  <ChevronRight
                    size={18}
                    className="ml-1 group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==============================================
          TAB 2: DSM (Daniel School of Ministry)
      =============================================== */}
      {tab === "dsm" && (
        <div className="animate-fade-in max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3 block">
              Daniel School of Ministry
            </span>
            <h2 className="text-3xl font-bold text-slate-900">DSM</h2>
          </div>

          <div className="bg-slate-50 rounded-3xl p-16 text-center border border-dashed border-slate-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-6">
              <Clock className="text-slate-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              페이지 준비중
            </h3>
            <p className="text-slate-500 text-lg">
              더 나은 콘텐츠를 위해 준비하고 있습니다.
              <br />
              잠시만 기다려주세요.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
