import React from "react";

// ==========================================
// 1. WPGraphQL 통신을 위한 fetch 함수
// ==========================================
async function getVisionData() {
  const query = `
    query GetVisionPage {
      page(id: "비전-및-사역", idType: URI) {
        visionFields {
          mainTitle
          visionStatement # 추가된 영문 타이틀
          
          value1Title
          value1Desc
          value1Verse     # 추가된 성경 구절
          value1Image {   # 추가된 이미지
            node {
              sourceUrl
            }
          }
          
          value2Title
          value2Desc
          value2Verse
          value2Image {
            node {
              sourceUrl
            }
          }
          
          value3Title
          value3Desc
          value3Verse
          value3Image {
            node {
              sourceUrl
            }
          }
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

export default async function VisionPage() {
  // ==========================================
  // 2. 서버에서 데이터 페칭
  // ==========================================
  const pageData = await getVisionData();

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        워드프레스 데이터를 불러올 수 없습니다. GraphQL 엔드포인트와 필드명을
        확인해 주세요.
      </div>
    );
  }

  const fields = pageData.visionFields || {};

  // 메인 타이틀 & 영문 서브타이틀 (데이터가 없을 때 기존 텍스트 유지)
  const mainTitleText =
    fields.mainTitle || "하나님을 즐거워하고\n그 분의 목적에 헌신하는 공동체";
  const visionStatementText = fields.visionStatement || "Vision Statement";

  // 워드프레스 이미지 객체에서 URL만 안전하게 뽑아내는 헬퍼 함수
  const getImageUrl = (imageField: any, fallbackIndex: number) => {
    // WPGraphQL에서 가져온 이미지 URL 반환
    if (imageField?.node?.sourceUrl) return imageField.node.sourceUrl;

    // 이미지를 등록하지 않았을 경우 기존 디자인 유지를 위한 기본 이미지
    const fallbacks = [
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ];
    return fallbacks[fallbackIndex];
  };

  const vision = [
    {
      title: fields.value1Title,
      desc: fields.value1Desc,
      verse: fields.value1Verse,
      image: getImageUrl(fields.value1Image, 0),
    },
    {
      title: fields.value2Title,
      desc: fields.value2Desc,
      verse: fields.value2Verse,
      image: getImageUrl(fields.value2Image, 1),
    },
    {
      title: fields.value3Title,
      desc: fields.value3Desc,
      verse: fields.value3Verse,
      image: getImageUrl(fields.value3Image, 2),
    },
  ].filter((item) => item.title); // 타이틀이 입력된 것만 화면에 렌더링

  return (
    <div className="bg-white pb-32">
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center border-b border-slate-100">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] mb-6">
          {visionStatementText}
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.45] tracking-normal">
          {mainTitleText
            .split(/<br\s*\/?>|\n/i)
            .map((line: string, i: number, array: string[]) => (
              <React.Fragment key={i}>
                {line.trim()}
                {i < array.length - 1 && <br />}
              </React.Fragment>
            ))}
        </h1>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex flex-col gap-24 md:gap-32">
          {vision?.map((item: any, idx: number) => {
            const index = idx + 1;
            const mainText = item.desc || "";
            const isEven = idx % 2 === 0;

            return (
              <div
                key={`vision-${idx}`}
                className={`flex flex-col md:flex-row gap-10 md:gap-16 items-center ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                <div className="w-full md:w-1/2">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <span className="text-blue-600 font-bold tracking-widest text-sm mb-4 uppercase">
                    Vision 0{index}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                    {item.title}
                  </h3>

                  <div className="text-lg text-slate-600 leading-loose text-justify mb-8 space-y-4">
                    {mainText
                      .split("\n")
                      .map((paragraph: string, pIdx: number) => {
                        if (!paragraph.trim()) return null;
                        return <p key={pIdx}>{paragraph}</p>;
                      })}
                  </div>

                  {item.verse && (
                    <div className="relative bg-slate-50 rounded-sm p-6 pr-8">
                      <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed text-justify whitespace-pre-wrap">
                        "{item.verse}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
