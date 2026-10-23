import { useEffect, useRef } from "react";

// Shared behaviour for drawers and overlays: Escape closes, the page behind
// stops scrolling, and focus moves in on open and back out on close.
export function useDialog(open, onClose) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const focusable = () =>
      panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) || [];

    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    requestAnimationFrame(() => {
      const target = panelRef.current?.querySelector("[data-autofocus]") || focusable()[0];
      target?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [open, onClose]);

  return panelRef;
}

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Larder` : "Larder | Groceries and kitchen goods";
  }, [title]);
}
