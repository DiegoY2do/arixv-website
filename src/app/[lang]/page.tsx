// src/app/[lang]/page.tsx
import { getDictionary, Locale } from "@/dictionaries/getDictionary";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  if (!dict || !dict.home) return null;

  return (
    <main className="relative min-h-screen">
      <Hero 
        dict={{
          heroTitle: dict.home.heroTitle,
          heroSubtitle: dict.home.heroSubtitle,
          cta: dict.navigation.cta,
          secondaryCta: dict.home.secondaryCta
        }} 
      />
      <TechMarquee />
      <Services dict={dict.services} />
      <Portfolio dict={dict.portfolio} />
      <Process dict={dict.process} />
      <Testimonials dict={dict.testimonials} />
      <About dict={dict.about} />
      <Contact dict={dict.contact} />
      <FAQ dict={dict.faq} />
      <Footer dict={dict.footer}/>
    </main>
  );
}