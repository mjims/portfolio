'use client';

import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
    const { user } = useAuth();

    return (
        <header className="bg-card border-b border-custom p-4 flex justify-between items-center">
            <div>
                {/* Breadcrumbs or Page Title could go here */}
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-secondary text-sm hidden md:inline">
                    {user?.name} ({user?.email})
                </span>
                <ThemeToggle />
            </div>
        </header>
    );
}
