import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/Layout";

export const metadata: Metadata = {
  title: "수원하나교회",
  description: "하나님을 즐거워하고 그 분의 목적에 헌신하는 공동체",
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
