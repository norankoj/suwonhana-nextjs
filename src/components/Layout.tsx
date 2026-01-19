"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, MapPin } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

// 메뉴 데이터 (경로는 Next.js 폴더 구조에 맞춰 수정됨)
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
      { name: "담임목사 소개", path: "/intro/pastor" },
      { name: "섬기는 이들", path: "/intro/staff" },
      { name: "예배안내", path: "/intro/worship" },
      { name: "오시는 길", path: "/intro/location" },
    ],
  },
  {
    name: "공동체",
    path: "/community/light",
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 로직: 메인 페이지("/")가 아니거나, 스크롤을 내렸을 때는 "어두운 글씨(Dark Text)" 모드
  const isMainPage = pathname === "/";
  const isDarkText = isScrolled || !isMainPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-0 " : "bg-transparent py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-[70px]">
        {/* 로고 */}
        <Link href="/" className="flex items-center space-x-2 h-10">
          <img
            src="/images/mainlogo-removebg-preview.png"
            className={`h-full w-auto object-contain transition-all ${
              isDarkText ? "" : "brightness-0 invert drop-shadow-md"
            }`}
            alt="logo"
          />
        </Link>

        {/* 데스크탑 메뉴 */}
        <nav className="hidden md:flex h-full items-center">
          {navItems.map((item) => (
            <div
              key={item.name}
              className={`relative group cursor-pointer h-full flex items-center ${
                item.name === "홈" ? "hidden" : ""
              }`}
            >
              <Link
                href={item.path}
                className={`flex items-center gap-1 text-[15px] font-medium px-4 py-2 transition-all  ${
                  isDarkText
                    ? "text-slate-600 hover:text-brand" // 검은 글씨 모드 + 호버 효과
                    : "text-slate-100 hover:text-white" // 흰 글씨 모드 + 호버 효과
                }`}
              >
                {item.name}
              </Link>
              {/* 드롭다운 메뉴 */}
              {item.sub.length > 0 && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-max min-w-[200px] z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden p-2">
                    {item.sub.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.path}
                        className={`block px-4 py-3 text-sm text-slate-600 rounded-lg hover:text-brand font-medium transition-colors cursor-pointer
                          ${
                            pathname === subItem.path
                              ? "bg-sky-50 text-brand font-bold" // 선택된 메뉴
                              : "text-slate-600 hover:text-brand" // 마우스 오버 시
                          }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button
          className={`md:hidden p-2 rounded-md transition-colors ${
            isDarkText ? "text-slate-900" : "text-white"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 모바일 메뉴 드롭다운 */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl py-4 px-6 md:hidden flex flex-col space-y-4 max-h-[80vh] overflow-y-auto text-slate-900">
          {navItems.map((item) => (
            <div key={item.name} className="border-b border-slate-100 pb-2">
              <Link
                href={item.path}
                className="block font-bold mb-2 cursor-pointer text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
              {item.sub.length > 0 && (
                <div className="flex flex-col space-y-2 pl-4">
                  {item.sub.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.path}
                      className="text-base text-slate-500 cursor-pointer py-1 block"
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
              className="mb-2 flex items-center cursor-pointer h-10"
            >
              <img
                src="/images/mainlogo-removebg-preview.png"
                className="h-full w-auto object-contain brightness-0 invert opacity-80"
                alt="logo"
              />
            </Link>
            <p className="ml-1 mb-6 leading-relaxed max-w-md text-sm">
              (17103) 경기도 용인시 기흥구 서그내로 53번길 30(서천동 395번지)
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">예배안내</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-6">
                <span className="text-slate-300 w-16">주일 1부</span>{" "}
                <span>09:00</span>
              </li>
              <li className="flex items-center gap-6">
                <span className="text-slate-300 w-16">주일 2부</span>{" "}
                <span>11:00</span>
              </li>
              <li className="flex items-center gap-6">
                <span className="text-slate-300 w-16">주일 3부</span>{" "}
                <span>14:30</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-xs">
          <p>© Copyright © 2025 수원하나교회. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
