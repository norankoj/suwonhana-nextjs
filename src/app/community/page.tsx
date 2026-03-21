"use client";

import React, { useState } from "react";
import { Users, Clock, MapPin } from "lucide-react";
import { groups } from "@/data/data";

const quickLinks = [
  { name: "조이베이비", target: "joybaby" },
  { name: "조이코너", target: "joycorner" },
  { name: "조이랜드", target: "joyland" },
  { name: "YCM", target: "ycm" },
  { name: "UCM", target: "ucm" },
  { name: "1진 청년1부", target: "1jin_1" },
  { name: "1진 청년2부", target: "1jin_2" },
  { name: "2진", target: "2jin" },
  { name: "3진", target: "3jin" },
];

export default function CommunityPage() {
  const [activeId, setActiveId] = useState<string>("joybaby");

  const allItems = groups.flatMap((group) =>
    group.items.map((item) => ({ ...item, groupName: group.subtitle } as Record<string, unknown> & { id: string; name: string; age: string; sub: string; desc: string; img: string; groupName: string; eng?: string; slogan?: string })),
  );

  const filteredItems = allItems.filter((item) => item.id === activeId);

  const handleTabClick = (targetId: string) => {
    setActiveId(targetId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white min-h-screen pt-32 md:pt-40 pb-20 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 relative">
      {/* 1. 탭 네비게이션 */}
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20">
        <div className="flex flex-nowrap justify-start lg:justify-center overflow-x-auto gap-2 md:gap-3 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {quickLinks.map((link, idx) => {
            const isActive = activeId === link.target;
            return (
              <button
                key={idx}
                onClick={() => handleTabClick(link.target)}
                className={`shrink-0 px-5 md:px-6 py-2.5 font-bold text-sm md:text-[15px] rounded-full transition-all duration-200 border ${
                  isActive
                    ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/20"
                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-900 hover:shadow-sm"
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. 본문 영역 */}
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
              className="animate-fade-in pt-8 md:pt-12"
            >
              <div className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase leading-none text-slate-900">
                  {item.name}
                </h2>
                <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-slate-400 mt-4 md:mt-0 uppercase">
                  {item.groupName}
                </span>
              </div>

              <div className="mb-12 md:mb-16">
                <div className="w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-md bg-slate-50 border border-slate-100 shadow-sm">
                  <img
                    src={item.img}
                    alt={`${item.name} 대표 사진`}
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 ease-out hover:scale-105"
                  />
                </div>
              </div>

              <div className="border-t border-slate-200 py-12 md:py-16">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                  {/* 슬로건 + 인포 카드 */}
                  <div className="lg:w-1/3 shrink-0">
                    <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-4 block">
                      {"eng" in item && item.eng ? item.eng : ""}
                    </span>

                    {slogan && (
                      <h3 className="text-2xl md:text-3xl font-extrabold mb-8 leading-snug break-keep text-slate-900">
                        {slogan}
                      </h3>
                    )}

                    {infos.length > 0 && (
                      <div className="flex flex-col gap-3 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm">
                        {infos[0] && (
                          <div className="flex items-center gap-3 text-[15px] text-slate-700 font-bold break-keep">
                            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                              <Users size={18} />
                            </div>
                            {infos[0]}
                          </div>
                        )}
                        {infos[1] && (
                          <div className="flex items-center gap-3 text-[15px] text-slate-700 font-bold break-keep">
                            <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                              <Clock size={18} />
                            </div>
                            {infos[1]}
                          </div>
                        )}
                        {infos[2] && (
                          <div className="flex items-center gap-3 text-[15px] text-slate-700 font-bold break-keep">
                            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                              <MapPin size={18} />
                            </div>
                            {infos[2]}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 본문 설명 */}
                  <div className="lg:w-2/3 text-[15px] md:text-base text-slate-600 leading-loose break-keep space-y-5">
                    {item.desc.split("\n").map((line: string, i: number) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
