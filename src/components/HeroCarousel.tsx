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
        <div className="w-full bg-muted/30 py-8">
            <div className="container mx-auto px-4">
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full max-w-5xl mx-auto"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent>
                        {SITE_CONTENT.offers.map((offer) => (
                            <CarouselItem key={offer.id}>
                                <div className="p-1">
                                    <Card className="border-none shadow-lg bg-gradient-to-r from-primary/90 to-primary text-primary-foreground overflow-hidden">
                                        <CardContent className="flex flex-col md:flex-row items-center p-6 md:p-10 gap-6">
                                            <div className="flex-1 space-y-4 text-center md:text-left">
                                                <Badge variant="secondary" className="mb-2">
                                                    Special Offer
                                                </Badge>
                                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
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
                                            <div className="w-full md:w-1/3 aspect-video bg-white/10 rounded-lg flex items-center justify-center">
                                                {/* Placeholder for offer image */}
                                                <span className="text-white/50 font-bold text-xl">Offer Image</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex" />
                    <CarouselNext className="hidden md:flex" />
                </Carousel>
            </div>
        </div>
    );
};
