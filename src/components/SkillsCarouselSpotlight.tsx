'use client';

import React, { useRef, useState, useCallback, useMemo } from 'react';
import {
  Globe,
  Code2,
  Palette,
  FileCode,
  Layout,
  FileText,
  Server,
  Layers,
  Database,
  Cloud,
  HardDrive,
  GitBranch,
  Terminal,
  Cpu,
  Image,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

export type SkillCategory = 'All' | 'Frontend' | 'Backend' | 'Tools';

export interface SkillItem {
  id: string;
  name: string;
  subtitle: string;
  category: 'Frontend' | 'Backend' | 'Tools';
  badge: string;
  level: string;
  icon: React.ElementType;
  description: string;
  tags: string[];
  spotlightColor: string;
}

/**
 * Authentic portfolio skill records from AdrianCos Portfolio
 * Kept exactly as authored without altering content.
 */
export const skillsData: SkillItem[] = [
  {
    id: 'nextjs',
    name: 'Next.js',
    subtitle: 'Full-Stack React Framework',
    category: 'Frontend',
    badge: 'SSR / SSG',
    level: 'Production',
    icon: Globe,
    description:
      'App Router, Server Components, dynamic edge rendering, and built-in API routing.',
    tags: ['App Router', 'Server Components', 'SSR / SSG', 'Edge API'],
    spotlightColor: 'rgba(99, 102, 241, 0.28)', // Indigo
  },
  {
    id: 'react',
    name: 'React.js',
    subtitle: 'Component-Driven UI',
    category: 'Frontend',
    badge: 'Library',
    level: 'Core UI',
    icon: Code2,
    description:
      'Custom hooks, declarative lifecycle state management, and reusable modular architectures.',
    tags: ['Hooks', 'Virtual DOM', 'Modular UI', 'State Mgmt'],
    spotlightColor: 'rgba(14, 165, 233, 0.28)', // Sky
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    subtitle: 'Modern Utility Styling',
    category: 'Frontend',
    badge: 'Styling',
    level: 'Design',
    icon: Palette,
    description:
      'Utility-first rapid prototyping, responsive layouts, glassmorphism, and dynamic animations.',
    tags: ['Utility-First', 'Responsive', 'Glassmorphism', 'Animations'],
    spotlightColor: 'rgba(6, 182, 212, 0.28)', // Cyan
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    subtitle: 'Asynchronous & DOM',
    category: 'Frontend',
    badge: 'ES6+',
    level: 'Core',
    icon: FileCode,
    description:
      'Event-driven async/await workflows, canvas animation rendering, and REST endpoint consumption.',
    tags: ['ES6+', 'Async / Await', 'DOM', 'Canvas 2D'],
    spotlightColor: 'rgba(245, 158, 11, 0.28)', // Amber
  },
  {
    id: 'html5',
    name: 'HTML5',
    subtitle: 'Semantic Structure',
    category: 'Frontend',
    badge: 'Markup',
    level: 'Semantic',
    icon: Layout,
    description:
      'Accessible document structure (a11y), OpenGraph metadata, and Search Engine Optimization (SEO).',
    tags: ['Semantic', 'a11y', 'SEO Metadata', 'OpenGraph'],
    spotlightColor: 'rgba(249, 115, 22, 0.28)', // Orange
  },
  {
    id: 'css3',
    name: 'CSS3',
    subtitle: 'Flexbox, Grid & Animations',
    category: 'Frontend',
    badge: 'Layout & Motion',
    level: 'Animations',
    icon: FileText,
    description:
      'Custom keyframe choreography, 3D perspective transforms, and fluid media queries.',
    tags: ['Keyframe Animations', 'CSS Grid', 'Flexbox', '3D Transforms'],
    spotlightColor: 'rgba(59, 130, 246, 0.28)', // Blue
  },
  {
    id: 'php',
    name: 'PHP',
    subtitle: 'Object-Oriented Scripting',
    category: 'Backend',
    badge: 'Backend',
    level: 'Core Language',
    icon: Server,
    description:
      'Modular OOP design, session handling, secure password hashing, and server-side logic.',
    tags: ['OOP Design', 'Sessions', 'Password Hashing', 'Server-Side'],
    spotlightColor: 'rgba(99, 102, 241, 0.28)', // Indigo
  },
  {
    id: 'codeigniter',
    name: 'CodeIgniter',
    subtitle: 'MVC Web Framework',
    category: 'Backend',
    badge: 'MVC',
    level: 'Framework',
    icon: Layers,
    description:
      'Fast MVC architecture, query builder ORM, CSRF protection, and RESTful service development.',
    tags: ['MVC Architecture', 'Query Builder', 'CSRF Guard', 'REST APIs'],
    spotlightColor: 'rgba(238, 70, 35, 0.28)', // Ember Red-Orange
  },
  {
    id: 'supabase',
    name: 'Supabase',
    subtitle: 'PostgreSQL & Auth',
    category: 'Backend',
    badge: 'PostgreSQL',
    level: 'Database',
    icon: Database,
    description:
      'Realtime database subscriptions, Row Level Security (RLS) policies, and OAuth user sessions.',
    tags: ['PostgreSQL', 'RLS Policies', 'Realtime Sync', 'OAuth Auth'],
    spotlightColor: 'rgba(16, 185, 129, 0.28)', // Emerald
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    subtitle: 'Workers & Edge Redirection',
    category: 'Backend',
    badge: 'Edge API',
    level: 'Serverless',
    icon: Cloud,
    description:
      'Sub-50ms ultra-low latency serverless edge execution, caching, and dynamic URL redirection.',
    tags: ['Edge Workers', 'Serverless', 'Sub-50ms Latency', 'Edge Caching'],
    spotlightColor: 'rgba(243, 128, 32, 0.28)', // Amber/Orange
  },
  {
    id: 'mysql',
    name: 'MySQL',
    subtitle: 'Relational Database',
    category: 'Backend',
    badge: 'RDBMS',
    level: 'Relational',
    icon: HardDrive,
    description:
      '3NF schema normalization, primary & foreign keys, indexing optimization, and transactional safety.',
    tags: ['3NF Normalization', 'Foreign Keys', 'Indexing', 'Transactions'],
    spotlightColor: 'rgba(0, 117, 143, 0.28)', // Cyan / Deep Teal
  },
  {
    id: 'git-github',
    name: 'Git & GitHub',
    subtitle: 'Version Control & Workflow',
    category: 'Tools',
    badge: 'VCS',
    level: 'Collab',
    icon: GitBranch,
    description:
      'Branch management, pull requests, semantic commits, and open-source project maintenance.',
    tags: ['Branching', 'Pull Requests', 'Semantic Commits', 'Git CLI'],
    spotlightColor: 'rgba(240, 80, 50, 0.28)', // Git Orange
  },
  {
    id: 'vercel',
    name: 'Vercel',
    subtitle: 'Edge Cloud Deployment',
    category: 'Tools',
    badge: 'Deploy',
    level: 'DevOps',
    icon: Globe,
    description:
      'Automated GitHub continuous deployment (CI/CD), edge caching, and live environment previews.',
    tags: ['CI / CD', 'Edge Network', 'Instant Deploy', 'Previews'],
    spotlightColor: 'rgba(15, 23, 42, 0.35)', // Dark Slate
  },
  {
    id: 'wsl-ubuntu',
    name: 'WSL / Ubuntu',
    subtitle: 'Bash CLI & UNIX Dev',
    category: 'Tools',
    badge: 'Linux',
    level: 'Environment',
    icon: Terminal,
    description:
      'Command line pipelines, package management, daemon processes, and shell automation scripts.',
    tags: ['Ubuntu Linux', 'Bash CLI', 'System Daemons', 'Pipelines'],
    spotlightColor: 'rgba(233, 84, 32, 0.28)', // Ubuntu Orange
  },
  {
    id: 'python',
    name: 'Python',
    subtitle: 'Automation & OSINT',
    category: 'Tools',
    badge: 'Scripting',
    level: 'Scripting',
    icon: Cpu,
    description:
      'Network diagnostic scripts, automated data scraping, regex processing, and security queries.',
    tags: ['Automation', 'Web Scraping', 'Regex', 'OSINT Queries'],
    spotlightColor: 'rgba(55, 118, 171, 0.28)', // Python Blue
  },
  {
    id: 'canva',
    name: 'Canva',
    subtitle: 'UI/UX & Visual Assets',
    category: 'Tools',
    badge: 'Design',
    level: 'Visual Assets',
    icon: Image,
    description:
      'High-fidelity visual mockups, social presentation decks, brand assets, and infographic layout.',
    tags: ['UI Mockups', 'Brand Assets', 'Infographics', 'Presentations'],
    spotlightColor: 'rgba(0, 196, 204, 0.28)', // Canva Cyan
  },
];

interface SpotlightCardProps {
  skill: SkillItem;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({ skill }) => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const IconComponent = skill.icon;
  const accentColor = skill.spotlightColor;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex-shrink-0 w-[260px] xs:w-[280px] sm:w-[320px] lg:w-[340px] snap-start rounded-[1.75rem] sm:rounded-[2rem] p-5 sm:p-7 bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl overflow-hidden group select-none flex flex-col justify-between"
    >
      {/* 1. Dynamic Cursor Spotlight Radial Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[1.75rem] sm:rounded-[2rem] transition-opacity duration-300 ease-out z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, ${accentColor}, transparent 80%)`,
        }}
      />

      {/* 2. Card Content (Elevated above glow) */}
      <div className="relative z-10 flex flex-col h-full justify-between gap-4">
        {/* Top: Header Info */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            {/* Tech Icon Container */}
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center text-slate-800 dark:text-slate-100 group-hover:scale-110 transition-transform duration-300 shadow-xs">
              <IconComponent className="w-6 h-6 stroke-[1.8]" />
            </div>

            {/* Badge / Category Pill */}
            <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/70">
              {skill.badge}
            </span>
          </div>

          {/* Titles & Description */}
          <div>
            <div className="flex items-baseline justify-between gap-2">
              <h4 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                {skill.name}
              </h4>
            </div>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
              {skill.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2.5">
              {skill.description}
            </p>
          </div>
        </div>

        {/* Sub-technologies Tags */}
        <div className="space-y-3 pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="flex flex-wrap gap-1.5">
            {skill.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10.5px] font-mono px-2 py-0.5 rounded-md bg-slate-100/90 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/50"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom Footer Info */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pt-1">
            <span>{skill.category}</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {skill.level}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface SkillsCarouselSpotlightProps {
  skills?: SkillItem[];
  title?: string;
  subtitle?: string;
  badgeText?: string;
}

export const SkillsCarouselSpotlight: React.FC<SkillsCarouselSpotlightProps> = ({
  skills = skillsData,
  title = 'CORE SKILLS & TECHNOLOGIES',
  subtitle = 'Categorized toolset utilized for building reliable, production-ready full-stack applications.',
  badgeText = 'TECH ARSENAL',
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('All');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Filter skills based on chosen category tab
  const filteredSkills = useMemo(() => {
    if (activeCategory === 'All') return skills;
    return skills.filter((item) => item.category === activeCategory);
  }, [skills, activeCategory]);

  // Check scroll bounds to disable buttons
  const checkScrollPosition = useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  // Smooth scroll handler
  const handleScroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const cardWidth = 340; // width + gap
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
    setTimeout(checkScrollPosition, 320);
  };

  // Switch category and reset scroll position
  const handleCategoryChange = (category: SkillCategory) => {
    setActiveCategory(category);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
    setTimeout(checkScrollPosition, 200);
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      {/* Decorative subtle ambient backdrop orbs */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto space-y-4 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-[#fc5000]" />
          <span>{badgeText}</span>
        </div>

        <h3 className="font-display text-4xl sm:text-6xl lg:text-7xl text-slate-900 dark:text-white leading-[0.95] tracking-[0.02em] uppercase font-black">
          {title}
        </h3>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium">
          {subtitle}
        </p>

        {/* Interactive Filter Controls */}
        <div className="pt-4 flex justify-center max-w-full">
          <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-slate-100 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 rounded-full text-xs sm:text-sm shadow-xs max-w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {(['All', 'Frontend', 'Backend', 'Tools'] as SkillCategory[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  activeCategory === cat
                    ? 'bg-[#fc5000] text-white shadow-sm font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {cat === 'Backend' ? 'Backend & DB' : cat === 'All' ? 'All Skills' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel Track with Arrow Controls */}
      <div className="relative max-w-7xl mx-auto px-2 sm:px-4">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={() => handleScroll('left')}
          disabled={!canScrollLeft}
          aria-label="Previous Skills"
          className="absolute -left-2 sm:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700 shadow-lg text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 flex items-center justify-center cursor-pointer group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={() => handleScroll('right')}
          disabled={!canScrollRight}
          aria-label="Next Skills"
          className="absolute -right-2 sm:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700 shadow-lg text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 flex items-center justify-center cursor-pointer group"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Horizontal Scroll Track */}
        <div
          ref={carouselRef}
          onScroll={checkScrollPosition}
          className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-6 px-3 sm:px-6 cursor-grab active:cursor-grabbing items-stretch [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {filteredSkills.map((skill) => (
            <SpotlightCard key={skill.id} skill={skill} />
          ))}
        </div>

        {/* Bottom Status & Swipe Hint */}
        <div className="flex items-center justify-between px-4 pt-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <span className="px-2.5 py-1 rounded-full bg-white/70 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs">
            Showing {filteredSkills.length} of {skills.length} developer tools
          </span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#fc5000] animate-pulse" />
            <span>Swipe or drag horizontally</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsCarouselSpotlight;
