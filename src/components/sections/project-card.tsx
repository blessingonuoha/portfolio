'use client';

import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import type { Project } from '@/lib/content';
import { cn } from '@/lib/utils';
import { ProjectSlideshow } from '@/components/sections/project-slideshow';

gsap.registerPlugin(useGSAP);

export function ProjectCard({ project }: { project: Project }) {
    const card = useRef<HTMLAnchorElement>(null);

    useGSAP(
        () => {
            const el = card.current;
            if (!el) return;

            const finePointer = window.matchMedia('(pointer: fine)').matches;
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (!finePointer || reduced) return;

            const rotX = gsap.quickTo(el, 'rotationX', {
                duration: 0.6,
                ease: 'power3.out',
            });
            const rotY = gsap.quickTo(el, 'rotationY', {
                duration: 0.6,
                ease: 'power3.out',
            });

            const onMove = (e: PointerEvent) => {
                const r = el.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top) / r.height;
                // Subtle 3D tilt + move the spotlight to the cursor.
                rotY((px - 0.5) * 6);
                rotX((0.5 - py) * 6);
                el.style.setProperty('--mx', `${px * 100}%`);
                el.style.setProperty('--my', `${py * 100}%`);
            };

            const onLeave = () => {
                rotX(0);
                rotY(0);
            };

            el.addEventListener('pointermove', onMove);
            el.addEventListener('pointerleave', onLeave);
            return () => {
                el.removeEventListener('pointermove', onMove);
                el.removeEventListener('pointerleave', onLeave);
            };
        },
        { scope: card },
    );

    return (
        <a
            ref={card}
            href={project.href}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`${project.title} — opens in a new tab`}
            data-reveal-child
            style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
            className={cn(
                'group reveal relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-8',
                project.featured && 'lg:col-span-2',
            )}
        >
            {/* Cursor spotlight */}
            <div
                aria-hidden='true'
                className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                style={{
                    background: 'radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(139,92,246,0.12), transparent 60%)',
                }}
            />

            {/* Visual panel — real screenshot when available, gradient otherwise */}
            <div className={cn('relative mb-6 aspect-16/10 overflow-hidden rounded-xl border border-border bg-gradient-to-br', project.accent)}>
                {project.images?.length ? (
                    <ProjectSlideshow images={project.images} alt={`${project.title} preview`} />
                ) : (
                    <div className='absolute inset-0 bg-grid opacity-40 mask-[radial-gradient(ellipse_at_center,black,transparent_80%)]' />
                )}
                <span className='absolute left-4 top-4 z-10 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground/90 backdrop-blur'>
                    {project.category}
                </span>
                {/* <span className="absolute bottom-4 right-4 z-10 rounded-md bg-background/60 px-1.5 py-0.5 font-mono text-xs text-muted-foreground backdrop-blur">
          {project.year}
        </span> */}
                <span className='absolute right-4 top-4 z-10 inline-flex size-7 items-center justify-center rounded-full bg-background/60 backdrop-blur'>
                    <ArrowUpRight className='size-4 text-foreground/80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                </span>
            </div>

            <div className='relative flex flex-1 flex-col'>
                <h3 className='font-display text-xl font-semibold text-foreground sm:text-2xl'>{project.title}</h3>
                <p className='mt-2 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base'>{project.description}</p>
                <ul className='mt-5 flex flex-wrap gap-2'>
                    {project.tags.map((tag) => (
                        <li key={tag} className='rounded-md bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground'>
                            {tag}
                        </li>
                    ))}
                </ul>
            </div>
        </a>
    );
}
