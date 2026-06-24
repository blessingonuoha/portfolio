"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SITE } from "@/lib/content";
import { markIntroDone } from "@/lib/intro";

gsap.registerPlugin(useGSAP);

/**
 * Cinematic first-paint intro: a 0→100 counter under the wordmark, then the
 * curtain lifts to reveal the hero. Plays once per tab (sessionStorage), and
 * is skipped entirely under reduced-motion. Calls markIntroDone() the moment
 * the hero should start animating.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const alreadyPlayed =
        typeof sessionStorage !== "undefined" &&
        sessionStorage.getItem("intro-played") === "1";

      if (reduced || alreadyPlayed) {
        markIntroDone();
        setDone(true);
        return;
      }

      try {
        sessionStorage.setItem("intro-played", "1");
      } catch {
        // Private mode / storage disabled — the intro simply plays each load.
      }

      // Lock scroll while the curtain is up.
      document.body.style.overflow = "hidden";

      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          markIntroDone();
          setDone(true);
        },
      });

      tl.to(counter, {
        v: 100,
        duration: 1.4,
        ease: "power2.inOut",
        onUpdate: () => {
          if (count.current) {
            count.current.textContent = String(Math.round(counter.v)).padStart(2, "0");
          }
        },
      })
        .to("[data-pre-bar]", { scaleX: 1, duration: 1.4, ease: "power2.inOut" }, "<")
        .to("[data-pre-mark]", { autoAlpha: 0, y: -16, duration: 0.4, ease: "power2.in" }, "+=0.15")
        .to(
          root.current,
          { yPercent: -100, duration: 0.9, ease: "power4.inOut" },
          "-=0.1"
        );
    },
    { scope: root }
  );

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-300 flex flex-col items-center justify-center bg-background"
      aria-hidden
    >
      <div data-pre-mark className="text-center">
        <span className="font-display text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
          {SITE.name.split(" ")[0]}
          <span className="text-primary">.</span>
        </span>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {SITE.role}
        </p>
      </div>

      <div className="absolute bottom-10 left-0 right-0 mx-auto w-[min(90vw,72rem)] px-5 sm:px-8">
        <div className="flex items-end justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Loading
          </span>
          <span className="font-display text-4xl font-bold tabular-nums text-foreground sm:text-6xl">
            <span ref={count}>00</span>
            <span className="text-primary">%</span>
          </span>
        </div>
        <div className="mt-4 h-px w-full overflow-hidden bg-border">
          <div data-pre-bar className="h-full w-full origin-left scale-x-0 bg-primary" />
        </div>
      </div>
    </div>
  );
}
