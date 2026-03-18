"use client";
import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(index < 2);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (index < 2) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {children}
    </div>
  );
}
