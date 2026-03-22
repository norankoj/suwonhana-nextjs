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
  return (
    <button
      onClick={onClick}
      className={`text-left p-5 md:p-6 rounded-xl border-2 transition-all duration-200 w-full ${
        isSelected
          ? "border-blue-600 bg-blue-600 shadow-lg scale-[1.02]"
          : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md"
      }`}
    >
      <span
        className={`text-2xl font-light font-serif block mb-3 ${
          isSelected ? "text-blue-200" : "text-slate-300"
        }`}
      >
        {index < 10 ? `0${index}` : index}.
      </span>
      <h3
        className={`text-base md:text-lg font-bold leading-snug mb-2 break-keep ${
          isSelected ? "text-white" : "text-slate-900"
        }`}
      >
        {item.title}
      </h3>
      <p
        className={`text-xs md:text-sm leading-relaxed break-keep ${
          isSelected ? "text-blue-200" : "text-slate-500"
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
  return (
    <div
      className={`grid transition-all duration-500 ease-in-out ${
        item ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        {item && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="text-3xl font-light font-serif text-blue-600 block mb-2">
                  {index !== null && (index < 10 ? `0${index}` : index)}.
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-slate-500 mt-1">{item.sub}</p>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 transition-colors ml-4 mt-1 shrink-0"
              >
                <X size={24} />
              </button>
            </div>

            <div className="text-sm md:text-base text-slate-700 leading-loose break-keep space-y-8">
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
                    <strong className="block text-slate-900 font-bold text-base md:text-md leading-snug">
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
  // selected: { part: 1|2, idx: number } | null
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
            <h2 className="text-lg font-bold text-slate-900 tracking-widest uppercase whitespace-nowrap">
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

          {/* Part 1 패널 */}
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
            <h2 className="text-lg font-bold text-slate-900 tracking-widest uppercase whitespace-nowrap">
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

          {/* Part 2 패널 */}
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
