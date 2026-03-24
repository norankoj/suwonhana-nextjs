import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/Layout";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://suwonhana.org";

export const metadata: Metadata = {
  title: {
    default: "수원하나교회",
    template: "%s | 수원하나교회",
  },
  description: "하나님을 즐거워하고 그 분의 목적에 헌신하는 공동체 — 수원하나교회",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "수원하나교회",
    title: "수원하나교회",
    description: "하나님을 즐거워하고 그 분의 목적에 헌신하는 공동체",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
