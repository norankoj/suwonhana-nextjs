/** YouTube URL에서 비디오 ID를 추출 */
export function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  let videoId = "";
  if (url.includes("youtu.be/"))
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  else if (url.includes("v=")) videoId = url.split("v=")[1]?.split("&")[0];
  else if (url.includes("/embed/"))
    videoId = url.split("/embed/")[1]?.split("?")[0];
  return videoId || null;
}

/** YouTube 임베드 URL 생성 */
export function getYouTubeEmbedUrl(url?: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

/** YouTube 썸네일 URL 생성 */
export function getYouTubeThumbnail(
  videoId: string,
  quality: "maxresdefault" | "hqdefault" | "mqdefault" = "mqdefault",
): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}
