import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import BackToTopButton from "../history/BackToTopButton";

// ==========================================
// 1. WPGraphQL 통신 (담임목사님 & 사역자 리스트 모두 가져오기)
// ==========================================
async function getPastorAndStaffData() {
  const query = `
    query GetServingPeopleAndStaff {
      # 1. 담임목사님 페이지 데이터
      page(id: "serving-people", idType: URI) {
        servingFields {
          pastorName
          pastorBio
          pastorHistory
          booksJson
          pastorImage {
            node {
              sourceUrl
            }
          }
        }
      }
      
      # 2. Staff 사역자 리스트 데이터 (최대 50명, 메뉴 순서(Menu Order) 오름차순 정렬)
     staffs(first: 50, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
        nodes {
          title # 사역자 이름
          content # 본문 내용 (여기에 적힌 미디어 기획, 제작 등을 가져옵니다)
          featuredImage { 
            node {
              sourceUrl
            }
          }
          staffFields {
            teamCategory # ACF에서 만든 팀 분류 (ministry, admin, media)
            staffRole    # ACF에서 만든 직분/역할
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        next: { revalidate: 60 },
      },
    );
    if (!res.ok) throw new Error("Network response was not ok");
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("WPGraphQL Fetch Error:", error);
    return null;
  }
}

// ==========================================
// 2. 사역자 카드 컴포넌트
// ==========================================
const StaffCard = ({ staff }: { staff: any }) => (
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
// ==========================================
// 3. 메인 페이지 컴포넌트
// ==========================================
export default async function PastorPage() {
  const wpData = await getPastorAndStaffData();

  // --- [데이터 1] 담임목사님 데이터 파싱 ---
  const fields = wpData?.page?.servingFields || {};
  const pastorName = fields.pastorName || "고성준";
  const pastorBio = fields.pastorBio || "";
  const pastorHistoryArray = (fields.pastorHistory || "")
    .split("\n")
    .filter((line: string) => line.trim() !== "");
  const spastorImageUrl =
    fields.pastorImage?.node?.sourceUrl || "/images/pastor_ko2.jpg";

  let bookList = [];
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

  // --- [데이터 2] Staff 사역자 리스트 파싱 및 팀별 분류 ---
  const rawStaffs = wpData?.staffs?.nodes || [];

  const staffTeams = {
    ministry: [] as any[],
    administration: [] as any[],
    media: [] as any[],
  };

  rawStaffs.forEach((staff: any) => {
    const roleFallback = staff.staffFields?.staffRole || "간사";

    // 1. 본문(content)에서 HTML 태그(<p> 등)를 싹 지우고 순수 텍스트만 남깁니다.
    let rawDesc = staff.content
      ? staff.content.replace(/<[^>]+>/g, "").trim()
      : "";

    // 2. 만약 "미디어팀 | 미디어 (기획, 제작)" 처럼 '|' 기호가 있다면 뒤쪽 텍스트만 가져옵니다.
    if (rawDesc.includes("|")) {
      rawDesc = rawDesc.split("|")[1].trim();
    }

    // 3. 워드프레스가 변환한 특수기호(&amp; 등)를 원래 기호(&)로 되돌려줍니다 (디코딩)
    rawDesc = rawDesc
      .replace(/&amp;/g, "&")
      .replace(/&#038;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");

    const formattedStaff = {
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
    <div className="bg-white pb-32 font-sans selection:bg-blue-50 selection:text-blue-900">
      {/* =========================================
          [섹션 1] 통합 페이지 헤더
          ========================================= */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center border-b border-slate-100 mb-20 md:mb-24">
        <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-[0.3em] mb-6">
          Serving People
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.3] tracking-wide">
          섬기는 이들
        </h1>
      </section>

      {/* =========================================
          [섹션 2] 담임목사 프로필
          ========================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
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
                <ul className="space-y-4 text-sm md:text-[15px] text-slate-600 leading-relaxed break-keep">
                  {pastorHistoryArray.map((history: string, idx: number) => {
                    const isLast = idx === pastorHistoryArray.length - 1;
                    return (
                      <li key={idx} className="flex items-start gap-3">
                        <span
                          className={`w-1.5 h-1.5 rounded-full mt-2.5 shrink-0 ${isLast ? "bg-blue-600" : "bg-slate-300"}`}
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

      {/* =========================================
          [섹션 3] 저서 소개 
          ========================================= */}
      <section className="bg-[#F8F9FA] py-24 border-t border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-16 px-1">
            <h3 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              저서
            </h3>
            <span className="hidden md:block text-slate-400 text-sm font-medium tracking-widest uppercase">
              Books by Senior Pastor
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-5 gap-y-12">
            {bookList.length > 0 ? (
              bookList.map((book: any) => (
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
                  <h4 className="text-[15px] font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1 px-1">
                    {book.title}
                  </h4>
                  <p className="text-[12px] text-slate-500 leading-snug line-clamp-2 break-keep px-1">
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

      {/* [섹션 4] 섬기는 이들 (워드프레스 데이터 렌더링) */}
      <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 사역팀 */}
        {staffTeams.ministry.length > 0 && (
          <div className="mb-24">
            <div className="mb-12 text-center">
              <h4 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
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

        {/* 행정팀 */}
        {staffTeams.administration.length > 0 && (
          <div className="mb-24">
            <div className="mb-12 text-center">
              <h4 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
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

        {/* 미디어팀 */}
        {staffTeams.media.length > 0 && (
          <div className="mb-24">
            <div className="mb-12 text-center">
              <h4 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
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

        <div className="pt-10 flex justify-end">
          <BackToTopButton />
        </div>
      </section>
    </div>
  );
}
