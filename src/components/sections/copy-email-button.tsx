"use client";

import { useState, type ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyEmailButton({
  email,
  children,
}: {
  email: string;
  children: ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — fail silently;
      // the mailto button beside this is the primary path.
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? "Email copied to clipboard" : `Copy email ${email}`}
      className={cn(
        "inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-border px-5 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
      )}
    >
      {copied ? (
        <>
          <span className="font-mono text-sm text-foreground">Copied!</span>
          <Check className="size-4 text-primary" aria-hidden="true" />
        </>
      ) : (
        children
      )}
    </button>
  );
}
