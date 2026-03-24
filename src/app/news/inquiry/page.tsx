"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Lock, Send, Eye, EyeOff, MessageSquare } from "lucide-react";

const WP_DOMAIN =
  process.env.NEXT_PUBLIC_WORDPRESS_DOMAIN || "http://suwonhana.local";

interface InquiryPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  status: string;
  meta?: {
    author_name?: string;
    reply?: string;
  };
}

type ViewMode = "list" | "write" | "view";

function formatDate(d: string) {
  const date = new Date(d);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

const NAV_LINKS = [
  { label: "교회소식", href: "/news" },
  { label: "집회문의", href: "/news/inquiry" },
];

export default function InquiryPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [posts, setPosts] = useState<InquiryPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [form, setForm] = useState({ name: "", title: "", content: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");

  const [selectedPost, setSelectedPost] = useState<InquiryPost | null>(null);
  const [viewPassword, setViewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${WP_DOMAIN}/wp-json/wp/v2/pastor_inquiry?per_page=20&orderby=date&order=desc`
      );
      if (!res.ok) throw new Error();
      setPosts(await res.json());
    } catch {
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.title || !form.content || !form.password) {
      setSubmitMsg("모든 항목을 입력해주세요.");
      return;
    }
    setIsSubmitting(true);
    setSubmitMsg("");
    try {
      const res = await fetch(`${WP_DOMAIN}/wp-json/wp/v2/pastor_inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          status: "publish",
          password: form.password,
          meta: { author_name: form.name },
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitMsg("문의가 등록되었습니다. 비밀번호를 꼭 기억해주세요.");
      setForm({ name: "", title: "", content: "", password: "" });
      fetchPosts();
      setTimeout(() => { setViewMode("list"); setSubmitMsg(""); }, 2000);
    } catch {
      setSubmitMsg("등록에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewPost = async (post: InquiryPost) => {
    setSelectedPost(post);
    setViewMode("view");
  };

  const handleUnlockPost = async () => {
    if (!selectedPost || !viewPassword) return;
    setPasswordError("");
    try {
      const res = await fetch(
        `${WP_DOMAIN}/wp-json/wp/v2/pastor_inquiry/${selectedPost.id}?password=${encodeURIComponent(viewPassword)}`
      );
      if (!res.ok) { setPasswordError("비밀번호가 올바르지 않습니다."); return; }
      setSelectedPost(await res.json());
    } catch {
      setPasswordError("비밀번호가 올바르지 않습니다.");
    }
  };

  const isPasswordProtected = (post: InquiryPost) =>
    !post.content?.rendered || post.content.rendered.includes("password-protected");

  return (
    <div className="bg-white min-h-screen animate-fade-in">
      {/* 상단 헤더 */}
      <div className="border-b border-slate-100 pt-36 pb-10">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Story</p>
          <h1 className="text-4xl font-extrabold text-slate-900">집회문의</h1>
        </div>
      </div>

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 lg:gap-16">

          {/* 좌측 사이드바 */}
          <aside className="hidden lg:block">
            <div className="w-12 h-px bg-slate-200 mb-6" />
            <nav className="space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = link.href === "/news/inquiry";
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block py-1.5 text-sm transition-colors ${
                      isActive
                        ? "font-bold text-slate-900 border-l-2 border-slate-900 pl-3"
                        : "text-slate-400 hover:text-slate-700 pl-3"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* 우측 콘텐츠 */}
          <div>
            {/* 목록 뷰 */}
            {viewMode === "list" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-slate-500">목사님 집회 요청 및 문의사항을 남겨주세요.</p>
                  <button
                    onClick={() => setViewMode("write")}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded text-sm font-bold hover:bg-slate-700 transition-colors"
                  >
                    <MessageSquare size={14} /> 문의 작성
                  </button>
                </div>

                {isLoading ? (
                  <div className="border-t border-slate-100 divide-y divide-slate-100">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="py-5 flex gap-6 animate-pulse">
                        <div className="w-8 h-4 bg-slate-100 rounded" />
                        <div className="flex-1 h-4 bg-slate-100 rounded" />
                        <div className="w-24 h-4 bg-slate-100 rounded" />
                      </div>
                    ))}
                  </div>
                ) : posts.length === 0 ? (
                  <div className="border-t border-slate-100 py-20 text-center">
                    <p className="text-slate-400 text-sm mb-3">아직 문의글이 없습니다.</p>
                    <button
                      onClick={() => setViewMode("write")}
                      className="text-sm font-bold text-slate-900 hover:underline"
                    >
                      첫 번째 문의를 남겨보세요
                    </button>
                  </div>
                ) : (
                  <div className="border-t border-slate-200 divide-y divide-slate-100">
                    {posts.map((post, i) => (
                      <button
                        key={post.id}
                        onClick={() => handleViewPost(post)}
                        className="w-full flex items-center gap-6 py-5 text-left hover:bg-slate-50 transition-colors group px-2"
                      >
                        <span className="text-slate-300 text-sm tabular-nums w-6 shrink-0 text-right">
                          {posts.length - i}
                        </span>
                        <Lock size={13} className="text-slate-300 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-slate-600 transition-colors">
                            {post.title.rendered || "비밀글입니다"}
                          </p>
                          {post.meta?.author_name && (
                            <p className="text-xs text-slate-400 mt-0.5">{post.meta.author_name}</p>
                          )}
                        </div>
                        <span className="text-xs text-slate-400 shrink-0 tabular-nums">
                          {formatDate(post.date)}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="mt-12 border-t border-slate-100 pt-8 text-sm text-slate-500 leading-relaxed space-y-1.5">
                  <p className="font-semibold text-slate-700 mb-3">안내사항</p>
                  <p>· 문의글은 비밀번호로 보호됩니다. 비밀번호를 꼭 기억해주세요.</p>
                  <p>· 답변은 관리자가 확인 후 게시글에 달아드립니다.</p>
                  <p>· 긴급 문의는 교회 사무실(031-203-3693)로 연락 바랍니다.</p>
                </div>
              </div>
            )}

            {/* 글쓰기 뷰 */}
            {viewMode === "write" && (
              <div>
                <button
                  onClick={() => setViewMode("list")}
                  className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-900 mb-8 transition-colors"
                >
                  <ChevronLeft size={15} /> 목록으로
                </button>
                <h2 className="text-xl font-bold text-slate-900 mb-8">문의 작성</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { key: "name", label: "이름", placeholder: "작성자 이름", type: "text" },
                    { key: "title", label: "제목", placeholder: "문의 제목", type: "text" },
                  ].map(({ key, label, placeholder, type }) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
                      <input
                        type={type}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        placeholder={placeholder}
                        className="w-full px-4 py-3 border border-slate-200 rounded text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">내용</label>
                    <textarea
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                      placeholder="집회 일정, 장소, 목적 등을 적어주세요."
                      rows={8}
                      className="w-full px-4 py-3 border border-slate-200 rounded text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">비밀번호</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        placeholder="게시글 확인용 비밀번호 (숫자 4자리 이상)"
                        className="w-full px-4 py-3 pr-12 border border-slate-200 rounded text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                      >
                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5">게시글 열람 시 필요하니 꼭 기억해주세요.</p>
                  </div>

                  {submitMsg && (
                    <div className={`p-4 rounded text-sm font-medium ${submitMsg.includes("실패") ? "bg-red-50 text-red-600 border border-red-100" : "bg-slate-50 text-slate-700 border border-slate-200"}`}>
                      {submitMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 text-white rounded font-bold text-sm hover:bg-slate-700 disabled:opacity-50 transition-colors"
                  >
                    {isSubmitting ? "등록 중..." : <><Send size={15} /> 문의 등록하기</>}
                  </button>
                </form>
              </div>
            )}

            {/* 글 보기 뷰 */}
            {viewMode === "view" && selectedPost && (
              <div>
                <button
                  onClick={() => { setViewMode("list"); setSelectedPost(null); setViewPassword(""); setPasswordError(""); }}
                  className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-900 mb-8 transition-colors"
                >
                  <ChevronLeft size={15} /> 목록으로
                </button>

                {isPasswordProtected(selectedPost) ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                      <Lock size={24} className="text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">비밀 게시글입니다</h3>
                    <p className="text-slate-400 text-sm mb-6">작성 시 설정한 비밀번호를 입력하세요.</p>
                    <div className="w-full max-w-xs space-y-3">
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={viewPassword}
                          onChange={(e) => setViewPassword(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleUnlockPost()}
                          placeholder="비밀번호"
                          className="w-full px-4 py-3 pr-12 border border-slate-200 rounded text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        >
                          {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                        </button>
                      </div>
                      {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}
                      <button
                        onClick={handleUnlockPost}
                        className="w-full py-3 bg-slate-900 text-white rounded text-sm font-bold hover:bg-slate-700 transition-colors"
                      >
                        확인
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="border-b border-slate-100 pb-6 mb-8">
                      <h2 className="text-xl font-bold text-slate-900 mb-3">
                        {selectedPost.title.rendered}
                      </h2>
                      <div className="flex items-center gap-3 text-sm text-slate-400">
                        {selectedPost.meta?.author_name && <span>{selectedPost.meta.author_name}</span>}
                        <span>·</span>
                        <span>{formatDate(selectedPost.date)}</span>
                      </div>
                    </div>

                    <div
                      className="prose max-w-none text-slate-700 leading-loose text-sm mb-10"
                      dangerouslySetInnerHTML={{ __html: selectedPost.content.rendered }}
                    />

                    {selectedPost.meta?.reply && (
                      <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">관리자 답변</p>
                        <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-wrap">
                          {selectedPost.meta.reply}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
