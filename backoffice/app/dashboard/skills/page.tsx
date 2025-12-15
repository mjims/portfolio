'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { Plus, Trash2, Edit2 } from 'lucide-react';

interface Skill {
    id: number;
    name: string;
    type: string;
    icon: string;
}

export default function SkillsPage() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [currentSkill, setCurrentSkill] = useState<Partial<Skill>>({ type: 'language' });
    const [isEditing, setIsEditing] = useState(false);

    const fetchSkills = async () => {
        try {
            const response = await api.get('/skills');
            setSkills(response.data);
        } catch (error) {
            console.error('Failed to fetch skills', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this skill?')) return;
        try {
            // NOTE: Need to implement DELETE route in API first if not exists resourcefully
            // SkillController was resource controller, so it should have destroy
            await api.delete(`/skills/${id}`);
            fetchSkills();
        } catch (error) {
            console.error('Failed to delete', error);
            alert('Failed to delete skill. API route might not be enabled?');
        }
    };

    const openCreateModal = () => {
        setCurrentSkill({ type: 'language' });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const openEditModal = (skill: Skill) => {
        setCurrentSkill(skill);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && currentSkill.id) {
                await api.put(`/skills/${currentSkill.id}`, currentSkill);
            } else {
                await api.post('/skills', currentSkill);
            }
            setIsModalOpen(false);
            fetchSkills();
        } catch (error) {
            console.error('Submit failed', error);
            alert('Failed to save skill. Authentication or validation error?');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Skills Management</h1>
                <button
                    onClick={openCreateModal}
                    className="bg-blue-600 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-700"
                >
                    <Plus size={18} />
                    <span>Add Skill</span>
                </button>
            </div>

            {isLoading ? (
                <p>Loading skills...</p>
            ) : (
                <div className="bg-card rounded-lg shadow overflow-hidden border border-custom">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Icon</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-secondary uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-card divide-y divide-gray-200 dark:divide-gray-700">
                            {skills.map((skill) => (
                                <tr key={skill.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">{skill.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${skill.type === 'language' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                            skill.type === 'framework' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                            }`}>
                                            {skill.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-secondary">{skill.icon}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button
                                            onClick={() => openEditModal(skill)}
                                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(skill.id)}
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
            {
                isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-card rounded-lg w-full max-w-md p-6 border border-custom">
                            <h2 className="text-xl font-bold mb-4 text-foreground">{isEditing ? 'Edit Skill' : 'Add New Skill'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-secondary text-sm font-bold mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={currentSkill.name || ''}
                                        onChange={(e) => setCurrentSkill({ ...currentSkill, name: e.target.value })}
                                        className="w-full p-2 border border-custom rounded bg-page text-foreground"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-secondary text-sm font-bold mb-2">Type</label>
                                    <select
                                        value={currentSkill.type || 'language'}
                                        onChange={(e) => setCurrentSkill({ ...currentSkill, type: e.target.value })}
                                        className="w-full p-2 border border-custom rounded bg-page text-foreground"
                                    >
                                        <option value="language">Language</option>
                                        <option value="framework">Framework</option>
                                        <option value="tool">Tool</option>
                                    </select>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-secondary text-sm font-bold mb-2">Icon (Class or URL)</label>
                                    <input
                                        type="text"
                                        value={currentSkill.icon || ''}
                                        onChange={(e) => setCurrentSkill({ ...currentSkill, icon: e.target.value })}
                                        className="w-full p-2 border border-custom rounded bg-page text-foreground"
                                    />
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
                )
            }
        </div >
    );
}
