import { SectionHeading } from '@/components/sections/section-heading';
import { ScrollFillText } from '@/components/animations/scroll-fill-text';
import { Reveal } from '@/components/animations/reveal';
import { WorkGallery } from '@/components/sections/work-gallery';

export function About() {
    return (
        <section id='about' className='scroll-mt-24 py-24 sm:py-32'>
            <div className='mx-auto max-w-6xl px-5 sm:px-8'>
                <div className='grid gap-12 lg:grid-cols-12 lg:gap-16'>
                    <div className='lg:col-span-5'>
                        <SectionHeading eyebrow='About' title='Engineer who ships products people actually use.' />
                    </div>

                    <div className='lg:col-span-7 space-y-5 text-base leading-relaxed sm:text-xl'>
                        <ScrollFillText text="I'm a frontend and web3 engineer based in Nigeria. For the past three years I've helped startups across fintech, real estate, social audio, and talent, ship production softwares — from studio-booking systems and recruitment platforms to NFT marketplaces." />
                        <ScrollFillText text="I've led frontend teams on concurrent products, shipped feature-rich MVPs, and audited critical smart contracts to a 98% reduction in vulnerabilities. I care about clean interface contracts, reusable components, and code that's fast and accessible by default." />
                    </div>
                </div>

                {/* Behind-the-work photo gallery */}
                <div className='mt-20 sm:mt-28'>
                    <Reveal className='max-w-2xl'>
                        <span className='inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary'>
                            <span className='h-px w-6 bg-primary' />
                            Behind the work
                        </span>
                        <h3 className='mt-4 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl'>Moments from the field.</h3>
                    </Reveal>

                    <div className='mt-10'>
                        <WorkGallery />
                    </div>
                </div>
            </div>
        </section>
    );
}
