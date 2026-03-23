import React from "react";

interface IntroPageHeaderProps {
  label: string;
  title: string;
}

export default function IntroPageHeader({ label, title }: IntroPageHeaderProps) {
  return (
    <section className="pt-32 md:pt-40 pb-10 px-4 sm:px-6 lg:px-8 max-w-content mx-auto text-center mb-12 md:mb-16">
      <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">
        {label}
      </p>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
        {title}
      </h1>
    </section>
  );
}
