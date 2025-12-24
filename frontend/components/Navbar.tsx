'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const navItems = [
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 glass m-4 rounded-2xl px-6 py-4 flex justify-between items-center"
        >
            <Link href="/" className="text-2xl font-display font-bold text-white tracking-tighter hover:opacity-80 transition-opacity">
                MJIMS<span className="text-primary">.</span>
            </Link>

            <div className="hidden md:flex space-x-8">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="text-sm font-medium text-secondary hover:text-white transition-colors"
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

            <Link
                href="#contact"
                className="bg-primary text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-600 transition-all hover:scale-105 active:scale-95"
            >
                Let's talk
            </Link>
        </motion.nav>
    );
}
