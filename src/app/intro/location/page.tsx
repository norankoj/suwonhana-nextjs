"use client";

import React from "react";
import {
  MapPin,
  Phone,
  Bus,
  Train,
  Car,
  Navigation,
  Clock,
} from "lucide-react";

export default function LocationPage() {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto pb-20">
      {/* 1. 타이틀 및 지도 섹션 */}
      <section className="mb-12">
        <h3 className="font-bold text-2xl text-slate-900 mb-6 flex items-center gap-2">
          찾아오시는 길
        </h3>

        {/* 구글 지도 iframe */}
        <div className="w-full h-[450px] bg-slate-100 rounded-3xl overflow-hidden shadow-lg border border-slate-200 relative mb-8">
          <iframe
            width="100%"
            height="100%"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=수원하나교회&t=&z=15&ie=UTF8&iwloc=&output=embed"
            title="church-map"
            className="grayscale hover:grayscale-0 transition-all duration-500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        {/* 주소 및 연락처 정보 바 */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-2xl border border-slate-100 shadow-sm gap-6">
          <div className="flex-1 space-y-2 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-2 text-slate-900">
              <span className="flex items-center gap-1 font-bold text-lg">
                수원하나교회
              </span>
              <span className="text-slate-500 text-sm hidden md:inline">|</span>
              <span className="text-slate-600">
                (17103) 경기도 용인시 기흥구 서그내로 16번길 11-6
              </span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-600">
              <Phone size={16} style={{ marginTop: 2 }} />{" "}
              <span className="font-medium">031-202-0697</span>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* 2. 대중교통 안내 (Transport) */}
        <section>
          <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-4">
            <Bus className="text-blue-600" size={24} />
            <h3 className="font-bold text-xl text-slate-900 mb-2">
              대중교통 이용 시
            </h3>
          </div>

          <div className="space-y-8">
            {/* 지하철 + 버스 조합 1 */}
            <div className="relative pl-6 border-l-2 border-slate-200">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-yellow-400 border-2 border-white shadow-sm"></div>
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                수인분당선 영통역{" "}
                <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  1번 출구
                </span>
              </h4>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="shrink-0 font-bold bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded mt-0.5">
                    버스
                  </span>
                  <span>
                    <strong>55번 마을버스</strong> 승차
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 font-bold bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded mt-0.5">
                    하차
                  </span>
                  <span>SK아파트 정류장 하차 (도보 2분)</span>
                </li>
              </ul>
            </div>

            {/* 지하철 + 버스 조합 2 */}
            <div className="relative pl-6 border-l-2 border-slate-200">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-yellow-400 border-2 border-white shadow-sm"></div>
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                수인분당선 망포역{" "}
                <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  3번 출구
                </span>
              </h4>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="shrink-0 font-bold bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded mt-0.5">
                    버스
                  </span>
                  <span>
                    <strong>8번 버스</strong> 승차
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 font-bold bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded mt-0.5">
                    하차
                  </span>
                  <span>서그내 정류장 하차 (도보 5분)</span>
                </li>
              </ul>
            </div>

            {/* 일반 버스 목록 */}
            <div className="bg-slate-50 rounded-xl p-5">
              <h5 className="font-bold text-slate-900 mb-3 text-sm flex items-center gap-2">
                <Bus size={14} /> 주변 정류장 경유 버스
              </h5>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <span className="font-bold text-blue-600 shrink-0 w-8">
                    일반
                  </span>
                  <span className="text-slate-600">
                    1112, M5107, 5100, 7000 등
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-green-600 shrink-0 w-8">
                    마을
                  </span>
                  <span className="text-slate-600">55, 53-1</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 자가용/주차 안내 (Parking) */}
        <section>
          <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-4">
            <Car
              className="text-blue-600"
              size={24}
              style={{ marginBottom: 10 }}
            />
            <h3 className="font-bold text-xl text-slate-900">
              주차 및 셔틀버스
            </h3>
          </div>

          <div className="space-y-6">
            {/* 중요 알림: 교육관 주차장 */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Car size={80} />
              </div>
              <h4 className="font-bold text-blue-900 mb-2 relative z-10">
                교육관 주차장을 이용해주세요
              </h4>
              <p className="text-sm text-blue-800/80 mb-4 relative z-10 leading-relaxed">
                본당 주차 공간이 매우 협소합니다. <br />
                방문객 및 성도님들은 넓고 편리한 교육관 주차장을 이용해주시면
                감사하겠습니다.
              </p>
              <div className="bg-white/60 rounded-lg p-3 text-sm relative z-10 backdrop-blur-sm">
                <span className="font-bold text-blue-900 block mb-1">
                  교육관 주소
                </span>
                <span className="text-slate-600 flex items-center gap-1">
                  <Navigation size={12} /> 경기 용인시 기흥구 서그내로53번길 30
                </span>
              </div>
            </div>

            {/* 셔틀버스 시간표 */}
            <div className="border border-slate-200 rounded-xl p-6">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Clock size={18} className="text-slate-400" /> 셔틀버스 운행
                안내
              </h4>
              <p className="text-sm text-slate-500 mb-4">
                교육관 ↔ 본당 간 셔틀버스를 편안하게 이용하세요. <br />
                (예배 시간 20분 전부터 수시 운행)
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold border border-slate-200">
                  주일 1부 (09:00)
                </span>
                <span className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold border border-slate-200">
                  주일 2부 (11:00)
                </span>
                <span className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold border border-slate-200">
                  주일 3부 (14:30)
                </span>
                <span className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold border border-slate-200">
                  금요예배 (21:00)
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
