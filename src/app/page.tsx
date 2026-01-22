"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  UserPlus,
  FileText,
  BookOpen,
  Users,
  ChevronRight,
  Copy,
  X,
  ChevronDown,
  Loader2,
  Sprout,
  MapPin,
  Clock, // 로딩 아이콘 추가
} from "lucide-react";
import { CustomPlayButton } from "@/components/Common";
import { MainHero, MainHeroData } from "@/components/MainHero";
import { EventBanner } from "@/components/EventBanner";
import RecentSermons from "@/components/RecentSermons";
import WelcomeSection from "@/components/WelcomeSection";

// =================================================================
// [설정 영역] 워드프레스 연결 정보
// =================================================================

// [상태 관리] 슬라이드 데이터 & 로딩
const WP_API_DOMAIN = "http://suwonhana.local";
const SLIDE_POST_TYPE = "risen_slide";

const RECEIPT_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfD5f0YpO6Y1b9Z6U6Yz4k3n8FQ1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1ZQ/viewform";

export default function MainPage() {
  const router = useRouter();
  const [showAccountInfo, setShowAccountInfo] = useState(false);

  // [상태 관리] 초기값을 빈 배열로 둠
  const [heroSlides, setHeroSlides] = useState<MainHeroData[]>([]);
  // =================================================================
  // [API 연동] 워드프레스에서 슬라이드 이미지 가져오기
  // =================================================================
  // API 데이터 가져오기
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const endpoint = `${WP_API_DOMAIN}/wp-json/wp/v2/${SLIDE_POST_TYPE}?per_page=10&_embed`;
        const res = await fetch(endpoint);

        if (!res.ok) throw new Error("API Network Error");
        const data = await res.json();

        console.log("🔥 워드프레스 데이터:", data);

        const slideData = data
          .map((item: any) => {
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

              // 링크 가져오기 (Slide Options에 적은 URL)
              const link = item.custom_meta?.link || "#";

              // 버튼 가져오기
              const buttonText = item.custom_meta?.button_text || "";

              return {
                imageUrl: media.source_url,
                caption: caption || "",
                // MainHero로 넘겨줄 데이터에 추가
                buttonText: buttonText,
                link: link,
              };
            }
            return null;
          })
          .filter((item): item is MainHeroData => item !== null);

        if (slideData.length > 0) {
          setHeroSlides(slideData);
        }
      } catch (error) {
        console.error("슬라이드 로딩 실패:", error);
      } finally {
        //
      }
    };

    fetchSlides();
  }, []);

  const handleNavClick = (path: string) => {
    router.push(path);
  };
  return (
    <>
      <div className="animate-fade-in">
        {/* 1. 메인 슬라이드 */}
        <MainHero slidesData={heroSlides} key={heroSlides.length} />

        {/* 2. Welcome Message Section (Button Moved to Left) */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
            {/* [왼쪽] 텍스트 콘텐츠 */}
            <div className="w-full md:w-1/2 z-10 mb-12 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                수원하나교회에
                <br />
                오신 것을
                <br />
                환영합니다.
              </h2>
              <div className="w-24 h-2 bg-slate-900 mb-8"></div>
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-6">
                수원하나교회는 하나님을 즐거워하고
                <br />그 분의 목적에 헌신하는 공동체입니다.
              </p>
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-8">
                <span className="font-bold">하나</span>의 의미는{" "}
                <span className="font-bold">하나님의 나라(Kingdom)</span>를
                건설하고,
                <br />
                형제 자매가 <span className="font-bold">연합(Unity)</span>하여
                하나가 되어간다는 뜻입니다.
              </p>
              <p className="text-sm text-slate-500 mb-10">
                * 수원하나교회는 기독교 한국 침례회 교단 소속입니다.
              </p>
              <a
                href="/about"
                className="inline-flex items-center px-6 py-3 border-2 border-slate-900 rounded-full text-lg font-bold text-slate-900 hover:bg-slate-900 hover:text-white transition-colors"
              >
                교회 소개 더보기 <ChevronRight size={20} className="ml-2" />
              </a>
            </div>

            {/* [오른쪽] 목사님 이미지 (누끼) */}
            <div className="w-full md:w-1/2 h-full absolute md:relative bottom-0 right-0 md:right-auto pointer-events-none md:pointer-events-auto flex justify-end items-end z-0">
              {/* [중요] 아래 src에 실제 목사님 누끼 이미지 경로를 입력해주세요.
            예: "/images/pastor_removed_bg.png" 
        */}
              <img
                src="/images/pastor_ko.png" // <-- 여기를 수정하세요!
                alt="고목사님"
                className="w-auto h-[80%] md:h-auto max-h-[600px] object-contain object-bottom opacity-20 md:opacity-100"
              />
            </div>
          </div>
        </section>

        {/* 3. Newcomer Guide (새가족 안내) */}
        <WelcomeSection />

        {/* 4. 최근 설교 */}
        <RecentSermons />

        {/* 5. 기부금 영수증 */}
        <section className="py-24" style={{ backgroundColor: "#f8f8f8" }}>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold text-slate-900 mb-6">
              기부금 영수증
            </h3>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              연말정산 및 세액공제를 위한 기부금 영수증을 온라인으로 간편하게
              신청하고 발급받으실 수 있습니다.
              <br />
              <span className="text-sm text-slate-400 mt-2 block">
                * 신청 후 발급까지 약 일주일정도 소요될 수 있습니다.
              </span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={RECEIPT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                발급 신청하기 <ArrowRight size={16} />
              </a>
              <button
                onClick={() => setShowAccountInfo(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full font-bold text-sm hover:bg-slate-50 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                헌금 계좌 안내 <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* 헌금 계좌 모달 */}
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
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  헌금 계좌 안내
                </h3>
                <button
                  onClick={() => setShowAccountInfo(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-slate-500" />
                </button>
              </div>

              <div className="mb-6 bg-slate-50 p-4 rounded-2xl text-center">
                <span className="text-slate-500 text-sm font-medium block mb-1">
                  예금주
                </span>
                <p className="text-slate-900 font-bold text-lg">수원하나교회</p>
              </div>

              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {[
                  { label: "십일조/감사", num: "468001-01-318042" },
                  { label: "선교헌금", num: "422001-04-084939" },
                  { label: "건축헌금", num: "920301-01-563418" },
                  { label: "DA", num: "920301-01-563450" },
                  { label: "난민사역후원", num: "920301-01-512487" },
                  { label: "구제헌금", num: "920301-01-027154" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      navigator.clipboard.writeText(`국민 ${item.num}`);
                      alert(`${item.label} 계좌가 복사되었습니다.`);
                    }}
                    className="group flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-blue-600 transition-colors">
                        <span className="text-[10px] font-bold text-slate-500">
                          국민
                        </span>
                      </div>
                      <span className="font-bold text-slate-700 group-hover:text-slate-900">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-600 group-hover:text-blue-600">
                        {item.num}
                      </span>
                      <Copy
                        size={14}
                        className="text-slate-300 group-hover:text-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-xs text-slate-400 mt-6">
                계좌번호를 클릭하면 복사됩니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
