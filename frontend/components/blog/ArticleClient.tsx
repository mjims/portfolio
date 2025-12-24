'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import BlogSidebar from '@/components/blog/BlogSidebar';
import api from '@/lib/api';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    published_at: string;
}

export default function ArticleClient({ post }: { post: Post }) {
    const [otherPosts, setOtherPosts] = useState<Post[]>([]);
    const [isSidebarSticky, setIsSidebarSticky] = useState(false);
    const otherArticlesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchOtherPosts = async () => {
            try {
                const response = await api.get('/posts');
                // Filter out current post and take first 4
                setOtherPosts(response.data.filter((p: Post) => p.id !== post.id).slice(0, 4));
            } catch (error) {
                console.error('Failed to fetch other posts', error);
            }
        };
        fetchOtherPosts();
    }, [post.id]);

    useEffect(() => {
        const handleScroll = () => {
            if (!otherArticlesRef.current) return;

            const otherArticlesRect = otherArticlesRef.current.getBoundingClientRect();

            // La CTA devient sticky quand "Autres articles" sort complètement de l'écran par le haut
            // Et redevient normale quand "Autres articles" revient dans l'écran
            if (otherArticlesRect.bottom < 80) {
                setIsSidebarSticky(true);
            } else {
                setIsSidebarSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main className="min-h-screen bg-[#ebebeb] font-sans font-[eurostile]">
            {/* Large Banner */}
            <div
                className="relative max-w-7xl mx-auto h-[250px] md:h-[300px] mt-20 overflow-hidden flex items-center justify-center bg-[#c5c5c5] shadow-lg rounded-lg"
            >
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                {/* Optional overlay for better text readability if needed */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-4 md:px-0 relative pb-20 mt-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Title Section with gray background */}
                        <div className="py-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-[#7a7a7a] leading-tight mb-0">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-2 text-[#999] text-sm">
                                Publié le {new Date(post.published_at).toLocaleDateString('fr-FR', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </div>
                        </div>

                        {/* Article Body with white background */}
                        <div className="px-8 md:px-0">
                            <div
                                className="article-content"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </div>

                        {/* Back to blog link */}
                        <div className="mt-8">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors font-medium"
                            >
                                <ArrowLeft size={18} />
                                Retour au blog
                            </Link>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:w-[420px] space-y-8 flex flex-col">
                        <BlogSidebar enableSticky={true} isSticky={isSidebarSticky} />

                        {/* Autres Articles Section */}
                        <div ref={otherArticlesRef} className="rounded-[3px] p-6 shadow-sm border border-[3px] border-[#316bf2] relative">
                            <div className="absolute -top-3 left-6 bg-[#ebebeb] px-3">
                                <h3 className="text-secondary font-bold flex items-center justify-between">
                                    Autres articles
                                </h3>
                            </div>

                            <div className="space-y-3 flex flex-col">
                                {otherPosts.map((other) => (
                                    <Link
                                        key={other.id}
                                        href={`/blog/${other.slug}`}
                                    >
                                        <div className='group flex gap-4 items-start border border-[#c1d7cd]'>
                                            <div className="w-[40%] h-20 overflow-hidden shrink-0">
                                                <img
                                                    src={other.image.startsWith('http') ? other.image : `http://localhost:8000${other.image}`}
                                                    alt={other.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <h4 className="text-sm font-bold text-[#333] leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                                    {other.title}
                                                </h4>
                                                <span className="text-[10px] text-gray-400 mt-2 capitalize">
                                                    {new Date(other.published_at).toLocaleDateString('fr-FR', {
                                                        day: '2-digit',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <style jsx global>{`
                .article-content {
                    color: #4a4a4a;
                    line-height: 1.8;
                }
                .article-content h1, .article-content h2, .article-content h3 {
                    color: #4a4a4a;
                    font-weight: 700;
                    margin-top: 2.5rem;
                    margin-bottom: 1.2rem;
                    line-height: 1.3;
                }
                .article-content h1 { 
                    font-size: 2rem; 
                }
                .article-content h2 { 
                    font-size: 1.75rem;
                }
                .article-content h3 { 
                    font-size: 1.5rem; 
                }
                .article-content p {
                    margin-bottom: 1.5rem;
                    font-size: 1.05rem;
                    line-height: 1.8;
                }
                .article-content ul {
                    list-style-type: none;
                    padding-left: 0;
                    margin-bottom: 2rem;
                }
                .article-content li {
                    margin-bottom: 0.8rem;
                    position: relative;
                    padding-left: 1.5rem;
                    font-size: 1.05rem;
                }
                .article-content li::before {
                    content: "•";
                    color: #4a4a4a;
                    position: absolute;
                    left: 0;
                    font-weight: bold;
                }
                .article-content strong {
                    color: #222;
                    font-weight: 700;
                }
                .article-content a {
                    color: #3b82f6;
                    text-decoration: underline;
                    font-weight: 500;
                }
            `}</style>
        </main>
    );
}
