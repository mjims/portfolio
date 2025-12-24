'use client';

import { Info } from 'lucide-react';
import Link from 'next/link';

export default function BlogSidebar() {
    return (
        <aside className="lg:w-[380px] space-y-12 shrink-0 font-sans font-[eurostile]">
            {/* CTA Card */}
            <div className="bg-[#316bf2] rounded-2xl overflow-hidden p-1 text-center">
                <div className="p-2 flex flex-col items-center justify-center">
                    <div className="mb-8 w-full max-h-[200px] overflow-hidden">
                        <img
                            src="/images/devices.png"
                            alt="Devices"
                            className="w-full mx-auto transform hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <p className="text-white text-base font-medium leading-relaxed mb-8 px-4 text-left">
                        <strong>Besoin d'un développeur, un travail rapide, optimisé et personnalisé à votre goût sans tracasserie ? <br />
                        Vous êtes au bon endroit</strong>
                    </p>
                    <Link href="/#contact">
                        <button className="bg-[#198754] hover:bg-[#059669] text-white px-10 py-3 rounded-md font-bold transition-all uppercase tracking-wide text-sm">
                            ME CONTACTER
                        </button>
                    </Link>
                </div>
            </div>

            {/* Newsletter */}
            <section>
                <div className="flex items-center gap-2 text-secondary font-bold mb-2">
                    <span>S'abonner à ma newsletter</span>
                    <Info size={16} className="opacity-50" />
                </div>
                <form className="flex">
                    <input
                        type="email"
                        placeholder="E-mail"
                        className="flex-1 px-4 py-3 rounded-l-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                    />
                    <button
                        type="submit"
                        className="bg-[#198754] hover:bg-[#059669] text-white px-6 py-3 rounded-r-md font-bold transition-colors"
                    >
                        S'abonner
                    </button>
                </form>
            </section>
        </aside>
    );
}
