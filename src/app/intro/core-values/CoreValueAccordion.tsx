"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CoreValueAccordion({
  item,
  index,
}: {
  item: any;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-8 text-left group transition-colors"
      >
        <div className="flex items-center gap-6 md:gap-10">
          <span
            className={`text-3xl md:text-4xl font-light font-serif transition-colors duration-300 ${
              isOpen
                ? "text-blue-600"
                : "text-slate-300 group-hover:text-slate-400"
            }`}
          >
            {index < 10 ? `0${index}` : index}.
          </span>
          <div>
            <h3
              className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
                isOpen
                  ? "text-blue-600"
                  : "text-slate-900 group-hover:text-blue-600"
              }`}
            >
              {item.title}
            </h3>
            <p className="text-sm md:text-base text-slate-500 font-medium mt-1">
              {item.sub}
            </p>
          </div>
        </div>

        <div className="shrink-0 ml-4">
          {isOpen ? (
            <ChevronUp className="text-blue-600" size={24} />
          ) : (
            <ChevronDown
              className="text-slate-300 group-hover:text-blue-600 transition-colors"
              size={24}
            />
          )}
        </div>
      </button>

      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 pb-8"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="bg-slate-50 rounded-xl p-6 md:p-10 ml-0 md:ml-[5.5rem]">
            <div className="text-sm md:text-base text-slate-700 leading-loose break-keep space-y-8">
              {item.desc
                ?.split(/\n\s*\n/)
                .map((block: string, bIdx: number) => {
                  if (!block.trim()) return null;

                  const lines = block
                    .split("\n")
                    .filter((line: string) => line.trim() !== "");
                  if (lines.length === 0) return null;

                  const titleLine = lines[0];
                  const descLines = lines.slice(1);

                  return (
                    <div key={bIdx} className="space-y-2">
                      <strong className="block text-slate-900 font-bold text-base md:text-md leading-snug">
                        {titleLine.trim()}
                      </strong>
                      {descLines.map((line: string, lIdx: number) => (
                        <p key={lIdx} className="text-slate-600 text-base">
                          {line.trim()}
                        </p>
                      ))}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
