import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import BackToTopButton from "../history/BackToTopButton";
import type { StaffMember, BookItem, WPStaffNode, ServingFields } from "@/lib/types";
import { fetchPastorAndStaffData } from "@/lib/wordpress";
import { decodeHtmlEntities } from "@/utils/format";

export const metadata: Metadata = {
  title: "섬기는 이들",
  description: "수원하나교회 담임목사 및 사역팀 소개",
};

const StaffCard = ({ staff }: { staff: StaffMember }) => (
  <div className="bg-white border border-slate-100 overflow-hidden font-sans shadow-sm group flex flex-col h-full w-full max-w-[250px] mx-auto">
    <div className="aspect-[4/5] relative overflow-hidden bg-slate-50 shrink-0">
      <img
        src={staff.img || "/images/temp01.jpg"}
        alt={staff.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>

    <div className="px-3 pt-5 pb-4 text-center h-[120px] flex flex-col justify-start items-center bg-white">
      <h4 className="font-bold text-slate-900 text-lg mb-1.5 shrink-0">
        {staff.name}{" "}
        <span className="text-base font-medium text-slate-600">
          {staff.role}
        </span>
      </h4>
      <p className="text-base text-gray-600 font-medium break-keep line-clamp-2 px-1 leading-relaxed">
        {staff.desc}
      </p>
    </div>
  </div>
);

export default async function PastorPage() {
  const wpData = await fetchPastorAndStaffData();

  const fields: Partial<ServingFields> = wpData?.page?.servingFields || {};
  const pastorName = fields.pastorName || "고성준";
  const pastorBio = fields.pastorBio || "";
  const pastorHistoryArray = (fields.pastorHistory || "")
    .split("\n")
    .filter((line: string) => line.trim() !== "");
  const spastorImageUrl =
    fields.pastorImage?.node?.sourceUrl || "/images/pastor_ko2.jpg";

  let bookList: BookItem[] = [];
  if (fields.booksJson) {
    try {
      const safeJson = fields.booksJson
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/[\u2018\u2019]/g, "'");
      bookList = JSON.parse(safeJson);
    } catch (e) {
      console.error("저서 JSON 파싱 에러:", e);
    }
  }

  const rawStaffs: WPStaffNode[] = wpData?.staffs?.nodes || [];

  const staffTeams = {
    ministry: [] as StaffMember[],
    administration: [] as StaffMember[],
    media: [] as StaffMember[],
  };

  rawStaffs.forEach((staff) => {
    const roleFallback = staff.staffFields?.staffRole || "간사";

    let rawDesc = staff.content
      ? staff.content.replace(/<[^>]+>/g, "").trim()
      : "";

    if (rawDesc.includes("|")) {
      rawDesc = rawDesc.split("|")[1].trim();
    }

    rawDesc = decodeHtmlEntities(rawDesc);

    const formattedStaff: StaffMember = {
      name: staff.title,
      role: roleFallback,
      desc: rawDesc,
      img: staff.featuredImage?.node?.sourceUrl || null,
    };

    let team = staff.staffFields?.teamCategory;
    if (Array.isArray(team)) team = team[0];
    const safeTeam = typeof team === "string" ? team.toLowerCase().trim() : "";

    if (safeTeam === "ministry" || safeTeam === "사역팀") {
      staffTeams.ministry.push(formattedStaff);
    } else if (safeTeam === "admin" || safeTeam === "행정팀") {
      staffTeams.administration.push(formattedStaff);
    } else if (safeTeam === "media" || safeTeam === "미디어팀") {
      staffTeams.media.push(formattedStaff);
    } else {
      staffTeams.ministry.push(formattedStaff);
    }
  });

  return (
    <div className="bg-white pb-20 font-sans">
      {/* [섹션 1] 통합 페이지 헤더 */}
      <section className="pt-32 md:pt-40 pb-12 px-4 sm:px-6 lg:px-8 max-w-content mx-auto text-center border-b border-slate-100 mb-16 lg:mb-20">
        <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-[0.3em] mb-6">
          Serving People
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.3] tracking-wide">
          섬기는 이들
        </h1>
      </section>

      {/* [섹션 2] 담임목사 프로필 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 lg:mb-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          <div className="w-full lg:w-[45%] shrink-0">
            <div className="aspect-[4/5] lg:aspect-[3.5/4.5] w-full bg-[#EAEBEF] rounded-[2rem] overflow-hidden shadow-sm relative">
              <img
                src={spastorImageUrl}
                alt={`${pastorName} 담임목사`}
                className="w-full h-full object-cover object-top transition-all duration-700"
              />
            </div>
          </div>
          <div className="w-full lg:w-[55%] pt-2">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 flex flex-col md:flex-row items-center lg:items-baseline gap-1 md:gap-3">
                <span className="text-lg md:text-xl font-medium text-slate-500 order-2 md:order-1">
                  담임목사
                </span>
                <span className="order-1 md:order-2">{pastorName}</span>
              </h2>
            </div>
            <div className="text-[15px] md:text-[17px] text-slate-600 leading-[1.8] break-keep space-y-6 mb-16 font-normal whitespace-pre-wrap">
              <p>{pastorBio}</p>
            </div>
            <div className="border-t border-slate-100 pt-12 text-left">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-8 uppercase tracking-wider">
                  학력 및 약력
                </h3>
                <ul className="space-y-4 text-base md:text-[16px] text-slate-600 leading-relaxed break-keep">
                  {pastorHistoryArray.map((history: string, idx: number) => {
                    const isLast = idx === pastorHistoryArray.length - 1;
                    return (
                      <li key={idx} className="flex items-start gap-3">
                        <span
                          className={`w-1.5 h-1.5 rounded-full mt-2.5 shrink-0 ${isLast ? "bg-slate-900" : "bg-slate-300"}`}
                        ></span>
                        <span
                          className={isLast ? "font-bold text-slate-900" : ""}
                        >
                          {history}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* [섹션 3] 저서 소개 */}
      <section className="bg-[#F8F9FA] py-16 md:py-20 border-t border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10 lg:mb-12 px-1">
            <h3 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              저서
            </h3>
            <span className="hidden md:block text-slate-400 text-sm font-medium tracking-widest uppercase">
              Books by Senior Pastor
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-5 gap-y-12">
            {bookList.length > 0 ? (
              bookList.map((book) => (
                <a
                  key={book.id || book.title}
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[1/1.45] w-full bg-white rounded-lg overflow-hidden shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500 mb-5 border border-slate-200/50">
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      unoptimized={true}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white text-slate-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                        <ArrowUpRight size={18} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-900 mb-1 group-hover:text-slate-600 transition-colors line-clamp-1 px-1">
                    {book.title}
                  </h4>
                  <p className="text-xs md:text-sm text-slate-500 leading-snug line-clamp-2 break-keep px-1">
                    {book.desc}
                  </p>
                </a>
              ))
            ) : (
              <div className="col-span-full text-center text-slate-400 py-10">
                워드프레스에서 저서 JSON 데이터를 입력해 주세요.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* [섹션 4] 섬기는 이들 */}
      <section className="py-16 md:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {staffTeams.ministry.length > 0 && (
          <div className="mb-16 md:mb-20">
            <div className="mb-10 text-center">
              <h4 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
                사역팀{" "}
                <span className="text-sm font-light text-slate-400 uppercase tracking-widest">
                  Ministry Team
                </span>
              </h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {staffTeams.ministry.map((staff, i) => (
                <StaffCard key={i} staff={staff} />
              ))}
            </div>
          </div>
        )}

        {staffTeams.administration.length > 0 && (
          <div className="mb-16 md:mb-20">
            <div className="mb-10 text-center">
              <h4 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
                행정팀{" "}
                <span className="text-sm font-light text-slate-400 uppercase tracking-widest">
                  Administration Team
                </span>
              </h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {staffTeams.administration.map((staff, i) => (
                <StaffCard key={i} staff={staff} />
              ))}
            </div>
          </div>
        )}

        {staffTeams.media.length > 0 && (
          <div className="mb-16 md:mb-20">
            <div className="mb-10 text-center">
              <h4 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
                미디어팀{" "}
                <span className="text-sm font-light text-slate-400 uppercase tracking-widest">
                  Media Team
                </span>
              </h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {staffTeams.media.map((staff, i) => (
                <StaffCard key={i} staff={staff} />
              ))}
            </div>
          </div>
        )}

        <div className="pt-8 flex justify-end">
          <BackToTopButton />
        </div>
      </section>
    </div>
  );
}
