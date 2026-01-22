"use client";

import React from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { HeroSub } from "@/components/Common";

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const currentTab = params.tab as string;

  // 헤더 제목 표시를 위한 데이터
  const tabs = [
    { slug: "wednesday", name: "수요예배" },
    { slug: "dsm", name: "DSM" },
  ];

  const activeTabName = tabs.find((t) => t.slug === currentTab)?.name || "훈련";

  return (
    <div className="bg-white min-h-screen">
      {/* 1. 상단 배너 (PageHeader) */}
      <HeroSub
        title="훈련"
        desc="수원하나교회의 다양한 훈련 프로그램을 소개합니다."
      />

      {/* 2. 본문 영역 */}
      {/* py-12 -> py-20~24로 늘려서 헤더와 본문 사이 숨통을 틔워줍니다 */}
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-24 animate-fade-in">
        {children}
      </div>
    </div>
  );
}
