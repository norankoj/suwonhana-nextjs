"use client";

import { getBackgroundEmbedUrl } from "@/utils/youtube";
import { wpBase } from "@/lib/wp-base";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const WP = wpBase();

export default function TrainingContentPage() {
  const params = useParams();
  const tab = params.tab as string;

  const [dsmHeroImage, setDsmHeroImage] = useState<string>("");

  useEffect(() => {
    if (tab !== "dsm") return;
    fetch(
      `${WP}/wp-json/wp/v2/pages?slug=discipleship-dsm&_fields=_links&_embed=wp:featuredmedia`,
      { cache: "no-store" },
    )
      .then((r) => (r.ok ? r.json() : []))
      .then((pages) => {
        const url = pages[0]?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
        if (url) setDsmHeroImage(url);
      })
      .catch(() => {});
  }, [tab]);

  return (
    <>
      {/* ══════════════════════════════
          DSM (Daniel School of Ministry)
      ══════════════════════════════ */}
      {tab === "dsm" && (
        <div className="bg-white pb-32 font-sans animate-fade-in">
          {/* ── 히어로 (하나상담실 동일 패턴) ── */}
          <div className="relative w-full h-[60vh] min-h-[400px] flex items-end overflow-hidden">
            {dsmHeroImage ? (
              <img
                src={dsmHeroImage}
                alt="DSM"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-slate-800" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
            <div className="relative z-10 w-full max-w-content mx-auto px-4 sm:px-6 lg:px-8 pb-14 md:pb-20">
              <p className="text-[10px] md:text-xs font-bold text-white/70 uppercase tracking-[0.3em] mb-4">
                Daniel School of Ministry
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                DSM
              </h1>
            </div>
          </div>

          {/* ── 본문 ── */}
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 space-y-16">
            {/* YouTube 영상 박스 — 자동재생(음소거), 컨트롤 완전 숨김 */}
            {/* iframe을 세로로만 132% 키워 YouTube가 영상을 레터박싱하게 만든 뒤,
                그 검은 여백(=타이틀바·로고가 얹히는 영역)만 잘라낸다.
                영상 내용 자체는 잘리지 않는다. */}
            <div className="w-full aspect-video relative overflow-hidden">
              <iframe
                src={getBackgroundEmbedUrl("6N7V4WF6dqA")}
                allow="autoplay; encrypted-media"
                className="absolute w-full h-[132%] -top-[16%] left-0"
                style={{ border: "none", pointerEvents: "none" }}
              />
            </div>

            {/* 훈련 안내 */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
                  훈련 안내
                </h3>
                <div className="border-t border-slate-200">
                  {[
                    { label: "훈련기간", value: "7월 — 8월 (2개월)" },
                    {
                      label: "대상",
                      value: "셀에 소속된 공동체 회원으로 셀리더가 추천하는 분",
                    },
                    {
                      label: "문의",
                      value: "김태환 전도사 (010-7665-8078)",
                    },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-start justify-between py-5 border-b border-slate-100 gap-8"
                    >
                      <p className="font-bold text-slate-900 text-lg shrink-0">
                        {label}
                      </p>
                      <p className="text-slate-600 text-base text-right break-keep">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
