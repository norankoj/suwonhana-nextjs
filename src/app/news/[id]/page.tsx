"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Tag, Share2, User, Clock } from "lucide-react";

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

function getFullDate(dateString: string) {
  const d = new Date(dateString);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export default function NewsDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [post, setPost] = useState<WPPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // URL 복사 알림 상태
  const [showCopyAlert, setShowCopyAlert] = useState(false);

  useEffect(() => {
    fetch(`${WP_DOMAIN}/wp-json/wp/v2/posts/${id}?_embed`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setPost(data))
      .catch(() => setNotFound(true))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopyAlert(true);
    setTimeout(() => setShowCopyAlert(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 animate-pulse">
          <div className="h-4 bg-slate-200 w-24 mb-10" />
          <div className="aspect-[16/9] bg-slate-200 mb-10" />
          <div className="h-12 bg-slate-200 w-3/4 mb-4" />
          <div className="h-6 bg-slate-200 w-1/3 mb-10" />
          <div className="space-y-4">
            <div className="h-4 bg-slate-200 w-full" />
            <div className="h-4 bg-slate-200 w-5/6" />
            <div className="h-4 bg-slate-200 w-4/5" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center py-32 text-center">
        <div className="w-16 h-16 bg-slate-100 flex items-center justify-center mb-6">
          <Tag size={28} className="text-slate-300" />
        </div>
        <p className="text-slate-900 font-bold text-xl mb-2">
          게시물을 찾을 수 없습니다
        </p>
        <Link
          href="/news"
          className="mt-6 text-sm font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 border border-slate-200 px-6 py-3 transition-colors"
        >
          <ArrowLeft size={16} /> 목록으로
        </Link>
      </div>
    );
  }

  const imgUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const imgAlt =
    post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered;
  const category = post._embedded?.["wp:term"]?.[0]?.[0]?.name;

  return (
    <div className="bg-white min-h-screen animate-fade-in selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* 상단 네비게이션 & 공유 버튼 */}
        <div className="flex justify-between items-center mb-10">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} /> 목록
          </Link>
          <div className="relative">
            <button
              onClick={handleCopyUrl}
              className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 px-4 py-2 border border-slate-200 transition-colors"
            >
              <Share2 size={16} /> URL 복사
            </button>
            {showCopyAlert && (
              <div className="absolute top-full mt-2 right-0 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 whitespace-nowrap animate-fade-in">
                복사되었습니다!
              </div>
            )}
          </div>
        </div>

        {/* 대표 이미지 (풀사이즈 엣지 처리) */}
        {/* {imgUrl && (
          <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-slate-100 mb-12 border border-slate-200">
            <img
              src={imgUrl}
              alt={imgAlt}
              className="w-full h-full object-cover"
            />
          </div>
        )} */}

        <div className="mb-6">
          {category && (
            <p className="text-sm font-bold text-slate-500 tracking-widest mb-3">
              {category}
            </p>
          )}

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            {/* 타이틀 */}
            <div>
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6 break-keep tracking-tight"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              {/* 상세 메타 (작성자, 시간) */}
              <div className="flex items-center gap-4 text-sm font-semibold text-slate-400">
                <span className="flex items-center gap-1.5">
                  <User size={14} /> 수원하나교회
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} /> {getFullDate(post.date)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-slate-900 mb-12 mt-0 pt-0" />

        <div
          className="prose prose-lg md:prose-xl prose-slate max-w-none 
                     prose-img:w-full prose-img:border prose-img:border-slate-100
                     prose-a:text-blue-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                     prose-headings:font-extrabold prose-headings:tracking-tight
                     prose-p:leading-relaxed prose-p:break-keep
                     prose-li:marker:text-slate-400"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* 하단 뒤로가기 */}
        <div className="mt-20 pt-10 border-t border-slate-200 flex justify-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={18} /> 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
