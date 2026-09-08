/**
 * 워드프레스 API 기준 주소.
 *
 * 우선순위
 *   1. NEXT_PUBLIC_WORDPRESS_DOMAIN — 명시 설정 (로컬 개발)
 *   2. 브라우저면 현재 접속 주소 — 스냅샷 배포에서 자기 자신의 /wp-json 을 봄
 *   3. Vercel 이면 배포 주소
 *   4. 로컬 기본값
 *
 * 2·3 덕분에 스냅샷 배포는 환경변수를 하나도 설정하지 않아도 동작한다.
 * (예전에는 "http://suwonhana.local" 이 폴백이라, 환경변수를 빠뜨리면
 *  배포본이 존재하지 않는 로컬 도메인을 찾아가 빈 화면이 됐다.)
 */
export function wpBase(): string {
  const env = process.env.NEXT_PUBLIC_WORDPRESS_DOMAIN;
  if (env) return env.replace(/\/$/, "");
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

/** GraphQL 엔드포인트 */
export function wpGraphqlUrl(): string {
  return process.env.NEXT_PUBLIC_WORDPRESS_API_URL || `${wpBase()}/graphql`;
}
