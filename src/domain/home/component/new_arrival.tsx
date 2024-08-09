import { Card, CardContent } from "@/component/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/component/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function NewArrival() {
  return (
    <>
      <div className="lg:px-20 xl:px-20 pt-10">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-1">
            {Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-3 md:basis-1/2 lg:basis-1/4"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-2xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}
