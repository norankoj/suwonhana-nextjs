import React from "react";
import { Users, Clock, MapPin } from "lucide-react";
import { groups } from "@/data/data";
import { fetchCommunityPage } from "@/lib/wordpress";
import type { WPCommunityPage } from "@/lib/types";

// WP page ID mapping by community ID
const WP_PAGE_IDS: Record<string, number> = {
  joybaby: 363,
  joycorner: 311,
  joyland: 370,
  ycm: 372,
  ucm: 374,
  "1jin_1": 376,
  "1jin_2": 376,
  "2jin": 378,
  "3jin": 380,
  em: 384,
};

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

  // Find static data from data.js
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

  // Fetch WP data
  const wpId = WP_PAGE_IDS[activeId];
  let wpData: WPCommunityPage | null = null;
  if (wpId) {
    wpData = await fetchCommunityPage(wpId);
  }

  // Merge: WP content takes priority, static data as fallback
  const heroImg =
    wpData?.featuredImageUrl || staticItem?.img || "/images/temp01.jpg";
  const galleryImages = wpData?.galleryImages ?? [];

  const subParts = staticItem?.sub ? staticItem.sub.split("\n") : [];
  const slogan = staticItem?.slogan || (subParts[0] ? subParts[0].trim() : "");
  const infoLine = subParts.length > 1 ? subParts[1].trim() : "";
  const infos = infoLine ? infoLine.split(",").map((s: string) => s.trim()) : [];

  // Description: prefer WP content (stripped), else static desc
  const descFromWP = wpData ? stripHtml(wpData.contentHtml) : "";
  const descParagraphs = descFromWP
    ? descFromWP
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0)
    : (staticItem?.desc || "").split("\n").map((l) => l.trim()).filter((l) => l.length > 0);

  if (!staticItem) {
    return (
      <div className="bg-white min-h-screen pt-32 md:pt-40 pb-20 font-sans text-slate-900">
        <div className="max-w-content mx-auto px-4 py-20 text-slate-400 text-center">
          공동체를 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-32 md:pt-40 pb-20 font-sans text-slate-900">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* 공동체명 + 영문 */}
        <div className="mb-6">
          {staticItem.eng && (
            <p className="text-xs font-bold tracking-[0.25em] text-slate-400 uppercase mb-2">
              {staticItem.eng}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {staticItem.name}
          </h2>
        </div>

        {/* 히어로 이미지 */}
        <div className="mb-10 relative w-full aspect-video md:aspect-[21/9] overflow-hidden bg-slate-100">
          <img
            src={heroImg}
            alt={`${staticItem.name} 대표 사진`}
            className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <span className="text-xs font-bold tracking-[0.2em] text-white/70 uppercase">
              {staticItem.groupName}
            </span>
          </div>
        </div>

        {/* 정보 + 본문 */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 pt-2 mb-16">
          {/* 왼쪽: 슬로건 + 인포 */}
          <div className="lg:w-[320px] shrink-0">
            {slogan && (
              <h3 className="text-xl md:text-2xl font-extrabold mb-6 leading-snug break-keep text-slate-900 border-l-4 border-slate-900 pl-4">
                {slogan}
              </h3>
            )}

            {infos.length > 0 && (
              <div className="flex flex-col divide-y divide-slate-100 border border-slate-100">
                {infos[0] && (
                  <div className="flex items-center gap-3 py-3 px-4 text-sm text-slate-700">
                    <Users size={15} className="text-slate-400 shrink-0" />
                    <span className="font-medium">{infos[0]}</span>
                  </div>
                )}
                {infos[1] && (
                  <div className="flex items-center gap-3 py-3 px-4 text-sm text-slate-700">
                    <Clock size={15} className="text-slate-400 shrink-0" />
                    <span className="font-medium">{infos[1]}</span>
                  </div>
                )}
                {infos[2] && (
                  <div className="flex items-center gap-3 py-3 px-4 text-sm text-slate-700">
                    <MapPin size={15} className="text-slate-400 shrink-0" />
                    <span className="font-medium">{infos[2]}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 오른쪽: 본문 */}
          <div className="flex-1 text-[15px] md:text-base text-slate-600 leading-loose break-keep space-y-4">
            {descParagraphs.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>

        {/* 갤러리 이미지 */}
        {galleryImages.length > 0 && (
          <section className="border-t border-slate-100 pt-12">
            <h3 className="text-base font-bold text-slate-400 uppercase tracking-widest mb-6">
              Gallery
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {galleryImages.map((src, i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden bg-slate-100"
                >
                  <img
                    src={src}
                    alt={`${staticItem.name} 사진 ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
