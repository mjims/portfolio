'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { Plus, Trash2, Edit2 } from 'lucide-react';

interface Category {
    id: number;
    name: string;
}

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    is_published: boolean;
    category_id: number | null;
    category?: Category;
}

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [currentPost, setCurrentPost] = useState<Partial<Post>>({});
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const fetchPosts = async () => {
        try {
            const response = await api.get('/posts?all=true');
            setPosts(response.data);
        } catch (error) {
            console.error('Failed to fetch posts', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await api.get('/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Failed to fetch categories', error);
        }
    };

    useEffect(() => {
        fetchPosts();
        fetchCategories();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        try {
            await api.delete(`/posts/${id}`);
            fetchPosts();
        } catch (error) {
            console.error('Failed to delete', error);
        }
    };

    const openCreateModal = () => {
        setCurrentPost({ is_published: false });
        setImageFile(null);
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const openEditModal = (post: Post) => {
        setCurrentPost(post);
        setImageFile(null);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', currentPost.title || '');
        formData.append('slug', currentPost.slug || '');
        formData.append('excerpt', currentPost.excerpt || '');
        formData.append('content', currentPost.content || '');
        formData.append('is_published', currentPost.is_published ? '1' : '0');

        if (currentPost.category_id) {
            formData.append('category_id', String(currentPost.category_id));
        }

        if (imageFile) {
            formData.append('image', imageFile);
        }

        if (isEditing && currentPost.id) {
            formData.append('_method', 'PUT');
        }

        try {
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };

            if (isEditing && currentPost.id) {
                await api.post(`/posts/${currentPost.id}`, formData, config);
            } else {
                await api.post('/posts', formData, config);
            }
            setIsModalOpen(false);
            fetchPosts();
        } catch (error) {
            console.error('Submit failed', error);
            alert('Failed to save post.');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Blog Posts</h1>
                <button
                    onClick={openCreateModal}
                    className="bg-blue-600 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-700"
                >
                    <Plus size={18} />
                    <span>Add Post</span>
                </button>
            </div>

            {isLoading ? (
                <p>Loading posts...</p>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {posts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap font-medium dark:text-gray-100">{post.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                        {post.category?.name || '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.is_published ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                            }`}>
                                            {post.is_published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button
                                            onClick={() => openEditModal(post)}
                                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl p-6 m-4 my-8 h-screen overflow-y-auto border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold mb-4 dark:text-white">{isEditing ? 'Edit Post' : 'Add New Post'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={currentPost.title || ''}
                                        onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Slug</label>
                                    <input
                                        type="text"
                                        value={currentPost.slug || ''}
                                        onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Category</label>
                                    <select
                                        value={currentPost.category_id || ''}
                                        onChange={(e) => setCurrentPost({ ...currentPost, category_id: Number(e.target.value) })}
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4 flex items-center mt-6">
                                    <input
                                        type="checkbox"
                                        checked={currentPost.is_published || false}
                                        onChange={(e) => setCurrentPost({ ...currentPost, is_published: e.target.checked })}
                                        className="mr-2"
                                    />
                                    <label className="text-gray-700 dark:text-gray-300 text-sm font-bold">Published</label>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Excerpt</label>
                                <textarea
                                    value={currentPost.excerpt || ''}
                                    onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                                    className="w-full p-2 border rounded h-20 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Content</label>
                                <textarea
                                    value={currentPost.content || ''}
                                    onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                                    className="w-full p-2 border rounded h-64 font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Image</label>
                                <input
                                    type="file"
                                    onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                                    className="w-full text-gray-700 dark:text-gray-300"
                                    accept="image/*"
                                />
                                {currentPost.image && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Current: {currentPost.image}</p>}
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border rounded text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
