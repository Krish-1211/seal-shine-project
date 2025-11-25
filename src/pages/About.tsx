import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShieldCheck, Award, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1">
                {/* Hero */}
                <section className="bg-primary/5 py-16 md:py-24">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">About Us</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Protecting Your Surfaces with Innovative Solutions
                        </p>
                    </div>
                </section>

                {/* Mission */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold">Our Mission</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Our mission at Sure Seal Sealants PTY LTD is to provide cutting-edge surface protection solutions that enhance both the durability and appearance of a wide range of surfaces. We aim to deliver products that simplify maintenance while ensuring long-lasting protection against everyday wear and tear.
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    With decades of industry expertise, Sure Seal Sealants PTY LTD is a trusted leader in developing high-performance sealants designed specifically for surfaces such as grout, tiles, and stone. Our products are engineered to offer reliable protection while maintaining the natural beauty of these surfaces.
                                </p>
                            </div>
                            <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
                                <ShieldCheck className="w-24 h-24 text-muted-foreground/20" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Expertise */}
                <section className="py-16 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <h2 className="text-3xl font-bold mb-6">Specialized Protection</h2>
                            <p className="text-lg text-muted-foreground">
                                We specialize in formulating sealants that cater to a variety of surfaces, including fabric, rugs, upholstery, carpet, and leather. By using advanced technology and premium ingredients, we ensure long-lasting results, with protection that can last up to 20 years.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card>
                                <CardContent className="pt-6 text-center">
                                    <Award className="w-12 h-12 mx-auto text-secondary mb-4" />
                                    <h3 className="text-xl font-bold mb-3">Our High Standards</h3>
                                    <p className="text-muted-foreground">
                                        To provide long-lasting, superior performing products at a competitive price.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6 text-center">
                                    <Users className="w-12 h-12 mx-auto text-secondary mb-4" />
                                    <h3 className="text-xl font-bold mb-3">Pursuit of Excellence</h3>
                                    <p className="text-muted-foreground">
                                        To provide the highest level of customer satisfaction by continually developing & improving our products, staff and processes.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default About;
