"use client";

import React from "react";
import { UserPlus, FileText, BookOpen, Users, Phone } from "lucide-react";

export default function WelcomeSection() {
  const steps = [
    {
      step: "STEP 01",
      title: "새가족\n담당 문의",
      desc: "로비 안내데스크\n또는 담당자에게 문의",
      icon: UserPlus,
      color: "bg-orange-500", // 뱃지 색상
      lightColor: "bg-orange-50", // 아이콘 배경
      iconColor: "text-orange-600", // 아이콘 색상
    },
    {
      step: "STEP 02",
      title: "새가족 프로그램\n신청",
      desc: "새가족 프로그램\n신청 카드 작성",
      icon: FileText,
      color: "bg-blue-600",
      lightColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      step: "STEP 03",
      title: "새가족\n교육",
      desc: "수원하나교회 가족이\n되는 6주 과정",
      icon: BookOpen,
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      step: "STEP 04",
      title: "환영 및\n셀 배정",
      desc: "수원하나 가족이\n되신 것을 환영합니다",
      icon: Users,
      color: "bg-purple-600",
      lightColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 섹션 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              처음 오셨나요?
            </h2>
            {/* <p className="mt-2 text-slate-500 text-lg">
              수원하나교회 방문을 환영합니다.
            </p> */}
          </div>

          {/* PC용 연락처 */}
          <div className="hidden md:flex items-center justify-end gap-4">
            <div className="text-right">
              <p className="text-sm text-slate-500 font-bold mb-1 uppercase tracking-wide">
                새가족 담당
              </p>
              <p className="text-lg md:text-xl text-slate-900 font-bold">
                신상철 목사{" "}
                <span className="text-slate-400 text-base font-normal ml-1">
                  010-2484-0776
                </span>
              </p>
            </div>
            {/* 담당자 프로필 이미지 (원형) */}
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md bg-slate-200">
              <img
                src="/images/pastor_sin.png"
                alt="신상철 목사"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 모바일용 연락처 카드 */}
        <div className="mb-6 p-6 bg-white rounded-2xl border border-slate-200 md:hidden text-center shadow-sm">
          <p className="text-sm text-slate-400 font-bold mb-1 flex items-center justify-center gap-1">
            새가족 담당 문의
          </p>
          <p className="text-lg font-bold text-slate-800">
            신상철 목사{" "}
            <a href="tel:010-2484-0776" className=" ml-1">
              010-2484-0776
            </a>
          </p>
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-white h-[320px] rounded-2xl p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 overflow-hidden"
            >
              {/* 상단 타이틀 & 설명 */}
              <div className="relative z-10">
                <h3 className="text-2xl font-extrabold text-slate-900 mb-3 leading-snug whitespace-pre-line">
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-slate-500 whitespace-pre-line leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* 하단 요소들 */}
              <div className="flex items-end justify-between mt-4 relative z-10">
                {/* 왼쪽 컬러 뱃지 (SK렌터카 스타일) */}
                <div
                  className={`px-3 py-1.5 ${item.color} text-white text-xs font-bold rounded shadow-sm transform group-hover:scale-105 transition-transform`}
                >
                  {item.step}
                </div>

                {/* 오른쪽 아이콘 */}
                <div
                  className={`w-16 h-16 ${item.lightColor} rounded-full flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon size={30} className={item.iconColor} />
                </div>
              </div>

              {/* (선택사항) 호버 시 배경에 은은한 장식 효과 */}
              <div
                className={`absolute -bottom-10 -right-10 w-40 h-40 ${item.lightColor} rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500 pointer-events-none`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

//  <section className="py-24 bg-slate-50 relative overflow-hidden">
//           {/* 배경 장식 */}
//           <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

//           <div className="max-w-7xl mx-auto px-6 relative z-10">
//             <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
//               <div>
//                 <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
//                   처음 오셨나요?
//                 </h2>
//               </div>
//               <div className="text-right hidden md:block">
//                 <p className="text-sm text-slate-400 font-medium">
//                   새가족 담당
//                 </p>
//                 <p className="text-lg font-bold text-slate-700">
//                   신상철 목사 010-2484-0776
//                 </p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {[
//                 {
//                   step: "01",
//                   title: "새가족 담당 문의",
//                   icon: UserPlus,
//                   desc: "로비 안내데스크 또는 담당자",
//                 },
//                 {
//                   step: "02",
//                   title: "카드 작성",
//                   icon: FileText,
//                   desc: "새가족 프로그램 신청카드 작성",
//                 },
//                 {
//                   step: "03",
//                   title: "새가족 교육",
//                   icon: BookOpen,
//                   desc: "6주 과정",
//                 },
//                 {
//                   step: "04",
//                   title: "환영 및 셀 배정",
//                   icon: Users,
//                   desc: "환영합니다",
//                 },
//               ].map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="group bg-white p-8 rounded-xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
//                 >
//                   {/* 배경 숫자 장식 (은은하게) */}
//                   <span className="absolute -bottom-6 -right-6 text-[7rem] font-bold text-slate-50 group-hover:text-blue-50/50 transition-colors select-none -z-10 font-mono">
//                     {item.step}
//                   </span>

//                   {/* 아이콘 */}
//                   <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
//                     <item.icon size={24} />
//                   </div>

//                   {/* 내용 */}
//                   <span className="block text-xs font-bold text-slate-400 tracking-wider mb-2">
//                     STEP {item.step}
//                   </span>
//                   <h4 className="font-bold text-xl text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
//                     {item.title}
//                   </h4>
//                   <p className="text-slate-500 text-sm leading-relaxed break-keep">
//                     {item.desc}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* 모바일용 담당자 연락처 */}
//             <div className="mt-8 p-6 bg-white rounded-2xl border border-slate-200 md:hidden text-center shadow-sm">
//               <p className="text-sm text-slate-400 font-medium mb-1">
//                 새가족 담당 문의
//               </p>
//               <p className="text-lg font-bold text-slate-800">
//                 신상철 목사{" "}
//                 <a
//                   href="tel:010-2484-0776"
//                   className="text-blue-600 underline decoration-2 underline-offset-4"
//                 >
//                   010-2484-0776
//                 </a>
//               </p>
//             </div>
//           </div>
//         </section>
