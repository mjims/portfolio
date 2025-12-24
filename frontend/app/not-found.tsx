'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-background via-background-alt to-background flex items-center justify-center px-6">
            <div className="max-w-2xl w-full text-center">
                {/* 404 Number */}
                <div className="mb-8">
                    <h1 className="text-[150px] md:text-[200px] font-bold text-primary/20 leading-none select-none">
                        404
                    </h1>
                </div>

                {/* Message */}
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Page introuvable
                    </h2>
                    <p className="text-secondary text-lg max-w-md mx-auto">
                        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all shadow-md active:scale-95"
                    >
                        <Home size={20} />
                        Retour à l'accueil
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 bg-white text-foreground px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition-all shadow-sm border border-border active:scale-95"
                    >
                        <ArrowLeft size={20} />
                        Page précédente
                    </button>
                </div>

                {/* Decorative elements */}
                <div className="mt-16 opacity-30">
                    <div className="flex justify-center gap-2">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="w-2 h-2 rounded-full bg-primary animate-pulse"
                                style={{ animationDelay: `${i * 0.2}s` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
