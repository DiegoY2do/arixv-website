import { Toaster } from 'sonner';
import WhatsAppButton from "@/components/WhatsAppButton";
import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary, Locale } from "@/dictionaries/getDictionary";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';
  
  const title = isEs ? 'ARIXV // Estudio de Desarrollo Web' : 'ARIXV // Web Development Studio';
  const description = isEs
    ? 'Construimos landing pages premium y plataformas complejas. Diseño brutalista y desarrollo web de alto rendimiento.'
    : 'We build premium landing pages and complex platforms. Brutalist design and high-performance web development.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: 'https://arixv.com.mx',
      siteName: 'ARIXV',
      images: [
        {
          url: 'https://arixv.com.mx/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'ARIXV Cover',
        },
      ],
      locale: isEs ? 'es_MX' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://arixv.com.mx/og-image.jpg'],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <html lang={lang} className="scroll-smooth">
      <body>
        <Navbar lang={lang} dict={dict.navigation} />
        {children}
        <Footer dict={dict.footer} />
        <WhatsAppButton phoneNumber="525621434770" />
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            style: {
              background: '#0b0f14',
              color: '#ffffff',
              border: '1px solid #E11D48',
              borderRadius: '0px',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            },
          }}
        />
      </body>
    </html>
  );
}
