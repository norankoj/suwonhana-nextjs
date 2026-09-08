import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // 1. 모노크롬 기반 컬러 시스템
      colors: {
        // 본문 텍스트 위계 (globals.css의 h1~p 기본 스타일이 사용)
        dark: {
          DEFAULT: "#0f172a", // slate-900 (진한 제목)
          medium: "#334155", // slate-700 (본문)
          light: "#64748b", // slate-500 (설명글)
        },
        // 브랜드 액센트 — 교회 상징색을 바꾸려면 이 한 줄만 교체하면
        // accent-50 ~ accent-900 전체가 따라 바뀜 (예: colors.sky)
        accent: colors.blue,
      },
      // 2. 폰트 설정
      fontFamily: {
        sans: ["Pretendard Variable", "Pretendard", "sans-serif"],
      },
      // 3. Fluid 타이포그래피
      fontSize: {
        "fluid-xs": [
          "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
          { lineHeight: "1.5" },
        ],
        "fluid-sm": [
          "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)",
          { lineHeight: "1.6" },
        ],
        "fluid-base": [
          "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
          { lineHeight: "1.7" },
        ],
        "fluid-lg": [
          "clamp(1.125rem, 1rem + 0.6vw, 1.5rem)",
          { lineHeight: "1.5" },
        ],
        "fluid-xl": [
          "clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem)",
          { lineHeight: "1.3" },
        ],
        "fluid-2xl": [
          "clamp(2rem, 1.5rem + 2.5vw, 3.5rem)",
          { lineHeight: "1.2" },
        ],
      },
      // 4. 추가 유틸리티
      maxWidth: {
        content: "1280px",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out 0.2s forwards",
        shimmer: "shimmer 1.4s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
