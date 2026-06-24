"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/animations/reveal";
import { WORK_GALLERY, type GalleryPhoto } from "@/lib/content";
import { cn } from "@/lib/utils";

// Row-span pattern creates a varied, masonry-like mosaic. Dense grid flow
// packs the tiles so there are no gaps even with mixed heights.
const SPANS = [
  "row-span-2",
  "row-span-1",
  "row-span-1",
  "row-span-2",
  "row-span-2",
  "row-span-1",
  "row-span-1",
  "row-span-2",
];

function GalleryTile({ photo, span }: { photo: GalleryPhoto; span: string }) {
  const [ok, setOk] = useState(true);

  return (
    <div
      data-reveal-child
      className={cn(
        "reveal group relative overflow-hidden rounded-xl border border-border bg-secondary",
        span
      )}
    >
      {/* Soft fallback shown until/unless the photo loads */}
      <div className="absolute inset-0 bg-linear-to-br from-secondary to-card" />

      {ok && (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          onError={() => setOk(false)}
        />
      )}

      {/* Hover wash for depth */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

export function WorkGallery() {
  return (
    <Reveal
      stagger
      className="grid grid-flow-dense grid-cols-2 gap-3 auto-rows-[140px] sm:gap-4 sm:auto-rows-[170px] lg:grid-cols-4"
    >
      {WORK_GALLERY.map((photo, i) => (
        <GalleryTile key={photo.src} photo={photo} span={SPANS[i % SPANS.length]} />
      ))}
    </Reveal>
  );
}
