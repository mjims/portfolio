'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PostForm from '@/components/PostForm';
import { postService, CreatePostData } from '@/services/postService';
import { categoryService, Category } from '@/services/categoryService';

export default function NewPostPage() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryService.getAll();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories', error);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (data: CreatePostData) => {
        setIsLoading(true);
        try {
            await postService.create(data);
            router.push('/dashboard/posts');
        } catch (error) {
            console.error('Failed to create post', error);
            alert('Failed to create post');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-card rounded-lg shadow p-6 border border-custom m-4">
            <h1 className="text-2xl font-bold mb-6 text-foreground">Add New Post</h1>
            <PostForm categories={categories} onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
    );
}

