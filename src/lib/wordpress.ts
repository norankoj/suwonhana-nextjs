// ==========================================
// WordPress API 통합 레이어
// ==========================================

import type {
  WPSermon,
  WPSlide,
  WPTaxonomyItem,
  VisionFields,
  ServingFields,
  WPStaffNode,
  CoreValueFields,
  HistoryFields,
  WorshipFields,
  WorshipData,
  WorshipFetchResult,
  WPCommunityPage,
} from "./types";

// --- 도메인 설정 (환경변수 우선, 폴백으로 로컬) ---
const WP_DOMAIN =
  process.env.NEXT_PUBLIC_WORDPRESS_DOMAIN || "http://suwonhana.local";
const WP_GRAPHQL_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL || `${WP_DOMAIN}/graphql`;

// ==========================================
// REST API 유틸리티
// ==========================================

async function wpRestGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${WP_DOMAIN}/wp-json/wp/v2/${path}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(`WP REST API Error [${path}]:`, error);
    return null;
  }
}

interface WPRestListResult<T> {
  data: T[];
  totalPages: number;
}

async function wpRestGetList<T>(
  path: string,
): Promise<WPRestListResult<T>> {
  try {
    const res = await fetch(`${WP_DOMAIN}/wp-json/wp/v2/${path}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return { data: [], totalPages: 0 };
    const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "0");
    const data = await res.json();
    return { data, totalPages };
  } catch (error) {
    console.error(`WP REST API Error [${path}]:`, error);
    return { data: [], totalPages: 0 };
  }
}

/** 페이지네이션이 있는 전체 목록을 가져옴 */
async function wpRestGetAll<T>(endpoint: string): Promise<T[]> {
  let allItems: T[] = [];
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const res = await fetch(
      `${WP_DOMAIN}/wp-json/wp/v2/${endpoint}?per_page=100&page=${page}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) break;
    const data: T[] = await res.json();
    if (data.length > 0) {
      allItems = [...allItems, ...data];
      if (data.length < 100) hasMore = false;
      else page++;
    } else {
      hasMore = false;
    }
  }
  return allItems;
}

// ==========================================
// GraphQL 유틸리티
// ==========================================

async function wpGraphQL<T>(query: string): Promise<T | null> {
  try {
    const res = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Network response was not ok");
    const json = await res.json();
    return json.data as T;
  } catch (error) {
    console.error("WPGraphQL Fetch Error:", error);
    return null;
  }
}

// ==========================================
// 홈페이지 설정 (ACF — Bento Grid 이미지)
// ==========================================

export async function fetchHomepageData(): Promise<Record<string, string> | null> {
  try {
    const res = await fetch(
      `${WP_DOMAIN}/wp-json/wp/v2/pages?slug=homepage-settings&_fields=acf`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) return null;
    const pages: Array<{ acf?: Record<string, string> }> = await res.json();
    return pages[0]?.acf ?? null;
  } catch {
    return null;
  }
}

// ==========================================
// 슬라이드 (메인 히어로)
// ==========================================

export async function fetchSlides(): Promise<WPSlide[]> {
  return (
    (await wpRestGet<WPSlide[]>("risen_slide?per_page=10&_embed")) || []
  );
}

// ==========================================
// 설교 (REST API)
// ==========================================

export async function fetchSermons(
  params: string = "",
): Promise<WPRestListResult<WPSermon>> {
  return wpRestGetList<WPSermon>(
    `risen_multimedia?_embed${params ? `&${params}` : ""}`,
  );
}

export async function fetchRecentSermons(
  count: number = 5,
): Promise<WPSermon[]> {
  return (
    (await wpRestGet<WPSermon[]>(
      `risen_multimedia?per_page=${count}&_embed`,
    )) || []
  );
}

export async function fetchAllCategories(): Promise<WPTaxonomyItem[]> {
  return wpRestGetAll<WPTaxonomyItem>("risen_multimedia_category");
}

export async function fetchAllTags(): Promise<WPTaxonomyItem[]> {
  return wpRestGetAll<WPTaxonomyItem>("risen_multimedia_tag");
}

// ==========================================
// 비전 페이지 (GraphQL)
// ==========================================

export async function fetchVisionData() {
  const query = `
    query GetVisionPage {
      page(id: "비전-및-사역", idType: URI) {
        featuredImage { node { sourceUrl } }
        visionFields {
          mainTitle
          visionStatement
          value1Title
          value1Desc
          value1Verse
          value1Image { node { sourceUrl } }
          value2Title
          value2Desc
          value2Verse
          value2Image { node { sourceUrl } }
          value3Title
          value3Desc
          value3Verse
          value3Image { node { sourceUrl } }
        }
      }
    }
  `;
  const data = await wpGraphQL<{
    page: { featuredImage?: { node: { sourceUrl: string } }; visionFields: VisionFields };
  }>(query);
  if (!data?.page) return null;
  return {
    ...data.page,
    heroImageUrl: data.page.featuredImage?.node?.sourceUrl ?? null,
  };
}

// ==========================================
// 섬기는 이들 페이지 (GraphQL)
// ==========================================

export async function fetchPastorAndStaffData() {
  const query = `
    query GetServingPeopleAndStaff {
      page(id: "serving-people", idType: URI) {
        servingFields {
          pastorName
          pastorBio
          pastorHistory
          booksJson
          pastorImage { node { sourceUrl } }
        }
      }
      staffs(first: 50, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
        nodes {
          title
          content
          featuredImage { node { sourceUrl } }
          staffFields { teamCategory staffRole }
        }
      }
    }
  `;
  return wpGraphQL<{
    page: { servingFields: ServingFields };
    staffs: { nodes: WPStaffNode[] };
  }>(query);
}

// ==========================================
// 훈련 페이지 (GraphQL) — 대표 이미지만 사용
// ==========================================

export async function fetchTrainingData() {
  const query = `
    query GetTrainingPage {
      page(id: "훈련", idType: URI) {
        featuredImage { node { sourceUrl } }
      }
    }
  `;
  const data = await wpGraphQL<{
    page: { featuredImage?: { node: { sourceUrl: string } } };
  }>(query);
  return {
    heroImageUrl: data?.page?.featuredImage?.node?.sourceUrl ?? null,
  };
}

// ==========================================
// 핵심가치 페이지 (GraphQL)
// ==========================================

export async function fetchCoreValuesData() {
  const query = `
    query GetCoreValuesPage {
      page(id: "핵심가치", idType: URI) {
        featuredImage { node { sourceUrl } }
        coreValueFields {
          valueStatement
          mainTitle
          subDesc
          part1Title
          part2Title
          value1Title value1Sub value1Desc
          value2Title value2Sub value2Desc
          value3Title value3Sub value3Desc
          value4Title value4Sub value4Desc
          value5Title value5Sub value5Desc
          value6Title value6Sub value6Desc
          value7Title value7Sub value7Desc
          value8Title value8Sub value8Desc
          value9Title value9Sub value9Desc
          value10Title value10Sub value10Desc
          value11Title value11Sub value11Desc
          value12Title value12Sub value12Desc
        }
      }
    }
  `;
  const data = await wpGraphQL<{
    page: { featuredImage?: { node: { sourceUrl: string } }; coreValueFields: CoreValueFields };
  }>(query);
  if (!data?.page) return null;
  return {
    ...data.page,
    heroImageUrl: data.page.featuredImage?.node?.sourceUrl ?? null,
  };
}

// ==========================================
// 연혁 페이지 (GraphQL)
// ==========================================

export async function fetchHistoryData() {
  const query = `
    query GetHistoryPage {
      page(id: "65", idType: DATABASE_ID) {
        historyFields {
          historyJsonData
        }
      }
    }
  `;
  const data = await wpGraphQL<{
    page: { historyFields: HistoryFields };
  }>(query);
  return data?.page ?? null;
}

// ==========================================
// 예배 안내 페이지 (GraphQL)
// ==========================================

export async function fetchWorshipData(): Promise<WorshipFetchResult> {
  const query = `
    query GetWorshipPage {
      page(id: "예배-안내", idType: URI) {
        worshipFields {
          worshipJsonData
          nextgen1Image { node { sourceUrl } }
          nextgen2Image { node { sourceUrl } }
          nextgen3Image { node { sourceUrl } }
          nextgen4Image { node { sourceUrl } }
        }
      }
    }
  `;
  const result = await wpGraphQL<{
    page: { worshipFields: WorshipFields };
  }>(query);

  const fields = result?.page?.worshipFields;

  // JSON 파싱
  let data: WorshipData | null = null;
  if (fields?.worshipJsonData) {
    try {
      data = JSON.parse(fields.worshipJsonData) as WorshipData;
    } catch {
      console.error("fetchWorshipData: JSON 파싱 실패");
    }
  }

  // ACF 이미지 필드 (순서: 1~4)
  const nextGenImages: (string | null)[] = [
    fields?.nextgen1Image?.node?.sourceUrl ?? null,
    fields?.nextgen2Image?.node?.sourceUrl ?? null,
    fields?.nextgen3Image?.node?.sourceUrl ?? null,
    fields?.nextgen4Image?.node?.sourceUrl ?? null,
  ];

  return { data, nextGenImages };
}

// ==========================================
// 공동체 페이지 (REST API)
// ==========================================

interface WPPageRaw {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  acf?: Record<string, string>;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
    "wp:term"?: unknown;
  };
}


export async function fetchCommunityPage(
  slug: string,
): Promise<WPCommunityPage | null> {
  try {
    // 슬러그로 페이지 조회 (ACF + 피처드 이미지 포함)
    const pageRes = await fetch(
      `${WP_DOMAIN}/wp-json/wp/v2/pages?slug=${slug}&_embed`,
      { next: { revalidate: 300 } },
    );
    if (!pageRes.ok) return null;

    const pages: WPPageRaw[] = await pageRes.json();
    const page = pages[0];
    if (!page) return null;

    const featuredImageUrl =
      page._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;

    // 갤러리: wp-image-{id} 클래스로 첨부 ID 추출 → 원본 URL 조회
    const idRegex = /wp-image-(\d+)/g;
    const attachmentIds: number[] = [];
    let idMatch: RegExpExecArray | null;
    while ((idMatch = idRegex.exec(page.content.rendered)) !== null) {
      const id = parseInt(idMatch[1]);
      if (!attachmentIds.includes(id)) attachmentIds.push(id);
    }

    let galleryImages: string[] = [];

    if (attachmentIds.length > 0) {
      // ID로 원본 full-size URL 일괄 조회
      try {
        const mediaRes = await fetch(
          `${WP_DOMAIN}/wp-json/wp/v2/media?include=${attachmentIds.join(",")}&per_page=100&_fields=id,source_url`,
          { next: { revalidate: 300 } },
        );
        if (mediaRes.ok) {
          const mediaItems: { id: number; source_url: string }[] = await mediaRes.json();
          galleryImages = attachmentIds
            .map((id) => mediaItems.find((m) => m.id === id)?.source_url ?? "")
            .filter(Boolean);
        }
      } catch { /* ignore */ }
    }

    // fallback: wp-image 클래스 없을 때 src 직접 파싱
    if (galleryImages.length === 0) {
      const imgTagRegex = /<img[^>]+>/gi;
      let tagMatch: RegExpExecArray | null;
      while ((tagMatch = imgTagRegex.exec(page.content.rendered)) !== null) {
        const tag = tagMatch[0];
        const srcRaw = (/(?:data-src|src)="([^"]+)"/.exec(tag) || [])[1] ?? "";
        if (srcRaw) {
          const url = srcRaw.replace(/-\d+x\d+(\.[^.?#"]+)$/, "$1");
          if (!galleryImages.includes(url)) galleryImages.push(url);
        }
      }
    }

    // ACF 필드 (WP REST API가 `acf` 키로 자동 노출)
    const acf = page.acf || {};

    return {
      wpId: page.id,
      title: page.title.rendered,
      contentHtml: page.content.rendered,
      featuredImageUrl,
      galleryImages,
      acfTitle: acf.community_title || "",
      acfAge: acf.community_age || "",
      acfSchedule: acf.community_schedule || "",
      acfLocation: acf.community_location || "",
    };
  } catch (error) {
    console.error(`fetchCommunityPage error (slug: ${slug}):`, error);
    return null;
  }
}
