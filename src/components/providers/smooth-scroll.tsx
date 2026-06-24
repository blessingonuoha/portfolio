"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INTRO_EVENT } from "@/lib/intro";

gsap.registerPlugin(ScrollTrigger);

/**
 * Momentum smooth-scroll (Lenis) driven by GSAP's ticker so it stays in
 * lockstep with every ScrollTrigger on the page. Disabled entirely under
 * reduced-motion, where native scroll is the accessible default.
 *
 * Also upgrades in-page anchor clicks to eased scrolls with a navbar offset,
 * which keeps section landings pixel-accurate even as reveals change layout.
 */
export function SmoothScroll() {
  useEffect(() => {
    // Recompute trigger positions once layout settles: the preloader locks the
    // page at full height while its curtain is up, so triggers created during
    // the intro (and the farthest ones especially) need a refresh afterward.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    window.addEventListener(INTRO_EVENT, refresh);
    const settleTimer = window.setTimeout(refresh, 2600);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      return () => {
        window.removeEventListener("load", refresh);
        window.removeEventListener(INTRO_EVENT, refresh);
        window.clearTimeout(settleTimer);
      };
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Eased anchor navigation with offset for the fixed navbar (~80px).
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.2 });
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener(INTRO_EVENT, refresh);
      window.clearTimeout(settleTimer);
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return null;
}
