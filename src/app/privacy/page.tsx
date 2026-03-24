import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="pt-28 pb-8 border-b border-slate-100">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-fluid-2xl font-extrabold text-slate-900">
            개인정보처리방침
          </h1>
        </div>
      </div>
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              1. 개인정보의 수집 및 이용 목적
            </h2>
            <p>
              수원하나교회는 교회 행정, 심방, 새가족 등록, 상담 예약 등의
              목적으로 필요한 최소한의 개인정보를 수집하고 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              2. 수집하는 개인정보 항목
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>이름, 연락처 (전화번호)</li>
              <li>상담 예약 시: 상담 내용, 예약 일시</li>
              <li>새가족 등록 시: 주소, 생년월일</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              3. 개인정보의 보유 및 이용 기간
            </h2>
            <p>
              수집된 개인정보는 수집 목적이 달성된 후 지체 없이 파기합니다.
              다만, 관련 법령에 의해 보존할 필요가 있는 경우 해당 법령에서 정한
              기간 동안 보관합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              4. 개인정보의 제3자 제공
            </h2>
            <p>
              수원하나교회는 수집한 개인정보를 제3자에게 제공하지 않습니다.
              다만, 법률에 의해 요구되는 경우는 예외로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              5. 개인정보 보호 책임자
            </h2>
            <p>
              개인정보 보호에 관한 문의사항은 아래 연락처로 문의해 주시기
              바랍니다.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl mt-3">
              <p className="text-sm text-slate-600">
                수원하나교회
                <br />
                Tel: 031-202-0697
                <br />
                주소: (17103) 경기도 용인시 기흥구 서그내로 16번길 11-6
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
