"use client";

import React, { useState } from "react";
import { ChevronLeft, Calendar } from "lucide-react";
import { HeroSub } from "@/components/Common";

export default function NewsPage() {
  const [selectedNews, setSelectedNews] = useState<any>(null);

  const newsData = [
    {
      id: 1,
      title: "2025년도 전반기 제자훈련 신청 안내 및 학습세례 문답 일정",
      date: "2025.12.09",
      category: "공지사항",
      content: `
        <p>할렐루야! 성도님들의 가정에 주님의 평강이 가득하시기를 소망합니다.</p>
        <p>2025년 전반기 제자훈련 과정을 다음과 같이 모집하오니 성도님들의 많은 관심과 참여 바랍니다.</p>
        <br/>
        <h4 class="text-lg font-bold text-slate-900 mb-2">1. 모집 과정</h4>
        <ul class="list-disc pl-5 mb-4">
          <li>제자훈련 반 (32주) - 매주 수요일 저녁 8시</li>
          <li>사역훈련 반 (32주) - 매주 목요일 오전 10시</li>
        </ul>
        <h4 class="text-lg font-bold text-slate-900 mb-2">2. 신청 기간</h4>
        <p class="mb-4">2025년 12월 7일(주일) ~ 12월 28일(주일)</p>
        <h4 class="text-lg font-bold text-slate-900 mb-2">3. 신청 방법</h4>
        <p class="mb-4">본당 로비 필경대 신청서 작성 후 제출 또는 온라인 신청</p>
        <div class="bg-slate-50 p-4 rounded-lg border border-slate-200">
           <p class="text-sm text-slate-600">* 자세한 문의는 교역자실로 연락 바랍니다.</p>
        </div>
      `,
      image:
        "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      title: "12월 금요성령집회 안내",
      date: "2025.12.08",
      category: "공지사항",
      content:
        "12월 금요성령집회는 특별 찬양 집회로 드려집니다. 온 가족이 함께 나와 기도의 불을 지피는 시간이 되길 바랍니다.",
      image:
        "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      title: "성탄절 칸타타 및 축하발표회",
      date: "2025.12.07",
      category: "공지사항",
      content:
        "성탄의 기쁨을 함께 나누는 칸타타 및 주일학교 축하발표회가 12월 25일 오전 11시에 있습니다.",
      image:
        "https://images.unsplash.com/photo-1512389142860-9c449e58a543?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
  ];

  if (selectedNews) {
    return (
      <div className="bg-white min-h-screen animate-fade-in">
        <HeroSub
          title="교회소식"
          subtitle="News & Notice"
          image="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        />
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="mb-8">
            <button
              onClick={() => setSelectedNews(null)}
              className="flex items-center text-slate-500 hover:text-sky-600 mb-6 transition-colors font-medium"
            >
              <ChevronLeft size={20} className="mr-1" /> 목록으로 돌아가기
            </button>
            <div className="border-b border-slate-200 pb-6 mb-8">
              <span className="inline-block bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-bold mb-3">
                {selectedNews.category}
              </span>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                {selectedNews.title}
              </h2>
              <p className="text-slate-400 text-sm flex items-center">
                <Calendar size={14} className="mr-1" /> {selectedNews.date}
                <span className="mx-2 text-slate-300">|</span>
                <span className="text-slate-500">관리자</span>
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-slate-600">
              <div className="aspect-video w-full bg-slate-100 rounded-xl overflow-hidden mb-8">
                <img
                  src={selectedNews.image}
                  alt="detail"
                  className="w-full h-full object-cover"
                />
              </div>
              <div dangerouslySetInnerHTML={{ __html: selectedNews.content }} />
            </div>
          </div>

          <div className="flex justify-center pt-10 border-t border-slate-200">
            <button
              onClick={() => setSelectedNews(null)}
              className="px-8 py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-sky-700 transition-colors"
            >
              목록으로
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen animate-fade-in">
      <HeroSub
        title="교회소식"
        subtitle="News & Notice"
        image="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="space-y-4">
          {newsData.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedNews(item);
                window.scrollTo(0, 0);
              }}
              className="flex flex-col md:flex-row gap-6 p-6 border border-slate-100 rounded-2xl bg-white hover:bg-slate-50 transition-colors cursor-pointer group shadow-sm hover:shadow-md"
            >
              <div className="w-full md:w-48 aspect-[4/3] bg-slate-200 rounded-lg overflow-hidden shrink-0">
                <img
                  src={item.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  alt="news"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-sky-100 text-sky-700 px-2 py-0.5 rounded text-xs font-bold">
                    {item.category}
                  </span>
                  <span className="text-slate-400 text-xs">{item.date}</span>
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2">
                  {item.content.replace(/<[^>]*>?/gm, "")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
