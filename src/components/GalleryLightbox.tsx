"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryLightboxProps {
  images: string[];
  altPrefix: string;
}

export default function GalleryLightbox({ images, altPrefix }: GalleryLightboxProps) {
  const [failedSet, setFailedSet] = useState<Set<number>>(new Set());
  const markFailed = useCallback((src: string) => {
    const i = images.indexOf(src);
    if (i !== -1) setFailedSet((p) => new Set(p).add(i));
  }, [images]);
  const validImages = images.filter((_, i) => !failedSet.has(i));

  // 마퀴 애니메이션 (RAF)
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);

  const [paused, setPaused] = useState(false);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    if (validImages.length === 0) return;
    const SPEED = 0.5; // px/frame

    const tick = () => {
      const track = trackRef.current;
      if (track && !pausedRef.current) {
        posRef.current -= SPEED;
        // 트랙 전체의 1/3(= 원본 1세트)만큼 이동하면 리셋
        const oneSet = track.scrollWidth / 3;
        if (Math.abs(posRef.current) >= oneSet) posRef.current = 0;
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [validImages.length]);

  // 라이트박스
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") setLightbox((p) => p === null ? null : (p - 1 + validImages.length) % validImages.length);
      if (e.key === "ArrowRight") setLightbox((p) => p === null ? null : (p + 1) % validImages.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, validImages.length, closeLightbox]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  if (validImages.length === 0) return null;

  // 무한 루프용 3벌 복제
  const looped = [...validImages, ...validImages, ...validImages];

  return (
    <>
      <section
        className="border-t border-slate-100 pt-10 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={trackRef}
          className="flex gap-8 will-change-transform"
          style={{ width: "max-content" }}
        >
          {looped.map((src, i) => (
            <button
              key={`${src}-${i}`}
              onClick={() => setLightbox(i % validImages.length)}
              className="shrink-0 w-[22rem] md:w-[28rem] aspect-[4/3] overflow-hidden bg-slate-100 focus:outline-none"
              aria-label={`${altPrefix} 사진 ${(i % validImages.length) + 1} 크게 보기`}
            >
              <img
                src={src}
                alt={`${altPrefix} 사진 ${(i % validImages.length) + 1}`}
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                onError={() => markFailed(src)}
              />
            </button>
          ))}
        </div>
      </section>

      {/* 라이트박스 */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
            onClick={closeLightbox}
            aria-label="닫기"
          >
            <X size={32} />
          </button>
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium z-10">
            {lightbox + 1} / {validImages.length}
          </div>
          {validImages.length > 1 && (
            <>
              <button
                className="absolute left-3 md:left-6 p-2 text-white/70 hover:text-white transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); setLightbox((p) => p === null ? null : (p - 1 + validImages.length) % validImages.length); }}
                aria-label="이전 사진"
              >
                <ChevronLeft size={40} />
              </button>
              <button
                className="absolute right-3 md:right-6 p-2 text-white/70 hover:text-white transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); setLightbox((p) => p === null ? null : (p + 1) % validImages.length); }}
                aria-label="다음 사진"
              >
                <ChevronRight size={40} />
              </button>
            </>
          )}
          <div
            className="max-h-[88vh] max-w-[88vw] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={validImages[lightbox]}
              alt={`${altPrefix} 사진 ${lightbox + 1}`}
              className="max-h-[88vh] max-w-[88vw] object-contain select-none"
              draggable={false}
            />
          </div>
        </div>
      )}
    </>
  );
}
