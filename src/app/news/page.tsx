"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Tag } from "lucide-react";
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
    excerpt: "할렐루야! 2026년 전반기 제자훈련 과정을 다음과 같이 모집합니다.",
    date: "2026-03-10",
    category: "공지사항",
    image: "/images/background02.jpg",
  },
  {
    id: 2,
    title: "부활절 연합예배 안내",
    excerpt: "부활하신 주님을 함께 기념하는 연합예배에 초대합니다.",
    date: "2026-03-05",
    category: "예배",
    image: "/images/background03.jpg",
  },
  {
    id: 3,
    title: "봄 수양회 신청 모집",
    excerpt: "하나님과 더 깊이 만나는 봄 수양회를 안내드립니다.",
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
    <div className="bg-white min-h-screen animate-fade-in">
      <HeroSub
        title="교회소식"
        desc="수원하나교회의 소식과 행사 안내를 확인하세요."
      />

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 카테고리 탭 */}
        <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 mb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`shrink-0 px-5 py-2.5 text-sm font-bold rounded-full border transition-all duration-200 ${
                activeCategory === cat.slug
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-900"
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
              <div key={i} className="overflow-hidden bg-slate-100 animate-pulse">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FALLBACK_POSTS.map((post) => (
              <div
                key={post.id}
                className="overflow-hidden border border-slate-100 bg-white flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100 group cursor-pointer">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar size={11} /> {formatDate(post.date)}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-2 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed flex-1">
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
            <p className="text-slate-900 font-bold text-lg mb-2">소식이 없습니다</p>
            <p className="text-slate-400 text-sm">다른 카테고리를 선택해보세요.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const imgUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
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
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-50">
                          <Tag size={32} className="text-slate-200" />
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
                          {getCategoryLabel(post)}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar size={11} /> {formatDate(post.date)}
                        </span>
                      </div>
                      <h3
                        className="font-bold text-base text-slate-900 mb-2 line-clamp-2 leading-snug"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                      {excerpt && (
                        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed flex-1">
                          {excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-bold rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30"
                >
                  이전
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-10 h-10 text-sm font-bold rounded-lg border transition-all ${
                      p === currentPage
                        ? "bg-slate-900 text-white border-slate-900"
                        : "border-slate-200 text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-bold rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30"
                >
                  다음
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
