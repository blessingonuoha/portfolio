'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const REDIRECT_SECONDS = 5;

/**
 * Root not-found page — Next.js renders this for any unmatched URL across the
 * app (it sits inside the root layout, so no <html>/<body> needed here).
 *
 * Redirect behaviour: a countdown auto-sends visitors home via router.replace
 * (replace, not push, so the back button skips the dead URL). The countdown can
 * be cancelled so nobody is yanked away mid-read.
 */
export default function NotFound() {
    const router = useRouter();
    const [seconds, setSeconds] = useState(REDIRECT_SECONDS);
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        if (cancelled) return;
        if (seconds <= 0) {
            router.replace('/');
            return;
        }
        const id = window.setTimeout(() => setSeconds((s) => s - 1), 500);
        return () => window.clearTimeout(id);
    }, [seconds, cancelled, router]);

    return (
        <main className='relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-24 text-center'>
            {/* Decorative background — mirrors the hero treatment. */}
            <div aria-hidden className='pointer-events-none absolute inset-0 bg-grid mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]' />
            <div aria-hidden className='pointer-events-none absolute inset-0 bg-radial-glow' />
            <div aria-hidden className='pointer-events-none absolute -top-20 left-1/2 size-80 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]' />

            <div className='relative'>
                <p className='font-mono text-sm font-medium tracking-widest text-muted-foreground uppercase'>Error 404</p>

                <h1 className='mt-4 font-display text-[clamp(4rem,18vw,11rem)] font-bold leading-none tracking-tight text-gradient'>404</h1>

                <h2 className='mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl'>This page wandered off.</h2>

                <p className='mx-auto mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground'>
                    The link may be broken or the page may have moved. Let&apos;s get you back on track.
                </p>

                <div className='mt-9 flex flex-wrap items-center justify-center gap-3'>
                    <Button asChild size='lg' className='group rounded-full'>
                        <Link href='/'>
                            <Home className='size-4' />
                            Back to home
                        </Link>
                    </Button>
                    <Button asChild size='lg' variant='outline' className='rounded-full border-border bg-transparent hover:bg-secondary'>
                        <Link href='/#work'>
                            <ArrowLeft className='size-4' />
                            View my work
                        </Link>
                    </Button>
                </div>

                {/* Redirect status — polite so screen readers announce the countdown. */}
                <p aria-live='polite' className='mt-8 text-sm text-muted-foreground'>
                    {cancelled ? (
                        'Auto-redirect cancelled.'
                    ) : (
                        <>
                            Redirecting home in <span className='font-mono font-medium text-foreground'>{seconds}s</span> ·{' '}
                            <button
                                type='button'
                                onClick={() => setCancelled(true)}
                                className='font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary'
                            >
                                stay here
                            </button>
                        </>
                    )}
                </p>
            </div>
        </main>
    );
}
