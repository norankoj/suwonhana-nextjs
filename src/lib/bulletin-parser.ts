export interface BulletinAnnouncement {
  title: string;
  body: string;
  bullets: string[];
}

export interface PastorSchedule {
  date: string;
  event: string;
}

export interface PastorEntry {
  name: string;
  intro: string;
  schedules: PastorSchedule[];
}

export interface GeneralNewsItem {
  content: string; // <b> 태그 포함 HTML
  type: "birth" | "death" | "marriage" | "prayer" | "general";
}

export interface BulletinData {
  announcements: BulletinAnnouncement[];
  pastors: PastorEntry[];
  generalNews: GeneralNewsItem[];
}

// HTML 태그 제거 유틸
function stripTags(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

// <b>/<strong> 태그만 보존하고 나머지 HTML 제거
function preserveBold(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<\/(strong|b)>/gi, "</b>")
    .replace(/<(strong|b)[^>]*>/gi, "<b>")
    .replace(/<(?!\/?b>)[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function classifyNewsType(plain: string): GeneralNewsItem["type"] {
  if (/소천/.test(plain)) return "death";
  if (/결혼|혼례|혼인/.test(plain)) return "marriage";
  if (/주셨습니다|태명|딸|아들/.test(plain)) return "birth";
  if (/기도해|위해/.test(plain)) return "prayer";
  return "general";
}

// 교인동정 파싱 — content는 <b> 태그 포함 HTML
function parseMemberText(text: string): Pick<BulletinData, "pastors" | "generalNews"> {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const pastors: PastorEntry[] = [];
  const generalNews: GeneralNewsItem[] = [];
  let currentPastor: PastorEntry | null = null;

  for (const line of lines) {
    if (!line.startsWith("●")) continue;
    const content = line.slice(1).trim();
    const plain = content.replace(/<[^>]+>/g, ""); // 정규식 매칭용 순수 텍스트

    // 목사 항목
    const pastorMatch = plain.match(/^(.+?\s목사)\s+(.+)$/);
    if (pastorMatch) {
      currentPastor = {
        name: pastorMatch[1].trim(),
        intro: pastorMatch[2].trim(),
        schedules: [],
      };
      pastors.push(currentPastor);
      continue;
    }

    // 일정 항목: "1/19(월) ..."
    if (currentPastor && /^\d+\/\d+/.test(plain)) {
      const schedMatch = plain.match(/^(.+?)\s{2,}(.+)$/) || plain.match(/^(.+?)\s+(.+)$/);
      if (schedMatch) {
        currentPastor.schedules.push({
          date: schedMatch[1].trim(),
          event: schedMatch[2].trim(),
        });
      } else {
        currentPastor.schedules.push({ date: plain, event: "" });
      }
      continue;
    }

    // 일반 교인동정 — content는 <b> 태그 포함 HTML로 저장
    currentPastor = null;
    generalNews.push({ content, type: classifyNewsType(plain) });
  }

  return { pastors, generalNews };
}

// ─── 메인 파서: WP HTML (table 또는 text) ───────────────────────────
export function parseBulletinHtml(html: string): BulletinData {
  const announcements: BulletinAnnouncement[] = [];
  let memberSectionText = "";

  if (/<table/i.test(html)) {
    let memberMode = false;
    const memberLines: string[] = [];

    const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    let match: RegExpExecArray | null;

    while ((match = tdRegex.exec(html)) !== null) {
      const tdHtml = match[1];
      const rawText = stripTags(tdHtml).replace(/[ \t]+/g, " ").trim();

      if (!rawText || rawText.length < 2) continue;

      // 교인동정: TD 전체 내용이 "교인동정"으로 시작 (헤더+내용이 한 TD에)
      if (/^교인동정/.test(rawText)) {
        memberMode = true;
        // <b> 태그 보존 버전으로 추출
        const boldText = preserveBold(tdHtml).replace(/[ \t]+/g, " ");
        const after = boldText.replace(/^교인동정\s*/, "");
        if (after) memberLines.push(...after.split("\n").map((l) => l.trim()).filter(Boolean));
        continue;
      }

      // 짧은 교인동정 헤더 TD
      if (/교인동정|▷|▶/.test(rawText) && rawText.length < 20) {
        memberMode = true;
        continue;
      }

      if (memberMode) {
        const boldText = preserveBold(tdHtml).replace(/[ \t]+/g, " ");
        memberLines.push(...boldText.split("\n").map((l) => l.trim()).filter(Boolean));
        continue;
      }

      // 제목: <b>/<strong> 태그 — 첫 번째 <p> 이전의 모든 bold 텍스트 합침
      const prePara = tdHtml.split(/<p[\s>]/i)[0];
      const boldParts: string[] = [];
      const boldRe = /<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>/gi;
      let bm: RegExpExecArray | null;
      while ((bm = boldRe.exec(prePara)) !== null) {
        const t = stripTags(bm[1]).trim();
        if (t) boldParts.push(t);
      }
      const title = boldParts.join(" ").trim();

      const lines = rawText.split("\n").map((l) => l.trim()).filter(Boolean);
      const bullets: string[] = [];
      const bodyParts: string[] = [];

      for (const pt of lines) {
        if (pt.startsWith("●") || pt.startsWith("✓") || pt.startsWith("•")) {
          bullets.push(pt.replace(/^[●✓•]\s*/, ""));
        } else {
          const cleaned = title ? pt.replace(title, "").trim() : pt;
          if (cleaned) bodyParts.push(cleaned);
        }
      }

      if (bodyParts.length === 0 && bullets.length > 0) {
        if (announcements.length > 0) {
          announcements[announcements.length - 1].bullets.push(...bullets);
        }
        continue;
      }

      if (title || bodyParts.length > 0) {
        announcements.push({ title, body: bodyParts.join("\n"), bullets });
      }
    }

    memberSectionText = memberLines.join("\n");
  } else {
    // ── text / pre 형식 (기존 방식) ──
    const text = extractTextFromHtml(html);
    const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
    let inMember = false;
    const memberLines: string[] = [];
    let currentAnnouncement: BulletinAnnouncement | null = null;

    for (const line of lines) {
      if (/교인동정|▷|▶/.test(line)) { inMember = true; continue; }
      if (inMember) { memberLines.push(line); continue; }

      if (line.startsWith("●")) {
        if (currentAnnouncement) currentAnnouncement.bullets.push(line.slice(1).trim());
      } else {
        if (currentAnnouncement) announcements.push(currentAnnouncement);
        const dateMatch = line.match(/^(.{3,25}?)\s+(\d{1,2}\/\d{1,2}.+)$/);
        const spaceMatch = line.match(/^(.+?)\s{3,}(.+)$/);
        const [title, body] = spaceMatch
          ? [spaceMatch[1].trim(), spaceMatch[2].trim()]
          : dateMatch
          ? [dateMatch[1].trim(), dateMatch[2].trim()]
          : ["", line];
        currentAnnouncement = { title, body, bullets: [] };
      }
    }
    if (currentAnnouncement) announcements.push(currentAnnouncement);
    memberSectionText = memberLines.join("\n");
  }

  // 교인동정 파싱
  const { pastors, generalNews } = parseMemberText(
    memberSectionText
      .split("\n")
      .map((l) => {
        const stripped = l.replace(/<[^>]+>/g, "");
        return stripped.startsWith("●") ? l : "● " + l;
      })
      .join("\n"),
  );

  return { announcements, pastors, generalNews };
}

// ─── 레거시: text 직접 파싱 (fallback) ───────────────────────────────
export function parseBulletinText(text: string): BulletinData {
  return parseBulletinHtml(text);
}

export function extractTextFromHtml(html: string): string {
  const preMatch = html.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i);
  const raw = preMatch ? preMatch[1] : html;
  return stripTags(raw);
}
