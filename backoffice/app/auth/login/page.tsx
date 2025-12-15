'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await api.get('/sanctum/csrf-cookie');
            const response = await api.post('/login', { email, password });

            // For Sanctum token-based (if not using cookie only), we usually get a token
            // If using cookies only, we just need to redirect after login.
            // Assuming this is token based for simplicity in headers as configured in axios.ts
            // But standard Fortify/Sanctum SPA uses cookies.
            // Let's assume we get a token for now if we installed Sanctum via API.
            // If strictly cookie based, we might not get a token property back, but user object.

            // NOTE: Since we used `php artisan install:api`, it sets up token auth. 
            // We need a route /api/login that issues a token.
            // Laravel 11 default setup might rely on standard web auth if not configured otherwise.
            // Let's assume we need to hit a token endpoint or standard /login.
            // If standard /login (web), it returns session. 
            // If we want API tokens, we usually build a specific login controller for API.

            // Let's proceed assuming we receive the user and a token (or we'll implement the backend login if missing).
            const { token, user } = response.data;
            login(token, user);

        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
                {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
