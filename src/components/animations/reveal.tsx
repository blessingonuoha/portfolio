"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Delay in seconds before the element animates in. */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  /** Stagger children that carry the `data-reveal-child` attribute. */
  stagger?: boolean;
};

/**
 * Fades + slides its content in once it scrolls into view.
 * Honors prefers-reduced-motion (CSS already resets `.reveal` in that case,
 * so we simply skip the animation and leave content visible).
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 28,
  stagger = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const targets = stagger
        ? gsap.utils.toArray<HTMLElement>(
            el.querySelectorAll("[data-reveal-child]")
          )
        : [el];

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced || targets.length === 0) {
        gsap.set([el, ...targets], { autoAlpha: 1 });
        return;
      }

      // Parent must be visible in stagger mode; the children carry the motion.
      if (stagger) gsap.set(el, { autoAlpha: 1 });

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay,
          stagger: stagger ? 0.08 : 0,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref, dependencies: [stagger] }
  );

  // In stagger mode the parent stays visible (children animate individually),
  // so only attach the hidden `.reveal` start-state when NOT staggering.
  return (
    <Tag ref={ref} className={cn(!stagger && "reveal", className)}>
      {children}
    </Tag>
  );
}
