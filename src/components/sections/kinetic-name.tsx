"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SITE } from "@/lib/content";

gsap.registerPlugin(useGSAP);

/**
 * Oversized wordmark that rises letter-by-letter when it scrolls into view,
 * with each glyph liftable on hover. Uses an IntersectionObserver (not
 * ScrollTrigger) because it's the last element on the page — IO reveals
 * reliably regardless of the smooth-scroll engine's position math.
 * Decorative — the real footer nav carries the semantics.
 */
export function KineticName() {
  const root = useRef<HTMLDivElement>(null);
  const letters = SITE.name.split("");

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;

      const targets = el.querySelectorAll("[data-letter]");
      gsap.set(targets, { yPercent: 120 });

      const io = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          gsap.to(targets, {
            yPercent: 0,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.04,
          });
          io.disconnect();
        },
        { threshold: 0.25 }
      );
      io.observe(el);

      return () => io.disconnect();
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="flex justify-center overflow-hidden pt-4 select-none"
    >
      <div className="flex font-display text-[clamp(1.5rem,9.5vw,8.5rem)] font-bold leading-none tracking-tighter">
        {letters.map((ch, i) => (
          <span
            key={i}
            data-letter
            className="inline-block text-foreground transition-colors duration-300 ease-out hover:text-primary"
          >
            {ch === " " ? " " : ch}
          </span>
        ))}
      </div>
    </div>
  );
}
