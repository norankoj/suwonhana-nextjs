import React from "react";
import type { Metadata } from "next";
import ScrollReveal from "./ScrollReveal";
import BackToTopButton from "./BackToTopButton";
import type { HistoryYear, HistoryEvent } from "@/lib/types";
import { fetchHistoryData } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "교회연혁",
  description: "1992년부터 현재까지 수원하나교회가 걸어온 길",
};

export default async function HistoryPage() {
  const pageData = await fetchHistoryData();

  let parsedHistoryData: HistoryYear[] = [];
  const rawJsonString = pageData?.historyFields?.historyJsonData;
  if (rawJsonString) {
    try {
      parsedHistoryData = JSON.parse(rawJsonString);
    } catch (e) {
      console.error("JSON Parsing Error! 워드프레스 입력값을 확인하세요.", e);
      parsedHistoryData = [];
    }
  }

  const formatPosterDate = (dateStr: string) => {
    if (!dateStr) return "";
    if (dateStr.includes(".")) {
      const parts = dateStr.split(".");
      return `${Number(parts[0])}월 ${Number(parts[1])}일,`;
    } else if (dateStr.includes("-")) {
      return `${dateStr}월,`;
    } else {
      const num = Number(dateStr);
      if (!isNaN(num)) return `${num}월,`;
      return `${dateStr},`;
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-blue-700 via-cyan-600 to-teal-500 selection:bg-white selection:text-blue-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl"></div>
        <div className="absolute top-40 -left-10 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl"></div>
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 lg:py-32 flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* [좌측] 타이틀 영역 */}
        <div className="lg:w-1/3 h-fit relative z-10">
          <p className="text-xs md:text-sm font-bold text-white/80 uppercase tracking-widest md:tracking-[0.2em] mb-8 whitespace-nowrap">
            SUWON HANA BAPTIST CHURCH
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[2] mb-10 tracking-wide">
            하나님이
            <br />
            인도하신 길
          </h2>
          <div className="w-12 h-1 bg-white/30 mb-12"></div>

          <p className="text-sm md:text-base text-white/90 leading-loose break-keep">
            성령 안에서 하나님이 거하실 처소가
            <br className="hidden md:block" />
            되기 위하여 그리스도 예수 안에서
            <br className="hidden md:block" />
            함께 지어져 가느니라
          </p>
          <p className="text-xs text-white/70 mt-6 font-medium">
            에베소서 2:22
          </p>
        </div>

        {/* [우측] 타임라인 리스트 */}
        <div className="lg:w-2/3 relative z-10">
          <div className="border-t border-white/20 pt-4">
            {parsedHistoryData.length > 0 ? (
              parsedHistoryData.map((item, idx) => (
                <ScrollReveal key={item.year} index={idx}>
                  <div className="flex flex-col sm:flex-row py-10 md:py-14 border-b border-white/10 gap-4 sm:gap-10 px-2 md:px-0">
                    <div className="text-3xl md:text-4xl font-light font-serif text-white shrink-0 sm:w-24 tracking-wider">
                      {item.year}
                    </div>

                    <div className="flex-1 space-y-6 mt-1 sm:mt-1.5">
                      {item.events.map((event: HistoryEvent, eIdx: number) => {
                        const formattedDate = formatPosterDate(event.date);
                        return (
                          <div
                            key={eIdx}
                            className="text-white text-[15px] md:text-[17px] leading-[1.8] break-keep"
                          >
                            {formattedDate && (
                              <span className="text-white/80 mr-2 font-medium">
                                {formattedDate}
                              </span>
                            )}
                            <span>
                              {event.content
                                .split("\n")
                                .map((line: string, lIdx: number) => (
                                  <React.Fragment key={lIdx}>
                                    {line}
                                    {lIdx !==
                                      event.content.split("\n").length - 1 && (
                                      <br />
                                    )}
                                  </React.Fragment>
                                ))}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </ScrollReveal>
              ))
            ) : (
              <div className="py-20 text-white/50 text-center">
                연혁 데이터가 없거나 텍스트 형식이 잘못되었습니다.
                <br />
                워드프레스 관리자 페이지의 JSON 괄호 및 쉼표를 확인해 주세요.
              </div>
            )}

            <div className="pt-24 pb-10 flex justify-end">
              <BackToTopButton />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
