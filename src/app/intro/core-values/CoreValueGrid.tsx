"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface CoreValueItem {
  title: string;
  sub: string;
  desc: string;
}

interface Props {
  part1Title: string;
  part2Title: string;
  part1Items: CoreValueItem[];
  part2Items: CoreValueItem[];
}

function ValueCard({
  item,
  index,
  isSelected,
  onClick,
}: {
  item: CoreValueItem;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  const numStr = index < 10 ? `0${index}` : `${index}`;

  return (
    <button
      onClick={onClick}
      className={`text-left p-5 md:p-6 rounded-xl border-2 transition-all duration-200 w-full ${
        isSelected
          ? "border-slate-900 bg-slate-900 shadow-lg scale-[1.02]"
          : "border-slate-200 bg-white hover:border-slate-400 hover:shadow-md"
      }`}
    >
      {/* 숫자 + 제목 한 줄 */}
      <div className="flex items-baseline gap-2 mb-2">
        <span
          className={`text-sm font-mono font-medium shrink-0 ${
            isSelected ? "text-slate-400" : "text-slate-300"
          }`}
        >
          {numStr}.
        </span>
        <h3
          className={`text-sm md:text-base font-bold leading-snug break-keep ${
            isSelected ? "text-white" : "text-slate-900"
          }`}
        >
          {item.title}
        </h3>
      </div>

      {/* 부제 */}
      <p
        className={`text-xs md:text-sm leading-relaxed break-keep ${
          isSelected ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {item.sub}
      </p>
    </button>
  );
}

function DetailPanel({
  item,
  index,
  onClose,
}: {
  item: CoreValueItem | null;
  index: number | null;
  onClose: () => void;
}) {
  const numStr =
    index !== null ? (index < 10 ? `0${index}` : `${index}`) : "";

  return (
    <div
      className={`grid transition-all duration-500 ease-in-out ${
        item ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        {item && (
          <div className="bg-[#F8F9FA] border border-slate-100 rounded-2xl p-6 md:p-10">
            {/* 패널 헤더 */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-3xl font-mono font-light text-slate-300">
                    {numStr}.
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-slate-500 mt-1 ml-[2.75rem]">{item.sub}</p>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-700 transition-colors ml-4 mt-1 shrink-0"
              >
                <X size={22} />
              </button>
            </div>

            {/* 본문 */}
            <div className="text-sm md:text-base text-slate-700 leading-loose break-keep space-y-8 border-t border-slate-200 pt-8">
              {item.desc?.split(/\n\s*\n/).map((block, bIdx) => {
                if (!block.trim()) return null;
                const lines = block
                  .split("\n")
                  .filter((line) => line.trim() !== "");
                if (lines.length === 0) return null;
                const titleLine = lines[0];
                const descLines = lines.slice(1);
                return (
                  <div key={bIdx} className="space-y-2">
                    <strong className="block text-slate-900 font-bold text-base leading-snug">
                      {titleLine.trim()}
                    </strong>
                    {descLines.map((line, lIdx) => (
                      <p key={lIdx} className="text-slate-600 text-base">
                        {line.trim()}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CoreValueGrid({
  part1Title,
  part2Title,
  part1Items,
  part2Items,
}: Props) {
  const [selected, setSelected] = useState<{
    part: 1 | 2;
    idx: number;
  } | null>(null);

  const handleSelect = (part: 1 | 2, idx: number) => {
    if (selected?.part === part && selected?.idx === idx) {
      setSelected(null);
    } else {
      setSelected({ part, idx });
    }
  };

  const selectedItem =
    selected?.part === 1
      ? part1Items[selected.idx]
      : selected?.part === 2
        ? part2Items[selected.idx]
        : null;

  const selectedIndex =
    selected?.part === 1
      ? selected.idx + 1
      : selected?.part === 2
        ? part1Items.length + selected.idx + 1
        : null;

  return (
    <div className="space-y-12">
      {/* Part 1 */}
      {part1Items.length > 0 && (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-sm font-bold text-slate-400 tracking-widest uppercase whitespace-nowrap">
              {part1Title}
            </h2>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
            {part1Items.map((item, idx) => (
              <ValueCard
                key={idx}
                item={item}
                index={idx + 1}
                isSelected={selected?.part === 1 && selected?.idx === idx}
                onClick={() => handleSelect(1, idx)}
              />
            ))}
          </div>

          {selected?.part === 1 && (
            <DetailPanel
              item={selectedItem}
              index={selectedIndex}
              onClose={() => setSelected(null)}
            />
          )}
        </div>
      )}

      {/* Part 2 */}
      {part2Items.length > 0 && (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-sm font-bold text-slate-400 tracking-widest uppercase whitespace-nowrap">
              {part2Title}
            </h2>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
            {part2Items.map((item, idx) => (
              <ValueCard
                key={idx}
                item={item}
                index={part1Items.length + idx + 1}
                isSelected={selected?.part === 2 && selected?.idx === idx}
                onClick={() => handleSelect(2, idx)}
              />
            ))}
          </div>

          {selected?.part === 2 && (
            <DetailPanel
              item={selectedItem}
              index={selectedIndex}
              onClose={() => setSelected(null)}
            />
          )}
        </div>
      )}
    </div>
  );
}
