'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { Plus, Trash2, Edit2, Link as LinkIcon, Github } from 'lucide-react';
import Link from 'next/link';

interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    url: string;
    github_url: string;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const fetchProjects = async () => {
        try {
            const response = await api.get('/projects');
            setProjects(response.data);
        } catch (error) {
            console.error('Failed to fetch projects', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        try {
            await api.delete(`/projects/${id}`);
            fetchProjects();
        } catch (error) {
            console.error('Failed to delete', error);
        }
    };

    const openCreateModal = () => {
        setCurrentProject({});
        setImageFile(null);
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const openEditModal = (project: Project) => {
        setCurrentProject(project);
        setImageFile(null); // Reset file input, keep existing image in currentProject.image
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', currentProject.title || '');
        formData.append('slug', currentProject.slug || '');
        formData.append('description', currentProject.description || '');
        formData.append('url', currentProject.url || '');
        formData.append('github_url', currentProject.github_url || '');

        if (imageFile) {
            formData.append('image', imageFile);
        }

        // Must use _method=PUT for Laravel file uploads on update because of PHP limitation with PUT requests and multipart/form-data
        if (isEditing && currentProject.id) {
            formData.append('_method', 'PUT');
        }

        try {
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };

            if (isEditing && currentProject.id) {
                await api.post(`/projects/${currentProject.id}`, formData, config);
            } else {
                await api.post('/projects', formData, config);
            }
            setIsModalOpen(false);
            fetchProjects();
        } catch (error) {
            console.error('Submit failed', error);
            alert('Failed to save project.');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Projects Management</h1>
                <button
                    onClick={openCreateModal}
                    className="bg-blue-600 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-700"
                >
                    <Plus size={18} />
                    <span>Add Project</span>
                </button>
            </div>

            {isLoading ? (
                <p>Loading projects...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-card rounded-lg shadow overflow-hidden border border-custom">
                            {project.image ? (
                                <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-t-lg" />
                            ) : (
                                <div className="w-full h-48 bg-page flex items-center justify-center rounded-t-lg text-secondary">No Image</div>
                            )}
                            <div className="p-4">
                                <h2 className="text-xl font-bold mb-2 text-foreground">{project.title}</h2>
                                <p className="text-secondary text-sm mb-4 line-clamp-3">{project.description}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex space-x-2">
                                        {project.url && (
                                            <a href={project.url} target="_blank" className="text-blue-500 hover:text-blue-700">
                                                <LinkIcon size={20} />
                                            </a>
                                        )}
                                        {project.github_url && (
                                            <a href={project.github_url} target="_blank" className="text-secondary hover:text-foreground">
                                                <Github size={20} />
                                            </a>
                                        )}
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => openEditModal(project)}
                                            className="text-indigo-600 hover:text-indigo-900 p-1"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="text-red-600 hover:text-red-900 p-1"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-card rounded-lg w-full max-w-2xl p-6 m-4 border border-custom">
                        <h2 className="text-xl font-bold mb-4 text-foreground">{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-secondary text-sm font-bold mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={currentProject.title || ''}
                                        onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                                        className="w-full p-2 border border-custom rounded bg-page text-foreground"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-secondary text-sm font-bold mb-2">Slug</label>
                                    <input
                                        type="text"
                                        value={currentProject.slug || ''}
                                        onChange={(e) => setCurrentProject({ ...currentProject, slug: e.target.value })}
                                        className="w-full p-2 border border-custom rounded bg-page text-foreground"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-secondary text-sm font-bold mb-2">Description</label>
                                <textarea
                                    value={currentProject.description || ''}
                                    onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                                    className="w-full p-2 border border-custom rounded h-32 bg-page text-foreground"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-secondary text-sm font-bold mb-2">Live URL</label>
                                    <input
                                        type="url"
                                        value={currentProject.url || ''}
                                        onChange={(e) => setCurrentProject({ ...currentProject, url: e.target.value })}
                                        className="w-full p-2 border border-custom rounded bg-page text-foreground"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-secondary text-sm font-bold mb-2">Github URL</label>
                                    <input
                                        type="url"
                                        value={currentProject.github_url || ''}
                                        onChange={(e) => setCurrentProject({ ...currentProject, github_url: e.target.value })}
                                        className="w-full p-2 border border-custom rounded bg-page text-foreground"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-secondary text-sm font-bold mb-2">Image</label>
                                <input
                                    type="file"
                                    onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                                    className="w-full text-secondary"
                                    accept="image/*"
                                />
                                {currentProject.image && <p className="text-xs text-secondary mt-1">Current: {currentProject.image}</p>}
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border border-custom rounded text-secondary hover:bg-page"
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
