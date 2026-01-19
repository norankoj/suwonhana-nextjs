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
  const [expandedYears, setExpandedYears] = useState<string[]>(["2025"]);
  const toggleYear = (year: string) => {
    setExpandedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  // 핵심가치 아이템 컴포넌트
  const CoreValueItem = ({ index, title, sub, desc }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="flex gap-5 group items-start">
        <div
          className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl transition-colors duration-300 ${
            isOpen
              ? "bg-brand text-white"
              : "bg-slate-100 text-brand group-hover:bg-brand group-hover:text-white"
          }`}
        >
          {String(index).padStart(2, "0")}
        </div>
        <div className="flex-1 pt-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center flex-wrap gap-2 text-xl font-bold text-slate-900 hover:text-brand transition-colors text-left w-full group/btn"
          >
            <span>{title}</span>
            {sub && (
              <span className="text-sm font-normal text-slate-500 mt-1">
                {sub}
              </span>
            )}
            <ChevronDown
              className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              } group-hover/btn:text-brand`}
            />
          </button>
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
              isOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-100 text-slate-600 leading-relaxed text-justify shadow-sm whitespace-pre-line mt-2">
                {desc}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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

  // --- [렌더링 시작] ---
  return (
    <>
      {/* 1. 비전 탭 */}
      {tab === "vision" && (
        <div className="animate-fade-in">
          <div className="text-center mb-16">
            <span className="text-brand font-bold uppercase tracking-widest text-sm mb-4 block">
              VISION STATEMENT
            </span>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              하나님을 즐거워하고
              <br />그 분의 목적에 헌신하는 공동체
            </h2>
          </div>
          <div className="mb-16 rounded-3xl overflow-hidden shadow-lg max-w-5xl mx-auto border border-slate-100">
            <SimpleCarousel items={visionSlides} />
          </div>
          <div className="max-w-4xl mx-auto space-y-6 mb-16">
            {vision?.map((item: any, idx: number) => (
              <VisionItem
                key={idx}
                index={idx + 1}
                title={item.title}
                sub={item.sub}
                desc={item.desc}
              />
            ))}
          </div>
        </div>
      )}

      {/* 2. 핵심가치 탭 */}
      {tab === "core-values" && (
        <div className="space-y-20 animate-fade-in max-w-5xl mx-auto py-10">
          <div>
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px flex-1 bg-slate-200"></div>
              <h3 className="text-2xl font-bold text-slate-900 text-center px-4 py-2 bg-slate-50 rounded-lg">
                핵심가치 Part 1
              </h3>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>
            <div className="grid grid-cols-1 gap-x-12 gap-y-8">
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
          <div>
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px flex-1 bg-slate-200"></div>
              <h3 className="text-2xl font-bold text-slate-900 text-center px-4 py-2 bg-slate-50 rounded-lg">
                핵심가치 Part 2
              </h3>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>
            <div className="grid grid-cols-1 gap-x-12 gap-y-8">
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
      )}

      {/* 3. 교회연혁 탭 */}
      {tab === "history" && (
        <div className="animate-fade-in max-w-4xl mx-auto">
          <h3 className="font-bold text-2xl text-slate-900 flex items-center">
            교회연혁
          </h3>
          <div className="mt-2 mb-6">
            <p>
              우리가 섬기고 있는 수원하나침례교회는 기독교한국침례회에 소속된
              침례교회입니다.
            </p>
          </div>
          <div className="border-l-2 border-slate-200 pl-8 space-y-10 pb-12">
            {historyData?.map((item: any) => (
              <div key={item.year} className="relative">
                <div
                  className={`absolute -left-[41px] md:-left-[42px] w-5 h-5 rounded-full border-4 transition-colors duration-300 z-10 ${
                    expandedYears.includes(item.year)
                      ? "bg-white border-brand scale-110"
                      : "bg-slate-200 border-white"
                  }`}
                ></div>
                <div
                  onClick={() => toggleYear(item.year)}
                  className="flex items-center gap-4 cursor-pointer group select-none"
                >
                  <h3
                    className={`text-xl font-bold transition-colors duration-300 ${
                      expandedYears.includes(item.year)
                        ? "text-brand"
                        : "text-slate-400 group-hover:text-slate-500"
                    }`}
                  >
                    {item.year}
                  </h3>
                  <button
                    className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                      expandedYears.includes(item.year)
                        ? "bg-brand/10 text-brand rotate-180"
                        : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                    }`}
                  >
                    <ChevronDown size={18} />
                  </button>
                </div>
                {expandedYears.includes(item.year) && (
                  <div className="mt-6 animate-fade-in">
                    <ul className="space-y-4">
                      {item.events.map((event: any, idx: number) => (
                        <li
                          key={idx}
                          className="flex flex-col sm:flex-row sm:items-start gap-2"
                        >
                          <span className="text-slate-500 font-medium text-sm w-26 shrink-0">
                            {moment(
                              `${item.year}-${event.date}`,
                              "YYYY-MM-DD"
                            ).format("YYYY.MM.DD")}
                          </span>
                          <span className="text-slate-800 whitespace-pre-line leading-relaxed text-sm">
                            {event.content}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. 담임목사 소개 탭 */}
      {tab === "pastor" && (
        <div className="animate-fade-in-up space-y-16">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-full md:w-[320px] shrink-0">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-50 relative group">
                <img
                  src={spastor_ko}
                  alt="고성준 담임목사"
                  className="w-full h-auto object-cover aspect-[4/5] transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-6 pb-6 border-b border-slate-100">
                <h2 className="text-3xl font-bold text-slate-900 flex items-end gap-3 mb-2">
                  고성준{" "}
                  <span className="text-lg text-slate-500 font-normal mb-1">
                    담임목사
                  </span>
                </h2>
                <p className="text-brand font-medium text-sm tracking-widest uppercase">
                  Senior Pastor. Ko Sung Jun
                </p>
              </div>
              <div className="space-y-6 text-slate-600 leading-relaxed text-justify text-base">
                <p>
                  서울대 수학과와 동 대학원을 졸업했으며 국비유학생에 선발되어
                  미국 UC버클리에서 수학 박사 학위(Ph.D)를 받았다.
                  대전침례신학대학교(M.Div)을 졸업했으며 현재 수원하나교회
                  담임목사이자 Come Mission 국제 이사로 섬기고 있다.
                </p>
                <p>
                  선교사들을 훈련하는 다니엘훈련학교(Daniel School of Ministry),
                  난민 사역을 위한 NGO 리홉(ReHope)을 발족하여 활동하고 있다.
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-10">
            <div className="flex items-center justify-between mb-8 px-1">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  저서 소개
                </h3>
              </div>
            </div>
            <div className="flex md:grid md:grid-cols-6 gap-4 overflow-x-auto md:overflow-visible pb-4 px-1 scrollbar-hide snap-x">
              {bookList?.map((book: any) => (
                <div
                  key={book.id}
                  className="shrink-0 w-[140px] md:w-auto flex flex-col group snap-start"
                >
                  <div
                    className={`w-full aspect-[1/1.4] rounded-lg shadow-sm mb-3 overflow-hidden relative ${book.color} flex items-center justify-center text-center p-2 border border-slate-100`}
                  >
                    <div className="group-hover:scale-105 transition-transform duration-300">
                      <span className="font-serif font-bold text-slate-700 text-sm md:text-base leading-tight block mb-2 break-keep">
                        {book.title}
                      </span>
                      <div className="w-8 h-0.5 bg-slate-400 mx-auto opacity-50"></div>
                    </div>
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]"
                    >
                      <span className="bg-white text-slate-900 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold flex items-center gap-1 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        구매하기
                      </span>
                    </a>
                  </div>
                  <div className="px-1">
                    <h4 className="font-bold text-slate-900 text-sm md:text-base mb-1 truncate">
                      {book.title}
                    </h4>
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
                  (17103) 경기도 용인시 기흥구 서그내로 53번길 30 (서천동
                  395번지)
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
