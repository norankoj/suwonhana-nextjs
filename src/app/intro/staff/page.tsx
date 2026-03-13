"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { bookList } from "@/data/data";

// 이미지 경로 정의
const spastor_ko2 = "/images/pastor_ko2.jpg"; // 담임목사님 전신 사진
const temp01 = "/images/yoon.jpg";
const temp02 = "/images/temp01.jpg";
const temp03 = "/images/temp02.jpg";
const temp04 = "/images/temp03.jpg";

// 섬기는 이들 데이터
const staffTeams = {
  ministry: [
    { name: "윤성철 목사", role: "협동목사", img: temp01 },
    { name: "엘리야 한 목사", role: "EM, 예배팀", img: temp02 },
    { name: "김태환 전도사", role: "DSM, 중보기도팀", img: temp03 },
    { name: "김세빛 간사", role: "YCM, 음향", img: temp04 },
  ],
  administration: [{ name: "사역자 성함", role: "교회 행정", img: temp02 }],
  media: [{ name: "사역자 성함", role: "미디어팀 역할", img: temp02 }],
};

// --- 사역자 개별 카드 컴포넌트 ---
const StaffCard = ({ staff }: { staff: any }) => (
  <div className="bg-white border border-slate-100 overflow-hidden font-sans shadow-sm group">
    <div className="aspect-[3/4] relative overflow-hidden bg-slate-50">
      <img
        src={staff.img}
        alt={staff.name}
        // 마우스 오버 시 줌인 효과 유지
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
    <div className="py-5 px-4 text-center">
      <h4 className="font-bold text-slate-900 text-lg mb-1">{staff.name}</h4>
      <p className="text-sm text-blue-600/70 font-medium">{staff.role}</p>
    </div>
  </div>
);

export default function PastorPage() {
  return (
    <div className="bg-white pb-32 font-sans selection:bg-blue-50 selection:text-blue-900">
      {/* =========================================
          [섹션 1] 통합 페이지 헤더
          ========================================= */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center border-b border-slate-100 mb-20 md:mb-24">
        <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-[0.3em] mb-6">
          Serving People
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.3] tracking-wide">
          섬기는 이들
        </h1>
      </section>

      {/* =========================================
          [섹션 2] 담임목사 프로필
          ========================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* 사진 영역 */}
          <div className="w-full lg:w-[45%] shrink-0">
            {/* 🔥 세로로 더 길게(aspect-[4/5] -> 약 3:4 비율에 가깝게) 수정하여 주먹 쥔 손까지 보이도록 늘렸습니다 🔥 */}
            <div className="aspect-[4/5] lg:aspect-[3.5/4.5] w-full bg-[#EAEBEF] rounded-[2rem] overflow-hidden shadow-sm relative">
              <img
                src={spastor_ko2}
                alt="고성준 담임목사"
                // object-top을 유지하되 박스가 길어져서 아래쪽이 더 많이 보입니다.
                className="w-full h-full object-cover object-top transition-all duration-700"
              />
            </div>
          </div>

          {/* 우측: 텍스트 영역 */}
          <div className="w-full lg:w-[55%] pt-2">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 flex flex-col md:flex-row items-center lg:items-baseline gap-1 md:gap-3">
                <span className="text-lg md:text-xl font-medium text-slate-500 order-2 md:order-1">
                  담임목사
                </span>
                <span className="order-1 md:order-2">고성준</span>
              </h2>
            </div>

            <div className="text-[15px] md:text-[17px] text-slate-600 leading-[1.8] break-keep space-y-6 mb-16 font-normal">
              <p>
                서울대 수학과와 동 대학원을 졸업했으며 국비유학생에 선발되어
                미국 UC버클리에서 수학 박사 학위(Ph.D)를 받았다.
                대전침례신학대학교(M.Div)을 졸업했으며 현재 수원하나교회
                담임목사이자 Come Mission 국제 이사로 섬기고 있다. 선교사들을
                훈련하는 다니엘훈련학교(Daniel School of Ministry), 난민 사역을
                위한 NGO 리홉(ReHope)을 발족하여 활동하고 있다. 연합과
                네트워킹을 통한 영향력으로 지속적인 선교 동원, 현지 사역자
                컨퍼런스, 이슬람 사역 등 선교적 리더십을 꾸준하게 펼치고 있다.
              </p>
            </div>

            <div className="border-t border-slate-100 pt-12 text-left">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-8 uppercase tracking-wider">
                  학력 및 약력
                </h3>
                <ul className="space-y-4 text-sm md:text-[15px] text-slate-600 leading-relaxed break-keep">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2.5 shrink-0"></span>
                    <span>서울대 수학과 및 동 대학원 졸업</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2.5 shrink-0"></span>
                    <span>
                      UC Berkeley(버클리) Ph.D.(박사) Mathematics Department
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2.5 shrink-0"></span>
                    <span>대전침례신학교 목회 대학원 졸업(M.Div)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2.5 shrink-0"></span>
                    <span>Come Mission 국제이사</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2.5 shrink-0"></span>
                    <span>난민사역 NGO Re-Hope 이사장</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0"></span>
                    <span className="font-bold text-slate-900">
                      현 수원하나교회 담임목사
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          [섹션 3] 저서 소개 
          ========================================= */}
      <section className="bg-[#F8F9FA] py-24 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-16 px-1">
            <h3 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              저서
            </h3>
            <span className="hidden md:block text-slate-400 text-sm font-medium tracking-widest uppercase">
              Books by Senior Pastor
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-5 gap-y-12">
            {bookList?.map((book: any) => (
              <a
                key={book.id}
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col"
              >
                <div className="relative aspect-[1/1.45] w-full bg-white rounded-lg overflow-hidden shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500 mb-5 border border-slate-200/50">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    unoptimized={true}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white text-slate-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                      <ArrowUpRight size={18} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>

                <h4 className="text-[15px] font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1 px-1">
                  {book.title}
                </h4>
                <p className="text-[12px] text-slate-500 leading-snug line-clamp-2 break-keep px-1">
                  {book.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          [섹션 4] 섬기는 이들 (팀별)
          ========================================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- 사역팀 --- */}
        <div className="mb-24">
          <div className="mb-12 text-center">
            <h4 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
              사역팀{" "}
              <span className="text-sm font-light text-slate-400 uppercase tracking-widest">
                Ministry Team
              </span>
            </h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {staffTeams.ministry.map((staff, i) => (
              <StaffCard key={i} staff={staff} />
            ))}
          </div>
        </div>

        {/* --- 행정팀 --- */}
        <div className="mb-24">
          <div className="mb-12 text-center">
            <h4 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
              행정팀{" "}
              <span className="text-sm font-light text-slate-400 uppercase tracking-widest">
                Administration Team
              </span>
            </h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {staffTeams.administration.map((staff, i) => (
              <StaffCard key={i} staff={staff} />
            ))}
          </div>
        </div>

        {/* --- 미디어팀 --- */}
        <div className="mb-24">
          <div className="mb-12 text-center">
            <h4 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
              미디어팀{" "}
              <span className="text-sm font-light text-slate-400 uppercase tracking-widest">
                Media Team
              </span>
            </h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {staffTeams.media.map((staff, i) => (
              <StaffCard key={i} staff={staff} />
            ))}
          </div>
        </div>

        {/* 위로 가기 버튼 */}
        <div className="pt-10 flex justify-end">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex flex-col items-center gap-3 text-slate-300 hover:text-blue-600 transition-all duration-300 mr-2 md:mr-6"
          >
            <div className="p-4 rounded-full border border-slate-100 group-hover:border-blue-200 group-hover:-translate-y-2 transition-all duration-300 bg-white/5 backdrop-blur-sm shadow-sm">
              <ArrowUp size={24} strokeWidth={1.5} />
            </div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase">
              Back to Top
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
