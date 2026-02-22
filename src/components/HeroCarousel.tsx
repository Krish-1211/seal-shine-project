import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONTENT } from "@/lib/mockData";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export const HeroCarousel = () => {
    const plugin = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    );

    return (
        <div className="w-full bg-muted/30 py-0 overflow-hidden">
            <div className="w-full">
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    opts={{
                        loop: true,
                        align: "start",
                        skipSnaps: false,
                    }}
                >
                    <CarouselContent className="-ml-0">
                        {SITE_CONTENT.offers.map((offer) => (
                            <CarouselItem key={offer.id} className="pl-0 basis-full group">
                                <div className="p-0 h-full">
                                    <Card className="border-none shadow-2xl bg-[#002f5d] text-primary-foreground overflow-hidden h-[500px] rounded-none relative">
                                        {/* Abstract background pattern for premium feel */}
                                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                                        <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
                                        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>

                                        <CardContent className="flex flex-col md:flex-row items-center p-8 md:p-16 gap-8 h-full relative z-10">
                                            <div className="flex-1 space-y-6 text-center md:text-left">
                                                <Badge variant="outline" className="mb-2 text-white border-white/30 px-3 py-1 text-xs uppercase tracking-widest font-semibold bg-white/10 backdrop-blur-sm">
                                                    Special Offer
                                                </Badge>
                                                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                                                    {offer.title}
                                                </h2>
                                                <p className="text-lg text-primary-foreground/90">
                                                    {offer.description}
                                                </p>
                                                <div className="pt-4">
                                                    <Button size="lg" variant="secondary" className="font-bold">
                                                        Shop Now
                                                    </Button>
                                                    {offer.code && (
                                                        <p className="mt-2 text-sm opacity-80">
                                                            Use Code: <span className="font-mono font-bold">{offer.code}</span>
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="w-full md:w-1/2 h-64 md:h-full flex items-center justify-center p-4">
                                                <img
                                                    src={offer.image}
                                                    alt={offer.title}
                                                    className="max-h-full max-w-full object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex left-4" />
                    <CarouselNext className="hidden md:flex right-4" />
                </Carousel>
            </div>
        </div>
    );
};
