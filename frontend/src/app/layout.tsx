import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import StoreProvider from '@/components/providers/StoreProvider';
import './globals.css';
import Navbar from '@/components/Navbar';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'ModelVerse',
    description: '3D model viewer and manager',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>

        <StoreProvider>
            <Navbar />
            {children}
        </StoreProvider>
        </body>
        </html>
    );
}
