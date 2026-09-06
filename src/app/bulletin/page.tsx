import React from "react";
import { Calendar, MapPin, Phone, CreditCard, Heart, Baby } from "lucide-react";
import IntroPageHeader from "@/components/IntroPageHeader";
import {
  parseBulletinText,
  extractTextFromHtml,
  type BulletinAnnouncement,
  type PastorEntry,
  type GeneralNewsItem,
} from "@/lib/bulletin-parser";

const WP_DOMAIN =
  process.env.NEXT_PUBLIC_WORDPRESS_DOMAIN || "http://suwonhana.local";

async function fetchBulletinData(): Promise<string | null> {
  try {
    const res = await fetch(
      `${WP_DOMAIN}/wp-json/wp/v2/pages?slug=bulletin-back&_fields=content`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const pages: { content: { rendered: string } }[] = await res.json();
    if (!pages.length) return null;
    return extractTextFromHtml(pages[0].content.rendered);
  } catch {
    return null;
  }
}

function AnnouncementCard({ item }: { item: BulletinAnnouncement }) {
  const hasBullets = item.bullets.length > 0;

  const dateBullets = item.bullets.filter((b) => /^(일정|일시)/.test(b));
  const venueBullets = item.bullets.filter((b) => /장소/.test(b));
  const accountBullets = item.bullets.filter((b) => /계좌/.test(b));
  const contactBullets = item.bullets.filter((b) => /\[문의/.test(b));
  const otherBullets = item.bullets.filter(
    (b) =>
      !/^(일정|일시)/.test(b) &&
      !/장소/.test(b) &&
      !/계좌/.test(b) &&
      !/\[문의/.test(b),
  );

  return (
    <div className="bg-white border border-slate-100 flex flex-col hover:border-slate-200 hover:shadow-sm transition-all duration-200">
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <h3 className="font-extrabold text-base md:text-lg text-slate-900 mb-2 leading-snug tracking-tight">
          {item.title}
        </h3>
        {item.body && (
          <p className="text-sm text-slate-600 leading-relaxed mb-4 break-keep flex-1">
            {item.body}
          </p>
        )}

        {hasBullets && (
          <div className="border-t border-slate-100 pt-4 space-y-2 mt-auto">
            {dateBullets.map((b, i) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <Calendar size={13} className="text-slate-400 mt-0.5 shrink-0" />
                <span className="text-slate-600">
                  {b.replace(/^(일정|일시):?\s*/, "")}
                </span>
              </div>
            ))}
            {venueBullets.map((b, i) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <MapPin size={13} className="text-slate-400 mt-0.5 shrink-0" />
                <span className="text-slate-600">
                  {b.replace(/^.*장소:?\s*/, "")}
                </span>
              </div>
            ))}
            {accountBullets.map((b, i) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <CreditCard size={13} className="text-slate-400 mt-0.5 shrink-0" />
                <span className="text-slate-600 font-mono text-[11px]">
                  {b.replace(/^.*후원 계좌:?\s*/, "").replace(/^.*계좌:?\s*/, "")}
                </span>
              </div>
            ))}
            {otherBullets.map((b, i) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <span className="text-slate-300 shrink-0 mt-0.5">●</span>
                <span className="text-slate-500">{b}</span>
              </div>
            ))}
            {contactBullets.map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-xs mt-1">
                <Phone size={11} className="text-slate-300 shrink-0" />
                <span className="text-slate-400">
                  {b.replace(/\[문의:?\s*/, "").replace(/\]$/, "")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PastorCard({ pastor }: { pastor: PastorEntry }) {
  return (
    <div className="bg-white border border-slate-100 p-5">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-xs font-bold text-slate-500">
          기도
        </div>
        <div>
          <p className="font-bold text-slate-900 text-sm">{pastor.name}</p>
          <p className="text-xs text-slate-500 mt-0.5">{pastor.intro}</p>
        </div>
      </div>
      {pastor.schedules.length > 0 && (
        <div className="ml-11 space-y-1.5 border-t border-slate-100 pt-3">
          {pastor.schedules.map((s, i) => (
            <div key={i} className="flex items-start gap-3 text-xs">
              <span className="text-slate-400 w-20 shrink-0 tabular-nums">
                {s.date}
              </span>
              <span className="text-slate-600">{s.event}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NewsIcon({ type }: { type: GeneralNewsItem["type"] }) {
  if (type === "birth")
    return <Baby size={15} className="text-pink-400 shrink-0 mt-0.5" />;
  if (type === "death")
    return (
      <span className="text-slate-400 text-xs shrink-0 mt-0.5 font-bold">✝</span>
    );
  if (type === "prayer")
    return <Heart size={15} className="text-slate-400 shrink-0 mt-0.5" />;
  return <span className="text-slate-300 shrink-0 mt-0.5">●</span>;
}

// 폴백: WP 없을 때 예시 데이터
const FALLBACK_TEXT = `임시 성도 총회   1/18(주일) 임시 성도 총회가 주일 2부 예배 후에 있습니다. 회원 분들은 참석해 주시기 바랍니다.
예산 결산을 위한 공동의회   1/25(주일) 예산 결산을 위한 공동의회가 주일 2부 예배 후에 있습니다. 회원 분들은 참석해 주시기 바랍니다.
EM 원주 아웃리치   EM이 원주로 아웃리치를 떠납니다. 많은 영혼들에게 복음이 전해지도록 기도해 주십시오.
● 일정: 1/19(월) ~ 1/21(수) / 후원 계좌: 국민은행 559102-04-095863 Han Elijah
조이랜드 겨울캠프   조이랜드에서 겨울캠프를 진행합니다. 다음세대가 하나님을 알고 예배자로 일어날 수 있도록 기도 부탁드립니다.
● 일정: 1/19(월) ~ 1/21(수) / 장소: NGC 지하 강당
● 후원 계좌: 국민은행 725601-00-004908 하나교회
● [문의: 이원근 전도사 010-7124-5503]
▷ 교인동정
● 고성준 목사   일정과 건강을 위해 기도해 주십시오.
● 1/19(월)   예수교대한성결교회 목회자 동계대학
● 1/24(토)   2026 청년연합 컨퍼런스
● 마예린 자매(청년2부)  1/12(월) 하나님께서 하은이(첫째 딸)를 주셨습니다. 축복해 주십시오.`;

export default async function BulletinPage() {
  const rawText = await fetchBulletinData();
  const data = parseBulletinText(rawText ?? FALLBACK_TEXT);
  const isUsingFallback = !rawText;

  return (
    <div className="bg-white pb-32">
      <IntroPageHeader label="Weekly Bulletin" title="주보 공지" />

      <div className="animate-fade-in max-w-content mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-20">
        {isUsingFallback && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-5 py-3 text-sm text-amber-700">
            워드프레스에서 데이터를 불러올 수 없어 예시 데이터를 표시합니다.
            WP 관리자에서 슬러그 <code className="font-mono bg-amber-100 px-1 rounded">bulletin-back</code> 페이지를 만들고 내용을 입력해 주세요.
          </div>
        )}

        {/* 공지/행사 */}
        {data.announcements.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              공지 및 행사
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.announcements.map((item, i) => (
                <AnnouncementCard key={i} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* 교인동정 */}
        {(data.pastors.length > 0 || data.generalNews.length > 0) && (
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              교인동정
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 목사 기도 카드 */}
              {data.pastors.length > 0 && (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                    기도 요청
                  </p>
                  {data.pastors.map((pastor, i) => (
                    <PastorCard key={i} pastor={pastor} />
                  ))}
                </div>
              )}

              {/* 일반 교인동정 */}
              {data.generalNews.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                    소식
                  </p>
                  <div className="space-y-4">
                    {data.generalNews.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0"
                      >
                        <NewsIcon type={item.type} />
                        <p className="text-sm text-slate-600 leading-relaxed break-keep">
                          {item.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
