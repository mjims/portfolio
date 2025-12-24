'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api';

interface Skill {
    id: number;
    name: string;
    category: string;
    level: number;
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

    if (isLoading) return null;

    return (
        <section id="skills" className="section-padding">
            <div className="mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Expertise<span className="text-primary">.</span></h2>
                <p className="text-secondary max-w-lg">
                    A curated selection of technologies and tools I've mastered to build world-class digital solutions.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="glass p-6 rounded-2xl group hover:border-primary/50 transition-all cursor-default"
                    >
                        <div className="flex flex-col h-full justify-between">
                            <div>
                                <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 block">
                                    {skill.category}
                                </span>
                                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                                    {skill.name}
                                </h3>
                            </div>
                            <div className="mt-4 w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="bg-primary h-full"
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
