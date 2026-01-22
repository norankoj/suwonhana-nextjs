import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.aladin.co.kr", // 알라딘 이미지 도메인 허용
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "suwonhana.local", // 여기에 로컬 도메인 추가
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // 기존에 쓰던 이미지용
      },
      // 나중에 실제 도메인 연결하면 그것도 추가해야 함
      // { protocol: 'https', hostname: 'suwonhana.org' },
    ],
  },
};

export default nextConfig;
