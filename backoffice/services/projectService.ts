import api from '@/lib/axios';

export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string | null;
    url: string | null;
    github_url: string | null;
}

export type CreateProjectData = Omit<Project, 'id'>;
export type UpdateProjectData = Partial<CreateProjectData>;

export const projectService = {
    getAll: async (): Promise<Project[]> => {
        const response = await api.get('/projects');
        return response.data;
    },

    getById: async (id: number | string): Promise<Project> => {
        const response = await api.get(`/projects/${id}`);
        return response.data;
    },

    create: async (data: CreateProjectData): Promise<Project> => {
        const response = await api.post('/projects', data);
        return response.data;
    },

    update: async (id: number | string, data: UpdateProjectData): Promise<Project> => {
        const response = await api.put(`/projects/${id}`, data);
        return response.data;
    },

    delete: async (id: number | string): Promise<void> => {
        await api.delete(`/projects/${id}`);
    },
};
