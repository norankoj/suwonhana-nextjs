"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { HeroSub } from "@/components/Common";

const WP_DOMAIN =
  process.env.NEXT_PUBLIC_WORDPRESS_DOMAIN || "http://suwonhana.local";

const CATEGORIES = [
  { label: "전체", slug: "" },
  { label: "공지사항", slug: "notice" },
  { label: "행사", slug: "event" },
  { label: "예배", slug: "worship" },
  { label: "수양회", slug: "retreat" },
];

interface WPPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  link: string;
  categories: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
    "wp:term"?: Array<Array<{ name: string; slug: string }>>;
  };
}

const FALLBACK_POSTS = [
  {
    id: 1,
    title: "2026년 전반기 제자훈련 신청 안내",
    excerpt:
      "할렐루야! 2026년 전반기 제자훈련 과정을 다음과 같이 모집합니다. 많은 참여 바랍니다.",
    date: "2026-03-10",
    category: "공지사항",
    image: "/images/background02.jpg",
  },
  {
    id: 2,
    title: "부활절 연합예배 안내",
    excerpt:
      "부활하신 주님을 함께 기념하는 연합예배에 초대합니다. 가족들과 함께 은혜 나누시길 바랍니다.",
    date: "2026-03-05",
    category: "예배",
    image: "/images/background03.jpg",
  },
  {
    id: 3,
    title: "봄 수양회 신청 모집",
    excerpt:
      "하나님과 더 깊이 만나는 봄 수양회를 안내드립니다. 자연 속에서 영적 쉼을 누리세요.",
    date: "2026-02-28",
    category: "수양회",
    image: "/images/background02.jpg",
  },
];

function formatDate(dateString: string): string {
  const d = new Date(dateString);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, "").trim();
}

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("");
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
    fetchPosts(1);
  }, [activeCategory]);

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const fetchPosts = async (page: number) => {
    setIsLoading(true);
    try {
      let url = `${WP_DOMAIN}/wp-json/wp/v2/posts?_embed&per_page=9&page=${page}&orderby=date&order=desc`;
      if (activeCategory) {
        url += `&categories_slug=${activeCategory}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error("API Error");
      const totalPagesHeader = res.headers.get("X-WP-TotalPages");
      if (totalPagesHeader) setTotalPages(parseInt(totalPagesHeader));
      const data = await res.json();
      setPosts(data);
      setUseFallback(false);
    } catch {
      setUseFallback(true);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryLabel = (post: WPPost) => {
    const terms = post._embedded?.["wp:term"]?.[0];
    if (terms && terms.length > 0) return terms[0].name;
    return "공지사항";
  };

  return (
    <div className="bg-white min-h-screen animate-fade-in selection:bg-blue-100 selection:text-blue-900">
      <HeroSub
        title="교회소식"
        desc="수원하나교회의 소식과 행사 안내를 확인하세요."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-nowrap gap-2 overflow-x-auto pb-4 mb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] border-b border-slate-200">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`shrink-0 px-6 py-1 text-[15px] font-bold transition-all duration-200 -mb-[1px] ${
                activeCategory === cat.slug
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-400 hover:text-slate-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 카드 그리드 */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="overflow-hidden bg-slate-100 animate-pulse"
              >
                <div className="aspect-[4/3] bg-slate-200" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-slate-200 rounded w-1/4" />
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : useFallback ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FALLBACK_POSTS.map((post) => (
              <div
                key={post.id}
                className="group flex flex-col border border-slate-200 bg-white hover:border-slate-900 hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100 cursor-pointer">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[11px] font-bold px-2.5 py-1 bg-slate-100 text-slate-700 tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-sm font-semibold text-slate-400">
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-xl md:text-2xl text-slate-900 mb-3 line-clamp-2 leading-snug tracking-tight group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-base text-slate-500 line-clamp-2 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <Tag size={28} className="text-slate-300" />
            </div>
            <p className="text-slate-900 font-bold text-lg mb-2">
              소식이 없습니다
            </p>
            <p className="text-slate-400 text-sm">
              다른 카테고리를 선택해보세요.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const imgUrl =
                  post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
                const excerpt = stripHtml(post.excerpt.rendered);
                return (
                  <Link
                    key={post.id}
                    href={`/news/${post.id}`}
                    className="overflow-hidden border border-slate-100 bg-white flex flex-col"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-slate-100 group">
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={post.title.rendered}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[10%] group-hover:grayscale-0"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Tag size={40} className="text-slate-200" />
                        </div>
                      )}
                    </div>

                    <div className="p-4 md:p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-bold px-2.5 py-1 bg-slate-100 text-slate-700 tracking-wider">
                          {getCategoryLabel(post)}
                        </span>
                        <span className="text-sm font-semibold text-slate-400">
                          {formatDate(post.date)}
                        </span>
                      </div>
                      <h3
                        className="font-extrabold text-xl md:text-2xl text-slate-900 mb-3 line-clamp-2 leading-snug tracking-tight group-hover:text-blue-600 transition-colors"
                        dangerouslySetInnerHTML={{
                          __html: post.title.rendered,
                        }}
                      />
                      <div className="mt-6 flex items-center gap-1 text-sm font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                        자세히 보기 <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* 🔥 각진 페이지네이션 */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-20">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-bold border border-slate-200 text-slate-500 hover:bg-slate-900 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500 transition-colors"
                >
                  PREV
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-10 h-10 text-sm font-bold border transition-all ${
                        p === currentPage
                          ? "bg-slate-900 text-white border-slate-900"
                          : "border-slate-200 text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      {p}
                    </button>
                  ),
                )}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-bold border border-slate-200 text-slate-500 hover:bg-slate-900 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500 transition-colors"
                >
                  NEXT
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
