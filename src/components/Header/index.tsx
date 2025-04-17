'use client'

import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`fixed w-full z-[1000] top-0 left-0 transition-all duration-200 bg-[#181818] ${scrolled ? 'py-2' : 'py-4'}`}>
            <div className=" mx-auto flex items-center justify-between px-4">
                <div className="text-lg font-bold px-4">Logo </div>
                <nav className="space-x-4">
                    <Link href="/" className="text-gray-300 transition hover:text-white">Home</Link>
                    <Link href="/addPlayer" className="text-gray-300 transition hover:text-white">Add Player</Link>
                </nav>
            </div>
        </header>
    );
};

