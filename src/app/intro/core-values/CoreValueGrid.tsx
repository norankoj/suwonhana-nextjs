"use client";

import React, { useState, useEffect } from "react";
import { X, ArrowLeft } from "lucide-react";

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
      className={`text-center px-4 md:px-5 pt-5 pb-4 md:pt-6 md:pb-5 rounded-xl border transition-all duration-200 w-full bg-white ${
        isSelected
          ? "border-slate-900 shadow-md"
          : "border-slate-200 hover:border-slate-400 hover:shadow-md"
      }`}
    >
      <h3 className="text-lg md:text-xl font-extrabold tracking-tight leading-snug break-keep text-slate-900">
        {item.title}
      </h3>
    </button>
  );
}

function ModalContent({
  item,
  index,
  onClose,
  showClose,
}: {
  item: CoreValueItem;
  index: number;
  onClose: () => void;
  showClose: boolean;
}) {
  const numStr = index < 10 ? `0${index}` : `${index}`;

  return (
    <>
      {/* 헤더 */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-3xl font-serif font-light text-slate-300">
              {numStr}.
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
              {item.title}
            </h3>
          </div>
          <p className="text-slate-500 mt-1 ml-[2.75rem]">{item.sub}</p>
        </div>
        {showClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition-colors ml-4 mt-1 shrink-0"
          >
            <X size={22} />
          </button>
        )}
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
    </>
  );
}

function Modal({
  item,
  index,
  onClose,
}: {
  item: CoreValueItem | null;
  index: number | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!item || index === null) return null;

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
        .modal-slide-up { animation: slideUp 0.28s cubic-bezier(0.32, 0.72, 0, 1); }
        .modal-fade-in  { animation: fadeIn 0.2s ease-out; }
      `}</style>

      {/* ── 모바일: 전체화면 슬라이드업 (새 페이지처럼) ── */}
      <div className="md:hidden fixed inset-0 bg-white z-50 overflow-y-auto modal-slide-up">
        {/* 상단 네비 바 */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 sticky top-0 bg-white z-10">
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 transition-colors p-1 -ml-1"
          >
            <ArrowLeft size={22} />
          </button>
          <span className="font-semibold text-slate-900 text-sm truncate">
            {item.title}
          </span>
        </div>
        <div className="p-6 pb-16">
          <ModalContent item={item} index={index} onClose={onClose} showClose={false} />
        </div>
      </div>

      {/* ── 데스크탑: 중앙 팝업 모달 ── */}
      <div className="hidden md:flex fixed inset-0 z-50 items-center justify-center p-6">
        {/* 백드롭 */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        {/* 모달 패널 */}
        <div className="relative bg-[#F8F9FA] border border-slate-100 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl modal-fade-in">
          {/* 고정 헤더 */}
          <div className="flex items-start justify-between px-8 md:px-10 pt-8 md:pt-10 pb-6 shrink-0">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                {item.title}
              </h3>
              <p className="text-slate-500">{item.sub}</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 transition-colors ml-4 mt-1 shrink-0"
            >
              <X size={22} />
            </button>
          </div>
          {/* 스크롤 영역 */}
          <div className="overflow-y-auto px-8 md:px-10 pb-8 md:pb-10">
            <div className="text-sm md:text-base text-slate-700 leading-loose break-keep space-y-8 border-t border-slate-200 pt-8">
              {item.desc?.split(/\n\s*\n/).map((block, bIdx) => {
                if (!block.trim()) return null;
                const lines = block.split("\n").filter((line) => line.trim() !== "");
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
        </div>
      </div>
    </>
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

  const handleClose = () => setSelected(null);

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
      {/* 모달 */}
      <Modal item={selectedItem} index={selectedIndex} onClose={handleClose} />

      {/* Part 1 */}
      {part1Items.length > 0 && (
        <div>
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-widest uppercase">
              {part1Title}
            </h2>
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
        </div>
      )}

      {/* Part 2 */}
      {part2Items.length > 0 && (
        <div>
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-widest uppercase">
              {part2Title}
            </h2>
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
        </div>
      )}
    </div>
  );
}
