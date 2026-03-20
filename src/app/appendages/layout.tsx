"use client";

import React from "react";
import { useParams } from "next/navigation";
import { HeroSub } from "@/components/Common";

export default function AppendagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const currentTab = params.tab as string;

  const getPageTitle = () => {
    if (currentTab === "counseling") return "하나 상담실";
    if (currentTab === "entrepreneurship") return "창업보육센터";
    if (currentTab === "daniel-amatz") return "다니엘 아마츠";
    return "부속기관";
  };

  return (
    <div className="bg-white min-h-screen">
      <HeroSub title={getPageTitle()} />
      <div className="w-full max-w-content mx-auto px-6 py-12 md:py-20 animate-fade-in">
        {children}
      </div>
    </div>
  );
}
