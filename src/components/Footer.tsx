import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export const Footer = () => {
    return (
        <footer className="bg-primary/5 pt-16 pb-8 border-t border-border">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="Sure Seal Sealants" className="h-12 w-auto" />
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            Australian manufacturer of premium sealers and cleaners since 2002.
                            Protecting your surfaces with advanced technology.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                            <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">Products</Link></li>
                            <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                <span>(03) 9796 2709</span>
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                <span>sales@suresealsealants.com.au</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Stay Updated</h4>
                        <p className="text-muted-foreground mb-4">Sign up to stay updated with Sure Seal</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
                            />
                            <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md font-medium hover:bg-secondary/90 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
                    <p>© 2025 SURE SEAL SEALANTS ALL RIGHTS RESERVED</p>
                    <p className="mt-2 text-xs">POWERED BY TECHNO BYTES IT SOLUTIONS LLP</p>
                </div>
            </div>
        </footer>
    );
};
