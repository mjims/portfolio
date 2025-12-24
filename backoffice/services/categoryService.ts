import api from '@/lib/axios';

export interface Category {
    id: number;
    name: string;
}

export const categoryService = {
    getAll: async (): Promise<Category[]> => {
        const response = await api.get('/categories');
        return response.data;
    },
};
