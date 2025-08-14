"use client"
import Link from 'next/link';
import React from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';

const FOOTER_LINKS = [
  { href: 'https://instagram.com/aimafinearts', key: 'instagram', label: <Instagram size={40} /> },
  { href: 'https://facebook.com/aimafinearts', key: 'facebook', label: <Facebook size={40} /> },
  { href: 'aimafinearts@gmail.com', key: 'email', label: <Mail size={40} /> }
];

const Footer = () => {
  return (
    <nav className="text-white relative pt-8 bg-foreground">
      <div className="flex items-center justify-center padding-container">
        <ul className="gap-4 lg:gap-14 flex">
          {FOOTER_LINKS.map((link) => (
            <Link href={link.href} key={link.key} className="cursor-pointer flex items-center justify-center transition-all hover:font-bold hover:underline hover:underline-offset-10">
              {link.label}
            </Link>
          ))}
        </ul>
      </div>
      <p className='p-5 text-sm text-center'>Copyright © 2025 aima fine arts</p>
    </nav>
  )
}

export default Footer;