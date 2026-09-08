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

/**
 * 배경 장식용 자동재생 임베드 URL.
 * 홈 영상·DSM 영상처럼 "소리 없이 반복 재생되는 배경"으로 쓰는 경우.
 *
 * cc_load_policy=0 이 없으면 시청자 계정의 자막 설정에 따라 자막이 자동으로
 * 켜지고, 감싸는 요소의 오버스캔(110%)에 걸려 반쯤 잘린 채 표시된다.
 */
export function getBackgroundEmbedUrl(id: string, extra = ""): string {
  const params = [
    "autoplay=1",
    "mute=1",
    "loop=1",
    `playlist=${id}`, // loop=1 은 playlist 가 있어야 동작
    "controls=0",
    "rel=0",
    "modestbranding=1",
    "showinfo=0",
    "iv_load_policy=3", // 주석(annotation) 숨김
    "cc_load_policy=0", // 자막 자동 표시 끔
    "disablekb=1",
    "fs=0",
    "playsinline=1",
  ].join("&");
  return `https://www.youtube.com/embed/${id}?${params}${extra}`;
}

/** YouTube 썸네일 URL 생성 */
export function getYouTubeThumbnail(
  videoId: string,
  quality: "maxresdefault" | "hqdefault" | "mqdefault" = "mqdefault",
): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}
