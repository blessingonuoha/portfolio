import type { ComponentType, SVGProps } from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons/social-icons';

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export const SITE = {
    name: 'Blessing Onuoha',
    role: 'Frontend & Web3 Engineer',
    email: 'blessingonuoha.dev@gmail.com',
    location: 'Imo State, NG · Remote',
    tagline: 'I build fast, accessible products for the web and web3.',
};

export type GalleryPhoto = { src: string; alt: string };

// Behind-the-work photos. Drop files in public/gallery/ and list them here.
// Any number works; the mosaic adapts. Missing files show a soft gradient tile.
export const WORK_GALLERY: GalleryPhoto[] = [
    { src: '/gallery/work-1.jpg', alt: 'Blessing at work' },
    { src: '/gallery/work-2.jpg', alt: 'On the job' },
    { src: '/gallery/work-3.jpg', alt: 'Building with the team' },
    { src: '/gallery/work-4.jpg', alt: 'Heads-down focus' },
    { src: '/gallery/work-2.jpeg', alt: 'Workspace setup' },
    { src: '/gallery/work-6.jpg', alt: 'Shipping the work' },
];

export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
];

export type Social = { label: string; href: string; icon: IconType };

export const SOCIALS: Social[] = [
    { label: 'GitHub', href: 'https://github.com/blessingonuoha', icon: GithubIcon },
    {
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/blessing-onuoha-4b92a28a',
        icon: LinkedinIcon,
    },
    { label: 'Email', href: 'mailto:blessingonuoha.dev@gmail.com', icon: Mail },
];

export type Stat = { value: string; label: string };

export const STATS: Stat[] = [
    { value: '3+', label: 'Years building' },
    { value: '75%', label: 'User growth driven' },
    { value: '98%', label: 'Vulns reduced' },
];

export type Project = {
    title: string;
    category: string;
    description: string;
    year: string;
    tags: string[];
    href: string;
    images?: string[]; // screenshots/previews; multiple → slideshow. Falls back to the accent gradient
    featured?: boolean;
    accent: string; // gradient classes for the visual
};

export const PROJECTS: Project[] = [
    {
        title: 'Jamit',
        category: 'Web3 Audio Platform',
        description:
            'Frontend for an AI-powered social audio platform — streaming, payments, and creator tools — plus security audits that cut smart-contract vulnerabilities by 98%.',
        year: '2025',
        tags: ['Next.js', 'TypeScript', 'Solidity', 'Ethers.js'],
        href: 'https://jamit.app',
        images: ['/projects/jamit-1.webp', '/projects/jamit-2.webp', '/projects/jamit-3.webp', '/projects/jamit-4.webp', '/projects/jamit-5.webp'],
        featured: true,
        accent: 'from-violet-500/30 via-indigo-500/20 to-transparent',
    },
    {
        title: 'Briv Bank',
        category: 'Fintech · Fullstack',
        description:
            'A comprehensive online banking app: account creation, financial services, and an analytics dashboard for real-time expense monitoring and insights.',
        year: '2025',
        tags: ['Next.js', 'MongoDB', 'TanStack Query', 'Framer Motion'],
        href: 'https://brivbank.com',
        images: ['/projects/briv-1.webp', '/projects/briv-2.png', '/projects/briv-3.webp', '/projects/briv-4.webp'],
        accent: 'from-emerald-500/30 via-teal-500/20 to-transparent',
    },
    {
        title: 'Nestrova',
        category: 'Recruitment Platform',
        description:
            'Led frontend for a talent–employer matching platform for African tech talent — reusable profiles, AI-driven shortlisting, and employer dashboards that cut hiring from weeks to hours.',
        year: '2025',
        tags: ['Next.js', 'Zustand', 'TanStack Query', 'OAuth'],
        href: 'https://www.nestrovar.com/',
        images: ['/projects/nestrovar-1.webp', '/projects/nestrovar-2.webp', '/projects/nestrovar-3.jpg', '/projects/nestrovar-4.webp'],
        accent: 'from-sky-500/30 via-cyan-500/20 to-transparent',
    },
    {
        title: 'Jamit Studio',
        category: 'Web3 · Creator CMS',
        description:
            'Creator CMS for an AI-powered social audio platform — podcasts, audiobooks, and series — with on-chain account-abstraction features baked in.',
        year: '2025',
        tags: ['Next.js', 'Viem', 'Alchemy SDK', 'Biconomy'],
        href: 'https://studio.jamit.app',
        images: ['/projects/studio-1.png'],
        accent: 'from-indigo-500/30 via-violet-500/20 to-transparent',
    },
    {
        title: 'Jamit My Account',
        category: 'Web3 · Identity',
        description:
            'Full-featured account management with OAuth, identity verification, and multi-language support — wired to account-abstraction wallets for Jamit users.',
        year: '2025',
        tags: ['Next.js', 'Zustand', 'Stripe Identity', 'Account Abstraction'],
        href: 'https://my.jamit.app',
        images: ['/projects/my-1.png'],
        accent: 'from-blue-500/30 via-cyan-500/20 to-transparent',
    },
    {
        title: 'Duerents',
        category: 'PropTech',
        description:
            "Led frontend for a property-rental platform serving landlords, tenants, and agents — maps, listings, and payments tailored to Nigeria's real-estate market.",
        year: '2025',
        tags: ['Next.js', 'Google Maps API', 'Paystack', 'Zod'],
        href: 'https://dev.duerents.deveote.com',
        images: ['/projects/duerents-1.webp', '/projects/duerents-2.webp', '/projects/duerents-3.webp', '/projects/duerents-4.webp'],
        accent: 'from-amber-500/30 via-orange-500/20 to-transparent',
    },
    {
        title: 'Àwùjọ',
        category: 'EdTech · Language',
        description: 'A culturally immersive platform for learning Yoruba — live one-on-one and group instruction serving learners across three continents.',
        year: '2025',
        tags: ['Next.js', 'TanStack Query', 'Stripe', 'React Hook Form'],
        href: 'https://dev.ourawujo.com',
        images: [
            '/projects/awujo-1.png',
            '/projects/awujo-2.png',
            '/projects/awujo-3.png',
            '/projects/awujo-4.png',
            '/projects/awujo-5.png',
            '/projects/awujo-6.png',
        ],
        accent: 'from-fuchsia-500/30 via-pink-500/20 to-transparent',
    },
    {
        title: 'Revlot',
        category: 'Frontend Build',
        description: 'Frontend engineering for Revlot, built on a modern Next.js 15 + React 19 stack with Radix UI and a focus on fast, accessible interfaces.',
        year: '2024',
        tags: ['Next.js', 'React 19', 'Radix UI', 'Turbopack'],
        href: 'https://revlot.co',
        images: ['/projects/revlot-1.webp', '/projects/revlot-2.webp', '/projects/revlot-3.webp'],
        accent: 'from-rose-500/30 via-red-500/20 to-transparent',
    },
];

export type SkillGroup = { title: string; items: string[] };

export const SKILL_GROUPS: SkillGroup[] = [
    {
        title: 'Languages',
        items: ['JavaScript', 'TypeScript', 'Solidity', 'HTML', 'CSS', 'SCSS'],
    },
    {
        title: 'Frontend',
        items: ['React', 'Next.js', 'Tailwind CSS', 'shadcn/ui', 'Radix UI', 'Headless UI', 'Styled Components', 'Bootstrap', 'PWAs'],
    },
    {
        title: 'State & Forms',
        items: ['Zustand', 'TanStack Query', 'React Hook Form', 'Zod'],
    },
    {
        title: 'UI & Motion',
        items: ['Framer Motion', 'GSAP', 'Lucide React', 'React Icons'],
    },
    {
        title: 'Backend & Storage',
        items: ['Node.js', 'Express.js', 'MongoDB', 'Supabase', 'AWS S3', 'Cloudinary', 'Google Cloud Storage', 'Google Maps API'],
    },
    {
        title: 'Web3',
        items: ['Smart Contract Audits', 'Ethers.js', 'Viem', 'web3.js', 'Alchemy SDK', 'Moralis', 'Biconomy', 'Coinbase SDK', 'Account Abstraction'],
    },
    {
        title: 'Auth, i18n & Payments',
        items: ['OAuth', 'Stripe', 'Stripe Identity', 'Paystack', 'next-intl'],
    },
    {
        title: 'Tooling & Practice',
        items: ['Git', 'ESLint', 'Turbopack', 'PostHog', 'AWS CodeBuild', 'Resend', 'Unit Testing', 'SCRUM'],
    },
];

export const MARQUEE_ITEMS: string[] = [
    'React',
    'Next.js',
    'TypeScript',
    'Solidity',
    'Tailwind CSS',
    'Web3',
    'Ethers.js',
    'Node.js',
    'MongoDB',
    'shadcn/ui',
    'Viem',
    'Smart Contracts',
];
