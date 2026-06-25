'use client';

import { useRef, useSyncExternalStore } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SITE, STATS } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { AnimatedHeading } from '@/components/animations/animated-heading';
import { Magnetic } from '@/components/animations/magnetic';
import { INTRO_EVENT, isIntroDone } from '@/lib/intro';

gsap.registerPlugin(useGSAP);

export function Hero() {
    const root = useRef<HTMLElement>(null);

    // The intro coordinator is an external store (a flag + an event), so subscribe
    // to it directly. Holds the hero reveal until the preloader lifts; if the intro
    // already finished (later mount), the snapshot reports true immediately. Server
    // snapshot is false so SSR matches first client paint.
    const start = useSyncExternalStore(
        (onChange) => {
            window.addEventListener(INTRO_EVENT, onChange);
            return () => window.removeEventListener(INTRO_EVENT, onChange);
        },
        isIntroDone,
        () => false,
    );

    // Intro reveal — gated on `start` so it plays in sync with the curtain.
    useGSAP(
        () => {
            if (!start) return;
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            gsap.set('[data-hero-fade]', { autoAlpha: 1 });
            if (reduced) return;

            gsap.from('[data-hero-fade]', {
                autoAlpha: 0,
                y: 24,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.12,
                delay: 0.35,
            });

            // Slow, ambient float for the gradient orbs.
            gsap.to('[data-orb]', {
                y: '+=24',
                x: '+=16',
                duration: 6,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                stagger: { each: 1.5, from: 'random' },
            });
        },
        { scope: root, dependencies: [start] },
    );

    // Cursor-light follower — independent of the intro; pointer devices only.
    useGSAP(
        () => {
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const section = root.current;
            const spot = section?.querySelector<HTMLElement>('[data-hero-spotlight]');
            const finePointer = window.matchMedia('(pointer: fine)').matches;
            if (reduced || !finePointer || !section || !spot) return;

            // Center the 600px glow on the cursor by offsetting half its size.
            const xTo = gsap.quickTo(spot, 'x', { duration: 0.6, ease: 'power3.out' });
            const yTo = gsap.quickTo(spot, 'y', { duration: 0.6, ease: 'power3.out' });

            const onMove = (e: PointerEvent) => {
                const r = section.getBoundingClientRect();
                xTo(e.clientX - r.left - 300);
                yTo(e.clientY - r.top - 300);
            };
            const onEnter = () => gsap.to(spot, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' });
            const onLeave = () => gsap.to(spot, { autoAlpha: 0, duration: 0.4, ease: 'power2.out' });

            section.addEventListener('pointermove', onMove);
            section.addEventListener('pointerenter', onEnter);
            section.addEventListener('pointerleave', onLeave);

            return () => {
                section.removeEventListener('pointermove', onMove);
                section.removeEventListener('pointerenter', onEnter);
                section.removeEventListener('pointerleave', onLeave);
            };
        },
        { scope: root },
    );

    return (
        <section ref={root} id='top' className='relative flex min-h-dvh flex-col overflow-hidden py-24'>
            {/* Decorative background */}
            <div className='pointer-events-none absolute inset-0 bg-grid mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]' />
            <div className='pointer-events-none absolute inset-0 bg-radial-glow' />
            {/* Cursor-light follower (driven by GSAP in the effect above) */}
            <div
                data-hero-spotlight
                aria-hidden='true'
                className='pointer-events-none absolute left-0 top-0 h-150 w-150 opacity-0'
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15), transparent 60%)' }}
            />
            <div data-orb className='pointer-events-none absolute -left-20 top-1/4 size-72 rounded-full bg-violet-600/20 blur-[100px]' />
            <div data-orb className='pointer-events-none absolute right-0 top-10 size-80 rounded-full bg-indigo-600/20 blur-[120px]' />
            <div data-orb className='pointer-events-none absolute bottom-0 left-1/3 size-64 rounded-full bg-fuchsia-600/10 blur-[110px]' />

            <div className='relative flex w-full flex-1 items-center'>
                <div className='mx-auto w-full max-w-6xl px-5 sm:px-8'>
                    <span
                        data-hero-fade
                        className='reveal inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur'
                    >
                        <Sparkles className='size-3.5 text-primary' aria-hidden='true' />
                        Available for freelance, contract &amp; full-time
                    </span>

                    <h1 className='mt-6 max-w-4xl font-display text-[clamp(2.75rem,8vw,6rem)] font-bold leading-[0.95] tracking-tight'>
                        <AnimatedHeading as='span' immediate play={start} className='block' wordClassName='text-gradient' text='Frontend engineer' />
                        <AnimatedHeading
                            as='span'
                            immediate
                            play={start}
                            delay={0.15}
                            className='block'
                            wordClassName='text-gradient-brand'
                            text='& web3 builder.'
                        />
                    </h1>

                    <p data-hero-fade className='reveal mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg'>
                        I&apos;m {SITE.name.split(' ')[0]}, a {SITE.role.toLowerCase()} who turns ideas into fast, accessible, and delightful interfaces.
                        Currently based in {SITE.location}.
                    </p>

                    <div data-hero-fade className='reveal mt-9 flex flex-wrap items-center gap-3'>
                        <Magnetic>
                            <Button asChild size='lg' className='group rounded-full'>
                                <a href='#work'>
                                    View my work
                                    <ArrowUpRight className='size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                                </a>
                            </Button>
                        </Magnetic>
                        <Magnetic>
                            <Button asChild size='lg' variant='outline' className='rounded-full border-border bg-transparent hover:bg-secondary'>
                                <a href='#contact'>Get in touch</a>
                            </Button>
                        </Magnetic>
                    </div>

                    {/* Stats */}
                    <dl data-hero-fade className='reveal mt-16 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 sm:grid-cols-4'>
                        {STATS.map((stat) => (
                            <div key={stat.label}>
                                <dt className='sr-only'>{stat.label}</dt>
                                <dd className='font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>{stat.value}</dd>
                                <p className='mt-1 text-xs text-muted-foreground sm:text-sm'>{stat.label}</p>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
