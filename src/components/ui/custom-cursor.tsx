"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap } from "gsap";

const FINE_POINTER = "(pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// The custom cursor only applies to fine-pointer, no-reduced-motion users. Media
// queries are an external store, so subscribe to them — this also flips live if
// the user plugs in a mouse or toggles reduced motion. SSR snapshot is false.
function subscribeMedia(onChange: () => void) {
  const queries = [window.matchMedia(FINE_POINTER), window.matchMedia(REDUCED_MOTION)];
  queries.forEach((q) => q.addEventListener("change", onChange));
  return () => queries.forEach((q) => q.removeEventListener("change", onChange));
}

function getCursorEnabled() {
  return (
    window.matchMedia(FINE_POINTER).matches &&
    !window.matchMedia(REDUCED_MOTION).matches
  );
}

/**
 * Two-part custom cursor: a crisp dot that tracks instantly and a ring that
 * trails with easing, growing when hovering interactive elements. Uses
 * mix-blend-mode so it reads over any surface.
 *
 * Pointer-fine + no-reduced-motion only — touch users and reduced-motion users
 * keep the native cursor, and the native cursor is only hidden while this runs.
 */
export function CustomCursor() {
  const enabled = useSyncExternalStore(subscribeMedia, getCursorEnabled, () => false);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const dotEl = dot.current;
    const ringEl = ring.current;
    if (!dotEl || !ringEl) return;

    document.documentElement.classList.add("cursor-none");

    const dotX = gsap.quickTo(dotEl, "x", { duration: 0.15, ease: "power3.out" });
    const dotY = gsap.quickTo(dotEl, "y", { duration: 0.15, ease: "power3.out" });
    const ringX = gsap.quickTo(ringEl, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ringEl, "y", { duration: 0.5, ease: "power3.out" });

    let visible = false;
    const onMove = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dotEl, ringEl], { autoAlpha: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const interactiveSel = 'a, button, [data-cursor="hover"], input, textarea, select';
    const onOver = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest(interactiveSel)) {
        gsap.to(ringEl, { scale: 2.2, duration: 0.3, ease: "power3.out" });
        gsap.to(dotEl, { scale: 0.5, duration: 0.3, ease: "power3.out" });
      }
    };
    const onOut = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest(interactiveSel)) {
        gsap.to(ringEl, { scale: 1, duration: 0.3, ease: "power3.out" });
        gsap.to(dotEl, { scale: 1, duration: 0.3, ease: "power3.out" });
      }
    };
    // Hide when the pointer leaves the window — and reset `visible` so the next
    // move re-shows it. Without this reset the cursor stays hidden on return,
    // and since the native cursor is suppressed, you'd see no cursor at all.
    const hide = () => {
      visible = false;
      gsap.to([dotEl, ringEl], { autoAlpha: 0, duration: 0.3 });
    };

    // Tab switches / window blur don't fire pointerleave, so cover them too.
    const onVisibility = () => {
      if (document.hidden) hide();
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200] mix-blend-difference">
      <div
        ref={ring}
        className="absolute -left-5 -top-5 size-10 rounded-full border border-white opacity-0 invisible"
      />
      <div
        ref={dot}
        className="absolute -left-1 -top-1 size-2 rounded-full bg-white opacity-0 invisible"
      />
    </div>
  );
}
