import { Metadata } from 'next';

export const siteConfig = {
    name: 'MJIMS - Edouard Denla',
    title: 'MJIMS | Développeur Full-Stack & Expert en Solutions Digitales',
    description: 'Portfolio de Edouard Denla (MJIMS) - Développeur Full-Stack spécialisé dans la création d\'applications web et mobiles performantes. Laravel, React, Next.js, React Native.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mjimsdenla.online',
    ogImage: '/images/og-image.jpg',
    author: {
        name: 'Edouard Denla',
        email: 'contact@mjimsdenla.online',
        url: 'https://mjimsdenla.online'
    },
    keywords: [
        'développeur full-stack',
        'développeur web',
        'React',
        'Next.js',
        'Laravel',
        'React Native',
        'TypeScript',
        'JavaScript',
        'développeur freelance',
        'Cotonou',
        'Bénin',
        'applications web',
        'applications mobiles'
    ],
    social: {
        github: 'https://github.com/mjims',
        linkedin: 'https://linkedin.com/in/edouard-denla',
        twitter: 'https://twitter.com/mjims_dev'
    }
};

export function generateSEOMetadata({
    title,
    description,
    image,
    url,
    type = 'website',
    keywords,
    publishedTime,
    modifiedTime,
}: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    keywords?: string[];
    publishedTime?: string;
    modifiedTime?: string;
}): Metadata {
    const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
    const metaDescription = description || siteConfig.description;
    const metaImage = image || siteConfig.ogImage;
    const metaUrl = url || siteConfig.url;
    const metaKeywords = keywords || siteConfig.keywords;

    return {
        title: metaTitle,
        description: metaDescription,
        keywords: metaKeywords,
        authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
        creator: siteConfig.author.name,
        publisher: siteConfig.author.name,
        metadataBase: new URL(siteConfig.url),
        alternates: {
            canonical: metaUrl,
        },
        openGraph: {
            type: type as any,
            locale: 'fr_FR',
            url: metaUrl,
            title: metaTitle,
            description: metaDescription,
            siteName: siteConfig.name,
            images: [
                {
                    url: metaImage,
                    width: 1200,
                    height: 630,
                    alt: metaTitle,
                }
            ],
            ...(publishedTime && { publishedTime }),
            ...(modifiedTime && { modifiedTime }),
        },
        twitter: {
            card: 'summary_large_image',
            title: metaTitle,
            description: metaDescription,
            images: [metaImage],
            creator: '@mjims_dev',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

export function generatePersonStructuredData() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: siteConfig.author.name,
        url: siteConfig.url,
        image: `${siteConfig.url}/images/profile.jpg`,
        sameAs: [
            siteConfig.social.github,
            siteConfig.social.linkedin,
            siteConfig.social.twitter,
        ],
        jobTitle: 'Développeur Full-Stack',
        worksFor: {
            '@type': 'Organization',
            name: 'Freelance',
        },
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Cotonou',
            addressCountry: 'BJ',
        },
        email: siteConfig.author.email,
        knowsAbout: [
            'Web Development',
            'Mobile Development',
            'React',
            'Next.js',
            'Laravel',
            'React Native',
            'TypeScript',
            'JavaScript',
        ],
    };
}

export function generateBlogStructuredData() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: `${siteConfig.name} - Blog`,
        description: 'Articles techniques, tutoriels et réflexions sur le développement web et mobile',
        url: `${siteConfig.url}/blog`,
        author: {
            '@type': 'Person',
            name: siteConfig.author.name,
        },
    };
}

export function generateArticleStructuredData({
    title,
    description,
    image,
    datePublished,
    dateModified,
    url,
}: {
    title: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified?: string;
    url: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description: description,
        image: image,
        datePublished: datePublished,
        dateModified: dateModified || datePublished,
        author: {
            '@type': 'Person',
            name: siteConfig.author.name,
            url: siteConfig.url,
        },
        publisher: {
            '@type': 'Person',
            name: siteConfig.author.name,
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
    };
}
