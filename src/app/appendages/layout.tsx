"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { HeroSub } from "@/components/Common";

export default function AppendagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const currentTab = params.tab as string;

  const tabs = [
    { slug: "counseling", name: "하나 상담실" },
    { slug: "daniel-amatz", name: "다니엘 아마츠" },
  ];

  const activeTabName =
    tabs.find((t) => t.slug === currentTab)?.name || "부속기관";

  return (
    <div className="bg-white min-h-screen">
      <HeroSub
        title="부속기관"
        subtitle="Affiliated Organizations"
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
                Organization
              </span>
            </div>

            {/* 모바일 메뉴 */}
            <div className="md:hidden overflow-x-auto border-b border-slate-200 mb-8 pb-1 scrollbar-hide">
              <div className="flex space-x-6 px-1">
                {tabs.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/appendages/${t.slug}`}
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

            {/* ✨ 데스크탑 메뉴 (수정됨) */}
            <ul className="hidden md:flex flex-col space-y-1">
              {tabs.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/appendages/${t.slug}`}
                    className={`block w-full text-left py-3 px-4 rounded-lg text-[15px] transition-all duration-200 ${
                      currentTab === t.slug
                        ? "bg-slate-100 text-slate-900 font-bold"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
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
