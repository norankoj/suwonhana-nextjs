"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "말씀", path: "/sermon", sub: [] },
  {
    name: "교회소개",
    path: "/intro/vision",
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
    path: "/community",
    sub: [],
  },
  { name: "훈련", path: "/discipleship", sub: [] },
  {
    name: "교회소식",
    path: "/news",
    sub: [
      { name: "교회소식", path: "/news" },
      { name: "집회문의", path: "/news/inquiry" },
      { name: "FAQ", path: "/news/faq" },
    ],
  },
  {
    name: "부속기관",
    path: "/appendages/counseling",
    sub: [
      { name: "하나 상담실", path: "/appendages/counseling" },
      { name: "창업보육센터", path: "/appendages/entrepreneurship" },
      { name: "다니엘 아마츠", path: "/appendages/daniel-amatz" },
    ],
  },
];

export const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 메인 페이지에서 스크롤 전이면 투명 헤더
  const isTransparent = isHome && !isScrolled && !isMobileMenuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-20 flex items-center transition-all duration-500 ${
          isTransparent
            ? "bg-transparent border-transparent"
            : "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm"
        }`}
      >
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center h-full">
          <Link
            href="/"
            className="flex-shrink-0 flex items-center h-full py-3 md:py-4"
          >
            <img
              src="/images/mainlogo-removebg-preview.png"
              className={`h-full w-auto object-contain transition-all duration-500 ${
                isTransparent
                  ? "brightness-0 invert opacity-95"
                  : "hover:opacity-80"
              }`}
              alt="수원하나교회"
            />
          </Link>

          {/* 데스크탑 메뉴 */}
          <nav className="hidden md:flex items-center gap-6 h-full">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group h-full flex items-center"
              >
                <Link
                  href={item.path}
                  className={`flex items-center px-2 transition-all duration-200 text-sm font-semibold tracking-wide ${
                    pathname.startsWith(item.path)
                      ? isTransparent
                        ? "text-white"
                        : "text-slate-900"
                      : isTransparent
                        ? "text-white/80 hover:text-white"
                        : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {item.name}
                </Link>

                {item.sub.length > 0 && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 w-max min-w-[160px] z-50">
                    <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden p-1.5 mt-[-10px]">
                      {item.sub.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.path}
                          className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                            pathname === subItem.path
                              ? "bg-slate-50 text-slate-900 font-bold"
                              : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
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
            className={`md:hidden p-2 rounded-md -mr-2 transition-colors ${
              isTransparent
                ? "text-white hover:bg-white/10"
                : "text-slate-900 hover:bg-slate-50"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* 모바일 메뉴 — 오른쪽 슬라이드인 드로워 */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* 배경 오버레이 */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        {/* 드로워 패널 */}
        <div
          className={`absolute top-0 right-0 w-[280px] h-full bg-white shadow-2xl transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between h-16 px-5 border-b border-slate-100">
            <span className="text-sm font-bold text-slate-900 tracking-wide">
              메뉴
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <X size={22} className="text-slate-500" />
            </button>
          </div>
          <div className="flex flex-col py-4 px-3 overflow-y-auto h-[calc(100%-4rem)]">
            {navItems.map((item) => (
              <div key={item.name} className="mb-1">
                <Link
                  href={item.path}
                  className="block px-3 py-3 text-base font-bold text-slate-900 rounded-lg hover:bg-slate-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.sub.length > 0 && (
                  <div className="flex flex-col ml-3 mb-2">
                    {item.sub.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.path}
                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                          pathname === sub.path
                            ? "text-slate-900 font-bold bg-slate-50"
                            : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                        }`}
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
      </div>
    </>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div>
            <Link
              href="/"
              className="mb-4 flex items-center cursor-pointer h-10"
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
            {/* SNS 아이콘 */}
            <div className="flex items-center gap-3 ml-1">
              <a
                href="https://www.youtube.com/@suwonhana"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-slate-400"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/suwonhana_church"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-slate-400"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="md:text-right">
            <h4 className="text-white font-bold mb-4 text-sm tracking-wide">
              예배안내
            </h4>
            <p className="text-sm text-slate-500 leading-loose">
              주일예배 09:00 / 11:00 / 14:30
              <br />
              금요예배 21:00
            </p>
          </div>
        </div>
        <div className="border-t border-slate-800/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>© 2026 Suwon Hana Church. All rights reserved.</span>
          <Link
            href="/privacy"
            className="hover:text-slate-400 transition-colors"
          >
            개인정보처리방침
          </Link>
        </div>
      </div>
    </footer>
  );
};
