"use client";

import { useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

type AnimatedHeadingProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /**
   * Class applied to each split word. Use this (not `className`) for gradient
   * fills — a clipped gradient on the parent does not reach SplitText's word
   * wrappers, so the gradient must live on the words themselves.
   */
  wordClassName?: string;
  /** Start the animation immediately (hero) vs. on scroll-in. */
  immediate?: boolean;
  delay?: number;
  /**
   * For `immediate` headings: hold the words hidden until this flips true.
   * Lets the preloader gate the hero reveal. Ignored for scroll-in headings.
   */
  play?: boolean;
};

/**
 * Word-by-word mask reveal using GSAP SplitText.
 * Falls back to plain visible text under reduced-motion.
 */
export function AnimatedHeading({
  text,
  as: Tag = "h2",
  className,
  wordClassName,
  immediate = false,
  delay = 0,
  play = true,
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) {
        gsap.set(el, { autoAlpha: 1 });
        return;
      }

      const split = new SplitText(el, {
        type: "lines,words",
        linesClass: "overflow-hidden py-[0.1em]",
        wordsClass: wordClassName,
      });

      gsap.set(el, { autoAlpha: 1 });

      // Immediate headings can be gated by `play` (preloader). While held,
      // keep the words parked below their mask so nothing flashes.
      if (immediate && !play) {
        gsap.set(split.words, { yPercent: 120 });
        return () => split.revert();
      }

      gsap.from(split.words, {
        yPercent: 120,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.05,
        delay,
        scrollTrigger: immediate
          ? undefined
          : {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [text, play] }
  );

  return (
    <Tag ref={ref} className={cn("reveal", className)}>
      {text}
    </Tag>
  );
}
