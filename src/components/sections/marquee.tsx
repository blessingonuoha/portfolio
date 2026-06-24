"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MARQUEE_ITEMS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = track.current;
      if (!el) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;

      // The track renders the list twice; translate by -50% for a seamless loop.
      const tween = gsap.to(el, {
        xPercent: -50,
        duration: 24,
        ease: "none",
        repeat: -1,
      });

      // Skew the strip toward scroll velocity, then ease back to rest — the
      // canonical GSAP "scroll skew" that makes the marquee feel physical.
      const proxy = { skew: 0, scale: 1 };
      const setSkew = gsap.quickSetter(el, "skewX", "deg");
      const clamp = gsap.utils.clamp(-12, 12);
      const st = ScrollTrigger.create({
        trigger: el,
        onUpdate: (self) => {
          const v = self.getVelocity();
          const skew = clamp(v / -200);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            // Subtly speed the loop with scroll motion, then ease both back.
            proxy.scale = 1 + Math.min(Math.abs(v) / 1500, 2);
            gsap.to(proxy, {
              skew: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3",
              overwrite: true,
              onUpdate: () => {
                setSkew(proxy.skew);
                tween.timeScale(proxy.scale);
              },
            });
          }
        },
      });

      return () => {
        tween.kill();
        st.kill();
      };
    },
    { scope: track }
  );

  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      className="relative flex overflow-hidden border-y border-border bg-card/40 py-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      aria-hidden="true"
    >
      <div ref={track} className="flex shrink-0 items-center gap-8 pr-8">
        {items.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-8">
            <span className="font-display text-xl font-medium text-muted-foreground sm:text-2xl">
              {item}
            </span>
            <span className="size-1.5 rounded-full bg-primary/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
