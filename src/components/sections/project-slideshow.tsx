"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Auto-crossfading image slideshow for a project card's visual panel.
 * A single image renders statically. Multiple images cycle with a crossfade
 * and show dot indicators. Honors reduced-motion (no auto-advance).
 */
export function ProjectSlideshow({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={cn(
            "object-cover object-top transition-[opacity,transform] duration-700 ease-out group-hover:scale-105",
            i === active ? "opacity-100" : "opacity-0"
          )}
        />
      ))}

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {images.map((src, i) => (
            <span
              key={src}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active ? "w-5 bg-white" : "w-1.5 bg-white/50"
              )}
            />
          ))}
        </div>
      )}
    </>
  );
}
