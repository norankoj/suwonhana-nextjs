"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const WP = process.env.NEXT_PUBLIC_WORDPRESS_DOMAIN || "http://suwonhana.local";

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
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="relative z-10 w-full max-w-content mx-auto px-6 pb-14 md:pb-20">
              <p className="text-white/60 text-sm font-medium tracking-[0.2em] uppercase mb-3">
                Daniel School of Ministry
              </p>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                DSM
              </h1>
            </div>
          </div>

          {/* ── 본문 ── */}
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 space-y-16">
            {/* YouTube 영상 박스 — 자동재생(음소거), 컨트롤 완전 숨김 */}
            {/* iframe을 110%로 키우고 overflow-hidden으로 가장자리 YouTube UI 제거 */}
            <div className="w-full aspect-video relative overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/6N7V4WF6dqA?autoplay=1&mute=1&loop=1&playlist=6N7V4WF6dqA&controls=0&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&disablekb=1&fs=0"
                allow="autoplay; encrypted-media"
                className="absolute w-[110%] h-[110%] -top-[5%] -left-[5%]"
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
