"use client";

import React from "react";
import { MapPin, Phone, Navigation } from "lucide-react";
import IntroPageHeader from "@/components/IntroPageHeader";

export default function LocationPage() {
  return (
    <div className="bg-white pb-32 font-sans">
      <IntroPageHeader label="Location & Contact" title="오시는 길" />

      <div className="animate-fade-in max-w-content mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* 지도 */}
        <section className="mb-10">
          <div className="w-full h-[350px] md:h-[450px] rounded-md overflow-hidden border border-slate-200">
            <iframe
              width="100%"
              height="100%"
              src="https://maps.google.com/maps?q=경기도 용인시 기흥구 서그내로 16번길 11-6&t=&z=15&ie=UTF8&iwloc=&output=embed"
              title="church-map"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </section>

        {/* 주소 및 연락처 */}
        <section className="mb-12 pb-12 border-b border-slate-100">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <h3 className="font-bold text-xl text-slate-900 mb-1">
                수원하나교회
              </h3>
              <p className="text-slate-500 text-sm mb-1">
                (17103) 경기도 용인시 기흥구 서그내로 16번길 11-6
              </p>
              <p className="text-slate-500 text-sm flex items-center gap-1.5">
                <Phone size={13} className="text-slate-400" />
                031-202-0697
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href="https://map.kakao.com/link/search/수원하나교회"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FAE100] text-[#3C1E1E] font-semibold text-sm hover:brightness-95 transition-all"
              >
                <MapPin size={15} /> 카카오맵
              </a>
              <a
                href="https://map.naver.com/v5/search/수원하나교회"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#03C75A] text-white font-semibold text-sm hover:brightness-110 transition-all"
              >
                <MapPin size={15} /> 네이버지도
              </a>
            </div>
          </div>
        </section>

        {/* 교통 안내 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* 대중교통 */}
          <section>
            <h3 className="font-bold text-xl text-slate-900 mb-6">
              대중교통 이용 시
            </h3>

            <div className="space-y-5 text-sm text-slate-600">
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  수인분당선 영통역{" "}
                  <span className="font-normal text-slate-500">1번 출구</span>
                </p>
                <p>
                  마을버스 <strong className="text-slate-800">55번</strong> 승차
                  → SK아파트 정류장 하차 (도보 2분)
                </p>
              </div>

              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  수인분당선 망포역{" "}
                  <span className="font-normal text-slate-500">3번 출구</span>
                </p>
                <p>
                  일반버스 <strong className="text-slate-800">8번</strong> 승차
                  → 서그내 정류장 하차 (도보 5분)
                </p>
              </div>

              <div>
                <p className="text-slate-500 mb-1.5">주변 경유 버스</p>
                <p>
                  <span className="text-slate-700 font-medium">일반</span>{" "}
                  <span className="text-slate-500">
                    1112, M5107, 5100, 7000 등
                  </span>
                </p>
                <p className="mt-1">
                  <span className="text-slate-700 font-medium">마을</span>{" "}
                  <span className="text-slate-500">55, 53-1</span>
                </p>
              </div>
            </div>
          </section>

          {/* 주차 및 셔틀버스 */}
          <section>
            <h3 className="font-bold text-xl text-slate-900 mb-6">
              주차 및 셔틀버스
            </h3>

            <div className="space-y-5 text-sm text-slate-600">
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  교육관 주차장 이용 안내
                </p>
                <p className="mb-2 break-keep">
                  본당 주차 공간이 협소하므로 방문객 및 성도님들은{" "}
                  <strong className="text-slate-800">교육관 주차장</strong>을
                  이용해 주시기 바랍니다.
                </p>
                <p className="flex items-center gap-1.5 text-slate-500">
                  <Navigation size={13} className="text-slate-400 shrink-0" />
                  경기 용인시 기흥구 서그내로53번길 30
                </p>
              </div>

              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  셔틀버스 운행 안내
                </p>
                <p className="text-slate-500 mb-3 break-keep">
                  교육관 ↔ 본당 간 셔틀버스 운행 (각 예배 20분 전부터 수시 운행)
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "주일 1부 (09:00)",
                    "주일 2부 (11:00)",
                    "주일 3부 (14:30)",
                    "금요예배 (21:00)",
                  ].map((time) => (
                    <span
                      key={time}
                      className="px-3 py-1 bg-slate-50 text-slate-700 rounded text-sm font-medium border border-slate-200"
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
