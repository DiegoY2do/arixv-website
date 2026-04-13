import { Toaster } from 'sonner';
import { Metadata } from 'next';

// ESTA FUNCIÓN GENERA EL SEO DINÁMICO SEGÚN EL IDIOMA
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const isEs = params.lang === 'es';
  
  // Textos adaptables al idioma
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

export default function RootLayout({ children, params }: { children: React.ReactNode, params: { lang: string } }) {
  return (
    <html lang={params.lang}>
      <body>
        {children}
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