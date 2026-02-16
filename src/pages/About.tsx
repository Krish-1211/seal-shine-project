import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShieldCheck, Award, Users, CheckCircle, Droplet, Hammer, Building2, PaintBucket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1">
                {/* Hero */}
                <section className="bg-primary/5 py-16 md:py-24">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">About Sure Seal Sealants</h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Founded in 2002, Sure Seal Sealants is a proudly Australian company specialising in premium sealant, impregnator, and surface protection solutions for tile, stone, grout, concrete, and masonry.
                        </p>
                    </div>
                </section>

                {/* Introduction */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed text-center lg:text-left">
                                <p>
                                    With over two decades of trusted performance, we help builders, contractors, renovators and homeowners protect and enhance the surfaces that matter most — inside and outside the home.
                                </p>
                                <p>
                                    We understand that every surface has unique challenges. Whether it’s natural stone, porcelain tile, grout lines, or concrete pavers, Sure Seal delivers advanced formulations designed for maximum protection, durability and long-lasting results.
                                </p>
                            </div>
                            <div className="relative">
                                <div className="absolute -inset-4 bg-primary/5 rounded-xl -z-10 transform rotate-2"></div>
                                <img
                                    src="/images/about-us-meeting.png"
                                    alt="Sure Seal Sealants Team Discussion"
                                    className="rounded-lg shadow-xl w-full object-cover aspect-video"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* What We Do */}
                <section className="py-16 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">What We Do</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                At Sure Seal, we develop and manufacture a complete range of surface protection products.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            <Card className="h-full">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <Droplet className="w-6 h-6 text-primary" />
                                        </div>
                                        <CardTitle>Penetrating Sealers</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Advanced sealants that soak deep into porous surfaces to guard against water, oil and everyday staining.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="h-full">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <ShieldCheck className="w-6 h-6 text-primary" />
                                        </div>
                                        <CardTitle>Surface Protectants</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Solutions engineered to maintain appearance and performance for years.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="h-full">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <PaintBucket className="w-6 h-6 text-primary" />
                                        </div>
                                        <CardTitle>Cleaners & Maintenance Products</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Tailored formulations to prepare, clean and preserve surfaces safely and effectively.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="h-full">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <Hammer className="w-6 h-6 text-primary" />
                                        </div>
                                        <CardTitle>Specialist Formulations</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Products suited for residential, commercial and industrial environments, from kitchen benchtops to outdoor pavers.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="mt-12 text-center max-w-3xl mx-auto">
                            <p className="text-lg text-muted-foreground italic">
                                "Our products strike a balance between performance and practicality — offering professional-grade protection that is easy to apply, low odour and environmentally friendly."
                            </p>
                        </div>
                    </div>
                </section>

                {/* Why Choose Sure Seal */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Sure Seal</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3 text-primary">
                                    <Award className="w-8 h-8" />
                                    <h3 className="text-xl font-bold">Australian Engineered & Trusted Since 2002</h3>
                                </div>
                                <p className="text-muted-foreground">
                                    Developed locally to meet real-world construction, environmental and compliance requirements across Australia.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3 text-primary">
                                    <Users className="w-8 h-8" />
                                    <h3 className="text-xl font-bold">Industry-Proven Performance</h3>
                                </div>
                                <p className="text-muted-foreground">
                                    Specified and used by trade professionals, contractors and project teams who require consistency, reliability and repeatable results.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3 text-primary">
                                    <Building2 className="w-8 h-8" />
                                    <h3 className="text-xl font-bold">Large Commercial & Project Capability</h3>
                                </div>
                                <p className="text-muted-foreground">
                                    Sure Seal products are suitable for large-scale commercial applications, including multi-unit developments, retail centres, and industrial floors. Our formulations perform across high-traffic environments.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3 text-primary">
                                    <ShieldCheck className="w-8 h-8" />
                                    <h3 className="text-xl font-bold">Purpose-Built Surface Protection</h3>
                                </div>
                                <p className="text-muted-foreground">
                                    Products engineered specifically for tile, stone, grout, concrete and masonry — ensuring correct performance for each substrate rather than one-size-fits-all solutions.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3 text-primary">
                                    <CheckCircle className="w-8 h-8" />
                                    <h3 className="text-xl font-bold">Versatile Applications</h3>
                                </div>
                                <p className="text-muted-foreground">
                                    Suitable for residential, commercial and light industrial projects, both internal and external, from small renovations through to high-volume project work.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Promise & Call to Action */}
                <section className="py-16 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-3xl mx-auto mb-12">
                            <h2 className="text-3xl font-bold mb-6">Our Promise</h2>
                            <p className="text-lg leading-relaxed text-primary-foreground/90">
                                At Sure Seal, we don’t just make sealants — we offer solutions that protect investment, preserve beauty, and extend the life of your surfaces. Our commitment to quality, consistency and customer support means you always have the right product and the right guidance for every job.
                            </p>
                        </div>

                        <div className="bg-background/10 rounded-2xl p-8 backdrop-blur-sm max-w-4xl mx-auto border border-primary-foreground/20">
                            <h2 className="text-2xl font-bold mb-4">Let’s Protect What Matters</h2>
                            <p className="mb-8 text-primary-foreground/90">
                                Whether you’re a commercial applicator, professional tiler, builder, or project manager — or a homeowner undertaking a renovation — Sure Seal provides the confidence that comes from proven performance, consistent results, and fit-for-purpose surface protection solutions.
                            </p>
                            <p className="text-xl font-semibold">
                                Contact our team to discuss the right solution for your application.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default About;
