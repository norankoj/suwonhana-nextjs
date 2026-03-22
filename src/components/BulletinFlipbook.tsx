"use client";

import React, { useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, X } from "lucide-react";

// SSR 비활성화 (react-pageflip은 브라우저 전용)
const HTMLFlipBook = dynamic(
  () => import("react-pageflip").then((m) => m.HTMLFlipBook as never),
  { ssr: false }
) as React.ComponentType<FlipBookProps>;

interface FlipBookProps {
  width: number;
  height: number;
  size: "fixed" | "stretch";
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  showCover: boolean;
  mobileScrollSupport: boolean;
  usePortrait: boolean;
  drawShadow: boolean;
  flippingTime: number;
  className: string;
  ref: React.Ref<FlipBookRef>;
  onFlip: (e: { data: number }) => void;
  children: React.ReactNode;
}

interface FlipBookRef {
  pageFlip: () => {
    flipPrev: () => void;
    flipNext: () => void;
    flip: (page: number) => void;
    getCurrentPageIndex: () => number;
    getPageCount: () => number;
  };
}

interface BulletinImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

interface Props {
  images: BulletinImage[];
}

// 낱장 페이지 컴포넌트 (forwardRef 필요)
const Page = React.forwardRef<HTMLDivElement, { image: BulletinImage; pageNum: number }>(
  ({ image, pageNum }, ref) => (
    <div ref={ref} className="bg-white shadow-sm overflow-hidden">
      <img
        src={image.url}
        alt={image.alt || `주보 ${pageNum}페이지`}
        className="w-full h-full object-contain"
        draggable={false}
      />
    </div>
  )
);
Page.displayName = "Page";

export default function BulletinFlipbook({ images }: Props) {
  const bookRef = useRef<FlipBookRef>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const totalPages = images.length;

  const handleFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data);
  }, []);

  const goPrev = useCallback(() => {
    bookRef.current?.pageFlip().flipPrev();
  }, []);

  const goNext = useCallback(() => {
    bookRef.current?.pageFlip().flipNext();
  }, []);

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        주보 이미지를 불러올 수 없습니다.
      </div>
    );
  }

  // 현재 화면에 보이는 페이지 번호 (1-based)
  const displayPage = currentPage + 1;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* 플립북 */}
      <div className="w-full flex justify-center">
        <HTMLFlipBook
          ref={bookRef}
          width={420}
          height={594}       /* A4 비율 (1:√2) */
          size="stretch"
          minWidth={260}
          maxWidth={500}
          minHeight={368}
          maxHeight={707}
          showCover={false}
          mobileScrollSupport={true}
          usePortrait={true}  /* 모바일: 한 장씩 */
          drawShadow={true}
          flippingTime={600}
          className="shadow-2xl shadow-slate-900/20"
          onFlip={handleFlip}
        >
          {images.map((img, i) => (
            <Page key={i} image={img} pageNum={i + 1} />
          ))}
        </HTMLFlipBook>
      </div>

      {/* 컨트롤 바 */}
      <div className="flex items-center gap-6">
        {/* 이전 */}
        <button
          onClick={goPrev}
          disabled={currentPage === 0}
          className="p-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="이전 페이지"
        >
          <ChevronLeft size={20} />
        </button>

        {/* 페이지 표시 */}
        <span className="text-sm text-slate-500 min-w-[80px] text-center tabular-nums">
          {displayPage} / {totalPages}
        </span>

        {/* 다음 */}
        <button
          onClick={goNext}
          disabled={currentPage >= totalPages - 1}
          className="p-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="다음 페이지"
        >
          <ChevronRight size={20} />
        </button>

        {/* 현재 페이지 크게 보기 */}
        <button
          onClick={() => setLightboxIdx(currentPage)}
          className="p-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 transition-all"
          aria-label="크게 보기"
        >
          <Maximize2 size={18} />
        </button>
      </div>

      {/* 썸네일 페이지 점프 */}
      {totalPages <= 20 && (
        <div className="flex flex-wrap justify-center gap-1.5 max-w-lg">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => bookRef.current?.pageFlip().flip(i)}
              className={`w-7 h-7 text-xs rounded font-medium transition-all ${
                i === currentPage
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* 라이트박스 */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightboxIdx(null)}
          >
            <X size={32} />
          </button>

          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {lightboxIdx + 1} / {totalPages}
          </div>

          {lightboxIdx > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white"
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((i) => (i ?? 0) - 1); }}
            >
              <ChevronLeft size={40} />
            </button>
          )}

          <img
            src={images[lightboxIdx].url}
            alt={`주보 ${lightboxIdx + 1}페이지`}
            style={{ maxHeight: "90vh", maxWidth: "90vw", objectFit: "contain" }}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />

          {lightboxIdx < totalPages - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white"
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((i) => (i ?? 0) + 1); }}
            >
              <ChevronRight size={40} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
