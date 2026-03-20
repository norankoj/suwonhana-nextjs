"use client";

import React from "react";

export default function IntroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white min-h-screen">
      <div className="w-full flex flex-col">{children}</div>
    </div>
  );
}
