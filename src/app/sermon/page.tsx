"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Search,
  Loader2,
  Play,
  X,
  Book,
  BookOpen,
  Plus,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Hash,
  Filter as FilterIcon,
  List,
  Home,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { HeroSub } from "@/components/Common";

const WP_API_DOMAIN = "http://suwonhana.local";
const ITEMS_PER_PAGE = 9;

// --- 데이터 상수 ---

const SERVICE_TAGS = ["전체", "주일예배", "금요예배", "신년기도회"];

const BIBLE_BOOKS = [
  "창세기",
  "출애굽기",
  "신명기",
  "여호수아",
  "룻기",
  "에스라",
  "느헤미야",
  "에스더",
  "시편",
  "잠언",
  "전도서",
  "이사야",
  "예레미야",
  "다니엘",
  "호세아",
  "요나",
  "미가",
  "학개",
  "스가랴",
  "말라기",
  "마가복음",
  "누가복음",
  "요한복음",
  "사도행전",
  "로마서",
  "갈라디아서",
  "에베소서",
  "빌립보서",
  "디모데전서",
  "히브리서",
  "야고보서",
  "베드로전서",
  "요한일서",
  "요한계시록",
];

const SERIES_TOPICS = [
  "고난주간",
  "부활절",
  "영적세계의 원리",
  "하나님의 속성",
  "예수님의 속성",
  "성령님의 속성",
  "BREAK THROUGH",
  "Destiny",
];

const YEARS = Array.from({ length: 20 }, (_, i) => (2026 - i).toString());

interface Sermon {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
  sermon_meta?: {
    video_url?: string;
    audio_url?: string;
    speaker?: string;
    tags?: string[];
    scripture?: string;
  };
}

// 태그 색상
const getTagColor = (tag: string) => {
  if (
    SERVICE_TAGS.includes(tag) ||
    tag.includes("예배") ||
    tag.includes("기도회")
  )
    return "bg-blue-50 text-blue-600 border-blue-100";
  if (SERIES_TOPICS.includes(tag))
    return "bg-emerald-50 text-emerald-600 border-emerald-100";
  if (BIBLE_BOOKS.includes(tag))
    return "bg-slate-100 text-slate-600 border-slate-200";
  return "bg-slate-50 text-slate-500 border-slate-100";
};

// 아코디언
function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-100 last:border-0 py-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-slate-900 font-extrabold text-[15px] hover:text-blue-600 transition-colors mb-3"
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUp size={18} className="text-slate-400" />
        ) : (
          <ChevronDown size={18} className="text-slate-400" />
        )}
      </button>
      {isOpen && <div className="mt-1 animate-fade-in">{children}</div>}
    </div>
  );
}

export default function SermonPage() {
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);
  const [sermons, setSermons] = useState<Sermon[]>([]);

  const [activeTab, setActiveTab] = useState("전체");
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [searchTrigger, setSearchTrigger] = useState(0);

  // [NEW] 페이지 이동 시 자동 선택을 위한 상태 ('first' = 첫번째 선택, 'last' = 마지막 선택)
  const [autoSelect, setAutoSelect] = useState<"first" | "last" | null>(null);

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [categoryMap, setCategoryMap] = useState<Record<string, number[]>>({});
  const [tagMap, setTagMap] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchAllTaxonomies = async () => {
      try {
        const getAllItems = async (endpoint: string) => {
          let allItems: any[] = [];
          let page = 1;
          let hasMore = true;
          while (hasMore) {
            const res = await fetch(
              `${WP_API_DOMAIN}/wp-json/wp/v2/${endpoint}?per_page=100&page=${page}`,
            );
            if (!res.ok) break;
            const data = await res.json();
            if (data.length > 0) {
              allItems = [...allItems, ...data];
              if (data.length < 100) hasMore = false;
              else page++;
            } else {
              hasMore = false;
            }
          }
          return allItems;
        };

        const allCategories = await getAllItems("risen_multimedia_category");
        const catMap: Record<string, number[]> = {};
        BIBLE_BOOKS.forEach((bookName) => {
          catMap[bookName] = [];
          allCategories.forEach((apiCat: any) => {
            if (apiCat.name.includes(bookName))
              catMap[bookName].push(apiCat.id);
          });
        });
        setCategoryMap(catMap);

        const allTags = await getAllItems("risen_multimedia_tag");
        const tMap: Record<string, number> = {};
        allTags.forEach((item: any) => {
          tMap[item.name] = item.id;
        });
        setTagMap(tMap);
      } catch (e) {
        console.error("데이터 로딩 실패", e);
      }
    };
    fetchAllTaxonomies();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    fetchSermons(1);
  }, [activeTab, selectedBooks, selectedTopics, selectedYear, searchTrigger]);

  useEffect(() => {
    fetchSermons(currentPage);
  }, [currentPage]);

  // [NEW] 설교 목록이 로드된 후, 페이지 이동에 따른 자동 선택 로직 실행
  useEffect(() => {
    if (sermons.length > 0 && autoSelect) {
      if (autoSelect === "last") {
        setSelectedSermon(sermons[sermons.length - 1]); // 이전 페이지의 마지막 영상
      } else if (autoSelect === "first") {
        setSelectedSermon(sermons[0]); // 다음 페이지의 첫 번째 영상
      }
      setAutoSelect(null); // 초기화
    }
  }, [sermons, autoSelect]);

  const fetchSermons = async (page = 1) => {
    setIsLoading(true);
    try {
      let url = `${WP_API_DOMAIN}/wp-json/wp/v2/risen_multimedia?_embed&per_page=${ITEMS_PER_PAGE}&page=${page}`;

      const tagIds: number[] = [];
      if (activeTab !== "전체") {
        if (tagMap[activeTab]) tagIds.push(tagMap[activeTab]);
        else url += `&search=${encodeURIComponent(activeTab)}`;
      }
      selectedTopics.forEach((topic) => {
        if (tagMap[topic]) tagIds.push(tagMap[topic]);
      });
      if (tagIds.length > 0) url += `&risen_multimedia_tag=${tagIds.join(",")}`;

      if (selectedBooks.length > 0) {
        const allIds = selectedBooks
          .flatMap((bookName) => categoryMap[bookName] || [])
          .filter((id) => id !== undefined);
        const uniqueIds = Array.from(new Set(allIds)).join(",");
        if (uniqueIds) url += `&risen_multimedia_category=${uniqueIds}`;
      }

      if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
      if (selectedYear) {
        url += `&after=${selectedYear}-01-01T00:00:00`;
        url += `&before=${selectedYear}-12-31T23:59:59`;
      }

      const res = await fetch(url);
      if (!res.ok) {
        setSermons([]);
        setTotalPages(0);
        setIsLoading(false);
        return;
      }
      const totalPagesHeader = res.headers.get("X-WP-TotalPages");
      if (totalPagesHeader) setTotalPages(parseInt(totalPagesHeader));
      const data = await res.json();
      setSermons(data);
    } catch (error) {
      console.error("설교 로딩 실패:", error);
      setSermons([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchSermons(1);
  };
  const resetFilters = () => {
    setActiveTab("전체");
    setSelectedBooks([]);
    setSelectedTopics([]);
    setSelectedYear("");
    setSearchTerm("");
  };

  const toggleBook = (book: string) =>
    selectedBooks.includes(book)
      ? setSelectedBooks(selectedBooks.filter((b) => b !== book))
      : selectedBooks.length < 5
        ? setSelectedBooks([...selectedBooks, book])
        : alert("최대 5개까지 선택 가능합니다.");
  const toggleTopic = (topic: string) =>
    selectedTopics.includes(topic)
      ? setSelectedTopics(selectedTopics.filter((t) => t !== topic))
      : selectedTopics.length < 3
        ? setSelectedTopics([...selectedTopics, topic])
        : alert("주제는 최대 3개까지 선택 가능합니다.");

  const handleTagClick = (tag: string) => {
    resetFilters();
    setSearchTerm(tag);
    setSelectedSermon(null);
    setSearchTrigger((prev) => prev + 1);
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  };

  const getYouTubeId = (url?: string) => {
    if (!url) return null;
    let videoId = "";
    if (url.includes("youtu.be/"))
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    else if (url.includes("v=")) videoId = url.split("v=")[1]?.split("&")[0];
    else if (url.includes("/embed/"))
      videoId = url.split("/embed/")[1]?.split("?")[0];
    return videoId || null;
  };

  const getEmbedUrl = (url?: string) => {
    const id = getYouTubeId(url);
    return id ? `https://www.youtube.com/embed/${id}` : url;
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  // [NEW] 페이지 이동 핸들러
  const handlePrevSermon = (currentIndex: number) => {
    if (currentIndex > 0) {
      // 현재 페이지 내에서 이동
      setSelectedSermon(sermons[currentIndex - 1]);
    } else if (currentPage > 1) {
      // 이전 페이지로 이동
      setAutoSelect("last");
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextSermon = (currentIndex: number) => {
    if (currentIndex < sermons.length - 1) {
      // 현재 페이지 내에서 이동
      setSelectedSermon(sermons[currentIndex + 1]);
    } else if (currentPage < totalPages) {
      // 다음 페이지로 이동
      setAutoSelect("first");
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <HeroSub
        title="말씀뱅크"
        desc="수원하나교회의 주일예배 및 특별 집회 설교를 다시 보실 수 있습니다."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <aside
            className={`lg:w-[280px] lg:shrink-0 w-full bg-white lg:bg-transparent p-5 lg:p-0 rounded-xl lg:rounded-none shadow-xl lg:shadow-none border border-slate-100 lg:border-none sticky top-24 transition-all duration-300 ${selectedSermon ? "hidden lg:block" : ""}`}
          >
            {selectedSermon ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-4 animate-fade-in">
                <button
                  onClick={() => setSelectedSermon(null)}
                  className="w-full py-3 bg-white border border-slate-300 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-sm"
                >
                  <List size={18} /> 목록으로 돌아가기
                </button>
                <div className="w-full h-px bg-slate-100 my-2"></div>

                {/* [수정] 페이지 넘김 로직 적용 */}
                {(() => {
                  const idx = sermons.findIndex(
                    (s) => s.id === selectedSermon.id,
                  );
                  const hasPrev = idx > 0 || currentPage > 1;
                  const hasNext =
                    idx < sermons.length - 1 || currentPage < totalPages;
                  const prevSermon = idx > 0 ? sermons[idx - 1] : null; // 현재 페이지 내 이전 설교
                  const nextSermon =
                    idx < sermons.length - 1 ? sermons[idx + 1] : null; // 현재 페이지 내 다음 설교

                  return (
                    <>
                      {hasPrev ? (
                        <button
                          onClick={() => handlePrevSermon(idx)}
                          className="text-left group"
                        >
                          <span className="text-xs text-slate-400 font-bold mb-1 flex items-center">
                            <ChevronLeft size={12} className="mr-1" /> 이전 설교
                          </span>
                          <h5
                            className="text-sm font-bold text-slate-700 group-hover:text-blue-600 line-clamp-2 leading-snug transition-colors"
                            dangerouslySetInnerHTML={{
                              __html: prevSermon
                                ? prevSermon.title.rendered
                                : "이전 페이지의 설교입니다.",
                            }}
                          ></h5>
                        </button>
                      ) : (
                        <div className="text-xs text-slate-300 py-2">
                          이전 설교 없음
                        </div>
                      )}

                      <div className="w-full h-px bg-slate-100 my-1"></div>

                      {hasNext ? (
                        <button
                          onClick={() => handleNextSermon(idx)}
                          className="text-right group"
                        >
                          <span className="text-xs text-slate-400 font-bold mb-1 flex items-center justify-end">
                            다음 설교{" "}
                            <ChevronRight size={12} className="ml-1" />
                          </span>
                          <h5
                            className="text-sm font-bold text-slate-700 group-hover:text-blue-600 line-clamp-2 leading-snug transition-colors"
                            dangerouslySetInnerHTML={{
                              __html: nextSermon
                                ? nextSermon.title.rendered
                                : "다음 페이지의 설교입니다.",
                            }}
                          ></h5>
                        </button>
                      ) : (
                        <div className="text-xs text-right text-slate-300 py-2">
                          다음 설교 없음
                        </div>
                      )}
                    </>
                  );
                })()}

                <div className="mt-4 pt-6 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-1">
                    <Tag size={12} /> 관련 키워드
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSermon.sermon_meta?.tags?.map((tag, i) => (
                      <button
                        key={i}
                        onClick={() => handleTagClick(tag)}
                        className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-500 font-medium hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
                      >
                        #{tag}
                      </button>
                    ))}
                    {!selectedSermon.sermon_meta?.tags?.length && (
                      <span className="text-xs text-slate-300">태그 없음</span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 lg:border-slate-300 lg:hidden">
                  <h3 className="font-extrabold text-xl text-slate-900 flex items-center gap-2">
                    <FilterIcon size={20} /> 필터
                  </h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                    className="text-sm font-bold text-slate-500"
                  >
                    닫기
                  </button>
                </div>
                <div
                  className={`${isMobileFilterOpen ? "block" : "hidden lg:block"}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-extrabold text-lg text-slate-900 hidden lg:block">
                      검색 필터
                    </h3>
                    <button
                      onClick={resetFilters}
                      className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 bg-slate-200 px-2 py-1 rounded hover:bg-slate-300 transition-colors font-bold"
                    >
                      <RotateCcw size={10} /> 초기화
                    </button>
                  </div>
                  <form
                    onSubmit={handleSearchSubmit}
                    className="relative group mb-6"
                  >
                    <input
                      type="text"
                      placeholder="검색어 입력"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all text-sm text-slate-800 placeholder:text-slate-400 shadow-sm"
                    />
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors"
                      size={16}
                    />
                  </form>
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                    <Accordion title="예배" defaultOpen={true}>
                      <div className="flex flex-col gap-2">
                        {SERVICE_TAGS.map((tag) => (
                          <label
                            key={tag}
                            className="flex items-center gap-2 cursor-pointer group p-1 hover:bg-slate-50 rounded transition-colors"
                          >
                            <input
                              type="radio"
                              name="service"
                              checked={activeTab === tag}
                              onChange={() => setActiveTab(tag)}
                              className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer accent-blue-600"
                            />
                            <span
                              className={`text-sm ${activeTab === tag ? "font-bold text-blue-700" : "text-slate-600 group-hover:text-slate-900"}`}
                            >
                              {tag}
                            </span>
                          </label>
                        ))}
                      </div>
                    </Accordion>
                    <Accordion title="성경 강해">
                      <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                        {BIBLE_BOOKS.map((book) => (
                          <button
                            key={book}
                            onClick={() => toggleBook(book)}
                            className={`py-2 text-[11px] rounded border transition-all ${selectedBooks.includes(book) ? "bg-blue-50 text-blue-700 border-blue-600 font-bold" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"}`}
                          >
                            {book}
                          </button>
                        ))}
                      </div>
                    </Accordion>
                    <Accordion title="시리즈/주제">
                      <div className="flex flex-wrap gap-2">
                        {SERIES_TOPICS.map((topic) => (
                          <button
                            key={topic}
                            onClick={() => toggleTopic(topic)}
                            className={`px-3 py-2 text-xs rounded-lg border transition-all text-left ${selectedTopics.includes(topic) ? "bg-emerald-50 text-emerald-700 border-emerald-500 font-bold" : "bg-slate-50 text-slate-600 border-slate-100 hover:border-slate-300 hover:bg-white"}`}
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                    </Accordion>
                    <Accordion title="연도">
                      <div className="grid grid-cols-3 gap-2">
                        {YEARS.map((year) => (
                          <button
                            key={year}
                            onClick={() =>
                              setSelectedYear(year === selectedYear ? "" : year)
                            }
                            className={`py-2 text-xs rounded border text-center transition-all ${selectedYear === year ? "bg-indigo-600 text-white border-indigo-600 font-bold shadow-md" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-800"}`}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    </Accordion>
                  </div>
                </div>
              </>
            )}
          </aside>

          <div className="flex-1 min-w-0">
            {selectedSermon ? (
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-100 animate-fade-in">
                <div className="lg:hidden p-4 border-b border-slate-100">
                  <button
                    onClick={() => setSelectedSermon(null)}
                    className="flex items-center text-sm font-bold text-slate-500 hover:text-blue-600"
                  >
                    <ChevronLeft size={16} /> 목록으로 돌아가기
                  </button>
                </div>
                <div className="aspect-video w-full bg-black">
                  {getEmbedUrl(selectedSermon.sermon_meta?.video_url) ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={getEmbedUrl(selectedSermon.sermon_meta?.video_url)}
                      title={selectedSermon.title.rendered}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      동영상 링크가 없습니다.
                    </div>
                  )}
                </div>
                <div className="p-8 md:p-12">
                  <h2
                    className="text-2xl md:text-4xl font-bold text-slate-900 mb-6 leading-snug break-keep"
                    dangerouslySetInnerHTML={{
                      __html: selectedSermon.title.rendered,
                    }}
                  />
                  <div className="flex flex-wrap items-center gap-6 py-6 border-t border-b border-slate-100 text-sm md:text-base text-slate-600">
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-slate-400" />
                      <span className="font-bold">
                        {selectedSermon.sermon_meta?.speaker || "담임목사"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-slate-400" />
                      <span>{formatDate(selectedSermon.date)}</span>
                    </div>
                    {selectedSermon.sermon_meta?.scripture && (
                      <div className="flex items-center gap-2">
                        <BookOpen size={18} className="text-slate-400" />
                        <span className="text-blue-600 font-bold">
                          {selectedSermon.sermon_meta?.scripture}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-8 prose prose-lg max-w-none text-slate-700 leading-loose">
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          selectedSermon.content.rendered ||
                          "설교 본문 내용이 없습니다.",
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="lg:hidden mb-6">
                  <button
                    onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                    className="w-full py-3.5 bg-slate-900 text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
                  >
                    <FilterIcon size={18} />{" "}
                    {isMobileFilterOpen ? "검색 필터 닫기" : "검색 필터 열기"}
                  </button>
                </div>
                {(selectedBooks.length > 0 ||
                  selectedTopics.length > 0 ||
                  selectedYear) && (
                  <div className="flex flex-wrap gap-2 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    {selectedBooks.map((book) => (
                      <span
                        key={book}
                        className="px-3 py-1.5 bg-white text-blue-700 border border-blue-200 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
                      >
                        {book}{" "}
                        <button
                          onClick={() => toggleBook(book)}
                          className="hover:text-red-500"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    {selectedTopics.map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1.5 bg-white text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
                      >
                        {topic}{" "}
                        <button
                          onClick={() => toggleTopic(topic)}
                          className="hover:text-red-500"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    {selectedYear && (
                      <span className="px-3 py-1.5 bg-white text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm">
                        {selectedYear}년{" "}
                        <button
                          onClick={() => setSelectedYear("")}
                          className="hover:text-red-500"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    )}
                  </div>
                )}
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-32 opacity-50">
                    <Loader2
                      className="animate-spin text-slate-400 mb-4"
                      size={40}
                    />
                    <p className="text-slate-400 text-sm">
                      말씀을 불러오고 있습니다...
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sermons.map((item) => {
                        const tags = item.sermon_meta?.tags || ["주일예배"];
                        const youtubeId = getYouTubeId(
                          item.sermon_meta?.video_url,
                        );
                        const thumbUrl = youtubeId
                          ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                          : item._embedded?.["wp:featuredmedia"]?.[0]
                              ?.source_url;
                        return (
                          <div
                            key={item.id}
                            className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 cursor-pointer"
                            onClick={() => setSelectedSermon(item)}
                          >
                            <div className="relative aspect-video bg-slate-200 overflow-hidden">
                              {thumbUrl ? (
                                <img
                                  src={thumbUrl}
                                  alt=""
                                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-300">
                                  <Play size={32} className="mb-2 opacity-50" />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors"></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                  <Play
                                    size={20}
                                    className="text-slate-900 fill-slate-900 ml-1"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="p-4">
                              <div className="flex flex-wrap gap-1 mb-2">
                                {tags.slice(0, 3).map((tag, i) => (
                                  <span
                                    key={i}
                                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${getTagColor(tag)}`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <h3
                                className="font-bold text-base text-slate-900 mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors"
                                dangerouslySetInnerHTML={{
                                  __html: item.title.rendered,
                                }}
                              />
                              <div className="flex items-center justify-between text-xs text-slate-400 mt-3 border-t border-slate-50 pt-2">
                                <span className="text-slate-600 font-medium">
                                  {item.sermon_meta?.speaker || "담임목사"}
                                </span>
                                <span>{formatDate(item.date)}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {!isLoading && totalPages > 1 && (
                      <div className="flex justify-center mt-12 gap-2">
                        <button
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 transition-colors"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        {getPageNumbers().map((pageNum) => (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm transition-all ${currentPage === pageNum ? "bg-slate-900 text-white shadow-md" : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"}`}
                          >
                            {pageNum}
                          </button>
                        ))}
                        <button
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 transition-colors"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
