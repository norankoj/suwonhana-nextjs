"use client";

import React, { useEffect, useRef, useState } from "react";
import { historyData } from "@/data/data";
import { ArrowUp } from "lucide-react";

// --- 스크롤 애니메이션 컴포넌트 ---
const ScrollReveal = ({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) => {
  const [isVisible, setIsVisible] = useState(index < 2);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (index < 2) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {children}
    </div>
  );
};

export default function HistoryPage() {
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
        {/* =========================================
            [좌측] 타이틀 영역
            ========================================= */}
        <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit relative z-10">
          <p className="text-xs md:text-sm font-bold text-white/60 uppercase tracking-widest md:tracking-[0.2em] mb-8 whitespace-nowrap">
            SUWON HANA BAPTIST CHURCH
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.4] mb-10 tracking-wide">
            하나님이
            <br />
            인도하신 길
          </h2>
          <div className="w-12 h-1 bg-white/30 mb-12"></div>

          <p className="text-sm md:text-base text-white/70 leading-loose break-keep">
            성령 안에서 하나님이 거하실 처소가
            <br className="hidden md:block" />
            되기 위하여 그리스도 예수 안에서
            <br className="hidden md:block" />
            함께 지어져 가느니라
          </p>
          <p className="text-xs text-white/50 mt-6 font-medium">
            에베소서 2:22
          </p>
        </div>

        {/* =========================================
            [우측] 타임라인 리스트
            ========================================= */}
        <div className="lg:w-2/3 relative z-10 flex gap-4 md:gap-8 lg:gap-12">
          {/* 별 장식 레이어 */}
          <div className="relative w-16 md:w-20 lg:w-24 shrink-0 flex justify-center">
            <div className="flex flex-col items-center w-full z-0 font-serif italic text-base md:text-xl text-white/60 pt-2">
              <div className="flex items-center gap-1 pointer-events-none">
                in him <span className="text-xl">✶</span>
              </div>
              <div className="w-px h-24 bg-white/20 my-6 pointer-events-none"></div>
              <div className="flex items-center gap-1 pointer-events-none">
                <span className="text-xl">✶</span> You too are
              </div>
              <div className="w-px h-24 bg-white/20 my-6 pointer-events-none"></div>
              <div className="flex items-center gap-1 pointer-events-none">
                <span className="text-xl">✶</span> being{" "}
                <span className="text-xl">✶</span>
              </div>
              <div className="w-px h-24 bg-white/20 my-6 pointer-events-none"></div>
              <div className="flex items-center gap-1 pointer-events-none">
                built <span className="text-xl">✶</span>
              </div>
              <div className="w-px h-24 bg-white/20 my-6 pointer-events-none"></div>
              <div className="flex items-center gap-1 pointer-events-none">
                <span className="text-xl">✶</span> together
              </div>
              <div className="w-px flex-1 bg-gradient-to-b from-white/20 to-transparent mt-6 min-h-[200px] pointer-events-none"></div>
            </div>
          </div>

          {/* 타임라인 리스트 */}
          <div className="flex-1 border-t border-white/20 pt-4">
            {historyData?.map((item: any, idx: number) => (
              <ScrollReveal key={item.year} index={idx}>
                <div className="flex flex-col sm:flex-row py-10 md:py-14 border-b border-white/10 gap-4 sm:gap-10 px-2 md:px-0">
                  {/* 연도 */}
                  <div className="text-3xl md:text-4xl font-light font-serif text-white shrink-0 sm:w-24 tracking-wider">
                    {item.year}
                  </div>

                  <div className="flex-1 space-y-6 mt-1 sm:mt-1.5">
                    {item.events.map((event: any, eIdx: number) => {
                      const formattedDate = formatPosterDate(event.date);

                      return (
                        <div
                          key={eIdx}
                          className="text-white/80 text-sm md:text-base leading-relaxed break-keep"
                        >
                          {formattedDate && (
                            <span className="text-white/60 mr-2 font-medium">
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
            ))}

            {/* 맨 아래 오른쪽 끝 위로 가기 버튼 */}
            <div className="pt-24 pb-10 flex justify-end">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group flex flex-col items-center gap-3 text-white/50 hover:text-white transition-all duration-300 mr-2 md:mr-6"
              >
                <div className="p-4 rounded-full border border-white/20 group-hover:border-white/60 group-hover:-translate-y-2 transition-all duration-300 bg-white/5 backdrop-blur-sm shadow-sm cursor-pointer">
                  <ArrowUp size={24} strokeWidth={1.5} />
                </div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase">
                  Back to Top
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ========================================= 박스버전 =========================================
// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { historyData } from "@/data/data";
// import { ArrowUp } from "lucide-react";

// // --- 튼튼하게 보강된 스크롤 애니메이션 컴포넌트 ---
// const ScrollReveal = ({ children }: { children: React.ReactNode }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const domRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           // 화면에 요소가 등장하면 살짝 딜레이를 주어 더 우아하게 떠오르도록 처리
//           setTimeout(() => setIsVisible(true), 150);
//           observer.unobserve(entries[0].target);
//         }
//       },
//       // 화면 하단에서 5% 정도 올라왔을 때 애니메이션 시작
//       { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
//     );

//     if (domRef.current) {
//       observer.observe(domRef.current);
//     }
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div
//       ref={domRef}
//       // translate-y-16 으로 이동 폭을 조금 더 늘려서 올라오는 느낌을 강조했습니다.
//       className={`transform transition-all duration-[1200ms] ease-out ${
//         isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
//       }`}
//     >
//       {children}
//     </div>
//   );
// };

// export default function HistoryPage() {
//   const formatPosterDate = (dateStr: string) => {
//     if (!dateStr) return "";
//     if (dateStr.includes(".")) {
//       const parts = dateStr.split(".");
//       return `${Number(parts[0])}월 ${Number(parts[1])}일,`;
//     } else if (dateStr.includes("-")) {
//       return `${dateStr}월,`;
//     } else {
//       const num = Number(dateStr);
//       if (!isNaN(num)) return `${num}월,`;
//       return `${dateStr},`;
//     }
//   };

//   return (
//     <div className="bg-white pb-32 selection:bg-white selection:text-blue-900">
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
//         {/* 메인 배경 박스 */}
//         <div className="bg-gradient-to-br from-blue-700 via-cyan-600 to-teal-500 rounded-xl p-8 md:p-14 lg:p-20 shadow-2xl relative flex flex-col lg:flex-row gap-16 lg:gap-24">
//           {/* 빛 효과 (박스 밖으로 나가지 않게 여기서만 overflow-hidden) */}
//           <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none z-0">
//             <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl"></div>
//             <div className="absolute top-40 -left-10 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl"></div>
//           </div>

//           {/* =========================================
//               [좌측] 타이틀 영역 (완벽하게 고정됨!)
//               ========================================= */}
//           <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit relative z-10">
//             <p className="text-xs md:text-sm font-bold text-white/60 uppercase tracking-widest md:tracking-[0.2em] mb-8 whitespace-nowrap">
//               SUWON HANA BAPTIST CHURCH
//             </p>
//             <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.4] mb-10 tracking-wide">
//               하나님이
//               <br />
//               인도하신 길
//             </h2>
//             <div className="w-12 h-1 bg-white/30 mb-12"></div>

//             <p className="text-sm md:text-base text-white/70 leading-loose break-keep">
//               성령 안에서 하나님이 거하실 처소가
//               <br className="hidden md:block" />
//               되기 위하여 그리스도 예수 안에서
//               <br className="hidden md:block" />
//               함께 지어져 가느니라
//             </p>
//             <p className="text-xs text-white/50 mt-6 font-medium">
//               에베소서 2:22
//             </p>
//           </div>

//           {/* =========================================
//               [우측] 타임라인 리스트
//               ========================================= */}
//           <div className="lg:w-2/3 relative z-10 flex gap-4 md:gap-8 lg:gap-12">
//             {/* 별 장식 레이어 (화살표 싹 제거, 깔끔한 선과 텍스트만 유지) */}
//             <div className="relative w-16 md:w-20 lg:w-24 shrink-0 flex justify-center">
//               <div className="flex flex-col items-center w-full z-0 font-serif italic text-base md:text-xl text-white/60 pt-2">
//                 <div className="flex items-center gap-1 pointer-events-none">
//                   in him <span className="text-xl">✶</span>
//                 </div>
//                 <div className="w-px h-24 bg-white/20 my-6 pointer-events-none"></div>
//                 <div className="flex items-center gap-1 pointer-events-none">
//                   <span className="text-xl">✶</span> You too are
//                 </div>
//                 <div className="w-px h-24 bg-white/20 my-6 pointer-events-none"></div>
//                 <div className="flex items-center gap-1 pointer-events-none">
//                   <span className="text-xl">✶</span> being{" "}
//                   <span className="text-xl">✶</span>
//                 </div>
//                 <div className="w-px h-24 bg-white/20 my-6 pointer-events-none"></div>
//                 <div className="flex items-center gap-1 pointer-events-none">
//                   built <span className="text-xl">✶</span>
//                 </div>
//                 <div className="w-px h-24 bg-white/20 my-6 pointer-events-none"></div>
//                 <div className="flex items-center gap-1 pointer-events-none">
//                   <span className="text-xl">✶</span> together
//                 </div>
//                 <div className="w-px flex-1 bg-gradient-to-b from-white/20 to-transparent mt-6 min-h-[200px] pointer-events-none"></div>
//               </div>
//             </div>

//             {/* 타임라인 리스트 */}
//             <div className="flex-1 border-t border-white/20 pt-4">
//               {historyData?.map((item: any) => (
//                 <ScrollReveal key={item.year}>
//                   <div className="flex flex-col sm:flex-row py-10 md:py-14 border-b border-white/10 gap-4 sm:gap-10 px-2 md:px-0">
//                     {/* 연도 (명조체 복구됨) */}
//                     <div className="text-3xl md:text-4xl font-light font-serif text-white shrink-0 sm:w-24 tracking-wider">
//                       {item.year}
//                     </div>

//                     <div className="flex-1 space-y-6 mt-1 sm:mt-1.5">
//                       {item.events.map((event: any, eIdx: number) => {
//                         const formattedDate = formatPosterDate(event.date);

//                         return (
//                           <div
//                             key={eIdx}
//                             className="text-white/80 text-sm md:text-base leading-relaxed break-keep"
//                           >
//                             {formattedDate && (
//                               <span className="text-white/60 mr-2 font-medium">
//                                 {formattedDate}
//                               </span>
//                             )}
//                             <span>
//                               {event.content
//                                 .split("\n")
//                                 .map((line: string, lIdx: number) => (
//                                   <React.Fragment key={lIdx}>
//                                     {line}
//                                     {lIdx !==
//                                       event.content.split("\n").length - 1 && (
//                                       <br />
//                                     )}
//                                   </React.Fragment>
//                                 ))}
//                             </span>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </ScrollReveal>
//               ))}

//               {/* 맨 아래 오른쪽 끝 위로 가기 버튼 */}
//               <div className="pt-24 pb-10 flex justify-end">
//                 <button
//                   onClick={() =>
//                     window.scrollTo({ top: 0, behavior: "smooth" })
//                   }
//                   className="group flex flex-col items-center gap-3 text-white/50 hover:text-white transition-all duration-300 mr-2 md:mr-6"
//                 >
//                   <div className="p-4 rounded-full border border-white/20 group-hover:border-white/60 group-hover:-translate-y-2 transition-all duration-300 bg-white/5 backdrop-blur-sm shadow-sm cursor-pointer">
//                     <ArrowUp size={24} strokeWidth={1.5} />
//                   </div>
//                   <span className="text-xs font-bold tracking-[0.2em] uppercase">
//                     Back to Top
//                   </span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
