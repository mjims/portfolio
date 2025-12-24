import { Metadata } from "next";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import { generateSEOMetadata, generatePersonStructuredData } from "@/lib/metadata";

export const metadata: Metadata = generateSEOMetadata({
  title: 'Accueil',
  description: 'Développeur Full-Stack passionné par la création d\'applications web et mobiles performantes. Spécialisé en React, Next.js, Laravel et React Native.',
  keywords: [
    'développeur full-stack Cotonou',
    'développeur freelance Bénin',
    'création site web',
    'développement application mobile',
    'React Next.js Laravel'
  ]
});

export default function Home() {
  const personSchema = generatePersonStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <main className="bg-[#ebebeb]">
        <Hero />
        <Skills />
        <Projects />
        <Blog />
        <Contact />
      </main>
    </>
  );
}
