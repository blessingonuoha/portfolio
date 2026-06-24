"use client";

import { useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

type ScrollFillTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
};

/**
 * Word-by-word color fill (dim → bright) scrubbed to scroll position, so the
 * paragraph "lights up" as it moves through the viewport. Under reduced-motion
 * it simply renders at full brightness.
 */
export function ScrollFillText({
  text,
  as: Tag = "p",
  className,
}: ScrollFillTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) {
        gsap.set(el, { color: "var(--foreground)" });
        return;
      }

      const split = new SplitText(el, { type: "words" });

      gsap.fromTo(
        split.words,
        { color: "#52525b" },
        {
          color: "#fafafa",
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );

      return () => split.revert();
    },
    { scope: ref, dependencies: [text] }
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      {text}
    </Tag>
  );
}
