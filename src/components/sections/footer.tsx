import { ArrowUp } from 'lucide-react';
import { SITE, NAV_ITEMS, SOCIALS } from '@/lib/content';
import { KineticName } from '@/components/sections/kinetic-name';

export function Footer() {
    return (
        <footer className='overflow-hidden border-t border-border'>
            <div className='px-5 pt-12 sm:px-8'>
                <KineticName />
            </div>
            <div className='mx-auto max-w-6xl px-5 py-12 sm:px-8'>
                <div className='flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                        <a href='#top' className='font-display text-lg font-bold tracking-tight text-foreground'>
                            {SITE.name.split(' ')[0]}
                            <span className='text-primary'>.</span>
                        </a>
                        <p className='mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground'>{SITE.tagline}</p>
                    </div>

                    <nav aria-label='Footer' className='flex flex-wrap gap-x-8 gap-y-3'>
                        {NAV_ITEMS.map((item) => (
                            <a key={item.href} href={item.href} className='text-sm text-muted-foreground transition-colors hover:text-foreground'>
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className='flex gap-2'>
                        {SOCIALS.map((social) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target={social.href.startsWith('http') ? '_blank' : undefined}
                                    rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                                    aria-label={social.label}
                                    className='inline-flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                                >
                                    <Icon className='size-4' aria-hidden='true' />
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div className='mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center'>
                    <p className='text-xs text-muted-foreground'>© {SITE.name}. All rights reserved.</p>
                    <a href='#top' className='inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground'>
                        Back to top
                        <ArrowUp className='size-3.5' aria-hidden='true' />
                    </a>
                </div>
            </div>
        </footer>
    );
}
