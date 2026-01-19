"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function CounselingApplyPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // 실제로는 여기서 API를 호출하거나 폼 데이터를 처리합니다.
    setTimeout(() => {
      alert("상담 신청이 완료되었습니다. 담당자가 곧 연락드리겠습니다.");
      router.push("/appendages/counseling");
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-lg text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">신청 완료</h2>
          <p className="text-slate-500 mb-8">
            상담 예약이 성공적으로 접수되었습니다.
            <br />
            빠른 시일 내에 연락드리겠습니다.
          </p>
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6 animate-fade-in">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-2">상담 예약 신청</h2>
          <p className="text-slate-300">
            마음의 회복과 치유를 위한 첫 걸음입니다.
          </p>
        </div>
        <div className="p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                성함
              </label>
              <input
                required
                type="text"
                placeholder="홍길동"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                연락처
              </label>
              <input
                required
                type="tel"
                placeholder="010-1234-5678"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                상담 희망 내용 (간략히)
              </label>
              <textarea
                rows={4}
                placeholder="상담받고 싶은 내용을 간략하게 적어주세요."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-sky-500 transition-colors resize-none"
              ></textarea>
            </div>
            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 py-4 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-[2] py-4 rounded-xl bg-sky-600 text-white font-bold hover:bg-sky-700 transition-colors shadow-lg shadow-sky-200"
              >
                예약 신청하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
