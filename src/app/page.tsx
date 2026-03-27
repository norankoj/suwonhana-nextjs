"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Copy, X, ChevronDown } from "lucide-react";
import { MainHero, MainHeroData } from "@/components/MainHero";
import WelcomeSection from "@/components/WelcomeSection";
import HomePhotoCarousel from "@/components/HomePhotoCarousel";
import BulletinFlipbook from "@/components/BulletinFlipbook";
import type { WPSlide } from "@/lib/types";

// =================================================================
// [설정 영역] 워드프레스 연결 정보
// =================================================================

const WP_DOMAIN =
  process.env.NEXT_PUBLIC_WORDPRESS_DOMAIN || "http://suwonhana.local";
const SLIDE_POST_TYPE = "risen_slide";

const RECEIPT_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfD5f0YpO6Y1b9Z6U6Yz4k3n8FQ1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1ZQ/viewform";

export default function MainPage() {
  const [showAccountInfo, setShowAccountInfo] = useState(false);

  const [heroSlides, setHeroSlides] = useState<MainHeroData[] | null>(null);
  const [wpHomeData, setWpHomeData] = useState<Record<string, string> | null>(
    null,
  );
  const [bulletinImages, setBulletinImages] = useState<
    { url: string; alt?: string }[] | null
  >(null);

  // =================================================================
  // [API 연동] 홈페이지 ACF 데이터 (Bento Grid 이미지)
  // =================================================================
  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const url = `${WP_DOMAIN}/wp-json/wp/v2/pages?slug=homepage-settings`;
        const r = await fetch(url);
        const pages: Array<{
          id?: number;
          acf?: Record<string, unknown> | false;
        }> = r.ok ? await r.json() : [];

        if (!pages.length) {
          console.warn("[WP] ❌ homepage-settings 페이지 없음");
          return;
        }
        const page = pages[0];
        if (!page.acf) {
          console.warn(
            "[WP] ❌ acf false — ACF 위치 규칙 확인 필요. page.id:",
            page.id,
          );
          return;
        }

        // 반환 형식 자동 처리: URL string / 배열 object / ID number
        const normalized: Record<string, string> = {};
        const idEntries: Array<[string, number]> = [];

        for (const [key, val] of Object.entries(
          page.acf as Record<string, unknown>,
        )) {
          if (typeof val === "string" && val) {
            normalized[key] = val;
          } else if (typeof val === "number" && val) {
            idEntries.push([key, val]);
          } else if (val && typeof val === "object") {
            if ("url" in val) normalized[key] = (val as { url: string }).url;
            else if ("sizes" in val) {
              const s = (val as { sizes?: { large?: string; full?: string } })
                .sizes;
              normalized[key] = s?.large || s?.full || "";
            }
          }
        }

        // Image ID → media API로 URL 조회
        if (idEntries.length > 0) {
          console.log(
            "[WP] Image ID 형식 감지, media API 조회 중...",
            idEntries,
          );
          const results = await Promise.all(
            idEntries.map(async ([key, id]) => {
              const mr = await fetch(
                `${WP_DOMAIN}/wp-json/wp/v2/media/${id}`,
              ).catch(() => null);
              const m = mr?.ok ? await mr.json() : null;
              return m?.source_url
                ? ([key, m.source_url as string] as [string, string])
                : null;
            }),
          );
          results.forEach((res) => {
            if (res) normalized[res[0]] = res[1];
          });
        }

        setWpHomeData(normalized);
      } catch (err) {
        console.error("[WP] homepage-settings fetch 실패:", err);
        setWpHomeData({}); // 실패해도 로딩 완료 처리
      }
    };
    loadHomeData();
  }, []);

  // =================================================================
  // [API 연동] 워드프레스에서 슬라이드 이미지 가져오기
  // =================================================================
  // API 데이터 가져오기
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const endpoint = `${WP_DOMAIN}/wp-json/wp/v2/${SLIDE_POST_TYPE}?per_page=10&_embed`;
        const res = await fetch(endpoint);

        if (!res.ok) throw new Error("API Network Error");
        const data = await res.json();

        const slideData = data
          .map((item: WPSlide) => {
            // 특성 이미지 추출
            if (
              item._embedded &&
              item._embedded["wp:featuredmedia"] &&
              item._embedded["wp:featuredmedia"][0]
            ) {
              const media = item._embedded["wp:featuredmedia"][0];
              // [수정] 캡션 가져오기 로직 (Code Snippets에서 만든 custom_meta 사용)
              // 1순위: Slide Options에 적은 캡션 (custom_meta)
              let caption = item.custom_meta?.caption;

              // 2순위: 그게 없으면 글 제목 사용
              if (!caption) {
                caption = item.title?.rendered;
              }

              // Click URL 연결 — 없으면 빈값
              const link = item.acf?.link || "";

              // 버튼 텍스트 — 빈값이면 버튼 미표시
              const buttonText = item.acf?.button_text || "";
              const isLive = item.acf?.is_live || false;

              return {
                imageUrl: media.source_url,
                caption: caption || "",
                isLive: isLive,
                // MainHero로 넘겨줄 데이터에 추가
                buttonText: buttonText,
                link: link,
              };
            }
            return null;
          })
          .filter(
            (item: MainHeroData | null): item is MainHeroData => item !== null,
          );

        // 데이터가 있으면 설정, 없으면 빈 배열(기본 슬라이드 표시)
        setHeroSlides(slideData.length > 0 ? slideData : []);
      } catch (error) {
        console.error("슬라이드 로딩 실패:", error);
        setHeroSlides([]); // 에러 시 기본 슬라이드 표시
      }
    };

    fetchSlides();
  }, []);

  // =================================================================
  // [API 연동] 온라인 주보 이미지 (jubo 페이지 첨부 미디어)
  // =================================================================
  useEffect(() => {
    const loadBulletin = async () => {
      try {
        const ts = Date.now();
        const pageRes = await fetch(
          `${WP_DOMAIN}/wp-json/wp/v2/pages?slug=jubo&_fields=content&_=${ts}`,
          { cache: "no-store" },
        );
        if (!pageRes.ok) {
          setBulletinImages([]);
          return;
        }
        const pages: { content: { rendered: string } }[] = await pageRes.json();
        if (!pages.length) {
          setBulletinImages([]);
          return;
        }

        // 페이지 본문 HTML에서 이미지 URL 추출
        const html = pages[0].content.rendered;
        const images: { url: string }[] = [];
        const seen = new Set<string>();
        const addImage = (url: string) => {
          const clean = url.split("?")[0];
          if (clean && !seen.has(clean)) {
            seen.add(clean);
            images.push({ url: clean });
          }
        };

        // src에서 -NxN suffix 제거 → 원본 URL 복원 (srcset은 크롭 썸네일만 포함)
        const imgTagRegex = /<img[^>]+>/gi;
        let tag;
        while ((tag = imgTagRegex.exec(html)) !== null) {
          const srcMatch = /src="([^"]+)"/.exec(tag[0]);
          if (srcMatch) {
            addImage(srcMatch[1].replace(/-\d+x\d+(\.[^.?]+)$/, "$1"));
          }
        }
        setBulletinImages(images);
      } catch {
        setBulletinImages([]);
      }
    };
    loadBulletin();
  }, []);

  return (
    <>
      <div className="animate-fade-in">
        {/* 1. 메인 히어로 — null이면 skeleton, 배열이면 실제 데이터 */}
        <MainHero
          slidesData={heroSlides}
          key={heroSlides?.length ?? "loading"}
        />

        {/* 2. 환영 메시지 (Welcome) - 중앙 정렬 타이포그래피 집중형 */}
        <section className="py-24 md:py-32 bg-white flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* 거대한 메인 타이틀 */}
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-10 tracking-normal break-keep"
              style={{ lineHeight: '1.2' }}
            >
              하나님을 즐거워하고
              <br />그 분의 목적에 헌신하는 공동체
            </h2>

            {/* 텍스트 그룹 (본문 + 하단 캡션을 하나로 묶음) */}
            <div className="mb-10">
              <p className="text-lg md:text-xl text-slate-600 mb-4 leading-relaxed break-keep max-w-2xl mx-auto">
                <strong className="text-slate-900 font-extrabold">하나</strong>
                의 의미는{" "}
                <strong className="text-slate-900 font-extrabold">
                  하나님의 나라(Kingdom)
                </strong>
                를 건설하고,
                <br className="hidden sm:block" />
                형제 자매가
                <strong className="text-slate-900 font-extrabold">
                  연합(Unity)
                </strong>
                하여 하나가 되어간다는 뜻입니다.
              </p>
              {/* 버튼 아래에 있던 캡션을 본문 바로 밑으로 이동! */}
              <p className="text-sm text-slate-400">
                * 수원하나교회는 기독교 한국 침례회 교단 소속입니다.
              </p>
            </div>

            {/* 버튼 영역 (가장 마지막에 단독으로 배치하여 시선 집중) */}
            <div className="flex justify-center">
              <a
                href="/intro/vision"
                className="group inline-flex items-center gap-1.5 px-5 py-2.5 md:px-8 md:py-4 bg-slate-900 text-white rounded-full font-bold text-sm md:text-base hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/20"
              >
                교회 소개 더보기
                <ChevronRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </div>
          </div>
        </section>

        {/* 3. 교회 소개 이미지 — 캐러셀 */}
        <section className="pb-20 md:pb-28 bg-white">
          {wpHomeData === null ? (
            /* ── 로딩 스켈레톤 ── */
            <div className="flex flex-col items-center gap-5">
              {/* 메인 슬라이드 스켈레톤 */}
              <div className="w-full flex items-center justify-center gap-3 md:gap-4 overflow-hidden">
                {/* 좌측 흐린 카드 */}
                <div className="shrink-0 w-[12%] md:w-[16%] aspect-[16/9] bg-slate-100 rounded opacity-40" />
                {/* 중앙 메인 카드 */}
                <div className="shrink-0 w-[75%] md:w-[58%] aspect-[16/9] bg-slate-200 rounded overflow-hidden relative">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                </div>
                {/* 우측 흐린 카드 */}
                <div className="shrink-0 w-[12%] md:w-[16%] aspect-[16/9] bg-slate-100 rounded opacity-40" />
              </div>
              {/* 로딩 텍스트 + 점 애니메이션 */}
              <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                <span>사진을 불러오는 중</span>
                <span className="flex gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
                  <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
                  <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
                </span>
              </div>
              {/* 닷 인디케이터 스켈레톤 */}
              <div className="flex gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full bg-slate-200 ${i === 0 ? "w-6" : "w-1.5"}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* ── 로딩 완료: 실제 캐러셀 ── */
            <HomePhotoCarousel
              images={[
                { src: wpHomeData.bento_image_1 || "/images/worship01.png" },
                { src: wpHomeData.bento_image_2 || "/images/temp01.jpg" },
                { src: wpHomeData.bento_image_3 || "/images/temp02.jpg" },
                { src: wpHomeData.bento_image_4 || "/images/pastor_ko2.jpg" },
                { src: wpHomeData.bento_image_5 || "/images/corner.jpg" },
                { src: wpHomeData.bento_image_6 || "/images/background01.jpg" },
              ]}
            />
          )}
        </section>

        {/* 4. 새가족 안내 (bg-slate-50으로 자연스러운 구분) */}
        <WelcomeSection />

        {/* 5. 이벤트 배너 (필요시 활성화, bg-white 영역) */}
        {/* <EventBanner slidesData={heroSlides} /> */}

        {/* 6. 교회 영상 */}
        <section className="py-8 md:py-16 bg-white">
          <div className="w-full max-w-7xl mx-auto px-0 md:px-6 lg:px-8">
            <div className="relative w-full aspect-video overflow-hidden shadow-2xl shadow-slate-900/15">
              <iframe
                src="https://www.youtube.com/embed/a6vpGcSwX-o?autoplay=1&mute=1&loop=1&playlist=a6vpGcSwX-o&controls=0&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&vq=hd1080"
                title="수원하나교회 영상"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="absolute w-[110%] h-[110%] -top-[5%] -left-[5%]"
                style={{ border: "none", pointerEvents: "none" }}
              />
            </div>
          </div>
        </section>
        {/* <RecentSermons /> */}

        {/* 7. 온라인 주보 */}
        <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 헤더 */}
            <div className="text-center mb-10 md:mb-14">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-3">
                Weekly Bulletin
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                온라인 주보
              </h2>
            </div>

            {/* 플립북 or 로딩 */}
            {bulletinImages === null ? (
              /* 로딩 중 */
              <div className="flex flex-col items-center gap-3 py-20 text-slate-300">
                <div className="w-48 h-64 bg-slate-200 rounded animate-pulse" />
                <p className="text-sm">주보를 불러오는 중...</p>
              </div>
            ) : bulletinImages.length > 0 ? (
              <BulletinFlipbook images={bulletinImages} />
            ) : (
              /* 이미지 없음 */
              <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
                <p className="text-slate-400 text-sm">
                  아직 업로드된 주보가 없습니다.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 8. 온라인 헌금 안내 */}
        <section className="py-12 md:py-16 bg-white border-t border-slate-100">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border border-slate-200 rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                {/* 텍스트 영역 */}
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                    Online Offering
                  </p>
                  <h2 className="text-xl font-bold text-slate-900 mb-1.5">
                    온라인 헌금
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    헌금 봉헌도 편리하게,<br className="md:hidden" /> 온라인 헌금을 안내드립니다.
                  </p>
                </div>

                {/* 버튼 영역 */}
                <div className="flex flex-row gap-2.5 shrink-0">
                  <a
                    href={RECEIPT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors whitespace-nowrap"
                  >
                    영수증 신청 <ArrowRight size={14} />
                  </a>

                  {/* PC: 모달 */}
                  <button
                    onClick={() => setShowAccountInfo(true)}
                    className="hidden md:inline-flex flex-1 md:flex-none items-center justify-center gap-1.5 bg-slate-50 text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors whitespace-nowrap"
                  >
                    계좌 안내 <ChevronDown size={14} />
                  </button>

                  {/* 모바일: 페이지 이동 */}
                  <Link
                    href="/donation"
                    className="md:hidden flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-50 text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors whitespace-nowrap"
                  >
                    계좌 안내 <ArrowRight size={14} />
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 헌금 계좌 모달 (PC 전용) */}
      {showAccountInfo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setShowAccountInfo(false)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-8">
              {/* 모달 헤더 */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                    Online Offering
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900">
                    헌금 계좌 안내
                  </h3>
                </div>
                <button
                  onClick={() => setShowAccountInfo(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={22} className="text-slate-400" />
                </button>
              </div>

              {/* 예금주 */}
              <div className="mb-5 flex items-center justify-between bg-slate-50 px-5 py-3 rounded-2xl">
                <span className="text-sm text-slate-500">예금주</span>
                <span className="font-bold text-slate-900">수원하나교회</span>
              </div>

              {/* 계좌 목록 */}
              <div className="divide-y divide-slate-100">
                {[
                  { label: "십일조/감사", bank: "국민", num: "468001-01-318042" },
                  { label: "선교헌금", bank: "국민", num: "422001-04-084939" },
                  { label: "건축헌금", bank: "국민", num: "920301-01-563418" },
                  { label: "DA", bank: "국민", num: "920301-01-563450" },
                  { label: "난민사역후원", bank: "국민", num: "920301-01-512487" },
                  { label: "구제헌금", bank: "국민", num: "920301-01-027154" },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(item.num);
                      alert(`${item.label} 계좌번호가 복사되었습니다.`);
                    }}
                    className="group w-full flex items-center justify-between py-3.5 px-1 hover:bg-slate-50 rounded-xl transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-10 h-6 rounded-md bg-slate-100 group-hover:bg-slate-200 text-[10px] font-bold text-slate-500 transition-colors shrink-0">
                        {item.bank}
                      </span>
                      <span className="text-sm font-bold text-slate-700">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-slate-500 group-hover:text-slate-900 transition-colors">
                        {item.num}
                      </span>
                      <Copy
                        size={13}
                        className="text-slate-300 group-hover:text-slate-500 transition-colors shrink-0"
                      />
                    </div>
                  </button>
                ))}
              </div>

              <p className="text-center text-xs text-slate-400 mt-5 pt-4 border-t border-slate-100">
                계좌번호를 클릭하면 복사됩니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
