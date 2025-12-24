'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe, Database, PenTool as Tool } from 'lucide-react';
import api from '@/lib/api';

interface Skill {
    id: number;
    name: string;
    type: 'language' | 'framework' | 'cms' | 'database' | 'tool';
    icon: string;
}

export default function Skills() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await api.get('/skills');
                setSkills(response.data);
            } catch (error) {
                console.error('Failed to fetch skills', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSkills();
    }, []);

    const languages = skills.filter(s => s.type === 'language');
    const frameworks = skills.filter(s => s.type === 'framework');
    const cms = skills.filter(s => s.type === 'cms');
    const databases = skills.filter(s => s.type === 'database');
    const tools = skills.filter(s => s.type === 'tool');

    if (isLoading) return null;

    return (
        <section id="skills" className="bg-[#ebebeb]" style={{ boxShadow: '0px 0px 16px 16px #ebebeb' }}>
            <div className="section-padding relative">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Expertise<span className="text-primary">.</span></h2>
                    <p className="text-secondary max-w-lg">
                        Une maîtrise approfondie des technologies modernes pour construire des solutions numériques performantes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 bg-white rounded-xl overflow-hidden border border-border shadow-soft">
                    {/* Languages & Frameworks */}
                    <div className="p-8 flex flex-col items-center text-center border-b lg:border-b-0 lg:border-r border-border hover:bg-black/[0.01] transition-colors">
                        <div className="w-16 h-16 bg-white border border-border rounded-full flex items-center justify-center mb-8 shadow-sm">
                            <Code2 size={32} />
                        </div>
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-[0.2em] mb-6">
                            LANGUAGES ET FRAMEWORKS
                        </h3>
                        <p className="text-secondary text-sm mb-6">
                            Maîtrise de plusieurs langages et frameworks modernes
                        </p>

                        <div className="w-full mb-6">
                            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3 opacity-70">Languages</p>
                            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-foreground font-medium text-sm">
                                {languages.map((s, i) => (
                                    <span key={s.id}>
                                        {s.name}{i < languages.length - 1 ? ',' : ''}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="w-full pt-6 border-t border-border/50">
                            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3 opacity-70">Frameworks</p>
                            <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-foreground font-medium text-sm">
                                {frameworks.map(s => (
                                    <li key={s.id}>{s.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* CMS */}
                    <div className="p-8 flex flex-col items-center text-center border-b lg:border-b-0 lg:border-r border-border hover:bg-black/[0.01] transition-colors">
                        <div className="w-16 h-16 bg-white border border-border rounded-full flex items-center justify-center mb-8 shadow-sm">
                            <Globe size={32} className="text-foreground" />
                        </div>
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-[0.2em] mb-6">
                            CMS
                        </h3>
                        <p className="text-secondary text-sm mb-8 max-w-[280px]">
                            Maîtrise des CMS populaires pour des solutions e-commerce et blogs performantes.
                        </p>
                        <ul className="text-foreground font-medium space-y-2 text-sm">
                            {cms.map(s => (
                                <li key={s.id}>{s.name}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Databases */}
                    <div className="p-8 flex flex-col items-center text-center border-b md:border-b-0 lg:border-r border-border hover:bg-black/[0.01] transition-colors">
                        <div className="w-16 h-16 bg-white border border-border rounded-full flex items-center justify-center mb-8 shadow-sm">
                            <Database size={32} className="text-foreground" />
                        </div>
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-[0.2em] mb-6">
                            Base de données
                        </h3>
                        <p className="text-secondary text-sm mb-8">
                            Gestion efficace des données structurées et non structurées.
                        </p>
                        <ul className="text-foreground font-medium space-y-2 text-sm">
                            {databases.map(s => (
                                <li key={s.id}>{s.name}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Tools */}
                    <div className="p-8 flex flex-col items-center text-center hover:bg-black/[0.01] transition-colors">
                        <div className="w-16 h-16 bg-white border border-border rounded-full flex items-center justify-center mb-8 shadow-sm">
                            <Tool size={32} className="text-foreground" />
                        </div>
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-[0.2em] mb-6">
                            Outils
                        </h3>
                        <p className="text-secondary text-sm mb-8">
                            Utilisation d'outils modernes pour le développement et le déploiement.
                        </p>
                        <ul className="text-foreground font-medium space-y-2 text-sm">
                            {tools.map(s => (
                                <li key={s.id}>{s.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
