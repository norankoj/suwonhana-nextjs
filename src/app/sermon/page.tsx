// ==========================================
// 말씀뱅크 — Server Component (ISR 60초)
// ==========================================
// taxonomy + 초기 설교 데이터를 서버에서 fetch → Client Component로 전달
// 100명이 동시 접속해도 WP 호출은 60초에 1번만 발생

import { Suspense } from "react";
import {
  fetchAllCategories,
  fetchAllTags,
  fetchSermons,
} from "@/lib/wordpress";
import SermonClient from "./SermonClient";

export const revalidate = 60;

const BIBLE_BOOKS = [
  "창세기", "출애굽기", "신명기", "여호수아", "룻기", "에스라",
  "느헤미야", "에스더", "시편", "잠언", "전도서", "이사야",
  "예레미야", "다니엘", "호세아", "요나", "미가", "학개",
  "스가랴", "말라기", "마가복음", "누가복음", "요한복음",
  "사도행전", "로마서", "갈라디아서", "에베소서", "빌립보서",
  "디모데전서", "히브리서", "야고보서", "베드로전서", "요한일서",
  "요한계시록",
];

export default async function SermonPage() {
  // 서버에서 병렬 fetch — ISR 캐시로 60초간 재사용
  const [allCategories, allTags, initialResult] = await Promise.all([
    fetchAllCategories(),
    fetchAllTags(),
    fetchSermons("per_page=9&page=1"),
  ]);

  // tagMap: "주일예배" → 42 (WP tag ID)
  const tagMap: Record<string, number> = {};
  allTags.forEach((t) => {
    tagMap[t.name] = t.id;
  });

  // categoryMap: "창세기" → [12, 45] (WP category IDs)
  const categoryMap: Record<string, number[]> = {};
  BIBLE_BOOKS.forEach((bookName) => {
    categoryMap[bookName] = allCategories
      .filter((c) => c.name.includes(bookName))
      .map((c) => c.id);
  });

  return (
    <Suspense>
      <SermonClient
        initialSermons={initialResult.data}
        initialTotalPages={initialResult.totalPages}
        tagMap={tagMap}
        categoryMap={categoryMap}
      />
    </Suspense>
  );
}
