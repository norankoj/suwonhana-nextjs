import React from "react";
import type { Metadata } from "next";
import IntroPageHeader from "@/components/IntroPageHeader";
import FaqAccordion from "./FaqAccordion";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description: "수원하나교회에 대해 자주 묻는 질문들을 모았습니다.",
};

const WP_DOMAIN =
  process.env.NEXT_PUBLIC_WORDPRESS_DOMAIN || "http://suwonhana.local";

interface WPFaqPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
}

const FALLBACK: WPFaqPost[] = [
  { id: 1, title: { rendered: "처음 방문하는데 어떻게 하면 좋을까요?" }, content: { rendered: "<p>수원하나교회에 방문해주셔서 감사합니다! 로비 안내데스크에서 새가족 담당자에게 인사해주세요.</p>" } },
  { id: 2, title: { rendered: "주일예배 시간은 언제인가요?" }, content: { rendered: "<p>주일예배는 오전 9:00, 11:00, 오후 2:30 세 차례 드립니다. 금요예배는 저녁 9:00입니다.</p>" } },
  { id: 3, title: { rendered: "온라인으로도 예배를 드릴 수 있나요?" }, content: { rendered: "<p>네, 유튜브 채널(@suwonhana)에서 주일예배를 실시간으로 시청하실 수 있습니다.</p>" } },
  { id: 4, title: { rendered: "어린이/청소년 프로그램이 있나요?" }, content: { rendered: "<p>유아부터 고등부까지 연령별 예배와 교육 프로그램이 운영되고 있습니다.</p>" } },
  { id: 5, title: { rendered: "헌금은 어떻게 하나요?" }, content: { rendered: "<p>현장 헌금함 또는 온라인 계좌이체로 하실 수 있습니다.</p>" } },
];

async function fetchFaq(): Promise<WPFaqPost[]> {
  try {
    const res = await fetch(
      `${WP_DOMAIN}/wp-json/wp/v2/faq?per_page=50&orderby=menu_order&order=asc&_fields=id,title,content`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) return FALLBACK;
    const data: WPFaqPost[] = await res.json();
    return data.length > 0 ? data : FALLBACK;
  } catch {
    return FALLBACK;
  }
}

export default async function FAQPage() {
  const posts = await fetchFaq();

  const items = posts.map((p) => ({
    id: p.id,
    question: p.title.rendered.replace(/<[^>]+>/g, ""),
    answerHtml: p.content.rendered,
  }));

  return (
    <div className="bg-white min-h-screen pb-24">
      <IntroPageHeader label="FAQ" title="자주 묻는 질문" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FaqAccordion items={items} />

        <p className="mt-16 text-center text-sm text-slate-400">
          찾으시는 답변이 없으신가요?{" "}
          <a
            href="tel:031-203-3693"
            className="text-slate-700 font-semibold hover:text-slate-900 transition-colors"
          >
            031-203-3693
          </a>
          으로 문의해 주세요.
        </p>
      </div>
    </div>
  );
}
