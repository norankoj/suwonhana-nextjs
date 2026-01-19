"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { SimpleCarousel } from "@/components/Common";
import { groups } from "@/data/data";

export default function CommunityContentPage() {
  const params = useParams();
  const tab = params.tab as string;
  const searchParams = useSearchParams();
  const router = useRouter();

  // 현재 탭에 맞는 데이터 찾기
  const tabMap: Record<string, string> = {
    light: "빛의 군대",
    joshua: "여호수아의 군대",
    moses: "모세의 군대",
    em: "EM",
  };

  const activeTabName = tabMap[tab] || "빛의 군대";
  const currentGroupData =
    groups.find((g) => g.subtitle === activeTabName) || groups[0];

  const [selectedGroup, setSelectedGroup] = useState(currentGroupData.items[0]);

  // URL 쿼리(?id=...) 변경 시 컨텐츠 업데이트
  useEffect(() => {
    if (currentGroupData && currentGroupData.items.length > 0) {
      const idParam = searchParams.get("id");
      if (idParam) {
        const item = currentGroupData.items.find(
          (i) => String(i.id) === idParam
        );
        if (item) setSelectedGroup(item);
      } else {
        setSelectedGroup(currentGroupData.items[0]);
      }
    }
  }, [currentGroupData, searchParams]);

  return (
    <div className="animate-fade-in">
      {/* 상단 소그룹 선택 버튼 (서브 탭) */}
      <div className="mb-8 flex flex-wrap gap-2">
        {currentGroupData.items.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setSelectedGroup(item);
              // URL만 업데이트 (새로고침 X)
              router.replace(`/community/${tab}?id=${item.id}`, {
                scroll: false,
              });
            }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${
              selectedGroup.id === item.id
                ? "bg-brand text-white border-brand shadow-md"
                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* 상세 내용 표시 */}
      {selectedGroup && (
        <div key={selectedGroup.id} className="animate-fade-in">
          <h4 className="text-4xl font-bold text-slate-900 mb-2">
            {selectedGroup.name}
          </h4>
          <p className="text-brand font-medium tracking-wide uppercase mb-6">
            {selectedGroup.eng}
          </p>

          <div className="mb-8 overflow-hidden shadow-lg border border-slate-100 rounded-2xl">
            <SimpleCarousel
              items={[
                {
                  src: selectedGroup.img,
                  altText: selectedGroup.name,
                  key: 1,
                },
              ]}
            />
          </div>

          <div className="pl-2 space-y-6">
            {selectedGroup.sub && (
              <div className="text-xl font-bold text-slate-800 whitespace-pre-line border-l-4 border-brand pl-4">
                {selectedGroup.sub}
              </div>
            )}

            {selectedGroup.slogan && (
              <div className="italic text-slate-600 font-medium whitespace-pre-line bg-slate-50 p-6 rounded-xl border border-slate-100">
                "{selectedGroup.slogan}"
              </div>
            )}

            <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">
              {selectedGroup.desc}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
