import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { SKILL_GROUPS } from "@/lib/content";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="The tools I reach for."
          description="The full toolkit I build production apps with — languages, frontend, web3, backend, and the services that ship and run them."
        />

        <Reveal stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.title}
              data-reveal-child
              className="reveal rounded-2xl border border-border bg-card/50 p-6 transition-colors hover:border-primary/40"
            >
              <h3 className="font-display text-base font-semibold text-foreground">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
