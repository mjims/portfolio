'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import PostForm from '@/components/PostForm';

export default function NewPostPage() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch categories', error);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        try {
            await api.post('/posts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
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
