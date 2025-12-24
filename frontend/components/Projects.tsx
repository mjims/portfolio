'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import api from '@/lib/api';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    demo_url?: string;
    github_url?: string;
    tags?: string;
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects');
                setProjects(response.data);
            } catch (error) {
                console.error('Failed to fetch projects', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (isLoading) return null;

    return (
        <section id="projects" className="bg-white" style={{ boxShadow: '0px 0px 16px 8px #fff' }}>
            <div className='section-padding relative'>
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Mes Réalisations<span className="text-primary">.</span></h2>
                    <p className="text-secondary max-w-lg">
                        Un aperçu des projets les plus stimulants et impactants que j'ai réalisés avec passion.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <img
                                    src={project.image.startsWith('http') ? project.image : `http://localhost:8000${project.image}`}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {project.title}
                                </h3>
                                <p className="text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags?.split(',').map(tag => (
                                        <span key={tag} className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded-md border border-primary/10">
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-6 pt-4 border-t border-border/50">
                                    {project.demo_url && (
                                        <a href={project.demo_url} target="_blank" className="flex items-center gap-2 text-xs font-bold text-primary hover:opacity-70 transition-opacity">
                                            <ExternalLink size={14} />
                                            Démo
                                        </a>
                                    )}
                                    {project.github_url && (
                                        <a href={project.github_url} target="_blank" className="flex items-center gap-2 text-xs font-bold text-secondary hover:text-foreground transition-colors">
                                            <Github size={14} />
                                            Code Source
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
