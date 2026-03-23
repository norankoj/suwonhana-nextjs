"use client";

import React from "react";
import { useParams } from "next/navigation";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export default function TrainingContentPage() {
  const params = useParams();
  const tab = params.tab as string;

  return (
    <>
      {/* ══════════════════════════════
          DSM (Daniel School of Ministry)
      ══════════════════════════════ */}
      {tab === "dsm" && (
        <div className="bg-white pb-32 font-sans animate-fade-in">

          {/* ── 히어로: YouTube 영상 ── */}
          <div className="w-full bg-slate-900">
            <div className="max-w-content mx-auto">
              <LiteYouTubeEmbed
                id="6N7V4WF6dqA"
                title="DSM — Daniel School of Ministry"
                wrapperClass="yt-lite w-full aspect-video"
                iframeClass="w-full h-full"
                playerClass="lty-playbtn"
              />
            </div>
          </div>

          {/* ── 본문 ── */}
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 space-y-16">

            {/* 타이틀 */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] mb-3">
                Daniel School of Ministry
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">DSM</h1>
              <p className="text-[15px] text-slate-600 leading-loose break-keep max-w-2xl">
                세상이 격변하는 이 때 &lsquo;다니엘&rsquo;과 같은 사람들이 일어나야 할 때라고 믿습니다.
                이를 돕기 위하여 DSM 훈련이 진행됩니다.
              </p>
            </div>

            {/* 안내 정보 */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">훈련 안내</h3>
                <div className="border-t border-slate-200">
                  {[
                    { label: "훈련기간", value: "매년 6월말 — 8월말 (2개월)" },
                    {
                      label: "대상",
                      value: "셀에 소속된 공동체 회원으로 셀리더가 추천하는 분 (제자의 삶을 성실하게 수료한 분)",
                    },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-start justify-between py-4 border-b border-slate-100 gap-6"
                    >
                      <p className="font-bold text-slate-900 text-base shrink-0">{label}</p>
                      <p className="text-slate-600 text-sm text-right break-keep">{value}</p>
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
