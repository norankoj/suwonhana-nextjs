import React from "react";
import { groups } from "@/data/data";
import { fetchCommunityPage } from "@/lib/wordpress";
import type { WPCommunityPage } from "@/lib/types";
import GalleryLightbox from "@/components/GalleryLightbox";

// 부서별 ACF 필드 표시 규칙
// 2jin, 3jin → acfTitle만
// 1jin_1, 1jin_2 → acfTitle + acfAge
// 나머지 → acfTitle + acfAge + acfSchedule + acfLocation
const SHOW_AGE_IDS = ["joybaby", "joycorner", "joyland", "ycm", "ucm", "em", "1jin_1", "1jin_2"];
const SHOW_SCHEDULE_LOCATION_IDS = ["joybaby", "joycorner", "joyland", "ycm", "ucm", "em"];

type GroupItem = {
  id: string;
  name: string;
  age?: string;
  sub?: string;
  desc?: string;
  img?: string;
  eng?: string;
  slogan?: string;
  groupName?: string;
};

function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;/g, "–")
    .replace(/&amp;/g, "&")
    .replace(/&hellip;/g, "…")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const params = await searchParams;
  const activeId = params?.id || "joybaby";

  // 정적 데이터 (name, eng, groupName, img fallback)
  type GroupItemWithGroupName = GroupItem & { groupName: string };
  const allItems: GroupItemWithGroupName[] = (
    groups as Array<{
      subtitle: string;
      items: Array<GroupItem>;
    }>
  ).flatMap((g) =>
    g.items.map((item) => ({
      ...item,
      groupName: g.subtitle,
    })),
  );
  const staticItem = allItems.find((item) => item.id === activeId);

  // WP 데이터 — 슬러그로 직접 조회
  let wpData: WPCommunityPage | null = null;
  wpData = await fetchCommunityPage(activeId);

  // WP 데이터도 없고 정적 데이터도 없으면 에러
  if (!wpData && !staticItem) {
    return (
      <div className="bg-white min-h-screen pt-32 md:pt-40 pb-20 font-sans text-slate-900">
        <div className="max-w-content mx-auto px-4 py-20 text-slate-400 text-center">
          공동체를 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  // 표시 데이터 병합: WP 우선, 정적 fallback
  const heroImg =
    wpData?.featuredImageUrl || staticItem?.img || "/images/temp01.jpg";
  const galleryImages = wpData?.galleryImages ?? [];

  // ACF 필드
  const acfTitle = wpData?.acfTitle || staticItem?.slogan || "";
  const acfAge = wpData?.acfAge || "";
  const acfSchedule = wpData?.acfSchedule || "";
  const acfLocation = wpData?.acfLocation || "";

  // 표시 규칙
  const showAge = SHOW_AGE_IDS.includes(activeId);
  const showScheduleLocation = SHOW_SCHEDULE_LOCATION_IDS.includes(activeId);

  // 인포카드 표시 여부 (acfTitle은 항상 표시, 나머지는 조건부)
  const hasInfoCard = acfTitle || (showAge && acfAge) || (showScheduleLocation && (acfSchedule || acfLocation));

  // 본문
  const descFromWP = wpData ? stripHtml(wpData.contentHtml) : "";
  const descParagraphs = descFromWP
    ? descFromWP.split("\n").map((l) => l.trim()).filter((l) => l.length > 0)
    : (staticItem?.desc || "").split("\n").map((l) => l.trim()).filter((l) => l.length > 0);

  const displayName = wpData?.title ? wpData.title.replace(/<[^>]+>/g, "") : staticItem?.name || "";
  const displayEng = staticItem?.eng || "";
  const displayGroupName = staticItem?.groupName || "";

  return (
    <div className="bg-white min-h-screen pt-32 md:pt-40 pb-20 font-sans text-slate-900">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* 공동체명 + 영문 */}
        <div className="mb-6">
          {displayEng && (
            <p className="text-xs font-bold tracking-[0.25em] text-slate-400 uppercase mb-2">
              {displayEng}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {displayName}
          </h2>
        </div>

        {/* 히어로 이미지 */}
        <div className="mb-8 relative w-full aspect-video md:aspect-[21/9] overflow-hidden bg-slate-100">
          <img
            src={heroImg}
            alt={`${displayName} 대표 사진`}
            className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          {displayGroupName && (
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <span className="text-xs font-bold tracking-[0.2em] text-white/70 uppercase">
                {displayGroupName}
              </span>
            </div>
          )}
        </div>

        {/* 정보 */}
        <div className="mb-10">
          {/* 타이틀 — 크게 */}
          {acfTitle && (
            <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-snug break-keep mb-3">
              {acfTitle}
            </p>
          )}
          {/* 일시, 장소, 나이 — 작게 한 줄 */}
          {(acfSchedule || acfLocation || (showAge && acfAge)) && (
            <p className="text-base md:text-lg text-slate-500 break-keep">
              {[
                showScheduleLocation && acfSchedule,
                showScheduleLocation && acfLocation,
                showAge && acfAge,
              ]
                .filter(Boolean)
                .join(", ")}
            </p>
          )}
        </div>

        {/* 본문 */}
        {descParagraphs.length > 0 && (
          <div className="mb-16 max-w-3xl text-[15px] md:text-base text-slate-600 leading-loose break-keep space-y-4">
            {descParagraphs.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        )}

      </div>

      {/* 갤러리 — 전체 너비 (컨테이너 밖) */}
      {galleryImages.length > 0 && (
        <GalleryLightbox images={galleryImages} altPrefix={displayName} />
      )}
    </div>
  );
}
