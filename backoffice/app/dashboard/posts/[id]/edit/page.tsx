'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PostForm from '@/components/PostForm';
import { postService, Post, CreatePostData } from '@/services/postService';
import { categoryService, Category } from '@/services/categoryService';

export default function EditPostPage() {
    const router = useRouter();
    const params = useParams(); // { id: string }
    const id = params.id as string;

    const [post, setPost] = useState<Post | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postData, categoriesData] = await Promise.all([
                    postService.getById(id),
                    categoryService.getAll()
                ]);
                setPost(postData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Failed to fetch data', error);
                alert('Failed to load post data');
                router.push('/dashboard/posts');
            } finally {
                setIsFetching(false);
            }
        };
        if (id) fetchData();
    }, [id, router]);

    const handleSubmit = async (data: CreatePostData) => {
        setIsLoading(true);
        try {
            await postService.update(id, data);
            router.push('/dashboard/posts');
        } catch (error) {
            console.error('Failed to update post', error);
            alert('Failed to update post');
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) return <p className="p-6">Loading...</p>;
    if (!post) return <p className="p-6">Post not found</p>;

    return (
        <div className="bg-card rounded-lg shadow p-6 border border-custom m-4">
            <h1 className="text-2xl font-bold mb-6 text-foreground">Edit Post</h1>
            <PostForm
                initialData={post}
                categories={categories}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                isEditing={true}
            />
        </div>
    );
}

