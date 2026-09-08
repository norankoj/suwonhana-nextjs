/** 날짜 문자열을 YYYY.MM.DD 포맷으로 변환 */
export function formatDate(dateString: string): string {
  const d = new Date(dateString);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

/** WordPress 제목에서 HTML 엔티티를 정리하고 핵심 제목만 추출 */
export function getCleanTitle(rawTitle: string): string {
  if (!rawTitle) return "";

  let title = rawTitle
    .replace(/&#8211;/g, "-")
    .replace(/&#8212;/g, "-")
    .replace(/&nbsp;/g, " ");

  const parts = title.split(/[-–—]/);
  let mainTitle = parts.length > 1 ? parts[parts.length - 1] : title;
  mainTitle = mainTitle.replace(/\s*\([^)]*\)\s*$/, "");

  return mainTitle.trim();
}

/** HTML 태그 제거 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, "");
}

/** WordPress HTML 엔티티 디코딩 */
export function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

/**
 * ACF 텍스트 영역에 손으로 입력한 JSON을 파싱한다.
 * 한글/워드에서 붙여넣으면 따옴표가 둥근 따옴표(" " ' ')로 바뀌어
 * JSON.parse가 실패하므로 곧은 따옴표로 되돌린 뒤 파싱한다.
 * 실패 시 예외 대신 fallback을 반환해 페이지가 죽지 않게 한다.
 */
export function parseAcfJson<T>(raw: string | null | undefined, fallback: T, label = "JSON"): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(
      raw.replace(/[\u201C\u201D]/g, '"').replace(/[\u2018\u2019]/g, "'"),
    ) as T;
  } catch (e) {
    console.error(`[${label}] 파싱 실패 — WP 관리자에서 JSON 문법을 확인하세요:`, e);
    return fallback;
  }
}
