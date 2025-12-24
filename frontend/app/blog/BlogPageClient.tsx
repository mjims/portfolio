'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Phone, Calendar, ArrowRight, User } from 'lucide-react';
import api from '@/lib/api';
import BlogSidebar from '@/components/blog/BlogSidebar';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    image: string;
    published_at: string;
}

export default function BlogPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Failed to fetch posts', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <main className="min-h-screen bg-[#f3f4f6]">
            {/* Hero Section */}
            <section className="relative h-[300px] w-full mt-20 overflow-hidden bg-white border-y border-gray-200">
                <div className="max-w-7xl mx-auto h-full flex flex-col md:flex-row items-center">
                    {/* Left: Aesthetic Image (Notebook/Phone part) */}
                    <div className="hidden md:block w-1/2 h-full relative">
                        <img
                            src="/images/blog_hero.png"
                            alt="Workspace"
                            className="absolute -left-20 inset-y-0 h-full w-[120%] object-cover opacity-80"
                        />
                    </div>

                    {/* Right: Info */}
                    <div className="w-full md:w-1/2 flex flex-col items-center md:items-end md:pr-12 text-center md:text-right py-8">
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#5a544b] mb-4">Edouard Denla</h1>
                        <div className="bg-[#bda995] text-white px-8 py-1.5 rounded-full text-sm font-bold mb-8 shadow-sm">
                            Analyste développeur
                        </div>
                        <div className="space-y-3">
                            <a href="mailto:contact@mjimsdenla.online" className="flex items-center justify-center md:justify-end gap-3 text-[#5a544b] hover:text-primary transition-colors">
                                <span className="text-sm font-medium">contact@mjimsdenla.online</span>
                                <div className="bg-black text-white p-1 rounded-sm shadow-sm">
                                    <Mail size={16} />
                                </div>
                            </a>
                            <a href="tel:+2290167697667" className="flex items-center justify-center md:justify-end gap-3 text-[#5a544b] hover:text-primary transition-colors">
                                <span className="text-sm font-medium">+229 0167 697 667</span>
                                <div className="bg-[#e7c7a5] text-white p-1 rounded-sm shadow-sm">
                                    <Phone size={16} />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                {/* Visual dots decoration from image */}
                <div className="absolute right-4 top-8 flex flex-col gap-2 opacity-20">
                    {[1, 2, 3].map(i => <div key={i} className="flex gap-2">{[1, 2, 3].map(j => <div key={j} className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>)}</div>)}
                </div>
            </section>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content: Blog Grid */}
                    <div className="flex-1">
                        <h2 className="text-4xl font-bold text-[#8a8a8a] mb-12">Edouard's blog</h2>

                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-96 bg-gray-200 rounded-xl" />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {posts.map((post) => (
                                    <motion.article
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full border border-gray-100"
                                    >
                                        <div className="aspect-[16/10] overflow-hidden">
                                            <img
                                                src={post.image.startsWith('http') ? post.image : `http://localhost:8000${post.image}`}
                                                alt={post.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-6 flex flex-col flex-1">
                                            <h3 className="text-lg font-bold text-[#333] mb-2 leading-snug">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-400 text-xs mb-6">
                                                Publié le {new Date(post.published_at).toLocaleDateString('fr-FR', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="mt-auto text-blue-500 text-sm font-medium hover:underline inline-flex items-center gap-1"
                                            >
                                                Lire l'article
                                            </Link>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <BlogSidebar />
                </div>
            </div>
        </main>
    );
}
