import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.aladin.co.kr", // 알라딘 이미지 (담임목사 저서 표지)
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.godpeople.com", // 갓피플 이미지 (담임목사 저서 표지)
      },
      {
        protocol: "http",
        hostname: "suwonhana.local", // 여기에 로컬 도메인 추가
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // 기존에 쓰던 이미지용
      },
      {
        protocol: "https",
        hostname: "img.youtube.com", // YouTube 썸네일
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com", // YouTube 썸네일 (대체 도메인)
      },
      // 나중에 실제 도메인 연결하면 그것도 추가해야 함
      // { protocol: 'https', hostname: 'suwonhana.org' },
    ],
  },

  // 스냅샷 배포용: /wp-json, /graphql 라우트가 런타임에 fs 로 읽는 디렉터리라
  // 명시하지 않으면 Vercel 번들에 포함되지 않아 배포본이 빈 화면이 된다.
  outputFileTracingIncludes: {
    "/wp-json/[...path]": ["./fixtures/**/*"],
    "/graphql": ["./fixtures/**/*"],
  },
};

export default nextConfig;
