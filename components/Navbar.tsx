"use client";

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', key: 'home', label: 'home' },
  { href: '/landscapes', key: 'landscapes', label: 'landscapes' },
  { href: '/calligraphy', key: 'calligraphy', label: 'calligraphy' },
  { href: '/contact', key: 'contact', label: 'contact' }
];

export default function Navbar() {
  const pathname = usePathname();
  console.log("Current pathname:", pathname);

  return (
    <nav className="text-darkblue relative p-8 text-xl border-b border-foreground">
      <div className="flex items-center justify-between padding-container">
        <Link href="/">
          <h1 className='text-4xl'>aima fine arts</h1>
        </Link>

        <ul className="gap-4 lg:gap-14 flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.key}>
              <Link
                href={link.href}
                className={`cursor-pointer flex items-center justify-center transition-all hover:underline hover:underline-offset-8 ${
                isActive ? 'underline underline-offset-8' : ''
                }`}
              >
                {link.label}
              </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  )
};