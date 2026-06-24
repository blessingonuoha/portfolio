import { ArrowUpRight, Copy } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { AnimatedHeading } from "@/components/animations/animated-heading";
import { Magnetic } from "@/components/animations/magnetic";
import { Button } from "@/components/ui/button";
import { SITE, SOCIALS } from "@/lib/content";
import { CopyEmailButton } from "@/components/sections/copy-email-button";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-14">
          {/* Glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />

          <div className="relative mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                <span className="size-1.5 rounded-full bg-primary" />
                Contact
              </span>
            </Reveal>

            <AnimatedHeading
              as="h2"
              text="Let's build something memorable."
              className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl"
            />

            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Have a project in mind or just want to say hi? My inbox is always
                open — I usually reply within a day.
              </p>
            </Reveal>

            <Reveal
              delay={0.15}
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Magnetic className="w-full sm:w-auto">
                <Button asChild size="lg" className="group w-full rounded-full sm:w-auto">
                  <a href={`mailto:${SITE.email}`}>
                    Start a conversation
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Button>
              </Magnetic>

              <CopyEmailButton email={SITE.email}>
                <span className="font-mono text-sm">{SITE.email}</span>
                <Copy className="size-4" aria-hidden="true" />
              </CopyEmailButton>
            </Reveal>

            <Reveal delay={0.2} className="mt-10 flex items-center justify-center gap-2">
              {SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={social.label}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </a>
                );
              })}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
