import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import I18nProvider from '../components/ui/locale-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jose Manuel Quiros - Portafolio',
  description: 'Estudiante de Ingeniería en Seguridad Informática y Desarrollador Full Stack. Especialista en Ciberseguridad, Fundador de SPIKEDTECH y Consultor Tecnológico.',
  keywords: ['Full Stack Developer', 'Ciberseguridad', 'React', 'Next.js', 'SPIKEDTECH', 'Portfolio'],
  authors: [{ name: 'Jose Manuel Quiros' }],
  creator: 'Jose Manuel Quiros',
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: 'https://josemquiros.dev',
    title: 'Jose Manuel Quiros - Portafolio',
    description: 'Estudiante de Ingeniería en Seguridad Informática y Desarrollador Full Stack.',
    siteName: 'Jose Manuel Quiros Portafolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Jose Manuel Quiros - Portafolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jose Manuel Quiros - Portafolio',
    description: 'Estudiante de Ingeniería en Seguridad Informática y Desarrollador Full Stack.',
    creator: '@josemquiros',
    images: ['/og-image.png'],
  },
  // Ensure metadataBase is set to resolve social/twitter images in development
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/projects/logojm.png" type="image/png" />
        <link rel="apple-touch-icon" href="/projects/logojm.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Jose Manuel Quiros',
              jobTitle: 'Cybersecurity Engineering Student & Full Stack Developer',
              url: 'https://josemquiros.dev',
              email: 'jqchaves1928@gmail.com',
              sameAs: [
                'https://github.com/jose-m-quiros',
                'https://www.linkedin.com/in/jmquiros19/',
              ],
              knowsAbout: [
                'Cybersecurity', 'Full Stack Development', 'React', 'Next.js',
                'Python', 'C#', '.NET', 'SQL Server',
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        {/* Theme is applied client-side by ThemeToggle after mount to avoid hydration mismatch */}
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
