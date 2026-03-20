"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const QUESTION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfD5f0YpO6Y1b9Z6U6Yz4k3n8FQ1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1ZQ/viewform";

const steps = [
  {
    num: "01",
    title: "새가족 담당 문의",
    desc: "로비 안내데스크 또는 담당자에게 문의",
  },
  {
    num: "02",
    title: "새가족 프로그램 신청",
    desc: "새가족 프로그램 신청 카드 작성",
  },
  {
    num: "03",
    title: "새가족 교육",
    desc: "수원하나교회 가족이 되는 6주 과정",
  },
  {
    num: "04",
    title: "환영 및 셀 배정",
    desc: "수원하나 가족이 되신 것을 환영합니다",
  },
];

export default function WelcomeSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">

          {/* 왼쪽: 타이틀 + 담당자 + 질문 버튼 */}
          <div className="lg:w-2/5 flex flex-col justify-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">
              New Family
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight mb-5 break-keep">
              처음 오셨나요?
            </h2>
            <p className="text-base md:text-lg text-slate-500 mb-8 leading-relaxed break-keep">
              수원하나교회 방문을 진심으로 환영합니다.
              <br />
              새가족 등록 안내를 도와드립니다.
            </p>

            {/* 담당자 — 심플 텍스트 */}
            <div className="mb-8 pt-6 border-t border-slate-200">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                새가족 담당
              </p>
              <p className="text-base font-bold text-slate-900">
                신상철 목사
              </p>
              <a
                href="tel:010-2484-0776"
                className="text-base text-slate-500 hover:text-slate-900 transition-colors"
              >
                010-2484-0776
              </a>
              <p className="text-xs text-slate-400 mt-1">
                전화 또는 문자로 문의 가능합니다
              </p>
            </div>

            {/* 질문하기 버튼 */}
            <a
              href={QUESTION_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-slate-800 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg group w-fit"
            >
              궁금한 점 질문하기
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>

          {/* 오른쪽: 4단계 등록 절차 */}
          <div className="lg:w-3/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
              {steps.map((step, idx) => (
                <div key={idx} className="group flex flex-col items-start">
                  <div className="text-6xl md:text-7xl font-black text-slate-200 group-hover:text-slate-900 transition-colors duration-500 leading-none mb-4 select-none">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:translate-x-1 transition-transform duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
