import React from "react";
import CoreValueAccordion from "./CoreValueAccordion";

async function getCoreValuesData() {
  const query = `
    query GetCoreValuesPage {
      page(id: "핵심가치", idType: URI) {
        coreValueFields {
          valueStatement 
          mainTitle
          subDesc
          part1Title
          part2Title
          value1Title
          value1Sub
          value1Desc
          value2Title
          value2Sub
          value2Desc
          value3Title
          value3Sub
          value3Desc
          value4Title
          value4Sub
          value4Desc
          value5Title
          value5Sub
          value5Desc
          value6Title
          value6Sub
          value6Desc
          value7Title
          value7Sub
          value7Desc
          value8Title
          value8Sub
          value8Desc
          value9Title
          value9Sub
          value9Desc
          value10Title
          value10Sub
          value10Desc
          value11Title
          value11Sub
          value11Desc
          value12Title
          value12Sub
          value12Desc
        }
      }
    }
  `;

  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) throw new Error("Network response was not ok");
    const json = await res.json();
    return json.data?.page;
  } catch (error) {
    console.error("WPGraphQL Fetch Error:", error);
    return null;
  }
}

export default async function CoreValuesPage() {
  const pageData = await getCoreValuesData();

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        워드프레스 데이터를 불러올 수 없습니다. GraphQL 설정을 확인해 주세요.
      </div>
    );
  }

  const fields = pageData.coreValueFields || {};

  // 타이틀 기본값 세팅
  const valueStatementText = fields.valueStatement || "Value Statement"; // 워드프레스 데이터 연동
  const mainTitle = fields.mainTitle || "핵심가치들";
  const subDesc =
    fields.subDesc ||
    "수원하나교회는 다음의 12가지 가치들을 중요하게 여깁니다.";
  const part1Title = fields.part1Title || "Part 1. 6가지 핵심가치";
  const part2Title = fields.part2Title || "Part 2. 6가지 핵심가치";

  // 워드프레스에서 받아온 낱개 데이터들을 Part 1(1~6)과 Part 2(7~12) 배열로 재구성
  const coreValuePart1 = [
    {
      title: fields.value1Title,
      sub: fields.value1Sub,
      desc: fields.value1Desc,
    },
    {
      title: fields.value2Title,
      sub: fields.value2Sub,
      desc: fields.value2Desc,
    },
    {
      title: fields.value3Title,
      sub: fields.value3Sub,
      desc: fields.value3Desc,
    },
    {
      title: fields.value4Title,
      sub: fields.value4Sub,
      desc: fields.value4Desc,
    },
    {
      title: fields.value5Title,
      sub: fields.value5Sub,
      desc: fields.value5Desc,
    },
    {
      title: fields.value6Title,
      sub: fields.value6Sub,
      desc: fields.value6Desc,
    },
  ].filter((item) => item.title); // 데이터가 있는 것만 남김

  const coreValuePart2 = [
    {
      title: fields.value7Title,
      sub: fields.value7Sub,
      desc: fields.value7Desc,
    },
    {
      title: fields.value8Title,
      sub: fields.value8Sub,
      desc: fields.value8Desc,
    },
    {
      title: fields.value9Title,
      sub: fields.value9Sub,
      desc: fields.value9Desc,
    },
    {
      title: fields.value10Title,
      sub: fields.value10Sub,
      desc: fields.value10Desc,
    },
    {
      title: fields.value11Title,
      sub: fields.value11Sub,
      desc: fields.value11Desc,
    },
    {
      title: fields.value12Title,
      sub: fields.value12Sub,
      desc: fields.value12Desc,
    },
  ].filter((item) => item.title);

  return (
    <div className="bg-white pb-32">
      {/* 1. 페이지 헤더 */}
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] mb-6">
          {valueStatementText}
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.45] tracking-normal mb-8">
          {mainTitle}
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium break-keep whitespace-pre-wrap">
          {subDesc}
        </p>
      </section>

      {/* 2. 핵심가치 아코디언 리스트 */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        {/* Part 1 */}
        {coreValuePart1.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-lg font-bold text-slate-900 tracking-widest uppercase">
                {part1Title}
              </h2>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            <div className="border-t border-slate-900">
              {coreValuePart1.map((item, idx) => (
                <CoreValueAccordion key={idx} item={item} index={idx + 1} />
              ))}
            </div>
          </div>
        )}

        {/* Part 2 */}
        {coreValuePart2.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-lg font-bold text-slate-900 tracking-widest uppercase">
                {part2Title}
              </h2>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            <div className="border-t border-slate-900">
              {coreValuePart2.map((item, idx) => (
                <CoreValueAccordion
                  key={idx}
                  item={item}
                  index={coreValuePart1.length + idx + 1}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
