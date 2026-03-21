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
    const res = await fetch(`${WP_DOMAIN}/wp-json/wp/v2/${path}`);
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
    const res = await fetch(`${WP_DOMAIN}/wp-json/wp/v2/${path}`);
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
  const data = await wpGraphQL<{ page: { visionFields: VisionFields } }>(
    query,
  );
  return data?.page ?? null;
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
// 핵심가치 페이지 (GraphQL)
// ==========================================

export async function fetchCoreValuesData() {
  const query = `
    query GetCoreValuesPage {
      page(id: "핵심가치", idType: URI) {
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
    page: { coreValueFields: CoreValueFields };
  }>(query);
  return data?.page ?? null;
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
// 공동체 페이지 (REST API)
// ==========================================

interface WPPageRaw {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
    "wp:term"?: unknown;
  };
}

interface WPMediaRaw {
  id: number;
  source_url: string;
  media_details?: { sizes?: { large?: { source_url: string } } };
}

function extractGalleryImages(html: string): string[] {
  // Extract href links inside gallery-item <a> tags (full-size images)
  const matches = html.matchAll(/<a href='([^']+\.(jpg|jpeg|png|webp))'>/gi);
  const urls: string[] = [];
  for (const m of matches) {
    if (!urls.includes(m[1])) urls.push(m[1]);
  }
  return urls;
}

export async function fetchCommunityPage(
  wpId: number,
): Promise<WPCommunityPage | null> {
  try {
    const [pageRes, mediaRes] = await Promise.all([
      fetch(`${WP_DOMAIN}/wp-json/wp/v2/pages/${wpId}?_embed`, {
        next: { revalidate: 300 },
      }),
      fetch(`${WP_DOMAIN}/wp-json/wp/v2/media?parent=${wpId}&per_page=20`, {
        next: { revalidate: 300 },
      }),
    ]);

    if (!pageRes.ok) return null;

    const page: WPPageRaw = await pageRes.json();
    const mediaItems: WPMediaRaw[] = mediaRes.ok ? await mediaRes.json() : [];

    const featuredImageUrl =
      page._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;

    // Gallery: prefer attached media items (full-size), fallback to parsing HTML
    const galleryImages =
      mediaItems.length > 0
        ? mediaItems.map(
            (m) => m.media_details?.sizes?.large?.source_url ?? m.source_url,
          )
        : extractGalleryImages(page.content.rendered);

    return {
      wpId,
      title: page.title.rendered,
      contentHtml: page.content.rendered,
      featuredImageUrl,
      galleryImages,
    };
  } catch (error) {
    console.error(`fetchCommunityPage error (ID ${wpId}):`, error);
    return null;
  }
}
