"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

// 메뉴 데이터 (기본 유지)
const navItems = [
  { name: "홈", path: "/", sub: [] },
  { name: "말씀", path: "/sermon", sub: [] },
  {
    name: "교회소개",
    path: "/intro/pastor",
    sub: [
      { name: "비전", path: "/intro/vision" },
      { name: "핵심가치", path: "/intro/core-values" },
      { name: "교회연혁", path: "/intro/history" },
      { name: "섬기는 이들", path: "/intro/staff" },
      { name: "예배안내", path: "/intro/worship" },
      { name: "오시는 길", path: "/intro/location" },
    ],
  },
  {
    name: "공동체",
    path: "/community/light",
    isMega: true,
    megaData: [
      {
        category: "빛의 군대",
        items: [
          { name: "조이베이비", path: "/community/light#joybaby" },
          {
            name: "조이코너",
            path: "/community/light#joycorner",
            image: "/images/corner.jpg",
          },
          { name: "조이랜드", path: "/community/light#joyland" },
        ],
      },
      {
        category: "여호수아의 군대",
        items: [
          { name: "YCM", path: "/community/joshua#ycm" },
          { name: "UCM", path: "/community/joshua#ucm" },
        ],
      },
      {
        category: "모세의 군대",
        items: [
          { name: "1진 청년 1부", path: "/community/moses#1jin_1" },
          { name: "1진 청년 2부", path: "/community/moses#1jin_2" },
          { name: "2진", path: "/community/moses#2jin" },
          { name: "3진", path: "/community/moses#3jin" },
        ],
      },
      {
        category: "EM",
        items: [{ name: "EM", path: "/community/em#em" }],
      },
    ],
    sub: [
      { name: "빛의 군대", path: "/community/light" },
      { name: "여호수아의 군대", path: "/community/joshua" },
      { name: "모세의 군대", path: "/community/moses" },
      { name: "EM", path: "/community/em" },
    ],
  },
  {
    name: "훈련",
    path: "/discipleship/wednesday",
    sub: [
      { name: "훈련", path: "/discipleship/wednesday" },
      { name: "DSM", path: "/discipleship/dsm" },
    ],
  },
  { name: "교회소식", path: "/news", sub: [] },
  {
    name: "부속기관",
    path: "/appendages/counseling",
    sub: [
      { name: "하나 상담실", path: "/appendages/counseling" },
      { name: "다니엘 아마츠", path: "/appendages/daniel-amatz" },
    ],
  },
];

export const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [megaMenuTab, setMegaMenuTab] = useState("빛의 군대");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 h-20 md:h-24 flex items-center shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center h-full">
        <Link
          href="/"
          className="flex-shrink-0 flex items-center h-full py-3 md:py-4"
        >
          <img
            src="/images/mainlogo-removebg-preview.png"
            className="h-full w-auto object-contain hover:opacity-80 transition-opacity"
            alt="수원하나교회"
          />
        </Link>

        {/* 데스크탑 메뉴 */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          {navItems.map((item) => (
            <div
              key={item.name}
              className={`relative group h-full flex items-center ${
                item.name === "홈" ? "hidden" : ""
              }`}
            >
              <Link
                href={item.path}
                className={`flex items-center px-2 transition-all duration-200 text-lg font-bold tracking-tight ${
                  pathname.startsWith(item.path)
                    ? "text-blue-700"
                    : "text-slate-800 hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>

              {item.isMega ? (
                <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 w-[680px] z-50">
                  {/* 🔥 이미지 너비를 고려해 전체폭을 650px -> 680px로 살짝 켰습니다. */}
                  <div className="bg-white rounded-xl shadow-2xl border border-slate-200 flex mt-[-10px] min-h-[300px] overflow-hidden">
                    {/* --- 좌측 카테고리 (보내주신 코드 유지) --- */}
                    <div className="w-[180px] bg-white flex flex-col shrink-0 relative">
                      {item.megaData?.map((mega) => (
                        <button
                          key={mega.category}
                          onMouseEnter={() => setMegaMenuTab(mega.category)}
                          className={`text-left px-6 py-5 border-b border-slate-100 last:border-b-0 text-[16px] transition-all w-full relative z-10 ${
                            megaMenuTab === mega.category
                              ? "font-bold text-blue-600 bg-slate-50"
                              : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                          }`}
                        >
                          {mega.category}
                        </button>
                      ))}
                      <div className="absolute top-0 right-0 w-[1px] h-full bg-slate-200 z-0"></div>
                    </div>

                    <div className="flex-1 p-8 bg-slate-50 border-l border-slate-200">
                      <h5 className="text-xl font-bold text-slate-900 mb-8">
                        {megaMenuTab}
                      </h5>

                      {/* 간격을 gap-6으로 넓히고 padding-bottom을 주어 이미지가 덜 답답하게 함 */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pb-4">
                        {item.megaData
                          ?.find((m) => m.category === megaMenuTab)
                          ?.items.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.path}
                              // 🔥 기존 aspect-[2/1] 박스 형태를 버리고, flex-col로 세로 배치
                              // 호버 시 살짝 떠오르는 에니메이션 추가
                              className="group/item flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1"
                            >
                              {/* 🔥 누끼 이미지 컨테이너 */}
                              <div className="relative w-full h-24 mb-3 flex items-center justify-center overflow-hidden">
                                {subItem.image ? (
                                  <Image
                                    src={subItem.image}
                                    alt={subItem.name}
                                    fill // 부모 div를 꽉 채우되
                                    className="object-contain transition-transform duration-300 group-hover/item:scale-110"
                                    //object-contain으로 누끼 이미지가 잘리지 않고 비율유지하게 함. 호버 시 이미지 살짝 확대
                                    sizes="(max-w-7xl) 20vw"
                                  />
                                ) : (
                                  // 이미지가 없는 경우를 대비한 대체 박스
                                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-xs text-slate-400">
                                    No Img
                                  </div>
                                )}
                              </div>

                              {/* 🔥 부서명 텍스트 (호버 시 파란색) */}
                              <span className="text-[15px] font-bold text-slate-800 group-hover/item:text-blue-600 transition-colors break-keep text-center px-1">
                                {subItem.name}
                              </span>
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : item.sub.length > 0 ? (
                // --- 일반 드롭다운 메뉴 ---
                <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 w-max min-w-[200px] z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden p-2 mt-[-10px]">
                    {item.sub.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.path}
                        className={`block px-4 py-3 text-[16px] font-medium rounded-lg transition-colors cursor-pointer ${
                          pathname === subItem.path
                            ? "bg-blue-50 text-blue-600 font-bold"
                            : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button
          className="md:hidden p-2 text-slate-900 rounded-md hover:bg-slate-50 -mr-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* 모바일 메뉴 드롭다운 */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 md:top-24 left-0 w-full bg-white shadow-xl border-t border-slate-100 h-[calc(100vh-5rem)] overflow-y-auto z-40 md:hidden animate-fade-in">
          <div className="flex flex-col p-6 space-y-6 pb-20">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="border-b border-slate-50 pb-4 last:border-0"
              >
                <Link
                  href={item.path}
                  className="block text-xl font-bold mb-3 text-slate-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.sub.length > 0 && (
                  <div className="flex flex-col space-y-3 pl-4 border-l-2 border-slate-100 ml-1">
                    {item.sub.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.path}
                        className="text-base text-slate-500 hover:text-blue-600 font-medium py-1 block"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <Link
              href="/"
              className="mb-4 flex items-center cursor-pointer h-12"
            >
              <img
                src="/images/mainlogo-removebg-preview.png"
                className="h-full w-auto object-contain brightness-0 invert opacity-90"
                alt="logo"
              />
            </Link>
            <p className="ml-1 mb-6 leading-relaxed max-w-md text-sm text-slate-500">
              (17103) 경기도 용인시 기흥구 서그내로 16번길 11-6
              <br />
              Tel: 031-203-3693 | Fax: 031-203-3694
            </p>
          </div>
          <div className="md:text-right">
            <h4 className="text-white font-bold mb-6 text-lg">예배안내</h4>
            <ul className="space-y-3 text-sm inline-block text-left">
              <li className="flex items-center gap-8">
                <span className="text-slate-500 font-bold w-20">주일 1부</span>{" "}
                <span className="text-slate-300">09:00</span>
              </li>
              <li className="flex items-center gap-8">
                <span className="text-slate-500 font-bold w-20">주일 2부</span>{" "}
                <span className="text-slate-300">11:00</span>
              </li>
              <li className="flex items-center gap-8">
                <span className="text-slate-500 font-bold w-20">주일 3부</span>{" "}
                <span className="text-slate-300">14:30</span>
              </li>
              <li className="flex items-center gap-8">
                <span className="text-slate-500 font-bold w-20">금요예배</span>{" "}
                <span className="text-slate-300">21:00</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800/50 pt-8 text-center text-xs text-slate-600">
          <p>© 2025 Suwon Hana Church. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
