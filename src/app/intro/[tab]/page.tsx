"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  ChevronDown,
  Clock,
  MapPin,
  Users,
  UserPlus,
  FileText,
  BookOpen,
  ExternalLink,
  Heart,
  Target,
  Quote,
  ChevronUp,
  Award,
  GraduationCap,
} from "lucide-react";
import { SimpleCarousel } from "@/components/Common";
import moment from "moment";
import "moment/locale/ko";
// 데이터 파일 경로 확인 (src/data/data.js)
import {
  bookList,
  coreValuePart1,
  coreValuePart2,
  historyData,
  vision,
} from "@/data/data";
import Image from "next/image";
// 이미지 경로 (public/images 폴더 기준)
const spastor_ko = "/images/spastor_ko.png";
const temp01 = "/images/yoon.jpg";
const temp02 = "/images/temp01.jpg";
const temp03 = "/images/temp02.jpg";
const temp04 = "/images/temp03.jpg";

export default function IntroContentPage() {
  const params = useParams();
  const tab = params.tab as string;

  // --- [데이터 및 헬퍼 함수] ---

  // 비전 슬라이드
  const visionSlides = [
    {
      src: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      altText: "Vision 1",
      key: 1,
    },
    {
      src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      altText: "Vision 2",
      key: 2,
    },
    {
      src: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      altText: "Vision 3",
      key: 3,
    },
  ];

  // 연혁 토글 기능
  const [expandedYears, setExpandedYears] = useState<number[]>(["2025"]);
  const toggleYear = (year: number) => {
    if (expandedYears.includes(year)) {
      setExpandedYears(expandedYears.filter((y) => y !== year));
    } else {
      setExpandedYears([...expandedYears, year]);
    }
  };

  const handleDecadeClick = (e: React.MouseEvent, decade: number) => {
    e.preventDefault(); // 기본 앵커 이동 방지

    // 1. 해당 연대(decade)에 속하는 연도들 중 가장 최신 연도 찾기
    // (historyData가 내림차순 정렬되어 있다고 가정할 때 첫 번째 만나는 해당 연대 연도)
    const targetYear = historyData?.find(
      (item: any) => Math.floor(item.year / 10) * 10 === decade,
    )?.year;

    // 2. 해당 연도가 있고, 아직 안 열려있다면 열기 (기존 열린거 유지하면서 추가)
    if (targetYear && !expandedYears.includes(targetYear)) {
      setExpandedYears((prev) => [...prev, targetYear]);
    }

    // 3. 부드럽게 스크롤 이동
    const element = document.getElementById(`decade-${decade}`);
    if (element) {
      // 헤더 높이(약 100px) 등을 고려하여 위치 보정
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // 핵심가치 아이템 컴포넌트
  // const CoreValueItem = ({ index, title, sub, desc }: any) => {
  //   const [isOpen, setIsOpen] = useState(false);
  //   return (
  //     <div className="flex gap-5 group items-start">
  //       <div
  //         className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl transition-colors duration-300 ${
  //           isOpen
  //             ? "bg-brand text-white"
  //             : "bg-slate-100 text-brand group-hover:bg-brand group-hover:text-white"
  //         }`}
  //       >
  //         {String(index).padStart(2, "0")}
  //       </div>
  //       <div className="flex-1 pt-1">
  //         <button
  //           onClick={() => setIsOpen(!isOpen)}
  //           className="flex items-center flex-wrap gap-2 text-xl font-bold text-slate-900 hover:text-brand transition-colors text-left w-full group/btn"
  //         >
  //           <span>{title}</span>
  //           {sub && (
  //             <span className="text-sm font-normal text-slate-500 mt-1">
  //               {sub}
  //             </span>
  //           )}
  //           <ChevronDown
  //             className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
  //               isOpen ? "rotate-180" : ""
  //             } group-hover/btn:text-brand`}
  //           />
  //         </button>
  //         <div
  //           className={`grid transition-[grid-template-rows] duration-300 ease-out ${
  //             isOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"
  //           }`}
  //         >
  //           <div className="overflow-hidden">
  //             <div className="bg-slate-50 rounded-lg p-6 border border-slate-100 text-slate-600 leading-relaxed text-justify shadow-sm whitespace-pre-line mt-2">
  //               {desc}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // 비전 아이템 컴포넌트
  const VisionItem = ({ index, title, sub, desc }: any) => {
    return (
      <div className="flex gap-5 group items-start">
        <div className="flex-1 pt-1">
          <h4 className="text-xl font-bold text-slate-900 mt-1 mb-4">
            {title}
          </h4>
          <div className="overflow-hidden">
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-100 text-slate-600 leading-relaxed text-justify shadow-sm whitespace-pre-line">
              {desc}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getVisionIcon = (index: number) => {
    switch (index) {
      case 1:
        return <Heart className="text-white" size={24} />;
      case 2:
        return <Target className="text-white" size={24} />;
      case 3:
        return <Users className="text-white" size={24} />;
      default:
        return <Heart className="text-white" size={24} />;
    }
  };

  const getVisionColor = (index: number) => {
    switch (index) {
      case 1:
        return "bg-rose-500 shadow-rose-200";
      case 2:
        return "bg-blue-600 shadow-blue-200";
      case 3:
        return "bg-emerald-500 shadow-emerald-200";
      default:
        return "bg-slate-500 shadow-slate-200";
    }
  };

  const CoreValueItem = ({ index, title, sub, desc }: any) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 h-fit">
        {/* 상단: 번호 + 부제 + 제목 */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-900 font-serif font-bold text-sm border border-slate-200 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shrink-0">
              {index < 10 ? `0${index}` : index}
            </span>
            {sub && (
              <span className="text-xs text-slate-400 font-medium tracking-tight line-clamp-1">
                {sub}
              </span>
            )}
          </div>

          <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
            {title}
          </h4>
        </div>

        {/* 본문: 접기/펼치기 로직 적용 */}
        <div className="relative">
          <div
            className={`text-slate-600 text-sm leading-7 text-justify break-keep transition-all duration-500 overflow-hidden ${
              isExpanded ? "max-h-[1000px]" : "max-h-[120px]" // 펼쳐지면 높이 제한 해제
            }`}
          >
            {desc}
          </div>

          {/* 그라데이션 효과 (접혀있을 때만 보임) */}
          {!isExpanded && (
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
          )}
        </div>

        {/* 더 보기 버튼 */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
        >
          {isExpanded ? (
            <>
              접기 <ChevronUp size={14} />
            </>
          ) : (
            <>
              더 보기 <ChevronDown size={14} />
            </>
          )}
        </button>
      </div>
    );
  };

  // --- [렌더링 시작] ---
  return (
    <>
      {/* 1. 비전 탭 */}
      {tab === "vision" && (
        <div className="animate-fade-in pb-20">
          {/* 1. 헤더 섹션 */}
          <div className="text-center mb-16 space-y-4">
            {/* [수정] 파란색 -> 검은색(슬레이트) 계열로 통일 */}
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-[0.2em] uppercase">
              Vision Statement
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mt-4">
              하나님을 <span>즐거워하고</span>
              <br className="hidden md:block" />그 분의 목적에{" "}
              <span>헌신하는 공동체</span>
            </h2>
            <div className="w-16 h-1 bg-slate-200 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* 2. 메인 이미지 (캐러셀) - [수정] 잘림 현상 해결 */}
          <div className="mb-20 relative max-w-6xl mx-auto">
            {/* 배경 장식 (조금 더 은은하게 변경) */}
            <div className="absolute inset-0 bg-slate-100 transform rotate-1 rounded-[2.5rem] scale-[0.98] translate-y-2 z-0"></div>

            {/* [중요 수정] aspect-ratio 클래스를 제거하여 이미지가 잘리지 않게 함 */}
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 bg-white">
              {/* 기존 변수명 visionSlides 사용 */}
              <SimpleCarousel items={visionSlides} />

              {/* 이미지 위 텍스트 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end justify-center pb-6 pointer-events-none">
                <p className="text-white/90 text-sm font-light tracking-wider">
                  Suwon Hana Church Vision 2026
                </p>
              </div>
            </div>
          </div>

          {/* 3. 비전 아이템 리스트 - [수정] 아이콘 제거 */}
          <div className="max-w-4xl mx-auto space-y-12">
            {vision?.map((item: any, idx: number) => {
              const index = idx + 1;
              return (
                <div
                  key={idx}
                  className="group flex flex-col md:flex-row gap-8 items-start p-8 md:p-10 bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1"
                >
                  {/* 왼쪽: 숫자 박스 ([수정] 아이콘 제거됨) */}
                  <div className="shrink-0 flex flex-row md:flex-col items-center gap-4">
                    <div className="text-5xl font-serif font-bold text-slate-100 select-none">
                      0{index}
                    </div>
                  </div>

                  {/* 오른쪽: 내용 */}
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                      {item.title}
                      <div className="h-px flex-1 bg-slate-100"></div>
                    </h3>

                    <p className="text-slate-600 leading-relaxed text-lg break-keep">
                      {item.desc}
                    </p>

                    {/* 성경 구절 박스 ([수정] 따옴표 아이콘 제거됨) */}
                    <div className="mt-6 relative bg-slate-50 rounded-xl p-6 pr-8">
                      <Quote
                        className="absolute top-4 left-4 text-slate-200"
                        size={24}
                        fill="currentColor"
                      />
                      <p className="relative z-10 text-slate-500 text-sm font-medium italic leading-relaxed pl-6 break-keep">
                        {/* 임시로 각 번호에 맞는 성경구절 매핑 */}
                        {index === 1 &&
                          "내가 여호와께 청하였던 한 가지 일 곧 그것을 구하리니 곧 나로 내 생전에 여호와의 집에 거하여 여호와의 아름다움을 앙망하며 그 전에서 사모하게 하실 것이라 (시편 27:4)"}
                        {index === 2 &&
                          "그러므로 너희는 가서 모든 족속으로 제자를 삼아 아버지와 아들과 성령의 이름으로 침례를 주고 내가 너희에게 분부한 모든 것을 가르쳐 지키게 하라 볼지어다 내가 세상 끝날까지 너희와 항상 함께 있으리라 하시니라 (마태복음 28:19~20)"}
                        {index === 3 &&
                          " 너희가 외인도 아니요 손도 아니요 오직 성도들과 동일한 시민이요 하나님의 권속(가족)이라(에베소서 2:19)"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* 2. 핵심가치 탭 */}
      {tab === "core-values" && (
        <div className="animate-fade-in pb-20">
          {/* 헤더 섹션 */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3 block">
              Core Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
              12가지 핵심가치
            </h2>
          </div>

          {/* [수정] 전체를 감싸는 컨테이너에 max-w-3xl를 주어 중앙 정렬 */}
          <div className="max-w-3xl mx-auto space-y-20">
            {/* Part 1 */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-slate-200"></div>
                <h3 className="text-xl font-bold text-slate-800 bg-white px-6 py-2 border border-slate-200 rounded-full shadow-sm whitespace-nowrap">
                  Part 1. 하나님을 향한 가치
                </h3>
                <div className="h-px flex-1 bg-slate-200"></div>
              </div>

              {/* [수정] grid-cols-1 로 변경하여 한 줄에 하나씩 배치 */}
              <div className="grid grid-cols-1 gap-8">
                {coreValuePart1?.map((item: any, idx: number) => (
                  <CoreValueItem
                    key={idx}
                    index={idx + 1}
                    title={item.title}
                    sub={item.sub}
                    desc={item.desc}
                  />
                ))}
              </div>
            </div>

            {/* Part 2 */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-slate-200"></div>
                <h3 className="text-xl font-bold text-slate-800 bg-white px-6 py-2 border border-slate-200 rounded-full shadow-sm whitespace-nowrap">
                  Part 2. 세상을 향한 가치
                </h3>
                <div className="h-px flex-1 bg-slate-200"></div>
              </div>

              {/* [수정] grid-cols-1 로 변경 */}
              <div className="grid grid-cols-1 gap-8">
                {coreValuePart2?.map((item: any, idx: number) => (
                  <CoreValueItem
                    key={idx}
                    index={idx + 7}
                    title={item.title}
                    sub={item.sub}
                    desc={item.desc}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 3. 교회연혁 탭 */}
      {tab === "history" && (
        <div className="animate-fade-in max-w-6xl mx-auto pb-20 relative">
          {/* 1. 헤더 */}
          <div className="text-center mb-16">
            <span className="inline-block py-1.5 px-4 rounded-full bg-slate-100 text-slate-900 text-xs font-bold tracking-[0.2em] uppercase border border-slate-200 mb-4">
              History
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              수원하나교회 발자취
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
              1992년부터 지금까지, 하나님의 은혜로 걸어온 시간들입니다.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
            {/* 2. 연대별 바로가기 (Sticky Nav) */}
            <div className="hidden lg:block w-32 shrink-0 sticky top-32">
              <div className="flex flex-col border-l-2 border-slate-100 py-2">
                {Array.from(
                  new Set(
                    historyData?.map(
                      (item: any) => Math.floor(item.year / 10) * 10,
                    ),
                  ),
                )
                  .sort((a: unknown, b: unknown) => Number(b) - Number(a))
                  .map((decade: any) => (
                    <a
                      key={String(decade)}
                      href={`#decade-${decade}`}
                      onClick={(e) => handleDecadeClick(e, decade)} // [수정] 핸들러 연결
                      className="pl-4 py-1.5 text-slate-400 hover:text-blue-600 hover:font-bold hover:border-l-2 hover:border-blue-600 hover:-ml-[2px] transition-all text-sm font-medium block text-left cursor-pointer"
                    >
                      {decade}년대
                    </a>
                  ))}
              </div>
            </div>

            {/* 3. 메인 타임라인 */}
            <div className="flex-1 w-full relative">
              {/* 수직선 */}
              <div className="absolute left-[19px] top-4 bottom-0 w-px bg-slate-200 z-0"></div>

              <div className="space-y-10">
                {historyData?.map((item: any, idx: number) => {
                  const isExpanded = expandedYears.includes(item.year);
                  const decade = Math.floor(item.year / 10) * 10;
                  // 연대 시작점 체크 (데이터가 내림차순 정렬이어야 정확함)
                  const isDecadeStart =
                    idx === 0 ||
                    Math.floor(historyData[idx - 1].year / 10) * 10 !== decade;

                  return (
                    <div
                      key={item.year}
                      id={isDecadeStart ? `decade-${decade}` : undefined} // 스크롤 타겟 ID
                      className="relative pl-12 scroll-mt-32 group"
                    >
                      {/* 타임라인 점 */}
                      <div
                        className={`absolute left-0 top-1.5 w-10 h-10 flex items-center justify-center z-10 bg-white transition-transform duration-300 ${isExpanded ? "scale-110" : "group-hover:scale-110"}`}
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded-full border-2 transition-colors duration-300 ${isExpanded || isDecadeStart ? "bg-blue-600 border-blue-600 shadow-md" : "bg-white border-slate-300 group-hover:border-blue-400"}`}
                        ></div>
                      </div>

                      {/* 연도 및 내용 */}
                      <div className="flex flex-col items-start">
                        {/* 연대 뱃지 */}
                        {isDecadeStart && (
                          <span className="mb-2 inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[11px] font-bold border border-blue-100">
                            {decade}s
                          </span>
                        )}

                        {/* 연도 버튼 */}
                        <button
                          onClick={() => toggleYear(item.year)}
                          className="flex items-center gap-3 group/btn mb-3"
                        >
                          <span
                            className={`text-2xl md:text-3xl font-bold transition-colors duration-300 font-mono tracking-tight ${isExpanded ? "text-slate-900" : "text-slate-300 group-hover/btn:text-slate-500"}`}
                          >
                            {item.year}
                          </span>
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 ${isExpanded ? "bg-slate-100 border-slate-200 rotate-180 text-slate-600" : "border-transparent text-slate-300 group-hover/btn:text-slate-400"}`}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2 4L6 8L10 4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </button>

                        {/* 내용 박스 */}
                        <div
                          className={`w-full grid transition-all duration-500 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                        >
                          <div className="overflow-hidden">
                            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:border-blue-100 transition-colors">
                              <ul className="space-y-3">
                                {item.events.map((event: any, eIdx: number) => (
                                  <li
                                    key={eIdx}
                                    className="flex items-start gap-3"
                                  >
                                    <span className="text-blue-500 font-bold text-sm shrink-0 font-mono mt-0.5">
                                      {moment(
                                        `${item.year}-${event.date}`,
                                        "YYYY-MM-DD",
                                      ).format("MM.DD")}
                                    </span>
                                    <span className="text-slate-700 text-sm leading-relaxed break-keep">
                                      {event.content}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="h-4"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 4. 담임목사 소개 탭 */}
      {tab === "pastor" && (
        <div className="animate-fade-in pb-20">
          {/* 1. 프로필 섹션 (박스형으로 변경) */}
          <div className="mb-24">
            {/* 배경 박스 추가 */}
            <div className="bg-slate-50  p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 items-center shadow-sm border border-slate-100">
              {/* 사진 영역 */}
              <div className="w-full lg:w-[380px] shrink-0">
                <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white aspect-[3/4] relative">
                  <img
                    src={spastor_ko} // 실제 이미지 경로 확인 필요
                    alt="고성준 담임목사"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* 텍스트 영역 */}
              <div className="flex-1 text-center lg:text-left">
                <div className="mb-8 border-b border-slate-200 pb-8">
                  <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-3 block">
                    Senior Pastor
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                    고성준{" "}
                    <span className="text-2xl text-slate-500 font-normal">
                      담임목사
                    </span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  {/* 학력 */}
                  <div>
                    <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4 uppercase tracking-wide">
                      학력
                    </h3>
                    <ul className="space-y-2 text-slate-600 text-sm md:text-base">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></span>
                        <span>서울대학교 수학과 및 동 대학원 졸업</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></span>
                        <span>미국 UC Berkeley 수학 박사 (Ph.D)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></span>
                        <span>대전침례신학대학교 M.Div 졸업</span>
                      </li>
                    </ul>
                  </div>

                  {/* 경력 */}
                  <div>
                    <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4 uppercase tracking-wide">
                      경력
                    </h3>
                    <ul className="space-y-2 text-slate-600 text-sm md:text-base">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                        <span>
                          <strong className="text-slate-900">
                            現 수원하나교회 담임목사
                          </strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></span>
                        <span>Come Mission 국제 이사</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></span>
                        <span>다니엘 훈련학교 (DSM) 대표</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></span>
                        <span>난민사역 NGO 리홉 이사장</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 저서 소개 섹션 (실제 이미지 버전) */}
          <div className="border-t border-slate-100 pt-12">
            <div className="flex items-end justify-between mb-8 px-1">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="text-slate-400" size={24} /> 저서 소개
                </h3>
              </div>
              <span className="hidden md:block text-slate-400 text-sm font-medium">
                Books by Senior Pastor
              </span>
            </div>

            {/* 책 리스트 그리드 */}
            <div className="flex md:grid md:grid-cols-4 lg:grid-cols-5 gap-6 overflow-x-auto md:overflow-visible pb-8 px-2 scrollbar-hide snap-x">
              {bookList?.map((book: any) => (
                <div
                  key={book.id}
                  className="shrink-0 w-[140px] md:w-auto flex flex-col group snap-start"
                >
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative"
                  >
                    {/* 실제 책 표지 이미지 컨테이너 */}
                    <div className="relative w-full aspect-[1/1.45] rounded-lg overflow-hidden shadow-sm border border-slate-100 group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300 bg-slate-50">
                      {book.image ? (
                        /* Next.js Image 컴포넌트 사용 */
                        <Image
                          src={book.image}
                          alt={book.title}
                          fill
                          sizes="(max-width: 768px) 140px, 200px"
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        /* 이미지가 없을 경우 대체 화면 */
                        <div className="flex items-center justify-center h-full bg-slate-100 text-slate-400 text-sm font-bold">
                          이미지 준비중
                        </div>
                      )}

                      {/* 호버 시 구매 버튼 오버레이 (어둡게 처리) */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                        <span className="text-white text-xs font-bold flex items-center gap-1 border border-white/70 px-3 py-1.5 rounded-full hover:bg-white hover:text-slate-900 transition-colors">
                          구매하기 <ExternalLink size={10} />
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* 책 제목 및 설명 (카드 하단) */}
                  <div className="mt-3 px-1 text-center md:text-left">
                    <h4 className="font-bold text-slate-900 text-sm md:text-base mb-1 truncate group-hover:text-blue-600 transition-colors">
                      {book.title}
                    </h4>
                    {book.desc && (
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 break-keep">
                        {book.desc}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* 5. 섬기는 이들 탭 */}
      {tab === "staff" && (
        <div className="space-y-16 animate-fade-in">
          <div className="bg-slate-50 p-8 md:p-12 rounded-3xl">
            <h3 className="text-2xl font-bold text-slate-900 text-center mb-10">
              사역팀{" "}
              <span className="text-slate-500 font-light ml-2 text-base">
                Ministry Team
              </span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { name: "윤성철 목사", role: "협동목사", img: temp01 },
                { name: "엘리야 한 목사", role: "EM, 예배팀", img: temp02 },
                { name: "김태환 전도사", role: "DSM, 중보기도팀", img: temp03 },
                { name: "김세빛 간사", role: "YCM, 음향", img: temp04 },
              ].map((staff, i) => (
                <div
                  key={i}
                  className="bg-white shadow-sm hover:shadow-md transition-all group cursor-pointer text-center"
                >
                  <div className="w-full aspect-[3/4] overflow-hidden bg-slate-200">
                    <img
                      src={staff.img}
                      alt={staff.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 border-t border-slate-100">
                    <h4 className="font-bold text-lg text-slate-900 mb-1">
                      {staff.name}
                    </h4>
                    <p className="text-sm text-slate-500">{staff.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* 6. 예배안내 탭 (Newcomer Guide + Service Times) */}
      {tab === "worship" && (
        <div className="space-y-16 animate-fade-in max-w-5xl mx-auto">
          {/* 새가족 등록 안내 */}
          <section>
            <div className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-sky-50 border border-sky-100 p-8 md:p-10 shadow-sm rounded-3xl">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-sky-100 rounded-full blur-3xl opacity-60"></div>
              <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
                <div className="flex-1 space-y-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-sky-100 text-brand text-xs font-bold rounded-l mb-3">
                      Welcome
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                      새신자 / 방문자 예배 참석 안내
                    </h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    수원하나교회에 처음 방문하여 예배에 참석하기 원하시는 분들은
                    <br className="hidden md:block" />
                    따뜻한 마음으로 환영합니다. 아래 담당 사역자에게 연락 주시면
                    친절히 안내해 드리겠습니다.
                  </p>
                  <p className="text-slate-800 leading-relaxed text-lg font-bold">
                    새가족부 담당: 신상철 목사 (010-2484-0776)
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {[
                {
                  title: "새가족 담당 문의",
                  icon: <UserPlus size={24} />,
                  step: "01",
                },
                {
                  title: "등록카드 작성",
                  icon: <FileText size={24} />,
                  step: "02",
                },
                {
                  title: "새가족 교육 (6주)",
                  icon: <BookOpen size={24} />,
                  step: "03",
                },
                { title: "셀 배정", icon: <Users size={24} />, step: "04" },
              ].map((s, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors">
                      {s.icon}
                    </div>
                    <span className="text-3xl font-bold text-slate-100 group-hover:text-slate-200 transition-colors">
                      {s.step}
                    </span>
                  </div>
                  <h4 className="font-bold text-lg text-slate-900">
                    {s.title}
                  </h4>
                </div>
              ))}
            </div>
          </section>

          {/* 예배 시간표 */}
          <section>
            <div className="flex flex-col md:flex-row md:items-end gap-3 mb-8 px-2">
              <h3 className="font-bold text-3xl text-slate-900">
                예배 시간 안내
              </h3>
              <span className="text-slate-400 font-medium text-sm pb-1 mb-1">
                Main Worship Service
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 주일예배 */}
              <div className="bg-white p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all rounded-2xl">
                <h4 className="text-2xl font-bold text-slate-900 mb-2">
                  자녀와 함께 드리는 열린예배
                </h4>
                <p className="text-slate-600 text-sm mb-6">
                  자녀들과 함께 드리는 예배로{" "}
                  <span className="text-brand font-bold">복음과 구원</span>에
                  초점을 맞춥니다.
                </p>
                <div className="bg-slate-50 p-4 text-sm space-y-2 rounded-xl">
                  <div className="flex justify-between">
                    <span className="text-slate-500">시간</span>
                    <span className="font-bold text-slate-800">
                      주일 09:00, 11:00, 14:30
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">장소</span>
                    <span className="font-bold text-slate-800">
                      본당 2층 대예배실
                    </span>
                  </div>
                </div>
              </div>

              {/* 금요예배 */}
              <div className="bg-white p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all rounded-2xl">
                <h4 className="text-2xl font-bold text-slate-900 mb-2">
                  금요예배
                </h4>
                <p className="text-slate-600 text-sm mb-6">
                  깊이 있는 말씀과 기도로{" "}
                  <span className="text-brand font-bold">영적 성숙</span>을
                  도모합니다.
                </p>
                <div className="bg-slate-50 p-4 text-sm space-y-2 rounded-xl">
                  <div className="flex justify-between">
                    <span className="text-slate-500">시간</span>
                    <span className="font-bold text-slate-800">
                      금요일 21:00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">장소</span>
                    <span className="font-bold text-slate-800">
                      본당 2층 대예배실
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      {/* 7. 오시는 길 탭 */}
      {tab === "location" && (
        <div className="space-y-12 animate-fade-in">
          <h3 className="font-bold text-2xl text-slate-900 flex items-center">
            수원하나교회 찾아오시는 길
          </h3>
          <div className="w-full h-[400px] bg-slate-100 overflow-hidden shadow-sm border border-slate-200 relative rounded-2xl">
            <iframe
              width="100%"
              height="100%"
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=경기도%20용인시%20기흥구%20서그내로%2053번길%2030&t=&z=15&ie=UTF8&iwloc=&output=embed"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              title="church-map"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>
          <div className="bg-white p-8 border border-slate-100 shadow-sm rounded-2xl">
            <h3 className="font-bold text-xl mb-6 text-slate-900">교회 위치</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500 font-bold mb-1">주소</p>
                <p className="text-lg text-slate-800">
                  (17103) 경기도 용인시 기흥구 서그내로 16번길 11-6
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-bold mb-1">
                  대표번호
                </p>
                <p className="text-lg text-slate-800">031 - 202 - 0697</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
