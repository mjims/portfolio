'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = Cookies.get('token');
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await api.get('/user');
                setUser(response.data);
            } catch (error) {
                console.error('Auth check failed', error);
                Cookies.remove('token');
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = (token: string, userData: User) => {
        Cookies.set('token', token, { expires: 365 }); // Set token cookie
        setUser(userData);
        router.push('/dashboard');
    };

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
        router.push('/auth/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
