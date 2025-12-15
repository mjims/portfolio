'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Code, FolderGit2, FileText, Mail, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Skills', href: '/dashboard/skills', icon: Code },
    { name: 'Projects', href: '/dashboard/projects', icon: FolderGit2 },
    { name: 'Blog Posts', href: '/dashboard/posts', icon: FileText },
    { name: 'Messages', href: '/dashboard/messages', icon: Mail },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { logout, user } = useAuth();

    return (
        <div className="w-64 bg-[#101828] text-foreground min-h-screen flex flex-col border-r border-custom">
            <div className="p-4.5 border-b border-custom">
                <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center space-x-3 p-3 rounded transition-colors ${isActive
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            <Icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={logout}
                    className="flex items-center space-x-3 p-3 w-full text-left text-gray-300 hover:bg-red-600 hover:text-white rounded transition-colors"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}
