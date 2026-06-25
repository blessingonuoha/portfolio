import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/lib/content";

// Shared Open Graph / Twitter banner. Imported by the `opengraph-image` and
// `twitter-image` file conventions so both share one design.

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand palette (mirrors globals.css design tokens).
const BG = "#09090b";
const FG = "#fafafa";
const VIOLET = "#8b5cf6";
const INDIGO = "#6366f1";
const MUTED = "#a1a1aa";

const PORTRAIT_PATH = "public/gallery/my-linkedin-profile.jpeg";

/**
 * Pull a Google Font as a raw font buffer for Satori, subset to just the glyphs
 * we render. Returns null on any failure so image generation still succeeds with
 * next/og's default font rather than breaking the build.
 */
async function loadGoogleFont(
  family: string,
  weight: number,
  text: string
): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family.replace(
      / /g,
      "+"
    )}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (
      await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } })
    ).text();
    const src = css.match(/src: url\((.+?)\) format\(/);
    if (!src) return null;
    const res = await fetch(src[1]);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

/** Inline a local public image as a base64 data URI (Satori can't read URLs at
 * build). Returns null if the file is missing so the banner still renders. */
async function loadPortrait(): Promise<string | null> {
  try {
    const buf = await readFile(join(process.cwd(), PORTRAIT_PATH));
    return `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function Image() {
  const headingText = `${SITE.name}${SITE.role}`;
  const bodyText = `${SITE.tagline}Currently available for workblessingonuoha.devReact · Next.js · TypeScript · Solidity`;

  const [grotesk, inter, portrait] = await Promise.all([
    loadGoogleFont("Space Grotesk", 700, headingText),
    loadGoogleFont("Inter", 400, bodyText),
    loadPortrait(),
  ]);

  type Font = { name: string; data: ArrayBuffer; weight: 400 | 700; style: "normal" };
  const fonts: Font[] = [];
  if (grotesk) fonts.push({ name: "Space Grotesk", data: grotesk, weight: 700, style: "normal" });
  if (inter) fonts.push({ name: "Inter", data: inter, weight: 400, style: "normal" });

  const heading = grotesk ? "Space Grotesk" : undefined;
  const body = inter ? "Inter" : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 72,
          background: BG,
          color: FG,
          fontFamily: body,
          position: "relative",
        }}
      >
        {/* Ambient glows (radial gradients — no blur, which Satori can't do) */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -150,
            width: 700,
            height: 700,
            background: `radial-gradient(circle, ${VIOLET}40, transparent 60%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -250,
            right: -150,
            width: 700,
            height: 700,
            background: `radial-gradient(circle, ${INDIGO}33, transparent 60%)`,
          }}
        />

        {/* Main row: text left, portrait right */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            gap: 56,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", maxWidth: portrait ? 660 : 1000 }}>
            {/* Availability pill */}
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 22px",
                  borderRadius: 999,
                  border: "1px solid rgba(16,185,129,0.35)",
                  background: "rgba(16,185,129,0.10)",
                  color: "#6ee7b7",
                  fontSize: 24,
                }}
              >
                <div style={{ width: 13, height: 13, borderRadius: 999, background: "#34d399" }} />
                Currently available for work
              </div>
            </div>

            <div
              style={{
                display: "flex",
                fontFamily: heading,
                fontWeight: 700,
                fontSize: 88,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                marginTop: 32,
                backgroundImage: `linear-gradient(90deg, ${FG}, #c4b5fd 55%, ${VIOLET})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {SITE.name}
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: heading,
                fontWeight: 700,
                fontSize: 44,
                letterSpacing: "-0.02em",
                color: FG,
                marginTop: 16,
              }}
            >
              {SITE.role}
            </div>
            <div style={{ display: "flex", fontSize: 28, color: MUTED, marginTop: 18 }}>
              {SITE.tagline}
            </div>
          </div>

          {/* Portrait */}
          {portrait ? (
            <div style={{ display: "flex", position: "relative" }}>
              {/* Glow ring behind the portrait */}
              <div
                style={{
                  position: "absolute",
                  inset: -24,
                  borderRadius: 32,
                  background: `radial-gradient(circle, ${VIOLET}55, transparent 70%)`,
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={portrait}
                alt=""
                width={340}
                height={430}
                style={{
                  width: 340,
                  height: 430,
                  objectFit: "cover",
                  borderRadius: 28,
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              />
            </div>
          ) : null}
        </div>

        {/* Footer: domain + stack */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            color: MUTED,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: VIOLET }} />
            <span style={{ color: FG }}>blessingonuoha.dev</span>
          </div>
          <div style={{ display: "flex", color: "#d4d4d8" }}>
            React · Next.js · TypeScript · Solidity
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
