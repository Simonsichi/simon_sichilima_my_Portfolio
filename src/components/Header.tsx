'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled 
                ? 'bg-primary-500/95 dark:bg-dark-surface/95 backdrop-blur-md shadow-lg border-b border-primary-600/20 dark:border-dark-border/20' 
                : 'bg-primary-500/90 dark:bg-dark-surface/90 backdrop-blur-sm'
        }`}>
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                <Link href="/" className="text-xl font-bold text-white dark:text-dark-text-primary hover:text-primary-100 dark:hover:text-primary-300 transition">
                    Simon <span className="text-primary-200 dark:text-primary-400">Sichilima</span>
                </Link>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <button onClick={() => scrollToSection('hero')} className="text-white/80 hover:text-white transition font-medium">
                        Home
                    </button>
                    <button onClick={() => scrollToSection('about')} className="text-white/80 hover:text-white transition font-medium">
                        About
                    </button>
                    <button onClick={() => scrollToSection('skills')} className="text-white/80 hover:text-white transition font-medium">
                        Skills
                    </button>
                    <button onClick={() => scrollToSection('projects')} className="text-white/80 hover:text-white transition font-medium">
                        Projects
                    </button>
                    <button onClick={() => scrollToSection('contact')} className="text-white/80 hover:text-white transition font-medium">
                        Contact
                    </button>
                </nav>

                {/* Theme Toggle + CTA Button + Mobile Menu Toggle */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Link 
                        href="#contact" 
                        className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-primary-600 hover:text-primary-700 font-medium rounded-lg transition-all duration-300 transform hover:scale-105 group backdrop-blur-sm"
                    >
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.32 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        Hire Me
                    </Link>
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden w-8 h-8 flex items-center justify-center text-white/80 dark:text-dark-text-secondary hover:text-white dark:hover:text-dark-text-primary transition"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`md:hidden transition-all duration-300 ${
                isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden bg-primary-600/95 dark:bg-dark-card/95 backdrop-blur-md`}>
                <nav className="container mx-auto px-4 py-4 space-y-4">
                    <button onClick={() => scrollToSection('hero')} className="block w-full text-left text-white/80 hover:text-white transition font-medium py-2">
                        Home
                    </button>
                    <button onClick={() => scrollToSection('about')} className="block w-full text-left text-white/80 hover:text-white transition font-medium py-2">
                        About
                    </button>
                    <button onClick={() => scrollToSection('skills')} className="block w-full text-left text-white/80 hover:text-white transition font-medium py-2">
                        Skills
                    </button>
                    <button onClick={() => scrollToSection('projects')} className="block w-full text-left text-white/80 hover:text-white transition font-medium py-2">
                        Projects
                    </button>
                    <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-white/80 hover:text-white transition font-medium py-2">
                        Contact
                    </button>
                    <Link 
                        href="#contact" 
                        className="block w-full text-center px-4 py-3 bg-white text-primary-500 font-semibold rounded-lg hover:bg-primary-50 transition mt-4"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Hire Me
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;