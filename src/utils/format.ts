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
