'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Helper to check if link is active
    const isActive = (path: string) => pathname === path;

    // Helper to check if parent section is active
    const isParentActive = (paths: string[]) => paths.some(p => pathname.startsWith(p));

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer">
                        {/* Ensure logo exists in public/img/logo/logo.svg */}
                        <img src="/img/logo/logo.svg" alt="SolarForce" className="h-16 w-auto" />
                        <span className="text-2xl font-bold text-black">SolarForce</span>
                    </Link>

                    <nav className="hidden md:flex space-x-6 items-center h-full">
                        <Link
                            href="/"
                            className={`nav-link font-medium text-sm transition-colors duration-200 ${isActive('/') ? 'text-primary' : 'text-secondary hover:text-primary'}`}
                        >
                            Home
                        </Link>

                        <div className="relative group h-full flex items-center">
                            <button
                                className={`nav-dropdown font-medium text-sm flex items-center gap-1 h-full transition-colors duration-200 ${isParentActive(['/homes', '/housing-society', '/commercial']) ? 'text-primary' : 'text-secondary group-hover:text-primary'}`}
                            >
                                Offers <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:rotate-180">expand_more</span>
                            </button>
                            <div className="absolute top-full left-0 w-48 bg-white border border-gray-100 shadow-xl rounded-b-lg overflow-hidden hidden group-hover:block">
                                <Link href="/homes" className="block px-4 py-3 text-sm text-secondary hover:bg-blue-50 hover:text-primary border-b border-gray-50 transition-colors">Residential</Link>
                                <Link href="/housing-society" className="block px-4 py-3 text-sm text-secondary hover:bg-blue-50 hover:text-primary border-b border-gray-50 transition-colors">Housing Society</Link>
                                <Link href="/commercial" className="block px-4 py-3 text-sm text-secondary hover:bg-blue-50 hover:text-primary transition-colors">Commercial</Link>
                            </div>
                        </div>

                        <div className="relative group h-full flex items-center">
                            <button
                                className={`nav-dropdown font-medium text-sm flex items-center gap-1 h-full transition-colors duration-200 ${isParentActive(['/on-grid', '/off-grid', '/hybrid']) ? 'text-primary' : 'text-secondary group-hover:text-primary'}`}
                            >
                                Solutions <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:rotate-180">expand_more</span>
                            </button>
                            <div className="absolute top-full left-0 w-48 bg-white border border-gray-100 shadow-xl rounded-b-lg overflow-hidden hidden group-hover:block">
                                <Link href="/on-grid-solar-system" className="block px-4 py-3 text-sm text-secondary hover:bg-blue-50 hover:text-primary border-b border-gray-50 transition-colors">On-Grid Solar</Link>
                                <Link href="/off-grid-solar-system" className="block px-4 py-3 text-sm text-secondary hover:bg-blue-50 hover:text-primary border-b border-gray-50 transition-colors">Off-Grid Solar</Link>
                                <Link href="/hybrid-solar-system" className="block px-4 py-3 text-sm text-secondary hover:bg-blue-50 hover:text-primary transition-colors">Hybrid Solar</Link>
                            </div>
                        </div>

                        <div className="relative group h-full flex items-center">
                            <button
                                className={`nav-dropdown font-medium text-sm flex items-center gap-1 h-full transition-colors duration-200 ${isParentActive(['/rooftop-solar']) ? 'text-primary' : 'text-secondary group-hover:text-primary'}`}
                            >
                                Locations <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:rotate-180">expand_more</span>
                            </button>
                            <div className="absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-xl rounded-b-lg overflow-hidden hidden group-hover:block">
                                <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                                    <span className="text-xs font-bold text-gray-500 uppercase">Delhi NCR</span>
                                </div>
                                <Link href="/rooftop-solar-in-delhi" className="block px-4 py-2 text-sm text-secondary hover:bg-blue-50 hover:text-primary transition-colors">New Delhi</Link>
                                <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                                    <span className="text-xs font-bold text-gray-500 uppercase">Madhya Pradesh</span>
                                </div>
                                <Link href="/rooftop-solar-in-gwalior" className="block px-4 py-2 text-sm text-secondary hover:bg-blue-50 hover:text-primary transition-colors">Gwalior</Link>
                                <Link href="/rooftop-solar-in-indore" className="block px-4 py-2 text-sm text-secondary hover:bg-blue-50 hover:text-primary transition-colors">Indore</Link>
                                <Link href="/rooftop-solar-in-bhind" className="block px-4 py-2 text-sm text-secondary hover:bg-blue-50 hover:text-primary transition-colors">Bhind</Link>
                                <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                                    <span className="text-xs font-bold text-gray-500 uppercase">Haryana</span>
                                </div>
                                <Link href="/rooftop-solar-in-haryana" className="block px-4 py-2 text-sm text-secondary hover:bg-blue-50 hover:text-primary transition-colors">Haryana</Link>
                            </div>
                        </div>

                        <Link
                            href="/about-us"
                            className={`nav-link font-medium text-sm transition-colors duration-200 ${isActive('/about-us') ? 'text-primary' : 'text-secondary hover:text-primary'}`}
                        >
                            About
                        </Link>
                        <Link
                            href="/calculator"
                            className={`nav-link font-medium text-sm transition-colors duration-200 ${isActive('/calculator') ? 'text-primary' : 'text-secondary hover:text-primary'}`}
                        >
                            Calculator
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link href="/go-solar" className="hidden sm:flex bg-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-0.5">
                            Talk to Energy Tech
                        </Link>
                        <button
                            className="md:hidden text-secondary"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span className="material-symbols-outlined text-3xl">menu</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-4 py-4 space-y-3">
                        <Link href="/" className="block py-2 text-primary font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>

                        <div className="border-t border-gray-100 pt-3">
                            <span className="text-xs font-bold text-gray-500 uppercase">Offers</span>
                            <Link href="/homes" className="block py-2 text-secondary hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Residential</Link>
                            <Link href="/housing-society" className="block py-2 text-secondary hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Housing Society</Link>
                            <Link href="/commercial" className="block py-2 text-secondary hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Commercial</Link>
                        </div>

                        <div className="border-t border-gray-100 pt-3">
                            <span className="text-xs font-bold text-gray-500 uppercase">Solutions</span>
                            <Link href="/on-grid-solar-system" className="block py-2 text-secondary hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>On-Grid Solar</Link>
                            <Link href="/off-grid-solar-system" className="block py-2 text-secondary hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Off-Grid Solar</Link>
                            <Link href="/hybrid-solar-system" className="block py-2 text-secondary hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Hybrid Solar</Link>
                        </div>

                        <div className="border-t border-gray-100 pt-3">
                            <span className="text-xs font-bold text-gray-500 uppercase">Locations</span>
                            <Link href="/rooftop-solar-in-delhi" className="block py-2 text-secondary hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>New Delhi</Link>
                            <Link href="/rooftop-solar-in-haryana" className="block py-2 text-secondary hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Haryana</Link>
                            <Link href="/rooftop-solar-in-gwalior" className="block py-2 text-secondary hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Gwalior</Link>
                            <Link href="/rooftop-solar-in-indore" className="block py-2 text-secondary hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Indore</Link>
                        </div>

                        <div className="border-t border-gray-100 pt-3">
                            <Link href="/about-us" className="block py-2 text-secondary hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
                            <Link href="/calculator" className="block py-2 text-secondary hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Calculator</Link>
                            <Link href="/contact" className="block py-2 text-secondary hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                        </div>

                        <Link href="/go-solar" className="block w-full text-center bg-primary hover:bg-blue-700 text-white py-3 rounded-lg font-bold mt-4" onClick={() => setIsMobileMenuOpen(false)}>
                            Get Free Quote
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
