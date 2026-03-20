"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { SimpleCarousel } from "@/components/Common";
import { groups } from "@/data/data";
import { ArrowRight, Instagram } from "lucide-react";

export default function CommunityContentPage() {
  const params = useParams();
  const tab = params.tab as string;
  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. 현재 탭 데이터 가져오기
  const tabMap: Record<string, string> = {
    light: "빛의 군대",
    joshua: "여호수아의 군대",
    moses: "모세의 군대",
    em: "EM",
  };
  const activeTabName = tabMap[tab] || "빛의 군대";
  const currentGroupData =
    groups.find((g) => g.subtitle === activeTabName) || groups[0];

  // 2. 선택된 소그룹 상태 관리
  const [selectedGroup, setSelectedGroup] = useState(currentGroupData.items[0]);

  // URL 쿼리에 따라 상태 동기화
  useEffect(() => {
    if (currentGroupData && currentGroupData.items.length > 0) {
      const idParam = searchParams.get("id");
      if (idParam) {
        const item = currentGroupData.items.find(
          (i) => String(i.id) === idParam,
        );
        if (item) setSelectedGroup(item);
      } else {
        setSelectedGroup(currentGroupData.items[0]);
      }
    }
  }, [currentGroupData, searchParams]);

  // 탭 변경 핸들러
  const handleGroupChange = (item: any) => {
    setSelectedGroup(item);
    router.replace(`/community/${tab}?id=${item.id}`, { scroll: false });
  };

  return (
    <div className="animate-fade-in pb-10">
      {/* 전체 레이아웃: PC에서는 좌우 분할, 모바일에서는 상하 배치 */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-stretch min-h-[600px]">
        {/* [LEFT] 텍스트 및 네비게이션 영역 (디자인 개선) */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center order-2 lg:order-1 py-4 lg:py-8">
          {/* 상단 텍스트 콘텐츠 */}
          <div className="space-y-8 animate-fade-in" key={selectedGroup.id}>
            {/* 타이틀 헤더 */}
            <div>
              {/* 장식용 바 */}
              <div className="w-10 h-1 bg-blue-600 mb-6 rounded-full"></div>

              <span className="text-blue-600 font-bold text-xs tracking-[0.15em] uppercase mb-3 block font-mono">
                {selectedGroup.eng || activeTabName}
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.1] break-keep tracking-tight">
                {selectedGroup.name}
              </h2>
            </div>

            {/* 부제 (강조 및 구분선 추가) */}
            {selectedGroup.sub && (
              <div className="relative py-1">
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug">
                  {selectedGroup.sub}
                </h3>
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-slate-200"></div>
              </div>
            )}

            {/* 본문 (가독성 개선: 줄간격, 폰트두께 조절) */}
            <div className="text-slate-600 leading-loose text-[15px] md:text-base font-medium break-keep text-justify space-y-4">
              {selectedGroup.desc.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>

          {/* 하단 탭 네비게이션 (레퍼런스 스타일 유지) */}
          <div className="mt-16 pt-8 border-t border-slate-100">
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {currentGroupData.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleGroupChange(item)}
                  className={`text-sm md:text-[15px] font-bold transition-colors duration-300 text-left relative group ${
                    selectedGroup.id === item.id
                      ? "text-slate-900" // 선택됨
                      : "text-slate-300 hover:text-slate-500" // 기본
                  }`}
                >
                  {item.name}
                  {/* 선택된 항목 하단 점 표시 */}
                  {selectedGroup.id === item.id && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-slate-900 rounded-full"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* [RIGHT] 이미지 영역 (기존 유지) */}
        <div className="w-full lg:w-[60%] order-1 lg:order-2 h-auto lg:h-auto min-h-[400px]">
          <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl group animate-fade-in bg-slate-100">
            {/* 이미지 (꽉 차게) */}
            <div className="absolute inset-0">
              <SimpleCarousel
                items={[
                  {
                    src: selectedGroup.img,
                    altText: selectedGroup.name,
                    key: 1,
                  },
                ]}
                // SimpleCarousel 내부 img에 className="w-full h-full object-cover"가 적용되어야 베스트입니다.
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* 오버레이 버튼들 */}
            <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase hidden md:block">
                {selectedGroup.eng}
              </div>
              <a
                href="#"
                className="flex items-center gap-2 bg-white/20 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md border border-white/30 px-6 py-3 rounded-full transition-all duration-300 group/btn"
              >
                <span className="text-xs font-bold tracking-widest uppercase">
                  Instagram
                </span>
                <ArrowRight
                  size={14}
                  className="transform group-hover/btn:translate-x-1 transition-transform"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
