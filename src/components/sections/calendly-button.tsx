"use client";

import * as React from "react";
import Script from "next/script";

import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

type CalendlyButtonProps = React.ComponentProps<typeof Button> & {
  url: string;
};

/**
 * A fully styleable button (built on our own `Button`) that opens Calendly in a
 * popup. Replaces Calendly's floating badge so we control the look entirely.
 *
 * Note: the "powered by Calendly" footer inside the scheduling popup is a paid
 * Calendly plan setting and can't be removed via the embed API.
 */
export function CalendlyButton({ url, ...props }: CalendlyButtonProps) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <Button
        type="button"
        onClick={() => window.Calendly?.initPopupWidget({ url })}
        {...props}
      />
    </>
  );
}
