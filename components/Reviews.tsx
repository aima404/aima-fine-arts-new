import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

export default async function Reviews() {
    const { data: reviews } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

    return (
       <div className="min-h-screen p-4 sm:p-10 md:p-20 border-b w-full flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl text-foreground text-center py-6 md:py-10">reviews</h2>
            <Carousel className="w-full max-w-[95%] md:max-w-10/12">
            <CarouselContent className="-ml-1">
                {reviews?.map((index) => (
                <CarouselItem key={index.name} className="pl-1 basis-full md:basis-1/2 lg:basis-1/4">
                    <div className="p-1">
                    <Card>
                        <CardContent className="flex flex-col text-sm md:text-md min-h-[250px] md:min-h-[300px] items-center justify-between p-4 md:px-4">
                            <div className="flex flex-col items-center justify-start space-y-2">
                                <p className="text-yellow-500 text-lg md:text-xl">{"⭐".repeat(index.rating)}</p>
                                <h3 className="font-semibold">{index.name}</h3>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center w-full text-center overflow-y-auto max-h-[150px] md:max-h-[200px] px-2">
                                <p className="line-clamp-6 md:line-clamp-none">{index.message}</p>
                            </div>
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
    );
}