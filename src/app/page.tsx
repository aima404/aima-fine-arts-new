import Chatbot from "@/components/Chatbot";
import LandingPage from "@/components/LandingPage";
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
    <div className="overflow-y-scroll h-full snap-y snap-mandatory">
      <ReviewForm />
      <Chatbot />

      <section id="landing-page" className="snap-start lg:min-h-screen">
        <LandingPage />
      </section>
      
      <section id="photo-gallery" className="snap-start lg:min-h-screen">
        <MotionWrapperPage>
          <div className="py-20 w-full flex flex-col items-center justify-center">
            <h2 className="text-2xl md:text-4xl text-foreground text-center py-2 md:py-5">photo gallery</h2>
            <Carousel
              opts={{
              align: "start",
                }}
                className="w-full max-w-9/12 md:max-w-10/12 p-2 md:p-10 flex justify-center"
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
                        className="w-[200px] h-[150px] md:w-[400px] md:h-[300px] object-cover transition-transform duration-300 ease-in-out hover:rounded-lg hover:scale-105"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
              
            <Link href="/landscapes" className="md:mt-4 px-5 py-3 md:px-15 md:py-5 bg-sage text-white hover:bg-foreground transition-all duration-300 rounded-xl text-xl md:text-3xl">view more</Link>
          </div>
        </MotionWrapperPage>
      </section>

      <section id="bio" className="snap-start lg:min-h-screen">
        <MotionWrapperPage>
          <div className="p-7 md:p-20 w-full flex flex-col justify-center items-center">
            <h2 className="text-2xl md:text-4xl text-foreground text-center pb-5 md:pb-10">aima's bio</h2>
            <div className="flex-col md:flex-row flex items-center justify-center gap-5 lg:gap-20">
              <Image
                src="/landscapes/greenmount.jpeg"
                alt="Painting of a green mountain"
                width={500}
                height={300}
                className="md:w-1/2 md:px-10"
              />
              <p className="sm:text-md md:w-1/2">
                Aima is a passionate and dedicated young painter based in Texas. Painting has been her language and solace since childhood, a way to capture the beauty of the world and how she views it. 
                Each stroke of her brush is a step on a journey of exploration, creativity, and self-expression. Her paintings span a variety of subjects and she loves to work with people to achieve their visions.
                Explore her gallery and learn more about her artistic journey.
                Feel free to reach out with any questions, collaboration ideas, or just to share your thoughts.
              </p>
            </div>
          </div>
        </MotionWrapperPage>
      </section>

      <section id="reviews" className="snap-start lg:min-h-screen">
      <MotionWrapperPage>
        <Reviews />
      </MotionWrapperPage>
      </section>
    </div>
  );
}