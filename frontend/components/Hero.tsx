'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-white" style={{ boxShadow: '0px 0px 16px 16px #fff' }}>
            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-60" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-60" />

            <div className="section-padding relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 mb-8"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#35b03f] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#35b03f]"></span>
                    </span>
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">Disponible pour freelance</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-6xl md:text-8xl font-display font-bold text-foreground leading-tight mb-8"
                >
                    Développeur <br />
                    <span className="text-gradient">Full Stack</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    Je conçois et développe des expériences numériques d'exception, alliant design moderne et technologies de pointe pour donner vie à vos idées.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-6"
                >
                    <button
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group bg-primary text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-primary/25"
                    >
                        Voir mes projets
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 rounded-full font-bold text-lg text-foreground bg-background-alt/50 border border-border hover:bg-background-alt transition-all"
                    >
                        Démarrons un projet
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
