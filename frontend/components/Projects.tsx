'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '@/lib/api';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    url?: string;
    github_url?: string;
    languages?: string;
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            // Calculate item width based on the first item or average if items have different widths
            // For snap-mandatory, it's usually safe to assume items are roughly the same width or we can get the first child's width
            const firstChild = container.firstElementChild as HTMLElement;
            const itemWidth = firstChild ? firstChild.offsetWidth + 32 : 0; // +32 for gap-8 (2rem = 32px)

            if (itemWidth > 0) {
                const index = Math.round(scrollLeft / itemWidth);
                setCurrentIndex(index);
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [projects.length]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            const newScrollLeft = scrollContainerRef.current.scrollLeft +
                (direction === 'right' ? scrollAmount : -scrollAmount);

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    const goToSlide = (index: number) => {
        if (scrollContainerRef.current) {
            const firstChild = scrollContainerRef.current.firstElementChild as HTMLElement;
            const itemWidth = firstChild ? firstChild.offsetWidth + 32 : 0; // +32 for gap-8 (2rem = 32px)

            if (itemWidth > 0) {
                scrollContainerRef.current.scrollTo({
                    left: itemWidth * index,
                    behavior: 'smooth'
                });
            }
        }
    };

    if (isLoading) return null;
    if (projects.length === 0) return null;

    return (
        <section id="projects" className="bg-white" style={{ boxShadow: '0px 0px 16px 8px #fff' }}>
            <div className='section-padding relative'>
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Mes Réalisations<span className="text-primary">.</span></h2>
                    <p className="text-secondary max-w-lg">
                        Un aperçu des projets récents que j'ai réalisés avec passion.
                    </p>
                </div>

                <div className="relative">
                    {/* Scroll Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-8 overflow-x-auto scroll-smooth pb-4 scrollbar-hide snap-x snap-mandatory"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50 flex-shrink-0 w-[85%] md:w-[45%] lg:w-[30%] snap-start"
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
                                        {project.languages?.split(',').map((tag: string) => (
                                            <span key={tag} className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded-md border border-primary/10">
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-6 pt-4 border-t border-border/50">
                                        {project.url && (
                                            <a href={project.url} target="_blank" className="flex items-center gap-2 text-xs font-bold text-primary hover:opacity-70 transition-opacity">
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

                    {/* Navigation Arrows */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 bg-white hover:bg-primary text-foreground hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 z-10"
                        aria-label="Projet précédent"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 bg-white hover:bg-primary text-foreground hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 z-10"
                        aria-label="Projet suivant"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 mt-12">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'w-8 bg-primary'
                                    : 'w-2 bg-border hover:bg-primary/50'
                                }`}
                            aria-label={`Aller au projet ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}
