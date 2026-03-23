"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Search,
  Loader2,
  Play,
  X,
  BookOpen,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Filter as FilterIcon,
  List,
  Tag,
  LayoutGrid,
  AlignJustify,
  Download,
  Headphones,
} from "lucide-react";
import { HeroSub } from "@/components/Common";
import type { WPSermon, WPTaxonomyItem } from "@/lib/types";
import { getYouTubeId } from "@/utils/youtube";
import { formatDate, getCleanTitle } from "@/utils/format";

const WP_DOMAIN =
  process.env.NEXT_PUBLIC_WORDPRESS_DOMAIN || "http://suwonhana.local";
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

// --- 개별 설교 카드 컴포넌트 ---
const SermonCard = ({
  item,
  viewMode,
  onClick,
}: {
  item: WPSermon;
  viewMode: "grid" | "list";
  onClick: (item: WPSermon) => void;
}) => {
  const tags = item.sermon_meta?.tags || ["주일예배"];
  const youtubeId = getYouTubeId(item.sermon_meta?.video_url);

  const [imgSrc, setImgSrc] = useState<string>("");
  const [imgError, setImgError] = useState(false);

  const cleanTitle =
    item.sermon_meta?.clean_title || getCleanTitle(item.title.rendered);

  useEffect(() => {
    if (youtubeId) {
      setImgSrc(`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`);
      setImgError(false);
    } else {
      setImgSrc(item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "");
    }
  }, [youtubeId, item._embedded]);

  const handleImgError = () => {
    if (!imgError && youtubeId) {
      setImgError(true);
      setImgSrc(`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`);
    }
  };

  if (viewMode === "list") {
    return (
      <div
        onClick={() => onClick(item)}
        className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-slate-100 cursor-pointer flex flex-col sm:flex-row gap-0 sm:gap-6 transition-all duration-300 hover:bg-slate-50/50"
      >
        <div className="w-full sm:w-64 shrink-0 relative aspect-video bg-slate-200 overflow-hidden">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt=""
              onError={handleImgError}
              className="w-full h-full object-cover transform scale-[1.01] group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
              <Play size={32} className="opacity-50" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md backdrop-blur-sm">
              <Play size={16} className="text-slate-900 fill-slate-900 ml-1" />
            </div>
          </div>
        </div>

        <div className="flex-1 py-4 pr-4 pl-4 sm:pl-0 flex flex-col justify-center">
          <div className="flex flex-wrap gap-1 mb-2">
            {tags.slice(0, 5).map((tag, i) => (
              <span
                key={i}
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${getTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
          {/* [MODIFIED] 정제된 제목 사용 */}
          <h3
            className="font-bold text-lg text-slate-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors"
            // dangerouslySetInnerHTML 대신 일반 문자열로 렌더링해도 됩니다 (HTML 태그가 없다면)
            // 하지만 WP 특수문자 처리를 위해 dangerouslySetInnerHTML 사용 유지하되 cleanTitle 적용
            dangerouslySetInnerHTML={{ __html: cleanTitle }}
          />
          <div className="flex items-center gap-3 text-xs text-slate-500 mt-auto">
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <Users size={14} /> {item.sermon_meta?.speaker || "담임목사"}
            </span>
            <span className="w-px h-3 bg-slate-300"></span>
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {formatDate(item.date)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // --- 그리드형 뷰 ---
  return (
    <div
      onClick={() => onClick(item)}
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 cursor-pointer h-full flex flex-col"
    >
      <div className="relative aspect-video bg-slate-200 overflow-hidden">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt=""
            onError={handleImgError}
            className="w-full h-full object-cover transform scale-[1.01] group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-300">
            <Play size={32} className="mb-2 opacity-50" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            <Play size={20} className="text-slate-900 fill-slate-900 ml-1" />
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
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
        {/* [MODIFIED] 정제된 제목 사용 */}
        <h3
          className="font-bold text-base text-slate-900 mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors"
          dangerouslySetInnerHTML={{ __html: cleanTitle }}
        />
        <div className="flex items-center justify-between text-xs text-slate-400 mt-auto pt-3">
          <span className="text-slate-600 font-medium">
            {item.sermon_meta?.speaker || "담임목사"}
          </span>
          <span>{formatDate(item.date)}</span>
        </div>
      </div>
    </div>
  );
};

// 아코디언 컴포넌트
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
        type="button"
        className="flex items-center justify-between w-full text-slate-900 font-extrabold text-[15px] hover:text-blue-600 transition-colors"
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUp size={18} className="text-slate-400" />
        ) : (
          <ChevronDown size={18} className="text-slate-400" />
        )}
      </button>
      {isOpen && <div className="animate-fade-in mt-3">{children}</div>}
    </div>
  );
}

function SermonPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedSermon, setSelectedSermon] = useState<WPSermon | null>(null);
  const [sermons, setSermons] = useState<WPSermon[]>([]);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [activeTab, setActiveTab] = useState("전체");
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(0);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [categoryMap, setCategoryMap] = useState<Record<string, number[]>>({});
  const [tagMap, setTagMap] = useState<Record<string, number>>({});
  const [taxonomiesLoaded, setTaxonomiesLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchAllTaxonomies = async () => {
      try {
        const getAllItems = async (endpoint: string) => {
          let allItems: WPTaxonomyItem[] = [];
          let page = 1;
          let hasMore = true;
          while (hasMore) {
            const res = await fetch(
              `${WP_DOMAIN}/wp-json/wp/v2/${endpoint}?per_page=100&page=${page}`,
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
          allCategories.forEach((apiCat: WPTaxonomyItem) => {
            if (apiCat.name.includes(bookName))
              catMap[bookName].push(apiCat.id);
          });
        });
        setCategoryMap(catMap);

        const allTags = await getAllItems("risen_multimedia_tag");
        const tMap: Record<string, number> = {};
        allTags.forEach((item: WPTaxonomyItem) => {
          tMap[item.name] = item.id;
        });
        setTagMap(tMap);
      } catch (e) {
        console.error("데이터 로딩 실패", e);
      } finally {
        setTaxonomiesLoaded(true);
      }
    };
    fetchAllTaxonomies();
  }, []);

  // 검색어 디바운스 (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (!taxonomiesLoaded) return;
    setCurrentPage(1);
    fetchSermons(1);
  }, [activeTab, selectedBooks, selectedTopics, selectedYear, searchTrigger, debouncedSearch, taxonomiesLoaded]);

  useEffect(() => {
    fetchSermons(currentPage);
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  const fetchSermons = async (page = 1) => {
    setIsLoading(true);
    try {
      let url = `${WP_DOMAIN}/wp-json/wp/v2/risen_multimedia?_embed&per_page=${ITEMS_PER_PAGE}&page=${page}`;

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

      if (debouncedSearch) url += `&search=${encodeURIComponent(debouncedSearch)}`;
      if (selectedYear) {
        url += `&after=${selectedYear}-01-01T00:00:00`;
        url += `&before=${selectedYear}-12-31T23:59:59`;
      }

      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 400) {
          setSermons([]);
          setTotalPages(0);
          return;
        }
        setSermons([]);
        setTotalPages(0);
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
    setIsMobileFilterOpen(false);
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
    if (SERVICE_TAGS.includes(tag) && tag !== "전체") {
      setActiveTab(tag);
    } else {
      setSearchTerm(tag);
      setSearchTrigger((prev) => prev + 1);
    }
    setSelectedSermon(null);
    router.push("/sermon", { scroll: false });
  };

  // URL ?id= 파라미터로 상세 sermon 로드 (새로고침 복원)
  useEffect(() => {
    const id = searchParams.get("id");
    if (!id) return;
    // 이미 선택된 경우 중복 fetch 방지
    if (selectedSermon && selectedSermon.id === Number(id)) return;
    fetch(`${WP_DOMAIN}/wp-json/wp/v2/risen_multimedia/${id}?_embed`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && data.id) setSelectedSermon(data);
      })
      .catch(() => {});
  }, [searchParams]);

  const getEmbedUrl = (url?: string) => {
    const id = getYouTubeId(url);
    return id ? `https://www.youtube.com/embed/${id}` : url;
  };

  // content.rendered에서 오디오 URL 추출 (sermon_meta.audio_url 없을 때 fallback)
  const extractAudioUrl = (html: string): string => {
    const srcMatch = html.match(/<audio[^>]*src=["']([^"']+)["']/i);
    if (srcMatch) return srcMatch[1];
    const sourceMatch = html.match(/<source[^>]*src=["']([^"']+\.mp3[^"']*)["']/i);
    if (sourceMatch) return sourceMatch[1];
    const hrefMatch = html.match(/href=["']([^"']+\.mp3[^"']*)["']/i);
    if (hrefMatch) return hrefMatch[1];
    return "";
  };

  // 본문 content에서 YouTube 임베드 + 오디오 플레이어 + MP3 링크 제거
  const cleanContent = (html: string, hasVideo: boolean): string => {
    let cleaned = html;
    if (hasVideo) {
      cleaned = cleaned
        .replace(/<figure[^>]*class="[^"]*wp-block-embed[^"]*"[^>]*>[\s\S]*?<\/figure>/gi, "")
        .replace(/<iframe[^>]*(youtube\.com|youtu\.be)[^>]*>[\s\S]*?<\/iframe>/gi, "")
        .replace(/<iframe[^>]*(youtube\.com|youtu\.be)[^>]*\/>/gi, "");
    }
    // 오디오 플레이어 섹션 제거 (말씀Audio 제목 + audio 태그 + MP3 download 링크)
    cleaned = cleaned
      // wp-block-audio figure 전체 제거 (가장 먼저)
      .replace(/<figure[^>]*class="[^"]*wp-block-audio[^"]*"[^>]*>[\s\S]*?<\/figure>/gi, "")
      // audio 태그 직접 제거
      .replace(/<audio[^>]*>[\s\S]*?<\/audio>/gi, "")
      // "말씀Audio" / "Audio" / "오디오" 텍스트만 있는 블록 태그 제거 (중첩 태그 포함)
      .replace(/<(?:p|h[1-6]|div)[^>]*>(?:<(?:strong|b|em|span)[^>]*>)?\s*(?:말씀\s*)?(?:Audio|오디오)\s*(?:<\/(?:strong|b|em|span)>)?<\/(?:p|h[1-6]|div)>/gi, "")
      // MP3 download 링크 단락 제거
      .replace(/<p[^>]*>\s*<a[^>]+\.mp3[^>]*>[^<]*<\/a>\s*<\/p>/gi, "")
      .replace(/<p[^>]*>\s*MP3\s*[Dd]ownload[^<]*<\/p>/gi, "")
      // MP3 링크 a태그 제거 (단독)
      .replace(/<a[^>]+href=["'][^"']*\.mp3[^"']*["'][^>]*>[^<]*<\/a>/gi, "")
      .replace(/^\s*[\r\n]/gm, "")
      .trim();
    return cleaned;
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const getAsideClassName = () => {
    const desktopClasses =
      "lg:w-[280px] lg:shrink-0 lg:bg-transparent lg:p-0 lg:rounded-none lg:shadow-none lg:border-none lg:sticky lg:top-24 lg:block lg:z-auto";

    if (selectedSermon) {
      return `hidden lg:block ${desktopClasses}`;
    }

    if (isMobileFilterOpen) {
      return `fixed inset-0 z-[100] overflow-y-auto bg-white p-5 ${desktopClasses}`;
    } else {
      return `hidden ${desktopClasses}`;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <HeroSub
        title="말씀뱅크"
        desc="수원하나교회의 주일예배 및 특별 집회 설교를 다시 보실 수 있습니다."
      />

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <aside className={getAsideClassName()}>
            {selectedSermon ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-4 animate-fade-in">
                <button
                  onClick={() => { setSelectedSermon(null); router.push("/sermon", { scroll: false }); }}
                  className="w-full py-3 bg-white border border-slate-300 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-sm"
                >
                  <List size={18} /> 목록으로 돌아가기
                </button>
                <div className="w-full h-px bg-slate-100 my-2"></div>
                <div className="mt-2">
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
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="text-sm font-bold text-slate-500 p-2"
                  >
                    닫기
                  </button>
                </div>

                <div className="block">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-extrabold text-lg text-slate-900 hidden lg:block mb-0">
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
                    className="relative group mb-3"
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
                  <div className="bg-white rounded-2xl border border-slate-200 px-5 py-1 shadow-sm">
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
                    onClick={() => { setSelectedSermon(null); router.push("/sermon", { scroll: false }); }}
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
                      __html:
                        selectedSermon.sermon_meta?.clean_title ||
                        getCleanTitle(selectedSermon.title.rendered),
                    }}
                  />
                  {/* 정보 바 + MP3 버튼 우측 배치 */}
                  {(() => {
                    const rawHtml = selectedSermon.content.rendered || "";
                    const audioUrl =
                      selectedSermon.sermon_meta?.audio_url ||
                      extractAudioUrl(rawHtml);
                    return (
                      <div className="flex flex-wrap items-center gap-4 py-6 border-t border-b border-slate-100 text-sm md:text-base text-slate-600">
                        <div className="flex items-center gap-2">
                          <Users size={18} className="text-slate-400" />
                          <span className="font-bold">
                            {selectedSermon.sermon_meta?.speaker || "담임목사"}
                          </span>
                        </div>
                        {selectedSermon.sermon_meta?.scripture && (
                          <div className="flex items-center gap-2">
                            <BookOpen size={18} className="text-slate-400" />
                            <span>{selectedSermon.sermon_meta?.scripture}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar size={18} className="text-slate-400" />
                          <span>{formatDate(selectedSermon.date)}</span>
                        </div>
                        {audioUrl && (
                          <a
                            href={audioUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto inline-flex items-center gap-2 px-4 py-2 bg-slate-400 hover:bg-slate-500 text-white rounded-full text-xs font-bold transition-colors shadow-sm shrink-0"
                          >
                            <Headphones size={14} />
                            MP3
                            <Download size={12} className="opacity-70" />
                          </a>
                        )}
                      </div>
                    );
                  })()}

                  {/* 본문 — YouTube 임베드 + 오디오 섹션 제거 후 표시 */}
                  {(() => {
                    const rawHtml = selectedSermon.content.rendered || "";
                    const hasVideo = !!selectedSermon.sermon_meta?.video_url;
                    const cleanedHtml = cleanContent(rawHtml, hasVideo);
                    if (!cleanedHtml.trim()) return null;
                    return (
                      <div className="mt-8 prose prose-lg max-w-none text-slate-700 leading-loose">
                        <div dangerouslySetInnerHTML={{ __html: cleanedHtml }} />
                      </div>
                    );
                  })()}
                </div>
              </div>
            ) : (
              <>
                <div className="lg:hidden mb-6">
                  <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="w-full py-3.5 bg-slate-900 text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
                  >
                    <FilterIcon size={18} /> 검색 필터 열기
                  </button>
                </div>

                <div className="flex items-center justify-end mb-4 gap-2">
                  <div className="bg-white p-1 rounded-lg border border-slate-200 flex items-center">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-md transition-all ${viewMode === "grid" ? "bg-slate-100 text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                      aria-label="그리드 보기"
                    >
                      <LayoutGrid size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-md transition-all ${viewMode === "list" ? "bg-slate-100 text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                      aria-label="리스트 보기"
                    >
                      <AlignJustify size={18} />
                    </button>
                  </div>
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
                  <div className="flex flex-col items-center justify-center py-32 opacity-80 min-h-[400px]">
                    <Loader2
                      className="animate-spin text-blue-600 mb-4"
                      size={48}
                    />
                    <p className="text-slate-500 font-bold text-base animate-pulse">
                      말씀을 불러오고 있습니다...
                    </p>
                  </div>
                ) : sermons.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-32 min-h-[400px] text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                      <BookOpen size={28} className="text-slate-300" />
                    </div>
                    <p className="text-slate-900 font-bold text-lg mb-2">검색 결과가 없습니다</p>
                    <p className="text-slate-400 text-sm mb-6">다른 검색어나 필터를 시도해보세요.</p>
                    <button
                      onClick={resetFilters}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-slate-800 transition-colors"
                    >
                      <RotateCcw size={14} /> 필터 초기화
                    </button>
                  </div>
                ) : (
                  <>
                    <div
                      className={
                        viewMode === "grid"
                          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                          : "flex flex-col gap-4"
                      }
                    >
                      {sermons.map((item) => (
                        <SermonCard
                          key={item.id}
                          item={item}
                          viewMode={viewMode}
                          onClick={(s) => {
                            setSelectedSermon(s);
                            router.push(`/sermon?id=${s.id}`, { scroll: false });
                          }}
                        />
                      ))}
                    </div>

                    {!isLoading && totalPages > 1 && (
                      <div className="flex justify-center mt-12 gap-2 flex-wrap">
                        <button
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronLeft size={20} />
                        </button>

                        {getPageNumbers().map((pageNum, index) => (
                          <React.Fragment key={index}>
                            {pageNum === "..." ? (
                              <span className="w-10 h-10 flex items-center justify-center text-slate-400 font-bold tracking-widest">
                                ...
                              </span>
                            ) : (
                              <button
                                onClick={() => setCurrentPage(Number(pageNum))}
                                className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm transition-all ${
                                  currentPage === pageNum
                                    ? "bg-slate-900 text-white shadow-md transform scale-105"
                                    : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
                                }`}
                              >
                                {pageNum}
                              </button>
                            )}
                          </React.Fragment>
                        ))}

                        <button
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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

export default function SermonPage() {
  return (
    <Suspense>
      <SermonPageInner />
    </Suspense>
  );
}
