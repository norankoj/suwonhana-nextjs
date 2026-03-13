"use client";

import Image from "next/image";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { bookList } from "@/data/data";

// 이미지 경로
const pastor_ko = "/images/pastor_ko2.jpg";
const temp01 = "/images/yoon.jpg";
const temp02 = "/images/temp01.jpg";
const temp03 = "/images/temp02.jpg";
const temp04 = "/images/temp03.jpg";

const staffTeams = {
  ministry: [
    { name: "윤성철 목사", role: "협동목사", img: temp01 },
    { name: "엘리야 한 목사", role: "EM, 예배팀", img: temp02 },
    { name: "김태환 전도사", role: "DSM, 중보기도팀", img: temp03 },
    { name: "김세빛 간사", role: "YCM, 음향", img: temp04 },
  ],
  media: [{ name: "사역자 성함", role: "미디어팀 역할", img: temp02 }],
  administration: [{ name: "사역자 성함", role: "행정팀 역할", img: temp02 }],
};

const StaffCard = ({ staff }: { staff: any }) => (
  <div className="bg-white border border-slate-100 shadow-sm overflow-hidden font-sans">
    <div className="aspect-[3/4] relative overflow-hidden bg-slate-50">
      <img
        src={staff.img}
        alt={staff.name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="py-4 px-2 text-center">
      <h4 className="font-bold text-slate-900 text-[17px] mb-1 tracking-tight">
        {staff.name}
      </h4>
      <p className="text-[13px] text-slate-400 font-medium">{staff.role}</p>
    </div>
  </div>
);

export default function PastorPage() {
  return (
    <div className="bg-white pb-32 font-sans selection:bg-blue-50 selection:text-blue-900">
      {/* [섹션 1] 목사님 프로필 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 mb-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <div className="w-full lg:w-1/2 shrink-0">
            <div className="aspect-[3/4] w-full bg-[#E2E2E6] rounded-[2rem] overflow-hidden shadow-sm relative flex items-center justify-center p-6">
              <img
                src={pastor_ko} // 전신 사진
                alt="고성준 담임목사"
                className="w-full h-full object-contain transition-all duration-700"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 pt-2">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-baseline gap-3">
                <span className="text-lg md:text-xl font-medium text-slate-500">
                  담임목사
                </span>{" "}
                고성준
              </h2>
            </div>
            <div className="text-[15px] md:text-[17px] text-slate-600 leading-[1.8] break-keep space-y-8 mb-16 font-normal">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-6 tracking-wide">
                  학력 및 약력
                </h3>
                <ul className="space-y-3 text-[14px] md:text-[15px] text-slate-500">
                  <li>서울대 수학과 및 동 대학원 졸업</li>
                  <li>UC Berkeley(버클리) Ph.D.(박사)</li>
                  <li>대전침례신학교 목회 대학원 졸업(M.Div)</li>
                </ul>
              </div>
              <div className="md:pt-12">
                <ul className="space-y-3 text-[14px] md:text-[15px] text-slate-500">
                  <li>현 수원하나교회 담임목사</li>
                  <li>Come Mission 국제이사</li>
                  <li>난민사역 NGO Re-Hope 이사장</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          [섹션 2] 저서 소개 (정갈한 그리드 스타일)
          ========================================= */}
      <section className="bg-slate-50/50 py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-16">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              저서
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-12">
            {bookList?.map((book: any) => (
              <a
                key={book.id}
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col"
              >
                <div className="relative aspect-[1/1.45] w-full bg-white rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-500 mb-5 border border-slate-200/40">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    unoptimized={true}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/90 backdrop-blur-sm text-slate-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>

                <h4 className="text-[14px] md:text-[15px] font-bold text-slate-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {book.title}
                </h4>
                <p className="text-[12px] text-slate-400 leading-snug line-clamp-2 break-keep">
                  {book.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* [섹션 3] 섬기는 이들 */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-slate-900 mb-2">
            섬기는 이들
          </h3>
          <p className="text-slate-400 uppercase tracking-widest text-xs">
            Serving People
          </p>
        </div>

        {/* --- 팀별 렌더링 --- */}
        {Object.entries(staffTeams).map(([key, list]) => (
          <div key={key} className="mb-24">
            <div className="flex items-center gap-4 mb-10">
              <h4 className="text-xl font-bold text-slate-800 shrink-0">
                {key === "ministry"
                  ? "사역팀"
                  : key === "media"
                    ? "미디어팀"
                    : "행정팀"}
              </h4>
              <div className="h-px w-full bg-slate-100"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {list.map((staff, i) => (
                <StaffCard key={i} staff={staff} />
              ))}
            </div>
          </div>
        ))}

        <div className="pt-10 flex justify-end">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col items-center gap-2 text-slate-300 hover:text-blue-600 transition-colors"
          >
            <div className="p-3 rounded-full border border-slate-100">
              <ArrowUp size={20} />
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase">
              Top
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
