import { Code2, Globe, Database } from 'lucide-react';

export default function Skills() {
    return (
        <section id="skills" className="bg-[#ebebeb]" style={{ boxShadow: '0px 0px 16px 16px #ebebeb' }}>
            <div className="section-padding relative">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Expertise<span className="text-primary">.</span></h2>
                    <p className="text-secondary max-w-lg">
                        Une maîtrise approfondie des technologies modernes pour construire des solutions numériques performantes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-white rounded-xl overflow-hidden border border-border shadow-soft">
                    {/* Languages & Frameworks */}
                    <div className="p-8 md:p-12 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-border hover:bg-black/[0.01] transition-colors">
                        <div className="w-16 h-16 bg-foreground text-background rounded-xl flex items-center justify-center mb-8 shadow-lg">
                            <Code2 size={32} />
                        </div>
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-[0.2em] mb-6">
                            LANGUAGES ET FRAMEWORKS
                        </h3>
                        <p className="text-secondary text-sm mb-8">
                            J'utilise plusieurs languages et frameworks
                        </p>
                        <ul className="text-foreground font-medium space-y-2 text-sm">
                            <li className="text-secondary">HTML, CSS, JavaScript, PHP, Python, C/C++</li>
                            <li>Bootstrap</li>
                            <li>Jquery</li>
                            <li>React-native</li>
                            <li>Laravel</li>
                        </ul>
                    </div>

                    {/* CMS */}
                    <div className="p-8 md:p-12 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-border hover:bg-black/[0.01] transition-colors">
                        <div className="w-16 h-16 bg-white border border-border rounded-full flex items-center justify-center mb-8 shadow-sm">
                            <Globe size={32} className="text-foreground" />
                        </div>
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-[0.2em] mb-6">
                            CMS
                        </h3>
                        <p className="text-secondary text-sm mb-8 max-w-[280px]">
                            J'ai la maîtrise parfaite de deux CMS populaires et très performants, qui me permettent de créer rapidement des sites comme des boutiques et des blogs
                        </p>
                        <ul className="text-foreground font-medium space-y-2 text-sm">
                            <li>Wordpress</li>
                            <li>Prestashop</li>
                        </ul>
                    </div>

                    {/* Databases */}
                    <div className="p-8 md:p-12 flex flex-col items-center text-center hover:bg-black/[0.01] transition-colors">
                        <div className="w-16 h-16 bg-white border border-border rounded-full flex items-center justify-center mb-8 shadow-sm">
                            <Database size={32} className="text-foreground" />
                        </div>
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-[0.2em] mb-6">
                            Base de données
                        </h3>
                        <p className="text-secondary text-sm mb-8">
                            J'utilise des base de données ci-dessous:
                        </p>
                        <div className="text-foreground font-medium space-y-2 text-sm">
                            <p className="mb-2">Language: <span className="text-secondary">SQL</span></p>
                            <ul className="space-y-2">
                                <li>MySQL</li>
                                <li>Firebase</li>
                                <li>MongoDB</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
