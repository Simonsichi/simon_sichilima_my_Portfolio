import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ThemeProvider } from '../contexts/ThemeContext';
import '../styles/globals.css';

export const metadata = {
    title: 'Simon Sichilima - Portfolio',
    description: 'Software Engineer | Mobile & Front-End Developer - Professional portfolio showcasing modern web and mobile development projects',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Google Font: Inter - used for a clean modern UI */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
            </head>
            <body className="flex flex-col min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text-primary transition-colors duration-300">
                <ThemeProvider>
                    <Header />
                    <main className="flex-grow pt-20">{children}</main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}