import type { Metadata } from "next";
import { Space_Grotesk, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Preloader } from "@/components/sections/preloader";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { FloatingContactButton } from "@/components/sections/floating-contact-button";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// TODO: set this to your live domain once deployed.
const siteUrl = "https://blessingonuoha.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Blessing Onuoha — Frontend & Web3 Engineer",
    template: "%s · Blessing Onuoha",
  },
  description:
    "Portfolio of Blessing Onuoha, a frontend & web3 engineer building fast, accessible production web apps with React, Next.js, TypeScript and Solidity.",
  keywords: [
    "frontend engineer",
    "web3 engineer",
    "React",
    "Next.js",
    "Solidity",
    "smart contracts",
    "portfolio",
  ],
  openGraph: {
    title: "Blessing Onuoha — Frontend & Web3 Engineer",
    description:
      "Building fast, accessible production web apps with React, Next.js, TypeScript and Solidity.",
    url: siteUrl,
    siteName: "Blessing Onuoha",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blessing Onuoha — Frontend & Web3 Engineer",
    description: "Frontend & web3 engineer building fast, accessible web apps.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark no-js ${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Swap the no-js class as early as possible so reveal elements
            start hidden only when GSAP can actually animate them in. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('no-js');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Preloader />
        <SmoothScroll />
        <div className="grain" aria-hidden />
        {children}
        <FloatingContactButton />
      </body>
    </html>
  );
}
