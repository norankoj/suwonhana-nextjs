import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // 1. 색상 변수 (Semantic Colors)
      // sky-600, slate-900 대신 의미있는 이름(brand, text-main)을 씁니다.
      colors: {
        brand: {
          DEFAULT: "#0284c7", // 기존 sky-600 (메인 컬러)
          light: "#e0f2fe", // 기존 sky-100 (배경용 연한색)
          dark: "#0369a1", // 기존 sky-700 (버튼 호버용)
        },
        dark: {
          DEFAULT: "#0f172a", // 기존 slate-900 (진한 제목)
          medium: "#334155", // 기존 slate-700 (본문)
          light: "#64748b", // 기존 slate-500 (설명글)
        },
      },
      // 2. 폰트 설정
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out 0.2s forwards",
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
      },
    },
  },
  plugins: [],
};
export default config;
