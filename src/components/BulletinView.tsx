"use client";

import { Baby, Heart } from "lucide-react";
import type {
  BulletinData,
  BulletinAnnouncement,
  PastorEntry,
  GeneralNewsItem,
} from "@/lib/bulletin-parser";

function AnnouncementRow({ item, index }: { item: BulletinAnnouncement; index: number }) {
  return (
    <div className="grid grid-cols-[2.5rem_1fr] gap-x-5 py-6 border-b border-slate-100 last:border-0">
      <span className="text-sm font-bold text-slate-300 tabular-nums pt-0.5">
        {index + 1}
      </span>
      <div className="space-y-2.5">
        <div className="text-base leading-relaxed break-keep text-slate-700">
          {item.title && (
            <strong className="font-bold text-slate-900">{item.title} </strong>
          )}
          {item.body.split("\n").map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </div>
        {item.bullets.map((b, i) => (
          <p key={i} className="text-base text-slate-500 leading-relaxed break-keep">
            ● {b}
          </p>
        ))}
      </div>
    </div>
  );
}

function PastorRow({ pastor }: { pastor: PastorEntry }) {
  return (
    <div className="py-4 border-b border-slate-100 last:border-0 space-y-2">
      <p className="text-base font-bold text-slate-900">
        {pastor.name}
        <span className="font-normal text-slate-500 text-sm ml-3">{pastor.intro}</span>
      </p>
      {pastor.schedules.map((s, i) => (
        <p key={i} className="text-base text-slate-500">
          <span className="tabular-nums mr-4 text-base text-slate-500">{s.date}</span>
          {s.event}
        </p>
      ))}
    </div>
  );
}

function GeneralRow({ item }: { item: GeneralNewsItem }) {
  const icon =
    item.type === "birth" ? (
      <Baby size={15} className="text-pink-400 shrink-0 mt-0.5" />
    ) : item.type === "death" ? (
      <span className="text-sm text-slate-500 font-bold shrink-0 mt-0.5">✝</span>
    ) : item.type === "marriage" ? (
      <span className="text-sm shrink-0 mt-0.5">💐</span>
    ) : (
      <Heart size={15} className="text-slate-300 shrink-0 mt-0.5" />
    );

  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-slate-100 last:border-0">
      {icon}
      <p
        className="text-base text-slate-600 leading-relaxed break-keep [&_b]:font-bold [&_b]:text-slate-900"
        dangerouslySetInnerHTML={{ __html: item.content }}
      />
    </div>
  );
}

interface BulletinViewProps {
  data: BulletinData | null;
  isLoading?: boolean;
}

export default function BulletinView({ data, isLoading }: BulletinViewProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-0">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="grid grid-cols-[2.5rem_1fr] gap-5 py-6 border-b border-slate-100">
            <div className="h-4 w-5 bg-slate-100 rounded mt-1" />
            <div className="space-y-2.5">
              <div className="h-5 bg-slate-100 rounded w-1/3" />
              <div className="h-4 bg-slate-100 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-14">
      {/* 공지 및 행사 */}
      {data.announcements.length > 0 && (
        <section>
          {data.announcements.map((item, i) => (
            <AnnouncementRow key={i} item={item} index={i} />
          ))}
        </section>
      )}

      {/* 교인동정 */}
      {(data.pastors.length > 0 || data.generalNews.length > 0) && (
        <section>
          <div className="bg-slate-50 border border-slate-200 p-6 md:p-8">
            <h2 className="text-lg font-extrabold text-slate-900 mb-5 pb-4 border-b border-slate-100">
              교인동정
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              {data.pastors.length > 0 && (
                <div>
                  {data.pastors.map((p, i) => (
                    <PastorRow key={i} pastor={p} />
                  ))}
                </div>
              )}
              {data.generalNews.length > 0 && (
                <div>
                  {data.generalNews.map((item, i) => (
                    <GeneralRow key={i} item={item} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
