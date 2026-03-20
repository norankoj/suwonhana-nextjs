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

  const getPageTitle = () => {
    if (pathname.includes("vision")) return "비전";
    if (pathname.includes("core-values")) return "핵심가치";
    if (pathname.includes("history")) return "교회연혁";
    if (pathname.includes("staff")) return "섬기는 이들";
    if (pathname.includes("worship")) return "예배안내";
    if (pathname.includes("location")) return "오시는 길";
    return "교회소개";
  };

  return (
    <div className="bg-white min-h-screen">
      <HeroSub title={getPageTitle()} subtitle="교회소개" />
      <div className="w-full flex flex-col">{children}</div>
    </div>
  );
}
