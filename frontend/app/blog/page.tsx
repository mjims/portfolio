import { Metadata } from 'next';
import { generateSEOMetadata, generateBlogStructuredData } from '@/lib/metadata';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = generateSEOMetadata({
    title: 'Blog',
    description: 'Articles techniques, tutoriels et réflexions sur le développement web et mobile. Découvrez mes dernières publications sur React, Next.js, Laravel et plus encore.',
    url: '/blog',
    keywords: [
        'blog développement web',
        'tutoriels React',
        'articles Next.js',
        'Laravel tutoriels',
        'développement mobile',
        'articles techniques'
    ]
});

export default function BlogPage() {
    const blogSchema = generateBlogStructuredData();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
            />
            <BlogPageClient />
        </>
    );
}
