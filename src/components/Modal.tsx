"use client";

import React, { useEffect, useRef } from "react";

/**
 * 네이티브 <dialog> 래퍼.
 *
 * showModal() 한 번이면 ESC 닫기 · 포커스 트랩 · 배경 inert 처리가 전부 딸려온다.
 * 직접 만들면 keydown 리스너와 포커스 순환 코드를 모달마다 복제하게 되고,
 * 실제로 이 프로젝트의 모달들이 그렇게 제각각이었다.
 *
 * 배경 스크롤 잠금만 브라우저가 해주지 않아 여기서 처리한다.
 */
export default function Modal({
  open,
  onClose,
  className = "",
  children,
  ...rest
}: {
  open: boolean;
  onClose: () => void;
  /** 다이얼로그 박스의 크기 클래스. 배경 어둡게는 ::backdrop 이 담당한다. */
  className?: string;
  children: React.ReactNode;
} & React.DialogHTMLAttributes<HTMLDialogElement>) {
  const ref = useRef<HTMLDialogElement>(null);
  /* 최신 onClose 를 보되 리스너는 다시 붙이지 않는다 */
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    else if (!open && el.open) el.close();
  }, [open]);

  /* close 이벤트는 버블링하지 않아 React 합성 onClose 로는 잡히지 않는다.
     ESC 로 닫은 사실이 React 로 전달되지 않으면 open 상태가 true 로 남아
     스크롤 잠금이 풀리지 않는다. 네이티브 리스너로 직접 받는다. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = () => onCloseRef.current();
    el.addEventListener("close", handle);
    return () => el.removeEventListener("close", handle);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      /* ::backdrop 클릭은 dialog 엘리먼트가 타깃이 된다 */
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      /* 폭/높이는 전부 호출부가 정한다. 여기서 max-w-* 를 하나라도 박아 두면
         Tailwind 출력 순서에 따라 호출부 클래스를 이겨 버린다. */
      className={`m-auto bg-transparent p-0 overscroll-contain backdrop:bg-black/60 backdrop:backdrop-blur-sm ${className}`}
      {...rest}
    >
      {children}
    </dialog>
  );
}
