import { MetadataRoute } from 'next';

async function getPosts() {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${apiUrl}/posts`, {
            next: { revalidate: 3600 } // Revalidate every hour
        });

        if (!response.ok) {
            console.error('Failed to fetch posts for sitemap');
            return [];
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching posts for sitemap:', error);
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mjimsdenla.online';
    const posts = await getPosts();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];

    // Dynamic blog posts
    const blogPosts: MetadataRoute.Sitemap = posts.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.published_at || post.updated_at),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticPages, ...blogPosts];
}
