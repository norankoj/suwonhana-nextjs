"use client";

import React from "react";

export default function WelcomeSection() {
  const steps = [
    {
      num: "01",
      title: "새가족 담당 문의",
      desc: "로비 안내데스크\n또는 담당자에게 문의",
    },
    {
      num: "02",
      title: "새가족 프로그램 신청",
      desc: "새가족 프로그램\n신청 카드 작성",
    },
    {
      num: "03",
      title: "새가족 교육",
      desc: "수원하나교회 가족이\n되는 6주 과정",
    },
    {
      num: "04",
      title: "환영 및 셀 배정",
      desc: "수원하나 가족이\n되신 것을 환영합니다",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse justify-between gap-16 lg:gap-20">
          <div className="lg:w-1/3 flex flex-col items-start lg:items-end text-left lg:text-right">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
              처음 오셨나요?
            </h2>

            <p className="text-lg text-slate-500 mb-8 leading-relaxed break-keep">
              수원하나교회 방문을 진심으로 환영합니다.
              <br className="hidden lg:block" />
              새가족 등록 안내를 도와드립니다.
            </p>

            <div className="pt-6 border-t border-slate-200 w-full lg:w-auto">
              <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
                새가족 담당
              </p>
              <div className="flex flex-row lg:flex-col items-baseline lg:items-end gap-3 lg:gap-1">
                <p className="font-bold text-slate-900 text-xl">신상철 목사</p>
                <a
                  href="tel:010-2484-0776"
                  className="text-base text-slate-500 hover:text-slate-900 font-medium transition-colors"
                >
                  010-2484-0776
                </a>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-14 md:gap-y-16">
              {steps.map((item, idx) => (
                <div key={idx} className="group flex flex-col items-start">
                  <div className="text-6xl md:text-7xl font-black text-slate-200 group-hover:text-slate-900 transition-colors duration-500 leading-none mb-4">
                    {item.num}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 group-hover:translate-x-2 transition-transform duration-300">
                      {item.title}
                    </h3>
                    <p className="text-base text-slate-500 leading-relaxed whitespace-pre-line">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
