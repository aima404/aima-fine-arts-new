import MotionWrapperPage from "@/components/MotionWrapperPage";
import ReviewForm from "@/components/ReviewForm";
import Reviews from "@/components/Reviews";
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
      <ReviewForm />
      <div className="relative">
        <Image
          src="/landscapes/moose.jpg"
          alt="Painting of a moose"
          width={500}
          height={300}
          className="w-full h-auto"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
          <h1 className="text-5xl lg:text-8xl text-white drop-shadow-lg">aima fine arts</h1>
          <button className="mt-4 px-10 py-2 lg:px-16 lg:py-4 bg-white text-foreground hover:shadow-xl rounded-xl text-xl lg:text-4xl">learn more</button>
        </div>
      </div>
      
      <MotionWrapperPage>
        <div className="py-20 border-b w-full flex flex-col items-center justify-center min-h-screen">
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
            
          <Link href="/landscapes" className="mt-4 px-15 py-5 bg-sage text-white hover:bg-foreground transition-all duration-300 rounded-xl text-3xl">view more</Link>
        </div>
      </MotionWrapperPage>

      <MotionWrapperPage>
        <div className="p-20 border-b w-full flex flex-col items-center min-h-screen">
          <h2 className="text-4xl text-foreground text-center py-10">aima's bio</h2>
          <div className="row flex items-center justify-center gap-5 md:gap-20">
            <Image
              src="/landscapes/greenmount.jpeg"
              alt="Painting of a green mountain"
              width={500}
              height={300}
              className="w-1/2 px-10"
            />
            <p className="w-1/2">
              Aima is a passionate and dedicated young painter based in Texas. Painting has been her language and solace since childhood, a way to capture the beauty of the world and how she views it. 
              Each stroke of her brush is a step on a journey of exploration, creativity, and self-expression. Her paintings span a variety of subjects and she loves to work with people to achieve their visions.
              Explore her gallery and learn more about her artistic journey.
              Feel free to reach out with any questions, collaboration ideas, or just to share your thoughts.
            </p>
          </div>
        </div>
      </MotionWrapperPage>

      <MotionWrapperPage>
        <Reviews />
      </MotionWrapperPage>

    </div>
  );
}