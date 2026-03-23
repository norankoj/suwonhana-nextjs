"use client";

import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answerHtml: string;
}

function Item({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-slate-200 last:border-b">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left"
      >
        <span className="font-bold text-base md:text-lg leading-snug text-slate-900 break-keep">
          <span className="mr-2 text-slate-400 font-normal text-sm">Q.</span>
          {item.question}
        </span>
        {open ? (
          <ChevronUp size={20} className="shrink-0 text-slate-400 mt-0.5" />
        ) : (
          <ChevronDown size={20} className="shrink-0 text-slate-400 mt-0.5" />
        )}
      </button>

      {open && (
        <div className="pb-7 pl-6 pr-2">
          <div
            className="text-slate-600 text-sm md:text-base leading-loose break-keep prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: item.answerHtml }}
          />
        </div>
      )}
    </div>
  );
}

export default function FaqAccordion({ items }: { items: FAQItem[] }) {
  if (items.length === 0) return (
    <p className="text-center text-slate-400 py-20">등록된 FAQ가 없습니다.</p>
  );

  return (
    <div>
      {items.map((item, i) => (
        <Item key={item.id} item={item} index={i} />
      ))}
    </div>
  );
}
