'use client';

import { useState, useEffect } from 'react';
import { projectService, Project, CreateProjectData } from '@/services/projectService';
import { uploadService } from '@/services/uploadService';
import { Plus, Trash2, Edit2, Link as LinkIcon, Github } from 'lucide-react';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState<Partial<Project>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const fetchProjects = async () => {
        try {
            const data = await projectService.getAll();
            setProjects(data);
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
            await projectService.delete(id);
            fetchProjects();
        } catch (error) {
            console.error('Failed to delete', error);
        }
    };

    const openCreateModal = () => {
        setFormData({});
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const openEditModal = (project: Project) => {
        setFormData(project);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const url = await uploadService.upload(file, 'projects');
            setFormData({ ...formData, image: url });
        } catch (error) {
            console.error('Upload failed', error);
            alert('Image upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const data: CreateProjectData = {
            title: formData.title || '',
            slug: formData.slug || '',
            description: formData.description || '',
            image: formData.image || null,
            url: formData.url || null,
            github_url: formData.github_url || null,
        };

        try {
            if (isEditing && formData.id) {
                await projectService.update(formData.id, data);
            } else {
                await projectService.create(data);
            }
            setIsModalOpen(false);
            fetchProjects();
        } catch (error) {
            console.error('Submit failed', error);
            alert('Failed to save project.');
        } finally {
            setIsSaving(false);
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto z-50">
                    <div className="bg-card rounded-lg w-full max-w-2xl p-6 m-4 border border-custom shadow-2xl">
                        <h2 className="text-xl font-bold mb-4 text-foreground">{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-secondary text-sm font-bold mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={formData.title || ''}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full p-2 border border-custom rounded bg-page text-foreground"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-secondary text-sm font-bold mb-2">Slug</label>
                                    <input
                                        type="text"
                                        value={formData.slug || ''}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full p-2 border border-custom rounded bg-page text-foreground"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-secondary text-sm font-bold mb-2">Description</label>
                                <textarea
                                    value={formData.description || ''}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full p-2 border border-custom rounded h-32 bg-page text-foreground"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-secondary text-sm font-bold mb-2">Live URL</label>
                                    <input
                                        type="url"
                                        value={formData.url || ''}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                        className="w-full p-2 border border-custom rounded bg-page text-foreground"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-secondary text-sm font-bold mb-2">Github URL</label>
                                    <input
                                        type="url"
                                        value={formData.github_url || ''}
                                        onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                                        className="w-full p-2 border border-custom rounded bg-page text-foreground"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-secondary text-sm font-bold mb-2">Image</label>
                                <input
                                    type="file"
                                    onChange={handleImageUpload}
                                    className="w-full text-secondary"
                                    accept="image/*"
                                    disabled={isUploading}
                                />
                                {isUploading && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
                                {formData.image && (
                                    <div className="mt-2 text-center">
                                        <img src={formData.image} alt="Preview" className="h-40 mx-auto rounded border border-custom shadow shadow-black/50" />
                                        <p className="text-[10px] text-secondary mt-1 truncate">{formData.image}</p>
                                    </div>
                                )}
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
                                    disabled={isSaving || isUploading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

