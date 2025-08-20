"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function LandingPage() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="relative">
            <Image
                src="/landscapes/moose.jpg"
                alt="Painting of a moose"
                width={500}
                height={300}
                className="w-full"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                <h1 className="text-5xl lg:text-8xl text-white drop-shadow-lg">aima fine arts</h1>
                <button 
                    onClick={() => scrollToSection("photo-gallery")} 
                    className="mt-4 px-10 py-2 lg:px-16 lg:py-4 bg-white text-foreground hover:shadow-xl rounded-xl text-xl lg:text-4xl flex items-center justify-center"
                >
                    <p>learn more</p>
                    <ArrowDown size={40} className="text-foreground pl-3 pt-1"/>
                </button>
            </div>
        </div>
    );
}
