"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { HeroSub } from "@/components/Common";

export default function IntroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const currentTab = params.tab as string;

  const tabs = [
    { slug: "vision", name: "비전" },
    { slug: "core-values", name: "핵심가치" },
    { slug: "history", name: "교회연혁" },
    { slug: "pastor", name: "담임목사 소개" },
    { slug: "staff", name: "섬기는 이들" },
    { slug: "worship", name: "예배안내" },
    { slug: "location", name: "오시는 길" },
  ];

  const activeTabName = tabs.find((t) => t.slug === currentTab)?.name || "소개";

  return (
    <div className="bg-white min-h-screen">
      <HeroSub
        title="교회소개"
        subtitle="About Us"
        image="/images/background02.jpg"
      />

      <div className="max-w-7xl mx-auto px-6 py-10 md:py-20 flex flex-col md:flex-row gap-4 md:gap-12">
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-24">
            <div className="mb-6 pb-4 border-b-2 border-slate-900">
              <h3 className="text-2xl font-bold text-slate-900">
                {activeTabName}
              </h3>
              <span className="text-xs text-slate-400 font-medium tracking-wider uppercase mt-1 block">
                About Church
              </span>
            </div>

            {/* 모바일 메뉴 */}
            <div className="md:hidden overflow-x-auto border-b border-slate-200 mb-8 pb-1 scrollbar-hide">
              <div className="flex space-x-6 px-1">
                {tabs.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/intro/${t.slug}`}
                    className={`whitespace-nowrap pb-3 text-sm font-bold border-b-2 transition-all ${
                      currentTab === t.slug
                        ? "text-slate-900 border-slate-900"
                        : "text-slate-400 border-transparent"
                    }`}
                  >
                    {t.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* ✨ 데스크탑 메뉴 (수정됨: 회색 배경 박스형) */}
            <ul className="hidden md:flex flex-col space-y-1">
              {tabs.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/intro/${t.slug}`}
                    className={`block w-full text-left py-3 px-4 rounded-lg text-[15px] transition-all duration-200 ${
                      currentTab === t.slug
                        ? "bg-slate-100 text-slate-900 font-bold" // 선택됨: 회색 배경 + 진한 글씨
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800" // 기본
                    }`}
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex-1 min-h-[500px] animate-fade-in">{children}</div>
      </div>
    </div>
  );
}
