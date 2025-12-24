'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { Trash2, Mail } from 'lucide-react';

interface Contact {
    id: number;
    name: string;
    email: string;
    subject: string | null;
    message: string;
    created_at: string;
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<Contact[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMessages = async () => {
        try {
            const response = await api.get('/contacts');
            setMessages(response.data);
        } catch (error) {
            console.error('Failed to fetch messages', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this message?')) return;
        try {
            await api.delete(`/contacts/${id}`);
            fetchMessages();
        } catch (error) {
            console.error('Failed to delete', error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold dark:text-gray-100">Messages</h1>
            </div>

            {isLoading ? (
                <p>Loading messages...</p>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {messages.length === 0 && <p className="text-secondary">No messages found.</p>}
                    {messages.map((msg) => (
                        <div key={msg.id} className="bg-card rounded-lg shadow p-6 border border-custom">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-foreground">{msg.subject || 'No Subject'}</h2>
                                    <p className="text-sm text-secondary">
                                        From: <span className="font-semibold">{msg.name}</span> ({msg.email})
                                    </p>
                                    <p className="text-xs text-secondary mt-1">
                                        {new Date(msg.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(msg.id)}
                                    className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                            <div className="bg-page p-4 rounded text-foreground whitespace-pre-wrap border border-custom">
                                {msg.message}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
