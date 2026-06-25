'use client';

import { useEffect, useState } from 'react';
import { CalendarDays } from 'lucide-react';

import { cn } from '@/lib/utils';
import { SITE } from '@/lib/content';
import { CalendlyButton } from '@/components/sections/calendly-button';

/**
 * Floating "Schedule a call" CTA. It mirrors the Contact section's Calendly
 * button and stays pinned while scrolling — but hides once the Contact section
 * scrolls into view, so it yields to the real button instead of duplicating it.
 */
export function FloatingContactButton({ btnText = 'Schedule a call with me' }: { btnText?: string }) {
    const [inContact, setInContact] = useState(false);

    useEffect(() => {
        const target = document.getElementById('contact');
        if (!target) return;

        const observer = new IntersectionObserver(
            ([entry]) => setInContact(entry.isIntersecting),
            // Ignore the bottom quarter of the viewport so the floating button only
            // disappears once the section is meaningfully on screen, not just peeking.
            { rootMargin: '0px 0px -25% 0px' },
        );
        observer.observe(target);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            className={cn(
                'fixed bottom-6 right-5 z-40 transition-all duration-300 sm:right-8',
                inContact ? 'pointer-events-none translate-y-3 opacity-0' : 'translate-y-0 opacity-100',
            )}
            aria-hidden={inContact}
        >
            <div className='relative'>
                {/* Soft pulsing glow halo behind the button. */}
                <div className='pointer-events-none absolute -inset-1 rounded-full bg-primary/40 opacity-60 blur-md animate-pulse' aria-hidden='true' />
                <CalendlyButton
                    url={SITE.calendly}
                    size='sm'
                    className='glow-primary relative rounded-full shadow-lg shadow-primary/20 transition-shadow hover:shadow-primary/40'
                    tabIndex={inContact ? -1 : undefined}
                >
                    <CalendarDays className='size-3' aria-hidden='true' />
                    <span className='text-[12px]'>{btnText}</span>
                </CalendlyButton>
            </div>
        </div>
    );
}
