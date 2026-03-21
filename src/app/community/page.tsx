"use client";

import React, { Suspense } from "react";
import { Users, Clock, MapPin } from "lucide-react";
import { groups } from "@/data/data";
import { useSearchParams } from "next/navigation";

function CommunityContent() {
  const searchParams = useSearchParams();
  const activeId = searchParams.get("id") || "joybaby";

  const allItems = groups.flatMap((group) =>
    group.items.map((item) => ({
      ...item,
      groupName: group.subtitle,
    } as Record<string, unknown> & {
      id: string;
      name: string;
      age: string;
      sub: string;
      desc: string;
      img: string;
      groupName: string;
      eng?: string;
      slogan?: string;
    })),
  );

  const filteredItems = allItems.filter((item) => item.id === activeId);

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32">
      {filteredItems.map((item) => {
        const subParts = item.sub ? item.sub.split("\n") : [];
        const slogan = subParts[0] ? subParts[0].trim() : "";
        const infoLine = subParts.length > 1 ? subParts[1].trim() : "";
        const infos = infoLine
          ? infoLine.split(",").map((s: string) => s.trim())
          : [];

        return (
          <section
            key={`${item.id}-${activeId}`}
            id={item.id}
            className="animate-fade-in"
          >
            {/* 공동체명 + 영문 */}
            <div className="mb-6">
              {item.eng && (
                <p className="text-xs font-bold tracking-[0.25em] text-slate-400 uppercase mb-2">
                  {item.eng}
                </p>
              )}
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                {item.name}
              </h2>
            </div>

            {/* 히어로 이미지 */}
            <div className="mb-10 relative w-full aspect-video md:aspect-[21/9] overflow-hidden bg-slate-100">
              <img
                src={item.img}
                alt={`${item.name} 대표 사진`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <span className="text-xs font-bold tracking-[0.2em] text-white/70 uppercase">
                  {item.groupName}
                </span>
              </div>
            </div>

            {/* 정보 + 본문 */}
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 pt-2">
              {/* 왼쪽: 슬로건 + 인포 */}
              <div className="lg:w-[320px] shrink-0">
                {slogan && (
                  <h3 className="text-xl md:text-2xl font-extrabold mb-6 leading-snug break-keep text-slate-900 border-l-4 border-slate-900 pl-4">
                    {slogan}
                  </h3>
                )}

                {infos.length > 0 && (
                  <div className="flex flex-col divide-y divide-slate-100 border border-slate-100">
                    {infos[0] && (
                      <div className="flex items-center gap-3 py-3 px-4 text-sm text-slate-700">
                        <Users size={15} className="text-slate-400 shrink-0" />
                        <span className="font-medium">{infos[0]}</span>
                      </div>
                    )}
                    {infos[1] && (
                      <div className="flex items-center gap-3 py-3 px-4 text-sm text-slate-700">
                        <Clock size={15} className="text-slate-400 shrink-0" />
                        <span className="font-medium">{infos[1]}</span>
                      </div>
                    )}
                    {infos[2] && (
                      <div className="flex items-center gap-3 py-3 px-4 text-sm text-slate-700">
                        <MapPin size={15} className="text-slate-400 shrink-0" />
                        <span className="font-medium">{infos[2]}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 오른쪽: 본문 */}
              <div className="flex-1 text-[15px] md:text-base text-slate-600 leading-loose break-keep space-y-4">
                {item.desc.split("\n").map((line: string, i: number) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default function CommunityPage() {
  return (
    <div className="bg-white min-h-screen pt-32 md:pt-40 pb-20 font-sans text-slate-900">
      <Suspense fallback={<div className="max-w-content mx-auto px-4 py-20 text-slate-400 text-center">로딩 중...</div>}>
        <CommunityContent />
      </Suspense>
    </div>
  );
}
