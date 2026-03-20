"use client";

import React from "react";
import { HeroSub } from "@/components/Common";

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white min-h-screen">
      <HeroSub
        title="훈련"
        desc="수원하나교회의 다양한 훈련 프로그램을 소개합니다."
      />
      <div className="max-w-content mx-auto px-6 py-20 md:py-24 animate-fade-in">
        {children}
      </div>
    </div>
  );
}
