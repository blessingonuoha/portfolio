import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { ProjectCard } from "@/components/sections/project-card";
import { PROJECTS } from "@/lib/content";

export function Projects() {
  return (
    <section id="work" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects I'm proud of."
            description="Recent production builds across fintech, web3, proptech, and edtech — each shipped, used, and in the wild."
          />
        </div>

        <Reveal
          stagger
          className="mt-14 grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2"
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
