'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '@/lib/api';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await api.post('/contact', formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error: any) {
            console.error('Failed to send message', error);
            setStatus('error');
            setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again later.');
        }
    };

    return (
        <section id="contact" className="bg-white z-10" style={{ boxShadow: '0px 0px 16px 16px #fff' }}>
            <div className='section-padding relative'>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Construisons quelque chose <span className="text-gradient">d'extraordinaire</span> ensemble.</h2>
                        <p className="text-secondary text-lg mb-12">
                            Que vous ayez un projet spécifique en tête ou que vous souhaitiez simplement explorer les possibilités,
                            je suis toujours ouvert à discuter de nouvelles opportunités.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary border border-primary/10">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-secondary font-bold uppercase tracking-widest">Email</p>
                                    <p className="text-foreground font-medium">contact@mjimsdenla.online</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary border border-primary/10">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-secondary font-bold uppercase tracking-widest">Téléphone</p>
                                    <p className="text-foreground font-medium">(+229) 0167 697 667</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary border border-primary/10">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-secondary font-bold uppercase tracking-widest">Localisation</p>
                                    <p className="text-foreground font-medium">Cotonou, Bénin</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className=" p-8 md:p-12 rounded-[2rem] relative border border-border shadow-sm"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-secondary uppercase tracking-widest ml-1">Nom</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white border border-border rounded-2xl px-6 py-4 text-foreground focus:outline-none focus:border-primary/50 transition-colors shadow-sm"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-secondary uppercase tracking-widest ml-1">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-white border border-border rounded-2xl px-6 py-4 text-foreground focus:outline-none focus:border-primary/50 transition-colors shadow-sm"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-secondary uppercase tracking-widest ml-1">Sujet</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full bg-white border border-border rounded-2xl px-6 py-4 text-foreground focus:outline-none focus:border-primary/50 transition-colors shadow-sm"
                                    placeholder="Comment puis-je vous aider ?"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-secondary uppercase tracking-widest ml-1">Message</label>
                                <textarea
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={5}
                                    className="w-full bg-white border border-border rounded-2xl px-6 py-4 text-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none shadow-sm"
                                    placeholder="Votre message ici..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-primary text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-primary/20"
                            >
                                {status === 'loading' ? 'Envoi en cours...' : (
                                    <>Envoyer le message <Send size={18} /></>
                                )}
                            </button>

                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-2xl border border-green-200"
                                >
                                    <CheckCircle2 size={20} />
                                    <p className="text-sm font-medium">Message envoyé avec succès ! Je vous répondrai dès que possible.</p>
                                </motion.div>
                            )}

                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-2xl border border-red-200"
                                >
                                    <AlertCircle size={20} />
                                    <p className="text-sm font-medium">{errorMessage}</p>
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
