import api from '@/lib/axios';
import { Category } from './categoryService';

export interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string | null;
    is_published: boolean;
    category_id: number | null;
    category?: Category;
    published_at?: string;
}

export type CreatePostData = Omit<Post, 'id' | 'category' | 'published_at'>;
export type UpdatePostData = Partial<CreatePostData>;

export const postService = {
    getAll: async (all: boolean = false): Promise<Post[]> => {
        const response = await api.get(`/posts${all ? '?all=true' : ''}`);
        return response.data;
    },

    getById: async (id: number | string): Promise<Post> => {
        const response = await api.get(`/posts/${id}`);
        return response.data;
    },

    create: async (data: CreatePostData): Promise<Post> => {
        const response = await api.post('/posts', data);
        return response.data;
    },

    update: async (id: number | string, data: UpdatePostData): Promise<Post> => {
        const response = await api.put(`/posts/${id}`, data);
        return response.data;
    },

    delete: async (id: number | string): Promise<void> => {
        await api.delete(`/posts/${id}`);
    },
};
