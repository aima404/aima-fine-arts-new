"use client"
import Link from 'next/link';
import React from 'react';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import { Mail } from 'lucide-react';

const FOOTER_LINKS = [
  { href: 'https://tiktok.com/@aimafinearts', key: 'tiktok', label: <FaTiktok size={40} /> },
  { href: 'https://instagram.com/aimafinearts', key: 'instagram', label: <FaInstagram size={40} /> },
  { href: 'https://facebook.com/aimafinearts', key: 'facebook', label: <FaFacebook size={40} /> },
  { href: 'mailto:aimafinearts@gmail.com', key: 'email', label: <Mail size={40} /> }
];

export default function Footer() {
  return (
    <nav className="text-white relative pt-8 bg-foreground">
      <div className="flex items-center justify-center padding-container">
        <ul className="gap-4 lg:gap-14 flex">
          {FOOTER_LINKS.map((link) => (
            <Link href={link.href} key={link.key} className="cursor-pointer flex items-center justify-center">
              {link.label}
            </Link>
          ))}
        </ul>
      </div>
      <p className='p-5 text-sm text-center'>copyright © 2025 aima fine arts</p>
    </nav>
  )
}