"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Calligraphy() {
  const [paintings, setPaintings] = useState<{ src: string; alt: string }[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const paintingsData = [
      {
        src: "/calligraphy/cal1.jpg",
        alt: "12\" x 36\" (Acrylic on canvas)"
      },
      {
        src: "/calligraphy/cal2.jpeg",
        alt: "24\" x 36\" (Acrylic on canvas)"
      },
      {
        src: "/calligraphy/cal3.jpeg",
        alt: "24\" x 30\" (Acrylic on canvas)"
      },
      {
        src: "/calligraphy/cal4.jpeg",
        alt: "48\" x 60\" (Acrylic on canvas)"
      },
      {
        src: "/calligraphy/cal5.jpg",
        alt: "30\" x 40\" (Acrylic on canvas)"
      },
      {
        src: "/calligraphy/cal6.jpeg",
        alt: "16\" x 20\" (Acrylic on canvas)"
      },
      {
        src: "/calligraphy/cal7.jpg",
        alt: "30\" x 40\" (Acrylic on canvas)"
      },
      {
        src: "/calligraphy/cal8.jpg",
        alt: "18\" x 24\" (Acrylic on canvas)"
      },
      {
        src: "/calligraphy/cal9.jpg",
        alt: "16\" x 20\" (Acrylic on canvas)"
      },
      {
        src: "/calligraphy/cal13.jpg",
        alt: "12\" x 36\" (Acrylic on canvas)"
      },
      {
        src: "/calligraphy/cal10.jpg",
        alt: "30\" x 40\" (Acrylic on canvas)"
      },
      {
        src: "/calligraphy/cal12.jpeg",
        alt: "8\" x 10\" (Acrylic on canvas)"
      },
      {
        src: "/calligraphy/cal11.jpg",
        alt: "12\" x 16\" (Acrylic on canvas)"
      }];
    
    setPaintings(paintingsData);

  }, []);


  return (
    <div className="items-center justify-items-center min-h-screen p-14">
      <h1 className="text-5xl">calligraphy</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-10">
        {paintings.map((painting, index) => (
          <div key={index} onClick={() => setSelectedImage(painting.src)}>
            <Image
              src={painting.src}
              alt={painting.alt}
              width={600}
              height={400}
              className="object-cover rounded-lg w-full h-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
            <p className="text-center mt-2">{painting.alt}</p>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 -right-5 text-white text-5xl font-bold"
            >
              &times;
            </button>
            <Image
              src={selectedImage}
              alt="Full screen painting"
              layout="intrinsic"
              width={1200}
              height={800}
              className="object-contain rounded-lg max-w-[90vw] max-h-[90vh]"
            />
          </div>
        </div>
      )}
    </div>
  );
}