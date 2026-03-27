"use client";

import React, { useState } from "react";
import { Copy, CheckCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

const ACCOUNTS = [
  { label: "십일조/감사", bank: "농협", num: "468001-01-318042" },
  { label: "선교헌금",    bank: "농협", num: "422001-04-084939" },
  { label: "건축헌금",    bank: "우리", num: "920301-01-563418" },
  { label: "DA",          bank: "우리", num: "920301-01-563450" },
  { label: "난민사역후원", bank: "우리", num: "920301-01-512487" },
  { label: "구제헌금",    bank: "우리", num: "920301-01-027154" },
];

export default function DonationPage() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (num: string, idx: number) => {
    navigator.clipboard.writeText(num).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-4 py-4 flex items-center gap-3">
        <Link
          href="/"
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="뒤로가기"
        >
          <ArrowLeft size={20} className="text-slate-700" />
        </Link>
        <h1 className="text-base font-bold text-slate-900">헌금 계좌 안내</h1>
      </div>

      <div className="px-4 py-6 max-w-lg mx-auto">
        {/* 예금주 */}
        <div className="flex items-center justify-between bg-white rounded-2xl px-5 py-4 mb-4 shadow-sm">
          <span className="text-sm text-slate-500">예금주</span>
          <span className="font-bold text-slate-900">수원하나교회</span>
        </div>

        {/* 안내 문구 */}
        <p className="text-xs text-slate-400 text-center mb-5">
          계좌번호를 탭하면 복사됩니다
        </p>

        {/* 계좌 목록 */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-slate-100">
          {ACCOUNTS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleCopy(item.num, idx)}
              className="w-full flex items-center justify-between px-5 py-4 active:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-6 rounded-md bg-slate-100 text-[10px] font-bold text-slate-500 shrink-0">
                  {item.bank}
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-slate-500">
                  {item.num}
                </span>
                {copiedIdx === idx ? (
                  <CheckCheck size={14} className="text-green-500 shrink-0" />
                ) : (
                  <Copy size={14} className="text-slate-300 shrink-0" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* 구분선 */}
        <div className="my-6 border-t border-slate-200" />

        {/* 기부금 영수증 */}
        <div className="bg-white rounded-2xl shadow-sm px-5 py-5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
            Tax Deduction
          </p>
          <h2 className="text-base font-bold text-slate-900 mb-1">
            기부금 영수증 신청
          </h2>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            연말정산용 기부금 영수증을 온라인으로 신청하실 수 있습니다.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfD5f0YpO6Y1b9Z6U6Yz4k3n8FQ1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1ZQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors w-full justify-center"
          >
            영수증 발급 신청하기
          </a>
        </div>
      </div>
    </div>
  );
}
