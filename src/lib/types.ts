// ==========================================
// WordPress 데이터 타입 정의
// ==========================================

// --- REST API 타입 ---

export interface WPSermon {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
  sermon_meta?: {
    video_url?: string;
    audio_url?: string;
    speaker?: string;
    tags?: string[];
    scripture?: string;
    clean_title?: string;
  };
}

export interface WPSlide {
  title: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
  custom_meta?: {
    caption?: string;
    link?: string;
    button_text?: string;
  };
}

export interface WPTaxonomyItem {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// --- GraphQL 타입 ---

export interface VisionFields {
  mainTitle: string;
  visionStatement: string;
  value1Title?: string;
  value1Desc?: string;
  value1Verse?: string;
  value1Image?: WPImageField;
  value2Title?: string;
  value2Desc?: string;
  value2Verse?: string;
  value2Image?: WPImageField;
  value3Title?: string;
  value3Desc?: string;
  value3Verse?: string;
  value3Image?: WPImageField;
}

export interface WPImageField {
  node: { sourceUrl: string };
}

export interface ServingFields {
  pastorName: string;
  pastorBio: string;
  pastorHistory: string;
  booksJson: string;
  pastorImage?: WPImageField;
}

export interface StaffFields {
  teamCategory: string | string[];
  staffRole: string;
}

export interface WPStaffNode {
  title: string;
  content: string;
  featuredImage?: { node: { sourceUrl: string } };
  staffFields?: StaffFields;
}

export interface CoreValueFields {
  valueStatement: string;
  mainTitle: string;
  subDesc: string;
  part1Title: string;
  part2Title: string;
  [key: string]: string; // value1Title, value1Sub, value1Desc, ...
}

export interface HistoryFields {
  historyJsonData: string;
}

// --- 공통 UI 타입 ---

export interface VisionItem {
  title: string;
  desc: string;
  verse?: string;
  image: string;
}

export interface CoreValueItem {
  title: string;
  sub: string;
  desc: string;
}

export interface StaffMember {
  name: string;
  role: string;
  desc: string;
  img: string | null;
}

export interface BookItem {
  id?: number;
  title: string;
  desc: string;
  link: string;
  image: string;
  color?: string;
}

export interface HistoryYear {
  year: string;
  events: HistoryEvent[];
}

export interface HistoryEvent {
  date: string;
  content: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  content: string;
  image: string;
}
