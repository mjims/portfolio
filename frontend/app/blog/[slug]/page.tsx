'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ArticleClient from '@/components/blog/ArticleClient';
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

export default function Page() {
    const params = useParams();
    const slug = params.slug as string;
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/posts/${slug}`);
                setPost(response.data);
            } catch (error) {
                console.error('Failed to fetch post', error);
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };

        if (slug) {
            fetchPost();
        }
    }, [slug]);

    if (isLoading) {
        return (
            <main className="min-h-screen bg-[#f3f4f6] pt-32 pb-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-secondary">Chargement de l'article...</p>
                </div>
            </main>
        );
    }

    if (error || !post) {
        return (
            <main className="min-h-screen bg-[#f3f4f6] pt-32 pb-20 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Article introuvable</h1>
                    <p className="text-secondary mb-8">Cet article n'existe pas ou a été supprimé.</p>
                    <a href="/blog" className="text-primary font-bold hover:underline">
                        ← Retour au blog
                    </a>
                </div>
            </main>
        );
    }

    return <ArticleClient post={post} />;
}
