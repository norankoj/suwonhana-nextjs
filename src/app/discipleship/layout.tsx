"use client";

import React from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const currentTab = params.tab as string;

  // 헤더 제목 표시를 위한 데이터
  const tabs = [
    { slug: "wednesday", name: "훈련" },
    { slug: "dsm", name: "DSM" },
  ];

  const activeTabName = tabs.find((t) => t.slug === currentTab)?.name || "훈련";

  return (
    <div className="bg-white min-h-screen">
      {/* 1. 상단 배너 (PageHeader) */}
      <PageHeader
        depth1="훈련"
        depth2={activeTabName}
        pageTitle="예수님의 말씀으로 훈련합니다"
        pageDesc="하나님의 사람을 세우는 교육과 참된 행복을 주는 말씀 훈련"
        bgImage="/images/background01.jpg"
      />

      {/* 2. 본문 영역 (사이드바 없이 넓게 사용) */}
      {/* max-w-7xl: 최대 너비 제한 / mx-auto: 중앙 정렬 / px-6: 좌우 여백 */}
      <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
        {children}
      </div>
    </div>
  );
}
