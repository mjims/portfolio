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
        <section id="projects" className="section-padding">
            <div className="mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Selected Work<span className="text-primary">.</span></h2>
                <p className="text-secondary max-w-lg">
                    A deep dive into some of the most challenging and impactful projects I've brought to life.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative bg-card rounded-3xl overflow-hidden border border-border hover:border-primary/30 transition-all"
                    >
                        <div className="relative aspect-video overflow-hidden">
                            <Image
                                src={project.image.startsWith('http') ? project.image : `http://localhost:8000${project.image}`}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                {project.demo_url && (
                                    <a href={project.demo_url} target="_blank" className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                                        <ExternalLink size={20} />
                                    </a>
                                )}
                                {project.github_url && (
                                    <a href={project.github_url} target="_blank" className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                                        <Github size={20} />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags?.split(',').map(tag => (
                                    <span key={tag} className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded">
                                        {tag.trim()}
                                    </span>
                                ))}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-secondary text-sm leading-relaxed mb-6">
                                {project.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
