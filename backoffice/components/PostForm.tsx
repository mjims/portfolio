'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { uploadService } from '@/services/uploadService';
import { Post, CreatePostData } from '@/services/postService';
import { Category } from '@/services/categoryService';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface PostFormProps {
    initialData?: Partial<Post>;
    categories: Category[];
    onSubmit: (data: CreatePostData) => Promise<void>;
    isLoading?: boolean;
    isEditing?: boolean;
}

export default function PostForm({ initialData = {}, categories, onSubmit, isLoading = false, isEditing = false }: PostFormProps) {
    const router = useRouter();
    const [title, setTitle] = useState(initialData.title || '');
    const [slug, setSlug] = useState(initialData.slug || '');
    const [excerpt, setExcerpt] = useState(initialData.excerpt || '');
    const [content, setContent] = useState(initialData.content || '');
    const [categoryId, setCategoryId] = useState<number | string>(initialData.category_id || '');
    const [isPublished, setIsPublished] = useState(initialData.is_published || false);
    const [imageUrl, setImageUrl] = useState<string | null>(initialData.image || null);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const url = await uploadService.upload(file, 'posts');
            setImageUrl(url);
        } catch (error) {
            console.error('Upload failed', error);
            alert('Image upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data: CreatePostData = {
            title,
            slug,
            excerpt,
            content,
            is_published: isPublished,
            category_id: categoryId ? Number(categoryId) : null,
            image: imageUrl,
        };

        await onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-secondary text-sm font-bold mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border border-custom rounded bg-page text-foreground"
                        required
                    />
                </div>
                <div>
                    <label className="block text-secondary text-sm font-bold mb-2">Slug</label>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full p-2 border border-custom rounded bg-page text-foreground"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-secondary text-sm font-bold mb-2">Category</label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full p-2 border border-custom rounded bg-page text-foreground"
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center mt-6">
                    <input
                        type="checkbox"
                        checked={isPublished}
                        onChange={(e) => setIsPublished(e.target.checked)}
                        className="mr-2"
                    />
                    <label className="text-secondary text-sm font-bold">Published</label>
                </div>
            </div>

            <div>
                <label className="block text-secondary text-sm font-bold mb-2">Excerpt</label>
                <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="w-full p-2 border border-custom rounded h-20 bg-page text-foreground"
                />
            </div>

            <div className="bg-card">
                <label className="block text-secondary text-sm font-bold mb-2">Content</label>
                <div className="bg-white text-black dark:bg-gray-800 dark:text-white rounded">
                    <ReactQuill theme="snow" value={content} onChange={setContent} className="h-64 mb-12" />
                </div>
            </div>

            <div>
                <label className="block text-secondary text-sm font-bold mb-2">Image</label>
                <input
                    type="file"
                    onChange={handleImageUpload}
                    className="w-full text-secondary"
                    accept="image/*"
                    disabled={isUploading}
                />
                {isUploading && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
                {imageUrl && (
                    <div className="mt-2">
                        <img src={imageUrl} alt="Preview" className="h-32 rounded border border-custom" />
                        <p className="text-[10px] text-secondary mt-1 truncate max-w-xs">{imageUrl}</p>
                    </div>
                )}
            </div>

            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-4 py-2 border border-custom rounded text-secondary hover:bg-page"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading || isUploading}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {isLoading ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
                </button>
            </div>
        </form>
    );
}

