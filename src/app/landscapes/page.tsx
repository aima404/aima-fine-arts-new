"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Landscapes() {
  const [paintings, setPaintings] = useState<{ src: string; alt: string }[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const paintingsData = [
      {
        src: "/landscapes/sunset.jpeg",
        alt: "16\" x 20\" (Acrylic on canvas)",
      },
      {
        src: "/landscapes/sheep.jpeg",
        alt: "16\" x 20\" (Acrylic on canvas)",
      },
      {
        src: "/landscapes/mountain.jpeg",
        alt: "16\" x 20\" (Acrylic on canvas)",
      },
      {
        src: "/landscapes/cave.jpeg",
        alt: "18\" x 24\" (Acrylic on canvas)",
      },
      {
        src: "/landscapes/field.jpeg",
        alt: "16\" x 20\" (Acrylic on canvas)",
      },
      {
        src: "/landscapes/girl.jpeg",
        alt: "8\" x 10\" (Acrylic on canvas)",
      },
      {
        src: "/landscapes/greenmount.jpeg",
        alt: "16\" x 20\" (Acrylic on canvas)",
      },
      {
        src: "/landscapes/cow.jpeg",
        alt: "8\" x 10\" (Acrylic on canvas)",
      },
      {
        src: "/landscapes/cloud.jpeg",
        alt: "16\" x 20\" (Acrylic on canvas)",
      },
      {
        src: "/landscapes/moose.jpg",
        alt: "16\" x 20\" (Acrylic on canvas)",
      },
      {
        src: "/landscapes/twin.jpeg",
        alt: "8\" x 10\" (Acrylic on canvas)",
      },
      {
        src: "/landscapes/house.jpg",
        alt: "16\" x 20\" (Acrylic on canvas)",
      },
      {
        src: "/landscapes/pier.jpg",
        alt: "18\" x 24\" (Acrylic on canvas)",
      },
      {
        src: "/landscapes/road.jpeg",
        alt: "16\" x 20\" (Acrylic on canvas)",
      },
      {
        src: "/landscapes/sunsetmount.jpg",
        alt: "18\" x 24\" (Acrylic on canvas)",
      },
      {
        src: "/landscapes/roadmount.jpeg",
        alt: "24\" x 30\" (Acrylic on canvas)",
      },
      {
        src: "/landscapes/ship.jpg",
        alt: "16\" x 20\" (Acrylic on canvas)",
      },
      {
        src: "/landscapes/hydrangeas.jpg",
        alt: "11.75\" x 19\" (Acrylic on canvas)",
      },
      {
        src: "/landscapes/phonebooth.jpeg",
        alt: "12\" x 16\" (Acrylic on canvas)",
      }];
    
    setPaintings(paintingsData);

  }, []);


  return (
    <div className="items-center justify-items-center min-h-screen p-14">
      <h1 className="text-5xl">landscapes</h1>
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