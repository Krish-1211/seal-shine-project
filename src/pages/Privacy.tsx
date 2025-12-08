import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Privacy = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-3xl font-bold mb-8 text-primary">Privacy Policy</h1>

                    <div className="space-y-8 text-muted-foreground">
                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-foreground">Privacy Policy Your Data, Protected and Secured.</h2>
                            <p className="mb-4">
                                <strong>Sure Seal® Sealants Australia Pty Ltd</strong>
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-foreground">Privacy Information</h2>
                            <p className="mb-4">
                                Sure Seal® Sealants Australia Pty Ltd does not obtain personally identifying information about its users when visiting this website unless the user chooses to provide such information to Sure Seal® Sealants.
                            </p>
                            <p className="mb-4">
                                If a user visits our site to read or download information, the site does collect and store the following information about the user's visit: the name of the domain from which the user accessed the Internet (for example, aol.com); the date and time the user accessed our site; and the pages the user retrieved from our site.
                            </p>
                            <p className="mb-4">
                                Sure Seal® Sealants uses the collected information to measure the number of visitors to the different sections of the company site, and to help Sure Seal® Sealants make its site more useful to visitors.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-foreground">Email Correspondence</h2>
                            <p className="mb-4">
                                If a user provides personally identifying information through e-mail or forms, Sure Seal® Sealants may use that information to send company news and information to the user. Any such correspondence would include instructions to allow the user to request removal from future such correspondence. However, Sure Seal® Sealants does not disclose any personally identifying information Sure Seal® Sealants may collect to any outside companies or organizations.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-foreground">Contact Information</h2>
                            <p className="mb-4">
                                To inquire about SureSeal’s Privacy Policy, send e-mail to: <a href="mailto:info@suresealsealants.com.au" className="text-primary hover:underline">info@suresealsealants.com.au</a>
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-foreground">Copy Right & Terms of use</h2>
                            <p className="mb-4">
                                The information, text, graphics and links on this web site are provided by Sure Seal® Sealants as a convenience to its customers. Sure Seal® Sealants does not warrant the accuracy or completeness of the information, text, graphics, links and other items contained on this server.
                            </p>
                            <p className="mb-4">
                                Sure Seal® Sealants retains copyright to all text and graphic images. You may not distribute, modify or re-use the text or graphics without the expressed written permission of Sure Seal® Sealants Australia Pty Ltd.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Privacy;
