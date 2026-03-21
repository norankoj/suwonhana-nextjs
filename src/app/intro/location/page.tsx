"use client";

import React from "react";
import {
  MapPin,
  Phone,
  Bus,
  Train, // (소스엔 있었으나 미사용 중이므로 필요시 활용)
  Car,
  Navigation,
  Clock,
} from "lucide-react";

export default function LocationPage() {
  return (
    <div className="bg-white pb-32 font-sans">
      {/* 페이지 헤더 */}
      <section className="pt-32 md:pt-40 pb-10 px-4 sm:px-6 lg:px-8 max-w-content mx-auto text-center border-b border-slate-100 mb-12">
        <p className="text-[11px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-3">
          Location & Contact
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          오시는 길
        </h1>
      </section>

      <div className="animate-fade-in max-w-content mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* =========================================
            [섹션 2] 지도 및 기본 정보
            ========================================= */}
        <section className="mb-16">
          <h3 className="font-bold text-2xl text-slate-900 mb-6 flex items-center gap-2">
            수원하나교회
          </h3>

          {/* 구글 지도 iframe (곡률을 다른 컴포넌트들과 맞춤: rounded-2xl) */}
          <div className="w-full h-[350px] md:h-[450px] bg-slate-100 rounded-md overflow-hidden shadow-sm border border-slate-200 relative mb-6">
            <iframe
              width="100%"
              height="100%"
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=경기도 용인시 기흥구 서그내로 16번길 11-6&t=&z=15&ie=UTF8&iwloc=&output=embed"
              title="church-map"
              className="grayscale hover:grayscale-0 transition-all duration-700"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          {/* 주소 및 연락처 정보 바 */}
          <div className="flex flex-col md:flex-row items-center justify-between bg-slate-50/50 p-6 md:p-8 rounded-md border border-slate-100 gap-6">
            <div className="flex-1 space-y-3 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-2 text-slate-900">
                <span className="flex items-center gap-1 font-bold text-lg">
                  수원하나교회
                </span>
                <span className="text-slate-300 hidden md:inline">|</span>
                <span className="text-slate-600 font-medium">
                  (17103) 경기도 용인시 기흥구 서그내로 16번길 11-6
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500">
                <Phone size={16} />
                <span className="font-medium tracking-wide">031-202-0697</span>
              </div>
            </div>

            {/* 지도 앱 바로가기 버튼 */}
            <div className="flex gap-3 shrink-0">
              <a
                href="https://map.kakao.com/link/search/수원하나교회"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FAE100] text-[#3C1E1E] font-bold text-sm hover:brightness-95 transition-all shadow-sm"
              >
                <MapPin size={16} /> 카카오맵
              </a>
              <a
                href="https://map.naver.com/v5/search/수원하나교회"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#03C75A] text-white font-bold text-sm hover:brightness-110 transition-all shadow-sm"
              >
                <MapPin size={16} /> 네이버지도
              </a>
            </div>
          </div>
        </section>

        {/* =========================================
            [섹션 3] 교통수단 안내 (Grid)
            ========================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* 대중교통 안내 */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b-2 border-slate-900 pb-3">
              <Bus className="text-slate-600 shrink-0" size={24} />
              <h3 className="font-bold text-xl md:text-2xl text-slate-900">
                대중교통 이용 시
              </h3>
            </div>

            <div className="space-y-8 pt-2">
              {/* 영통역 루트 */}
              <div className="relative pl-7 border-l-2 border-slate-100">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-md bg-yellow-400 border-[3px] border-white shadow-sm"></div>
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-[17px]">
                  수인분당선 영통역
                  <span className="text-[12px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    1번 출구
                  </span>
                </h4>
                <ul className="text-[15px] text-slate-600 space-y-2.5">
                  <li className="flex items-start gap-2.5">
                    <span className="shrink-0 font-bold bg-green-100 text-green-700 text-[11px] px-2 py-0.5 rounded mt-0.5">
                      마을버스
                    </span>
                    <span>
                      <strong className="text-slate-800">55번</strong> 승차
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="shrink-0 font-bold bg-slate-100 text-slate-500 text-[11px] px-2 py-0.5 rounded mt-0.5">
                      하차
                    </span>
                    <span>SK아파트 정류장 하차 (도보 2분)</span>
                  </li>
                </ul>
              </div>

              {/* 망포역 루트 */}
              <div className="relative pl-7 border-l-2 border-slate-100">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-md bg-yellow-400 border-[3px] border-white shadow-sm"></div>
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-[17px]">
                  수인분당선 망포역
                  <span className="text-[12px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    3번 출구
                  </span>
                </h4>
                <ul className="text-[15px] text-slate-600 space-y-2.5">
                  <li className="flex items-start gap-2.5">
                    <span className="shrink-0 font-bold bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded mt-0.5">
                      일반버스
                    </span>
                    <span>
                      <strong className="text-slate-800">8번</strong> 승차
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="shrink-0 font-bold bg-slate-100 text-slate-500 text-[11px] px-2 py-0.5 rounded mt-0.5">
                      하차
                    </span>
                    <span>서그내 정류장 하차 (도보 5분)</span>
                  </li>
                </ul>
              </div>

              {/* 기타 버스 목록 */}
              <div className="bg-slate-50 rounded-md p-6 border border-slate-100">
                <h5 className="font-bold text-slate-900 mb-4 text-[15px] flex items-center gap-2">
                  <Bus size={16} className="text-slate-400" /> 주변 정류장 경유
                  버스
                </h5>
                <div className="space-y-3 text-[14px]">
                  <div className="flex gap-4 items-start">
                    <span className="font-bold text-slate-600 shrink-0 w-8">
                      일반
                    </span>
                    <span className="text-slate-600 break-keep leading-relaxed">
                      1112, M5107, 5100, 7000 등
                    </span>
                  </div>
                  <div className="w-full h-px bg-slate-200/60"></div>
                  <div className="flex gap-4 items-center">
                    <span className="font-bold text-green-600 shrink-0 w-8">
                      마을
                    </span>
                    <span className="text-slate-600">55, 53-1</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 자가용 및 주차 안내 */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b-2 border-slate-900 pb-3">
              <Car className="text-slate-600 shrink-0" size={24} />
              <h3 className="font-bold text-xl md:text-2xl text-slate-900">
                주차 및 셔틀버스
              </h3>
            </div>

            <div className="space-y-6 pt-2">
              {/* 중요 알림: 교육관 주차장 */}
              <div className="bg-slate-50 rounded-md p-6 md:p-8 border border-slate-100 relative overflow-hidden group">
                <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                  <Car size={120} />
                </div>
                <h4 className="font-bold text-slate-900 mb-3 text-lg relative z-10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-900"></span>
                  교육관 주차장 이용 안내
                </h4>
                <p className="text-[14px] md:text-[15px] text-slate-600 mb-6 relative z-10 leading-[1.7] break-keep">
                  본당 주차 공간이 매우 협소합니다.{" "}
                  <br className="hidden md:block" />
                  방문객 및 성도님들은 넓고 편리한{" "}
                  <strong className="text-slate-900">교육관 주차장</strong>을
                  이용해 주시면 감사하겠습니다.
                </p>
                <div className="bg-white rounded-md p-4 text-[14px] md:text-[15px] relative z-10 shadow-sm border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-1">
                    교육관 주소
                  </span>
                  <span className="text-slate-500 flex items-start sm:items-center gap-1.5 break-keep">
                    <Navigation
                      size={14}
                      className="shrink-0 mt-0.5 sm:mt-0 text-slate-400"
                    />
                    경기 용인시 기흥구 서그내로53번길 30
                  </span>
                </div>
              </div>

              {/* 셔틀버스 시간표 */}
              <div className="border border-slate-200 rounded-md p-6 md:p-8">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2 text-lg">
                  <Clock size={20} className="text-slate-400" /> 셔틀버스 운행
                  안내
                </h4>
                <p className="text-[14px] text-slate-500 mb-6 break-keep">
                  교육관 ↔ 본당 간 셔틀버스를 운행합니다.{" "}
                  <br className="hidden sm:block" />
                  (각 예배 시간 20분 전부터 수시 운행)
                </p>

                <div className="flex flex-wrap gap-2.5">
                  <span className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-[13px] font-bold border border-slate-200 shadow-sm">
                    주일 1부 (09:00)
                  </span>
                  <span className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-[13px] font-bold border border-slate-200 shadow-sm">
                    주일 2부 (11:00)
                  </span>
                  <span className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-[13px] font-bold border border-slate-200 shadow-sm">
                    주일 3부 (14:30)
                  </span>
                  <span className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-[13px] font-bold border border-slate-200 shadow-sm">
                    금요예배 (21:00)
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
