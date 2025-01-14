import type { Metadata } from 'next';
import './globals.css';
import Header from '@/widgets/Header';

export const metadata: Metadata = {
    title: 'Kino Next',
    description: 'The future of movie watch',
    icons: '/icon.svg',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Header />
                <main>{children}</main>
            </body>
        </html>
    );
}
