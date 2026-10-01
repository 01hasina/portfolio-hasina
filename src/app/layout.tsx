import type { Metadata } from 'next';
import './globals.css';
import './identity.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Hasina Ramisedra | AI & Data Science Student | Software Developer',
  description: 'Portfolio of Hasina Ramisedra, an AI and Data Science student from Madagascar with experience in web development, backend development, machine learning and digital solutions.',
  keywords: ['AI', 'Data Science', 'Machine Learning', 'Software Development', 'Web Development', 'Backend Development', 'PHP', 'Laravel', 'Java', 'Python', 'DevOps', 'Madagascar'],
  openGraph: { title: 'Hasina Ramisedra | AI & Data Science Student', description: 'Building digital solutions with code, data & AI.', type: 'website', locale: 'en_US', url: siteUrl, siteName: 'Hasina Ramisedra Portfolio' },
  twitter: { card: 'summary', title: 'Hasina Ramisedra | AI & Data Science Student', description: 'Building digital solutions with code, data & AI.' },
  icons: { icon: '/favicon.svg' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
