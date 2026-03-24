"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowLeft, Tag } from "lucide-react";

const WP_DOMAIN =
  process.env.NEXT_PUBLIC_WORDPRESS_DOMAIN || "http://suwonhana.local";

interface WPPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
    "wp:term"?: Array<Array<{ name: string; slug: string }>>;
  };
}

function formatDate(dateString: string): string {
  const d = new Date(dateString);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default function NewsDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [post, setPost] = useState<WPPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`${WP_DOMAIN}/wp-json/wp/v2/posts/${id}?_embed`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setPost(data))
      .catch(() => setNotFound(true))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 animate-pulse">
          <div className="h-4 bg-slate-200 rounded w-24 mb-10" />
          <div className="aspect-[16/9] bg-slate-200 mb-10" />
          <div className="h-8 bg-slate-200 rounded w-3/4 mb-4" />
          <div className="h-4 bg-slate-200 rounded w-1/3 mb-10" />
          <div className="space-y-3">
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-5/6" />
            <div className="h-4 bg-slate-200 rounded w-4/5" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center py-32 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <Tag size={28} className="text-slate-300" />
        </div>
        <p className="text-slate-900 font-bold text-lg mb-2">
          게시물을 찾을 수 없습니다
        </p>
        <Link
          href="/news"
          className="mt-6 text-sm text-slate-500 hover:text-slate-900 flex items-center gap-1"
        >
          <ArrowLeft size={14} /> 목록으로
        </Link>
      </div>
    );
  }

  const imgUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const imgAlt =
    post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered;
  const category = post._embedded?.["wp:term"]?.[0]?.[0]?.name;

  return (
    <div className="bg-white min-h-screen animate-fade-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* 뒤로가기 */}
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-900 transition-colors mb-10"
        >
          <ArrowLeft size={14} /> 교회소식
        </Link>

        {/* 대표 이미지 */}
        {imgUrl && (
          <div className="aspect-[16/9] overflow-hidden bg-slate-100 mb-10 group">
            <img
              src={imgUrl}
              alt={imgAlt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        )}

        {/* 메타 */}
        <div className="flex items-center gap-3 mb-4">
          {category && (
            <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
              {category}
            </span>
          )}
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Calendar size={11} /> {formatDate(post.date)}
          </span>
        </div>

        {/* 제목 */}
        <h1
          className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight mb-10 break-keep"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        {/* 구분선 */}
        <div className="border-t border-slate-100 mb-10" />

        {/* 본문 */}
        <div
          className="prose prose-slate max-w-none prose-img:w-full prose-img:rounded-none prose-a:text-blue-600 prose-headings:font-extrabold"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* 하단 뒤로가기 */}
        <div className="mt-16 pt-8 border-t border-slate-100">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={14} /> 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
