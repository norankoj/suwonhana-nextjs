"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group flex flex-col items-center gap-3 text-white/50 hover:text-white transition-all duration-300 mr-2 md:mr-6"
    >
      <div className="p-4 rounded-full border border-white/20 group-hover:border-white/60 group-hover:-translate-y-2 transition-all duration-300 bg-white/5 backdrop-blur-sm shadow-sm cursor-pointer">
        <ArrowUp size={24} strokeWidth={1.5} />
      </div>
      <span className="text-xs font-bold tracking-[0.2em] uppercase">
        Back to Top
      </span>
    </button>
  );
}
