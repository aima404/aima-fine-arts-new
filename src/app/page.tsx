import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

const carousel = [
  {
    src: "/landscapes/ship.jpg",
    alt: "Painting of a ship",
  },
  {
    src: "/landscapes/sunset.jpeg",
    alt: "Painting of a sunset",
  },
  {
    src: "/landscapes/sheep.jpeg",
    alt: "Painting of sheep",
  },
  {
    src: "/landscapes/mountain.jpeg",
    alt: "Painting of a mountain",
  },
  {
    src: "/landscapes/cave.jpeg",
    alt: "Painting of a cave",
  },
];

export default function Home() {
  return (
    <div>
      <div className="relative items-center justify-items-center min-h-screen">
        <Image
          src="/landscapes/moose.jpg"
          alt="Painting of a moose"
          layout="responsive"
          width={500}
          height={300}
          className="w-full h-auto"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
          <h1 className="text-8xl text-white drop-shadow-lg">aima fine arts</h1>
          <button className="mt-4 px-15 py-5 bg-white text-foreground hover:shadow-xl rounded-xl text-4xl">learn more</button>
        </div>
      </div>
      
      <div className="py-20 border-b w-full flex flex-col items-center">
        <h2 className="text-4xl text-foreground text-center py-5">photo gallery</h2>
        <Carousel
          opts={{
          align: "start",
            }}
            className="w-full max-w-10/12 p-10 flex justify-center"
        >
          <CarouselContent>
            {carousel.map((link, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 flex justify-center">
                <div className="p-1 flex justify-center">
              <Image
                src={link.src}
                alt={link.alt}
                width={400}
                height={300}
                className="w-[400px] h-[300px] object-cover transition-transform duration-300 ease-in-out hover:rounded-lg hover:scale-105"
              />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
          
        <Link href="/landscapes" className="mt-4 px-15 py-5 bg-sage text-white hover:bg-foreground transition-all rounded-xl text-3xl">view more</Link>
      </div>

      <div className="p-20 border-b w-full flex flex-col items-center">
        <h2 className="text-4xl text-foreground text-center py-10">aima's bio</h2>
        <div className="row flex items-center justify-center gap-20">
          <Image
            src="/landscapes/greenmount.jpeg"
            alt="Painting of a green mountain"
            width={500}
            height={300}
            className="w-1/2 px-10"
          />
          <p className="w-1/2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      <div className="p-20 border-b w-full flex flex-col items-center">
        <h2 className="text-4xl text-foreground text-center py-10">reviews</h2>
        <Carousel className="w-full max-w-10/12">
          <CarouselContent className="-ml-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/4">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-2xl font-semibold">{index + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious/>
          <CarouselNext />
        </Carousel>
      </div>

    </div>
  );
}