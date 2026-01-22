"use client";

import React from "react";
import { Clock, MapPin, Heart, ArrowRight } from "lucide-react";

// 재사용 가능한 예배 리스트 아이템 컴포넌트
const ServiceItem = ({
  name,
  time,
  place,
  target,
  isMain = false,
  isParentAccompany = false, // 부모님 동반 여부 (강조용)
}: {
  name: string;
  time: string;
  place: string;
  target?: string;
  isMain?: boolean;
  isParentAccompany?: boolean;
}) => (
  <div
    className={`flex flex-col md:flex-row md:items-center justify-between py-5 ${isMain ? "border-b border-slate-100 last:border-0" : "border-b border-slate-100 last:border-0"}`}
  >
    <div className="mb-2 md:mb-0">
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <h4
          className={`font-bold text-slate-900 ${isMain ? "text-lg" : "text-base"}`}
        >
          {name}
        </h4>
        {target && (
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              isParentAccompany
                ? "bg-orange-100 text-orange-600" // 부모동반: 주황색 강조
                : "bg-slate-100 text-slate-500" // 일반: 회색
            }`}
          >
            {target}
          </span>
        )}
      </div>
      <div className="flex items-center gap-4 text-sm text-slate-500">
        <span className="flex items-center gap-1">
          <MapPin size={14} className="shrink-0" /> {place}
        </span>
      </div>
    </div>
    <div
      className={`text-right ${isMain ? "text-xl md:text-2xl" : "text-lg"} font-bold text-blue-900`}
    >
      {time}
    </div>
  </div>
);

export default function WorshipPage() {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto pb-20">
      {/* 1. 환영 메시지 (Welcome) - 이전 버전 (깔끔한 화이트 스타일) 복구 */}
      <section className="mb-16">
        <div className="bg-slate-50 rounded-2xl p-8 md:p-10 text-center border border-slate-100">
          {/* <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm mb-4 text-red-500">
            <Heart fill="currentColor" size={20} />
          </div> */}
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            수원하나교회에 오신 여러분을 환영합니다
          </h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            처음 오셨나요? 낯선 환경이 어색하지 않도록 새가족부에서 친절히
            안내해 드립니다.
            <br className="hidden md:block" />
            본당 입구 안내 데스크를 찾아주시거나, 아래 연락처로 문의해주세요.
          </p>
          <div className="inline-flex flex-col md:flex-row items-center gap-2 md:gap-6 bg-white px-6 py-3 rounded-full border border-slate-200 shadow-sm">
            <span className="font-bold text-slate-800 text-sm">
              새가족 담당
            </span>
            <span className="hidden md:block w-px h-3 bg-slate-300"></span>
            <span className="text-slate-600 text-sm">
              신상철 목사 (010-2484-0776)
            </span>
          </div>
        </div>
      </section>

      {/* 2. 주일 예배 (Main Worship) */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6 border-b-2 border-slate-900 pb-4">
          <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            주일 대예배
          </h3>
          <span className="text-slate-500 font-medium text-sm">
            Sunday Worship
          </span>
        </div>

        <div className="bg-white">
          <ServiceItem
            isMain
            name="주일 1부"
            time="09:00"
            place="본당 2층 대예배실"
            target="전 세대"
          />
          <ServiceItem
            isMain
            name="주일 2부"
            time="11:00"
            place="본당 2층 대예배실"
            target="전 세대"
          />
          <ServiceItem
            isMain
            name="주일 3부"
            time="14:30"
            place="본당 2층 대예배실"
            target="청년 및 일반"
          />
        </div>
        <div className="mt-4 bg-blue-50 p-4 rounded-lg flex items-start gap-3">
          <div className="mt-1 text-blue-600">
            <Clock size={16} />
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong>자녀와 함께 드리는 열린예배:</strong> 모든 주일 예배는
            자녀들과 함께 드리며,
            <span className="text-blue-700 font-bold"> '복음과 구원'</span>에
            초점을 맞추어 드려집니다.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* 3. 다음세대 (Next Generation) */}
        <section>
          <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
            <h3 className="text-xl font-bold text-slate-900">다음세대 예배</h3>
            <span className="text-slate-400 text-sm">Church School</span>
          </div>
          <div>
            <ServiceItem
              name="영아부 (조이베이비)"
              target="36개월 미만 + 부모님" // 부모님 문구 추가
              time="주일 09:30"
              place="NGC 지하예배실"
            />
            <ServiceItem
              name="유치부 (조이코너)"
              target="36개월 이상 ~ 미취학 + 부모님" // 부모님 문구 추가
              time="주일 13:00"
              place="본당 2층"
            />
            <ServiceItem
              name="초등부 (조이랜드)"
              target="초등학생"
              time="화요일 19:00"
              place="NGC 지하예배실"
            />
            <ServiceItem
              name="중고등부 (YCM)"
              target="청소년"
              time="주일 16:30"
              place="본당 2층"
            />
          </div>
        </section>

        {/* 4. 주중 예배 (Weekdays) */}
        <section>
          <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
            <h3 className="text-xl font-bold text-slate-900">멤버십 예배</h3>
            <span className="text-slate-400 text-sm">Weekdays</span>
          </div>
          <div>
            {/* <ServiceItem
              name="수요 훈련"
              target="등록교인"
              time="수요일 20:00"
              place="본당 2층 대예배실"
            /> */}
            <ServiceItem
              name="금요 예배"
              target="전 세대"
              time="금요일 21:00"
              place="본당 2층 대예배실"
            />
            <div className="mt-6 p-5 bg-slate-50 rounded-xl border border-slate-100">
              <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-2 text-sm">
                <span className="relative flex h-2.5 w-2.5 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                온라인 예배 안내
              </h5>
              <p className="text-sm text-slate-600 mb-3">
                모든 공예배는 유튜브를 통해 실시간으로 중계됩니다.
              </p>
              <a
                href="https://youtube.com/@수원하나교회"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-sm font-bold text-slate-900 hover:text-red-600 transition-colors"
              >
                유튜브 채널 바로가기 <ArrowRight size={14} className="ml-1" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
