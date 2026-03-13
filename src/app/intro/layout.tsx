"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { HeroSub } from "@/components/Common";

export default function IntroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // URL 경로에 따라 상단 서브타이틀을 동적으로 변경해주는 함수
  const getSubtitle = () => {
    if (pathname.includes("vision")) return "비전";
    if (pathname.includes("core-values")) return "핵심가치";
    if (pathname.includes("history")) return "교회연혁";
    // if (pathname.includes("pastor")) return "담임목사 소개";
    if (pathname.includes("staff")) return "섬기는 이들";
    if (pathname.includes("worship")) return "예배안내";
    if (pathname.includes("location")) return "오시는 길";
    return "";
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 상단 '교회소개 > 비전' 타이틀 영역 (유지) */}
      <HeroSub title="교회소개" subtitle={getSubtitle()} />

      <div className="w-full flex flex-col">{children}</div>
    </div>
  );
}
