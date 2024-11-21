import { Card } from "@/component/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/component/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Loader } from "@/components/common/loader";
import { EmptyResource } from "@/components/common/error";
import { useFetchNewArrivalQuery } from "../home.api/new_arrival.api";

export default function NewArrival() {
  const { data: products, isLoading, error } = useFetchNewArrivalQuery();
  console.log("Fetched products:", products);

if (isLoading) {
  return <Loader />;
}

if (error || !products) {
  return <EmptyResource resourceName="New Arrival " />;
}


  return (
    <section className="bg-gray-50">
      <div className="flex items-center justify-center mt-5">
        <p className="uppercase font-extrabold text-2xl">New Arrivals</p>
      </div>
      <div className="px-10">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="p-5"
        >
          <CarouselContent>
            {products?.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-3 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="p-1">
                  <Card imageUrl={product.images[0]?.url} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-5" />
          <CarouselNext className="mr-5" />
        </Carousel>
      </div>
    </section>
  );
}
