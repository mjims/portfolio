'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h2 className="text-xl font-display font-bold text-white mb-2">MJIMS<span className="text-primary">.</span></h2>
                    <p className="text-secondary text-sm max-w-xs">
                        Building premium digital experiences with a focus on high performance and exceptional design.
                    </p>
                </div>

                <div className="flex space-x-6">
                    <a href="#" className="text-secondary hover:text-primary transition-colors"><Github size={20} /></a>
                    <a href="#" className="text-secondary hover:text-primary transition-colors"><Twitter size={20} /></a>
                    <a href="#" className="text-secondary hover:text-primary transition-colors"><Linkedin size={20} /></a>
                    <a href="#" className="text-secondary hover:text-primary transition-colors"><Mail size={20} /></a>
                </div>

                <p className="text-secondary text-xs">
                    © {new Date().getFullYear()} MJIMS. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
