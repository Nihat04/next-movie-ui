import type { Metadata } from 'next';
import './globals.css';
import Header from '@/widgets/Header';
import { Suspense } from 'react';

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
        <Suspense>
            <html lang="en">
                <body>
                    <Header />
                    <main>{children}</main>
                </body>
            </html>
        </Suspense>
    );
}
