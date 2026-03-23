"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

interface CarouselImage {
  src: string;
  label?: string;
}

interface HomePhotoCarouselProps {
  images: CarouselImage[];
}

export default function HomePhotoCarousel({ images }: HomePhotoCarouselProps) {
  if (!images.length) return null;

  // ── 무한 루프: 맨 앞에 마지막 이미지, 맨 뒤에 첫 이미지 복제 ──
  const padded = [images[images.length - 1], ...images, images[0]];

  // displayIndex 1 = 실제 첫 번째 사진 (왼쪽에 마지막 사진이 보임)
  const [displayIdx, setDisplayIdx] = useState(1);
  const [animated, setAnimated] = useState(true);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [translateX, setTranslateX] = useState(0);
  const [mounted, setMounted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const dragDelta = useRef(0);
  const isDragging = useRef(false);

  // 실제 dot 인덱스 (0-based)
  const realIdx = ((displayIdx - 1) % images.length + images.length) % images.length;

  useEffect(() => { setMounted(true); }, []);

  // ── translateX 계산 ──
  const calcTranslate = useCallback((idx: number) => {
    if (!containerRef.current) return 0;
    const cw = containerRef.current.offsetWidth;
    const isMobile = window.innerWidth < 768;
    const slideW = isMobile ? cw * 0.75 : cw * 0.58;
    const gap = isMobile ? 16 : 32;
    const center = (cw - slideW) / 2;
    return center - idx * (slideW + gap);
  }, []);

  useEffect(() => {
    setTranslateX(calcTranslate(displayIdx));
  }, [displayIdx, calcTranslate]);

  useEffect(() => {
    const onResize = () => setTranslateX(calcTranslate(displayIdx));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [displayIdx, calcTranslate]);

  // ── 무한 루프: 경계 도달 시 애니메이션 없이 점프 ──
  const handleTransitionEnd = useCallback(() => {
    if (displayIdx === 0) {
      setAnimated(false);
      setDisplayIdx(images.length);
    } else if (displayIdx === padded.length - 1) {
      setAnimated(false);
      setDisplayIdx(1);
    }
  }, [displayIdx, images.length, padded.length]);

  useEffect(() => {
    if (!animated) {
      const t = setTimeout(() => setAnimated(true), 20);
      return () => clearTimeout(t);
    }
  }, [animated]);

  const goTo = useCallback((idx: number) => {
    setAnimated(true);
    setDisplayIdx(idx);
  }, []);

  const prev = useCallback(() => goTo(displayIdx - 1), [displayIdx, goTo]);
  const next = useCallback(() => goTo(displayIdx + 1), [displayIdx, goTo]);

  // ── 터치 스와이프 ──
  const onTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    isDragging.current = true;
    dragDelta.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || dragStartX.current === null) return;
    dragDelta.current = e.touches[0].clientX - dragStartX.current;
  };
  const onTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (Math.abs(dragDelta.current) > 40) {
      dragDelta.current < 0 ? next() : prev();
    }
    dragStartX.current = null;
    dragDelta.current = 0;
  };

  // ── 마우스 드래그 ──
  const onMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
    isDragging.current = true;
    dragDelta.current = 0;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || dragStartX.current === null) return;
    dragDelta.current = e.clientX - dragStartX.current;
  };
  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (Math.abs(dragDelta.current) > 40) {
      dragDelta.current < 0 ? next() : prev();
    }
    dragStartX.current = null;
    dragDelta.current = 0;
  };

  // ── 키보드 ──
  useEffect(() => {
    const isLightbox = lightboxIdx !== null;
    const handleKey = (e: KeyboardEvent) => {
      if (isLightbox) {
        if (e.key === "Escape") setLightboxIdx(null);
        else if (e.key === "ArrowLeft")
          setLightboxIdx((i) => i === null ? null : (i - 1 + images.length) % images.length);
        else if (e.key === "ArrowRight")
          setLightboxIdx((i) => i === null ? null : (i + 1) % images.length);
      } else {
        if (e.key === "ArrowLeft") prev();
        else if (e.key === "ArrowRight") next();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIdx, prev, next, images.length]);

  // ── 스크롤 잠금 ──
  useEffect(() => {
    document.body.style.overflow = lightboxIdx !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIdx]);

  // ── 라이트박스 (Portal) ──
  const lightbox =
    lightboxIdx !== null && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
            onClick={() => setLightboxIdx(null)}
          >
            {/* 닫기 */}
            <button
              className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setLightboxIdx(null)}
              aria-label="닫기"
            >
              <X size={32} />
            </button>

            {/* 카운터 */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium z-10 pointer-events-none">
              {lightboxIdx + 1} / {images.length}
            </div>

            {/* 이전 */}
            {images.length > 1 && (
              <button
                className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-10 p-2 text-white/70 hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIdx((i) => ((i ?? 0) - 1 + images.length) % images.length);
                }}
                aria-label="이전 사진"
              >
                <ChevronLeft size={40} />
              </button>
            )}

            {/* 이미지 */}
            <div
              className="flex items-center justify-center w-full h-full p-16"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[lightboxIdx].src}
                alt={images[lightboxIdx].label || `사진 ${lightboxIdx + 1}`}
                style={{ maxHeight: "85vh", maxWidth: "85vw", objectFit: "contain" }}
                draggable={false}
              />
            </div>

            {/* 다음 */}
            {images.length > 1 && (
              <button
                className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-10 p-2 text-white/70 hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIdx((i) => ((i ?? 0) + 1) % images.length);
                }}
                aria-label="다음 사진"
              >
                <ChevronRight size={40} />
              </button>
            )}
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div
        className="relative select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* 트랙 */}
        <div ref={containerRef} className="overflow-hidden">
          <div
            className={`flex ${animated ? "transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]" : ""}`}
            style={{ transform: `translateX(${translateX}px)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {padded.map((img, i) => {
              const isCurrent = i === displayIdx;
              // 실제 이미지 인덱스 (라이트박스용)
              const realImageIdx =
                i === 0
                  ? images.length - 1
                  : i === padded.length - 1
                  ? 0
                  : i - 1;

              return (
                <div
                  key={i}
                  className="shrink-0 w-[75%] md:w-[58%] mx-2 md:mx-4 relative group"
                >
                  <button
                    className="block w-full focus:outline-none cursor-pointer"
                    onClick={() => {
                      // 드래그 후 클릭 방지
                      if (Math.abs(dragDelta.current) > 5) return;
                      if (isCurrent) {
                        setLightboxIdx(realImageIdx);
                      } else {
                        goTo(i);
                      }
                    }}
                    aria-label={isCurrent ? "크게 보기" : "이 사진으로 이동"}
                  >
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        isCurrent
                          ? "shadow-2xl shadow-black/20"
                          : "opacity-50 scale-[0.97]"
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={img.label || `사진 ${realImageIdx + 1}`}
                        className={`w-full aspect-[16/9] object-cover transition-transform duration-700 ${
                          isCurrent ? "group-hover:scale-[1.02]" : ""
                        }`}
                        draggable={false}
                      />
                    </div>
                  </button>

                  {/* 확대 아이콘 */}
                  {isCurrent && (
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/50 rounded-full p-1.5 pointer-events-none">
                      <Maximize2 size={14} className="text-white" />
                    </div>
                  )}

                  {/* 라벨 */}
                  {img.label && isCurrent && (
                    <span className="absolute bottom-3 left-3 text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase bg-black/30 px-2 py-1 rounded-sm backdrop-blur-sm pointer-events-none">
                      {img.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 도트 */}
        <div className="flex justify-center items-center gap-1.5 mt-5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i + 1)}
              aria-label={`${i + 1}번 사진으로 이동`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === realIdx
                  ? "w-6 bg-slate-800"
                  : "w-1.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>

      {lightbox}
    </>
  );
}
