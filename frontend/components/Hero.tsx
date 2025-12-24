'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />

            <div className="section-padding relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block glass px-4 py-1.5 rounded-full text-xs font-bold text-primary mb-6 ring-1 ring-white/10 uppercase tracking-widest">
                        Available for freelance
                    </span>

                    <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 leading-[1.1] tracking-tighter">
                        Crafting <span className="text-gradient">Premium</span> <br />
                        Digital Experiences.
                    </h1>

                    <p className="max-w-xl mx-auto text-lg md:text-xl text-secondary mb-12 leading-relaxed">
                        I'm a full-stack developer dedicated to building high-performance
                        web applications with state-of-the-art aesthetics.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="#projects"
                            className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-blue-600 transition-all hover:scale-105"
                        >
                            View Projects
                        </a>
                        <a
                            href="#contact"
                            className="w-full sm:w-auto px-8 py-4 glass rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                        >
                            Get in touch <ArrowRight size={18} />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
