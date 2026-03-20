"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { HeroSub } from "@/components/Common";

const WP_DOMAIN =
  process.env.NEXT_PUBLIC_WORDPRESS_DOMAIN || "http://suwonhana.local";

interface FAQItem {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
}

// 폴백 FAQ
const FALLBACK_FAQ: FAQItem[] = [
  {
    id: 1,
    title: { rendered: "처음 방문하는데 어떻게 하면 좋을까요?" },
    content: { rendered: "<p>수원하나교회에 방문해주셔서 감사합니다! 로비 안내데스크에서 새가족 담당자에게 인사해주세요. 새가족 안내와 함께 교회를 소개해드립니다.</p>" },
  },
  {
    id: 2,
    title: { rendered: "주일예배 시간은 언제인가요?" },
    content: { rendered: "<p>주일예배는 오전 9:00, 11:00, 오후 2:30 세 차례 드립니다. 금요예배는 저녁 9:00입니다.</p>" },
  },
  {
    id: 3,
    title: { rendered: "온라인으로도 예배를 드릴 수 있나요?" },
    content: { rendered: "<p>네, 수원하나교회 유튜브 채널(@suwonhana)에서 주일예배를 실시간으로 시청하실 수 있습니다.</p>" },
  },
  {
    id: 4,
    title: { rendered: "어린이/청소년 프로그램이 있나요?" },
    content: { rendered: "<p>네! 유아부터 고등부까지 연령별 예배와 교육 프로그램이 운영되고 있습니다. 공동체 페이지에서 각 부서 정보를 확인하세요.</p>" },
  },
  {
    id: 5,
    title: { rendered: "헌금은 어떻게 하나요?" },
    content: { rendered: "<p>현장 헌금함 또는 온라인 계좌이체로 하실 수 있습니다. 메인 페이지 하단의 '헌금 계좌 안내' 버튼을 클릭하시면 각 헌금 종류별 계좌를 확인하실 수 있습니다.</p>" },
  },
  {
    id: 6,
    title: { rendered: "기부금 영수증은 어떻게 신청하나요?" },
    content: { rendered: "<p>메인 페이지 하단의 '발급 신청하기' 버튼을 클릭하여 구글 폼으로 신청하시면 됩니다. 연말정산용 영수증은 매년 1월에 일괄 발급됩니다.</p>" },
  },
];

function FAQAccordion({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between gap-4 py-6 text-left group"
      >
        <div className="flex items-start gap-4">
          <span className="text-blue-600 font-black text-lg leading-none mt-0.5 shrink-0">Q</span>
          <span className={`font-bold text-base leading-snug transition-colors ${isOpen ? "text-blue-600" : "text-slate-900 group-hover:text-blue-600"}`}>
            {item.title.rendered}
          </span>
        </div>
        <ChevronDown
          size={20}
          className={`shrink-0 text-slate-400 transition-transform duration-300 mt-0.5 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="flex gap-4 pb-6 animate-fade-in">
          <span className="text-slate-300 font-black text-lg leading-none shrink-0">A</span>
          <div
            className="text-slate-600 text-sm leading-loose prose max-w-none"
            dangerouslySetInnerHTML={{ __html: item.content.rendered }}
          />
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const res = await fetch(
          `${WP_DOMAIN}/wp-json/wp/v2/faq?per_page=50&orderby=menu_order&order=asc`
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        setFaqItems(data.length > 0 ? data : FALLBACK_FAQ);
      } catch {
        setFaqItems(FALLBACK_FAQ);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFAQ();
  }, []);

  return (
    <div className="bg-white min-h-screen animate-fade-in">
      <HeroSub
        title="자주 묻는 질문"
        desc="수원하나교회에 대해 자주 묻는 질문들을 모았습니다."
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : faqItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <HelpCircle size={28} className="text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">등록된 FAQ가 없습니다.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden px-6 md:px-10">
            {faqItems.map((item) => (
              <FAQAccordion key={item.id} item={item} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm">
            찾으시는 답변이 없으신가요?{" "}
            <a href="tel:031-203-3693" className="text-slate-700 font-bold hover:text-blue-600 transition-colors">
              031-203-3693
            </a>
            으로 문의주세요.
          </p>
        </div>
      </div>
    </div>
  );
}
