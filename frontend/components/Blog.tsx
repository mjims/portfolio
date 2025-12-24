'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import api from '@/lib/api';

interface Post {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    published_at: string;
    category?: { name: string };
}

export default function Blog() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetch only the latest 3 posts for the homepage
                const response = await api.get('/posts');
                setPosts(response.data.slice(0, 3));
            } catch (error) {
                console.error('Failed to fetch posts', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (isLoading) return null;

    return (
        <section id="blog" className="section-padding">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest Insights<span className="text-primary">.</span></h2>
                    <p className="text-secondary max-w-lg">
                        Thoughts, tutorials, and reflections on technology, design, and building for the web.
                    </p>
                </div>
                <Link href="/blog" className="text-primary font-bold flex items-center gap-2 hover:opacity-80 transition-opacity pb-2">
                    View all posts <ArrowRight size={18} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                    <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group flex flex-col"
                    >
                        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6 border border-border">
                            <Image
                                src={post.image.startsWith('http') ? post.image : `http://localhost:8000${post.image}`}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {post.category && (
                                <span className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                                    {post.category.name}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-4 text-xs text-secondary mb-4">
                            <div className="flex items-center gap-1.5">
                                <Calendar size={14} />
                                {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <User size={14} />
                                MJIMS
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors leading-snug">
                            {post.title}
                        </h3>
                        <p className="text-secondary text-sm leading-relaxed mb-6 line-clamp-2">
                            {post.excerpt}
                        </p>

                        <Link
                            href={`/blog/${post.id}`}
                            className="mt-auto inline-flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest hover:text-primary transition-colors"
                        >
                            Read More <ArrowRight size={14} />
                        </Link>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}
