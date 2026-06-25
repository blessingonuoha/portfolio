import { Navbar } from '@/components/sections/navbar';
import { Hero } from '@/components/sections/hero';
import { Marquee } from '@/components/sections/marquee';
import { About } from '@/components/sections/about';
import { Projects } from '@/components/sections/projects';
import { Skills } from '@/components/sections/skills';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';

export default function Home() {
    return (
        <>
            <Navbar />

            <main id='main' className='flex-1'>
                <Hero />
                <Marquee />
                <About />
                <Projects />
                <Skills />
                <Contact />
            </main>

            <Footer />
        </>
    );
}
