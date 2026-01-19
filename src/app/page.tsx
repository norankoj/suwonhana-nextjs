"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  UserPlus,
  FileText,
  BookOpen,
  Users,
  ChevronRight,
  Copy,
  X,
  ChevronDown,
} from "lucide-react";
import { HeroCarousel, CustomPlayButton } from "@/components/Common";
import { MainHero } from "@/components/MainHero";

// 구글폼 주소
const RECEIPT_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfD5f0YpO6Y1b9Z6U6Yz4k3n8FQ1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1ZQ/viewform";

export default function MainPage() {
  const router = useRouter();
  const [showAccountInfo, setShowAccountInfo] = useState(false);

  // 슬라이드 이미지 (public/images 폴더에 해당 파일들이 있어야 함)
  const slides = ["/images/background02.jpg", "/images/background03.jpg"];

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <div className="animate-fade-in">
        {/* 1. Hero Section (메인 배너) */}
        <MainHero />

        {/* 2. Welcome Message Section (환영 메시지) */}
        <section className="py-24 bg-white text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 leading-snug">
              수원하나교회에 오신 것을 환영합니다!
            </h3>
            <div className="space-y-4 text-slate-600 text-lg leading-relaxed font-light mb-12">
              <p>
                수원하나교회는 하나님을 즐거워하고 그 분의 목적에 헌신하는
                공동체입니다.
              </p>
              <p className="text-base md:text-lg">
                <strong className="text-slate-900">하나</strong>의 의미는{" "}
                <span className="font-semibold text-slate-800">
                  하나님의 나라(Kingdom of God)
                </span>
                를 건설하고
                <br className="hidden md:block" />
                형제 자매가{" "}
                <span className="font-semibold text-slate-800">
                  연합(Unity)
                </span>
                하여 하나가 되어간다는 의미입니다.
              </p>
              <p className="text-sm text-slate-400 pt-4">
                수원하나교회는 기독교 한국 침례회 교단 소속 입니다.
              </p>
            </div>

            <button
              onClick={() => handleNavClick("/intro/pastor")}
              className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-sky-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300"
            >
              더 알아보기
            </button>
          </div>
        </section>

        {/* 3. Newcomer Guide Section (새가족 안내) */}
        <section className="py-24" style={{ backgroundColor: "#f8f8f8" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-left mb-16">
              <h3 className="text-4xl font-bold text-slate-900 mb-6">
                처음이신가요?
              </h3>
              <p className="text-slate-500 text-lg mb-8">
                수원하나교회에 오신 것을 환영합니다. 새가족 절차를 안내해
                드립니다. 새가족 담당자 (신상철 목사 :010-2484-0776)
              </p>
            </div>

            <div className="relative pl-4 md:pl-0">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-sky-100 md:hidden"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {/* Step 1 */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start h-full">
                  <div className="flex items-center justify-between w-full mb-6">
                    <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300">
                      <UserPlus size={24} />
                    </div>
                    <span className="text-4xl font-bold text-slate-100 group-hover:text-sky-50 transition-colors">
                      01
                    </span>
                  </div>
                  <div>
                    <span className="inline-block text-sky-600 font-bold text-xs mb-2 tracking-wider">
                      STEP 01
                    </span>
                    <h4 className="font-bold text-xl text-slate-900">
                      새가족 담당 문의
                    </h4>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start h-full">
                  <div className="flex items-center justify-between w-full mb-6">
                    <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-slate-800 group-hover:text-white transition-colors duration-300">
                      <FileText size={24} />
                    </div>
                    <span className="text-4xl font-bold text-slate-100 group-hover:text-slate-100 transition-colors">
                      02
                    </span>
                  </div>
                  <div>
                    <span className="inline-block text-slate-400 font-bold text-xs mb-2 tracking-wider">
                      STEP 02
                    </span>
                    <h4 className="font-bold text-xl text-slate-900">
                      새가족 프로그램 신청
                    </h4>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start h-full">
                  <div className="flex items-center justify-between w-full mb-6">
                    <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-slate-800 group-hover:text-white transition-colors duration-300">
                      <BookOpen size={24} />
                    </div>
                    <span className="text-4xl font-bold text-slate-100 group-hover:text-slate-100 transition-colors">
                      03
                    </span>
                  </div>
                  <div>
                    <span className="inline-block text-slate-400 font-bold text-xs mb-2 tracking-wider">
                      STEP 03
                    </span>
                    <h4 className="font-bold text-xl text-slate-900">
                      새가족 교육 (6주)
                    </h4>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start h-full">
                  <div className="flex items-center justify-between w-full mb-6">
                    <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-slate-800 group-hover:text-white transition-colors duration-300">
                      <Users size={24} />
                    </div>
                    <span className="text-4xl font-bold text-slate-100 group-hover:text-slate-100 transition-colors">
                      04
                    </span>
                  </div>
                  <div>
                    <span className="inline-block text-slate-400 font-bold text-xs mb-2 tracking-wider">
                      STEP 04
                    </span>
                    <h4 className="font-bold text-xl text-slate-900">
                      셀 배정
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Featured Sermon Preview (설교 미리보기) */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-sky-600 font-bold uppercase tracking-wide text-sm">
                  Sermon Bank
                </span>
                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                  주일 강단 메세지
                </h2>
              </div>
              <button
                className="hidden md:flex items-center text-slate-500 hover:text-sky-600 text-sm font-medium transition-colors"
                onClick={() => handleNavClick("/sermon")}
              >
                메세지 더보기 <ArrowRight size={16} className="ml-1" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 메인 설교 카드 */}
              <div
                className="lg:col-span-2 relative group cursor-pointer rounded-2xl overflow-hidden shadow-xl aspect-video"
                onClick={() => handleNavClick("/sermon")}
              >
                <img
                  src="https://images.unsplash.com/photo-1510936111840-65e151ad71bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="sermon"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <CustomPlayButton />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent text-white">
                  <div className="inline-block px-3 py-1 bg-red-600 rounded text-xs font-bold mb-3">
                    LIVE REPLAY
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    2025.12.07 주일 2부 예배
                  </h3>
                  <p className="text-slate-300">
                    본문: 요한복음 3장 16절 | 설교: 담임목사
                  </p>
                </div>
              </div>

              {/* 사이드 리스트 */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 max-h-[450px] overflow-y-auto pr-2">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div
                      key={item}
                      className="flex gap-4 p-3 bg-slate-50 rounded-xl hover:shadow-md transition-shadow cursor-pointer border border-slate-100 group"
                      onClick={() => handleNavClick("/sermon")}
                    >
                      <div className="w-32 aspect-video bg-slate-200 rounded-lg overflow-hidden shrink-0 relative">
                        <img
                          src={`https://images.unsplash.com/photo-1515162305285-0293e4767cc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                          className="w-full h-full object-cover"
                          alt="thumb"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <CustomPlayButton size={24} />
                        </div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-xs text-slate-400 mb-1">
                          2025.11.{30 - item}
                        </span>
                        <h4 className="font-bold text-slate-800 text-sm leading-tight mb-1 group-hover:text-sky-600 transition-colors line-clamp-2">
                          믿음으로 승리하는 삶 (Part {item})
                        </h4>
                        <span className="text-xs text-slate-500">
                          로마서 8장 {item}-15절
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleNavClick("/sermon")}
                  className="w-full py-4 mt-auto bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 transition-all flex items-center justify-center"
                >
                  설교 더보기 <ChevronRight size={18} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 5. 기부금 영수증 */}
        <section className="py-24" style={{ backgroundColor: "#f8f8f8" }}>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold text-slate-900 mb-6">
              기부금 영수증
            </h3>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              연말정산 및 세액공제를 위한 기부금 영수증을 온라인으로 간편하게
              신청하고 발급받으실 수 있습니다.
              <br />
              <span className="text-sm text-slate-400 mt-2 block">
                * 신청 후 발급까지 약 일주일정도 소요될 수 있습니다.
              </span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={RECEIPT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                발급 신청하기 <ArrowRight size={16} />
              </a>
              <button
                onClick={() => setShowAccountInfo(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full font-bold text-sm hover:bg-slate-50 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                헌금 계좌 안내 <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* 헌금 계좌 모달 */}
      {showAccountInfo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setShowAccountInfo(false)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  헌금 계좌 안내
                </h3>
                <button
                  onClick={() => setShowAccountInfo(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-slate-500" />
                </button>
              </div>

              <div className="mb-6 bg-slate-50 p-4 rounded-2xl text-center">
                <span className="text-slate-500 text-sm font-medium block mb-1">
                  예금주
                </span>
                <p className="text-slate-900 font-bold text-lg">수원하나교회</p>
              </div>

              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {[
                  { label: "십일조/감사", num: "468001-01-318042" },
                  { label: "선교헌금", num: "422001-04-084939" },
                  { label: "건축헌금", num: "920301-01-563418" },
                  { label: "DA", num: "920301-01-563450" },
                  { label: "난민사역후원", num: "920301-01-512487" },
                  { label: "구제헌금", num: "920301-01-027154" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      navigator.clipboard.writeText(`국민 ${item.num}`);
                      alert(`${item.label} 계좌가 복사되었습니다.`);
                    }}
                    className="group flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:bg-sky-50 hover:border-sky-200 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-sky-600 transition-colors">
                        <span className="text-[10px] font-bold text-slate-500">
                          국민
                        </span>
                      </div>
                      <span className="font-bold text-slate-700 group-hover:text-slate-900">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-600 group-hover:text-sky-600">
                        {item.num}
                      </span>
                      <Copy
                        size={14}
                        className="text-slate-300 group-hover:text-sky-500"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-xs text-slate-400 mt-6">
                계좌번호를 클릭하면 복사됩니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
