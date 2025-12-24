import api from '@/lib/axios';

export const uploadService = {
    upload: async (file: File, directory: string = 'uploads'): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('directory', directory);

        const response = await api.post<{ url: string }>('/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data.url;
    },
};
