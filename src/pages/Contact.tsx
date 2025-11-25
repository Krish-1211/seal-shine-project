import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
                        <p className="text-xl text-muted-foreground">We'd love to hear from you</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <Phone className="w-10 h-10 mx-auto text-primary mb-4" />
                                <h3 className="font-bold mb-2">Phone</h3>
                                <div className="text-sm text-muted-foreground space-y-1">
                                    <p>ACT/NSW/VIC/SA/WA: (03) 9796 2709</p>
                                    <p>QLD: (07) 5568 7037</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6 text-center">
                                <Mail className="w-10 h-10 mx-auto text-primary mb-4" />
                                <h3 className="font-bold mb-2">Email</h3>
                                <p className="text-sm text-muted-foreground">sales@suresealsealants.com.au</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6 text-center">
                                <MapPin className="w-10 h-10 mx-auto text-primary mb-4" />
                                <h3 className="font-bold mb-2">Location</h3>
                                <p className="text-sm text-muted-foreground">Australian Made, Delivered Globally</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
