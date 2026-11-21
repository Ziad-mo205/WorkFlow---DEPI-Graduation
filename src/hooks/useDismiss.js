import { useEffect, useRef } from "react";

export default function useDismiss(ref, isOpen, onDismiss) {
  const handler = useRef(onDismiss);

  useEffect(() => {
    handler.current = onDismiss;
  });

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handler.current();
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") handler.current();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [ref, isOpen]);
}
