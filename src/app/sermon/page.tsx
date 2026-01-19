"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Calendar,
  Users,
  BookOpen,
  Search,
  Hash,
} from "lucide-react";
import { HeroSub, CustomPlayButton } from "@/components/Common";

// 이미지 (없으면 public/images 에 넣으세요)
const keep = "/images/keep.png";

export default function SermonPage() {
  const router = useRouter();
  const [selectedSermon, setSelectedSermon] = useState<any>(null);

  const sermons = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `[히브리서${i + 1}] Keep going in shalom`,
    date: `2025.11.${30 - i}`,
    scripture: `히브리서 15:1-${7 + i}`,
    preacher: "고성준 목사",
    image: keep,
    videoUrl: "https://www.youtube.com/embed/UaeNkfFS8mE",
  }));

  if (selectedSermon) {
    return (
      <div className="bg-white min-h-screen animate-fade-in">
        <HeroSub
          title="말씀뱅크"
          subtitle="Sermon Bank"
          image="https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        />
        <div className="max-w-5xl mx-auto px-6 py-12">
          <button
            onClick={() => setSelectedSermon(null)}
            className="flex items-center text-slate-500 hover:text-sky-600 mb-6 transition-colors font-medium"
          >
            <ChevronLeft size={20} className="mr-1" /> 목록으로 돌아가기
          </button>

          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 mb-8">
            <div className="aspect-video w-full bg-black">
              <iframe
                width="100%"
                height="100%"
                src={selectedSermon.videoUrl}
                title={selectedSermon.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-8">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-bold">
                  주일예배
                </span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                {selectedSermon.title}
              </h2>
              <div className="flex flex-col md:flex-row md:items-center text-slate-500 gap-4 border-b border-slate-100 pb-6 mb-6">
                <span className="flex items-center">
                  <Calendar size={18} className="mr-2" /> {selectedSermon.date}
                </span>
                <span className="hidden md:inline">|</span>
                <span className="flex items-center">
                  <Users size={18} className="mr-2" /> {selectedSermon.preacher}
                </span>
                <span className="hidden md:inline">|</span>
                <span className="flex items-center">
                  <BookOpen size={18} className="mr-2" />{" "}
                  {selectedSermon.scripture}
                </span>
              </div>
              <div className="prose max-w-none text-slate-600 leading-relaxed">
                <p>
                  오늘 주시는 하나님의 말씀은 {selectedSermon.scripture} 입니다.
                  <br />
                  {selectedSermon.title}라는 제목으로 은혜를 나누고자 합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen animate-fade-in">
      <HeroSub
        title="말씀뱅크"
        subtitle="Sermon Bank"
        image="https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="설교 제목, 본문 또는 내용을 검색하세요"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 transition-colors text-slate-800"
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
            </div>
            <button className="bg-slate-800 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-700 transition-colors shadow-md shadow-slate-200">
              검색
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-bold text-slate-900 mr-2 flex items-center">
              <Hash size={14} className="mr-1" /> 추천 태그:
            </span>
            {[
              "#주일예배",
              "#히브리서강해",
              "#특별새벽기도",
              "#청년부",
              "#가정",
              "#위로",
            ].map((tag) => (
              <button
                key={tag}
                className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm hover:bg-sky-50 hover:text-sky-600 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sermons.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border border-slate-100 cursor-pointer"
              onClick={() => setSelectedSermon(item)}
            >
              <div className="relative aspect-video bg-slate-200">
                <img
                  src={item.image}
                  alt="thumb"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <CustomPlayButton />
                </div>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded">
                    주일예배
                  </span>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                    히브리서
                  </span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 group-hover:text-sky-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500">
                  {item.scripture} | {item.preacher}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
