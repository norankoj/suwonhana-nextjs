"use client";

import React, { useState, useEffect, useCallback } from "react";
// 🔥 나이, 시간, 장소를 꾸며줄 예쁜 아이콘들을 추가로 가져옵니다!
import {
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  Clock,
  MapPin,
} from "lucide-react";
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

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentGallery, setCurrentGallery] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allItems = groups.flatMap((group) =>
    group.items.map((item) => ({ ...item, groupName: group.subtitle } as Record<string, unknown> & { id: string; name: string; age: string; sub: string; desc: string; img: string; groupName: string; eng?: string; slogan?: string; gallery?: string[] })),
  );

  const filteredItems = allItems.filter((item) => item.id === activeId);

  const handleTabClick = (targetId: string) => {
    setActiveId(targetId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openPreview = (images: string[], index: number) => {
    setCurrentGallery(images);
    setCurrentImageIndex(index);
    setIsPreviewOpen(true);
  };

  const closePreview = useCallback(() => {
    setIsPreviewOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % currentGallery.length);
  }, [currentGallery.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + currentGallery.length) % currentGallery.length,
    );
  }, [currentGallery.length]);

  useEffect(() => {
    if (!isPreviewOpen) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closePreview();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPreviewOpen, nextImage, prevImage, closePreview]);

  return (
    <div className="bg-white min-h-screen pt-28 md:pt-36 pb-20 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 relative">
      {/* 1. 각진 탭 (Tab Navigation) 영역 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20">
        <div className="flex flex-nowrap justify-start lg:justify-center overflow-x-auto gap-2 md:gap-3 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {quickLinks.map((link, idx) => {
            const isActive = activeId === link.target;
            return (
              <button
                key={idx}
                onClick={() => handleTabClick(link.target)}
                className={`shrink-0 px-5 md:px-6 py-3 font-bold text-sm md:text-[15px] transition-all duration-300 border ${
                  isActive
                    ? "bg-slate-900 border-slate-900 text-white shadow-md"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900"
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. 본문 영역 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32">
        {filteredItems.map((item) => {
          const galleryImages = item.gallery || [
            "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=900&fit=crop",
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=700&h=500&fit=crop",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&h=700&fit=crop",
            "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=700&h=900&fit=crop",
            "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=900&h=600&fit=crop",
          ];

          // 🔥 기존 데이터의 sub 문자열을 엔터(\n)를 기준으로 쪼개어 슬로건과 인포로 나눕니다.
          const subParts = item.sub ? item.sub.split("\n") : [];
          const slogan = subParts[0] ? subParts[0].trim() : "";
          // 엔터 뒤에 있는 문장(0~4세, 오전 9시 30분, NGC 지하예배실)을 쉼표로 쪼갭니다.
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
                <div className="w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-md bg-slate-50 border border-slate-100 shadow-sm cursor-pointer hover:border-slate-300">
                  <img
                    src={item.img}
                    alt={`${item.name} 대표 사진`}
                    className="w-full h-full object-cover grayscale-[30%] opacity-90 transition-transform duration-700 ease-out hover:scale-105 hover:grayscale-0 hover:opacity-100"
                  />
                </div>
              </div>

              <div className="border-t border-slate-200 py-12 md:py-16 flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
                <div className="w-full lg:w-[35%] flex flex-col lg:sticky lg:top-32 shrink-0">
                  <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-4">
                    {"eng" in item && item.eng ? item.eng : ""}
                  </span>

                  {/* 🔥 첫 번째 줄: 큰 슬로건 타이틀 ("예배의 토양을 함께 만들어가는 조이베이비!") */}
                  {slogan && (
                    <h3 className="text-2xl md:text-3xl font-extrabold mb-8 leading-snug break-keep text-slate-900">
                      {slogan}
                    </h3>
                  )}

                  {/* 🔥 두 번째 줄: 예쁘게 분리된 나이/시간/장소 인포 카드 */}
                  {infos.length > 0 && (
                    <div className="flex flex-col gap-3 mb-10 bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm">
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

                  <div className="text-[15px] md:text-base text-slate-600 leading-loose break-keep space-y-5">
                    {item.desc.split("\n").map((line: string, i: number) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>

                <div className="w-full lg:w-[65%]">
                  <div className="columns-2 md:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
                    {galleryImages.map((imgUrl: string, i: number) => (
                      <div
                        key={i}
                        onClick={() => openPreview(galleryImages, i)}
                        className="break-inside-avoid overflow-hidden rounded-sm bg-slate-100 border border-slate-100/50 cursor-pointer"
                      >
                        <img
                          src={imgUrl}
                          alt={`${item.name} 갤러리 이미지 ${i + 1}`}
                          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700 ease-out grayscale-[20%] hover:grayscale-0"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {isPreviewOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 animate-fade-in flex items-center justify-center p-4 md:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) closePreview();
          }}
        >
          <button
            onClick={closePreview}
            className="fixed top-5 right-5 z-[110] text-slate-400 hover:text-white transition-colors p-2 bg-black/50 rounded-full"
            aria-label="미리보기 닫기"
          >
            <X size={28} />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 z-[110] text-slate-400 hover:text-white transition-colors p-3 bg-black/30 rounded-full hover:bg-black/60"
            aria-label="이전 이미지"
          >
            <ChevronLeft size={32} strokeWidth={2.5} />
          </button>
          <div className="max-w-full max-h-full flex flex-col items-center justify-center relative">
            <img
              src={currentGallery[currentImageIndex]}
              alt={`공동체 갤러리 미리보기 ${currentImageIndex + 1}`}
              className="max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)] md:max-w-[calc(100vw-8rem)] md:max-h-[calc(100vh-8rem)] object-contain rounded-sm shadow-2xl animate-scale-up"
            />
            <div className="absolute -bottom-12 text-sm md:text-base font-bold text-slate-200 p-2 bg-black/50 rounded-full">
              {currentImageIndex + 1} / {currentGallery.length}
            </div>
          </div>
          <button
            onClick={nextImage}
            className="absolute right-4 z-[110] text-slate-400 hover:text-white transition-colors p-3 bg-black/30 rounded-full hover:bg-black/60"
            aria-label="다음 이미지"
          >
            <ChevronRight size={32} strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  );
}
