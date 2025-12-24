'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const navItems = [
    { name: 'Accueil', id: 'home', href: '/#home' },
    { name: 'Expertise', id: 'skills', href: '/#skills' },
    { name: 'Projets', id: 'projects', href: '/#projects' },
    { name: 'Contact', id: 'contact', href: '/#contact' },
    { name: 'Blog', id: 'blog', href: '/blog' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sections = ['home', 'skills', 'projects', 'blog', 'contact'];
        sections.forEach((section) => {
            const el = document.getElementById(section);
            if (el) observer.observe(el);
        });

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            sections.forEach((section) => {
                const el = document.getElementById(section);
                if (el) observer.unobserve(el);
            });
        };
    }, [pathname]);

    const handleNavClick = (id: string, href: string) => {
        if (pathname === '/' && href.startsWith('/#')) {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            router.push(href);
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || pathname !== '/' ? 'py-4 bg-white/80 backdrop-blur-md border-b border-border/50 shadow-sm' : 'py-6 font-medium'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div
                    className="text-2xl font-display font-bold text-foreground cursor-pointer"
                    onClick={() => handleNavClick('home', '/#home')}
                >
                    MJIMS<span className="text-primary">.</span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-2 bg-white/70 backdrop-blur-md px-2 py-2 rounded-full border border-border/50 shadow-sm">
                    {navItems.map((item) => (
                        <button
                            key={item.href}
                            onClick={() => handleNavClick(item.id, item.href)}
                            className={`px-6 py-2 rounded-full transition-all duration-300 ${(pathname === '/' && activeSection === item.id) || (pathname === item.href)
                                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                                    : 'text-secondary hover:text-foreground hover:bg-black/5'
                                }`}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => handleNavClick('contact', '/#contact')}
                        className={`hidden md:flex items-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-full font-bold hover:bg-primary transition-all shadow-md active:scale-95 ${pathname === '/' && activeSection === 'contact' ? 'bg-primary' : ''}`}
                    >
                        Parlons-en
                        <Mail size={18} />
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-foreground"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-border overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navItems.map((item) => (
                                <button
                                    key={item.href}
                                    onClick={() => handleNavClick(item.id, item.href)}
                                    className={`text-left text-lg font-bold py-2 ${(pathname === '/' && activeSection === item.id) || (pathname === item.href)
                                            ? 'text-primary'
                                            : 'text-foreground'
                                        }`}
                                >
                                    {item.name}
                                </button>
                            ))}
                            <button
                                onClick={() => handleNavClick('contact', '/#contact')}
                                className={`text-left text-lg font-bold py-2 ${pathname === '/' && activeSection === 'contact' ? 'text-primary' : 'text-foreground'}`}
                            >
                                Parlons-en
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
