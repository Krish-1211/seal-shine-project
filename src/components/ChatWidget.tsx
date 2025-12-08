import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { MOCK_PRODUCTS } from "@/lib/mockData";

type Message = {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
};

const FAQ_DATA = [
    {
        keywords: ["quick drying", "slow drying", "difference"],
        answer: "Grout, Tile & Stone Sealer – Quick Drying has a quicker drying time. The Slow Drying version takes longer to dry but may penetrate deeper into very dense stones."
    },
    {
        keywords: ["work", "do", "how", "function"],
        answer: "The sealers are “impregnators” that penetrate into the tiles to stop soiling. They are not coatings, so there is no film to scratch, peel or flake off."
    },
    {
        keywords: ["wax", "remove", "clean before"],
        answer: "To remove wax, we recommend Sure Clean Porcelain Cleaner which is designed to dissolve wax and grout residue from tiles."
    },
    {
        keywords: ["brushes", "clean brushes"],
        answer: "For solvent-based sealers, clean brushes with turps then warm soapy water. For water-based sealers, just warm soapy water is needed."
    },
    {
        keywords: ["coverage", "how much"],
        answer: "1 litre of Quick Drying Sealer can cover up to 40 square metres, depending on application method and porosity."
    },
    {
        keywords: ["change look", "appearance", "wet finish", "color"],
        answer: "No, our impregnators dry invisible and will not change the appearance, texture, or colour of, nor give a wet finish to the tiles."
    },
    {
        keywords: ["everyday cleaning", "maintenance", "cleaning products"],
        answer: "Use non-acidic cleaners or light cleaners like dishwashing liquid or plain water. Avoid harsh detergents, chlorine, or abrasive materials."
    },
    {
        keywords: ["application", "apply", "how to"],
        answer: "You can apply the product with a lamb’s wool applicator, paint brush, roller, or mop. Thoroughly clean the surface first. Apply coat(s) as directed on the label."
    },
    {
        keywords: ["pool", "swimming", "chlorine", "outdoor"],
        answer: "For swimming pool areas, we recommend Grout, Tile & Stone Sealer – Quick Drying or the 24/7 Plus Stone & Concrete Sealer. Chlorine and saltwater will not affect them."
    },
    {
        keywords: ["grout lines", "shower", "overspray"],
        answer: "Yes, you can seal just the grout lines (we recommend the Aerosol for this). Overspray dries clear and won't be noticeable."
    },
    {
        keywords: ["last", "duration", "longevity"],
        answer: "It lasts a lifetime on vertical surfaces and years on floors. Heavy traffic areas like showers should be checked yearly."
    },
    {
        keywords: ["porcelain"],
        answer: "For porcelain, Grout, Tile & Stone Sealer – Slow Drying or 24/7 Plus Stone & Concrete Sealer are best as they penetrate dense surfaces better."
    },
    {
        keywords: ["paint", "affect paint"],
        answer: "The Quick Drying Aerosol won't affect paint. For liquid sealers, cover painted areas or clean overspray immediately."
    },
    {
        keywords: ["stone table", "benchtop"],
        answer: "Yes, any Sure Seal product can be used to seal stone tables and benchtops."
    },
    {
        keywords: ["two coats", "2 coats"],
        answer: "We recommend two coats to ensure no area was missed during the first application, as the product dries invisible."
    },
    {
        keywords: ["silicone", "crack"],
        answer: "No, Sure Seal cannot seal cracks (it's not a filler) and cannot be applied over silicone (it won't stick). Apply silicone FIRST, then seal."
    },
    {
        keywords: ["terracotta", "pots"],
        answer: "Yes, spray the inside of terracotta pots to minimize water absorption using Quick Drying Aerosol or 24/7 Plus Sealer."
    },
    {
        keywords: ["furniture"],
        answer: "No, don't use tile sealer on furniture. Try our Rug and Carpet Protector instead (test first)."
    }
];

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Hi! I'm the Sure Seal Assistant. Ask me anything about our products!",
            sender: "bot",
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState("");
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to bottom when messages change
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    }, [messages, isOpen]);

    const findAnswer = (query: string) => {
        const lowerQuery = query.toLowerCase();

        // 1. Check for Greetings
        const greetings = ["hi", "hello", "hey", "greetings", "good morning", "good afternoon"];
        if (greetings.some(g => lowerQuery.startsWith(g)) && lowerQuery.length < 20) {
            return "Hello! I'm here to help you with Sure Seal products. Ask me about sealers, cleaners, or specific application advice.";
        }

        // 2. Check for Contact Info
        const contactKeywords = ["contact", "phone", "email", "address", "location", "number", "call"];
        if (contactKeywords.some(k => lowerQuery.includes(k))) {
            return "You can reach us at (03) 9796 2709 or sales@suresealsealants.com.au. We are located in Melbourne, Australia.";
        }

        // 3. Check for Company History / Info
        const historyKeywords = ["launched", "founded", "established", "start", "history", "who are you", "about us", "company"];
        if (historyKeywords.some(k => lowerQuery.includes(k))) {
            return "Sure Seal Sealants was established in 2002. We are an Australian manufacturer of premium sealers and cleaners. We have been protecting surfaces for over 20 years!";
        }

        // 4. Check for general product listing
        if (
            lowerQuery.includes("what products") ||
            lowerQuery.includes("list of products") ||
            (lowerQuery.includes("products") && lowerQuery.includes("have")) ||
            (lowerQuery.includes("products") && lowerQuery.includes("sell"))
        ) {
            return `We offer a range of premium sealants and cleaners including: ${MOCK_PRODUCTS.slice(0, 5).map(p => p.title).join(", ")}, and more. Would you like to know more about a specific one?`;
        }

        // 5. Check for Specific Product Questions (Improved Matching)
        const normalize = (str: string) => {
            return str.toLowerCase()
                .replace(/&/g, "and")
                .replace(/[^\w\s]/g, " ") // Replace special chars with space
                .replace(/\s+/g, " ")
                .trim();
        };

        const queryNormalized = normalize(lowerQuery);

        // Calculate score for each product
        const scoredProducts = MOCK_PRODUCTS.map(p => {
            const titleNormalized = normalize(p.title);
            // Remove parenthetical info for base match
            const baseTitleNormalized = normalize(p.title.replace(/\(.*\)/, ""));

            // Check for exact match of base title in query
            if (queryNormalized.includes(baseTitleNormalized)) return { product: p, score: 100 };

            // Token based matching
            const productTokens = baseTitleNormalized.split(" ").filter(w => w.length > 2);
            const queryTokens = queryNormalized.split(" ");

            let matchCount = 0;
            productTokens.forEach(token => {
                if (queryTokens.includes(token)) matchCount++;
            });

            // Calculate percentage of product tokens found in query
            const score = (matchCount / productTokens.length) * 100;
            return { product: p, score };
        });

        // Get best match
        const bestProductMatch = scoredProducts.sort((a, b) => b.score - a.score)[0];

        // Threshold for accepting a match (e.g., 50% of words matched - slightly lower to catch typos if 2/3 words match)
        if (bestProductMatch && bestProductMatch.score >= 50) {
            const product = bestProductMatch.product;
            return `**${product.title}**: ${product.description} It costs $${product.price.toFixed(2)}.`;
        }

        // 6. Fallback to FAQ Keyword Matching
        const matches = FAQ_DATA.map(faq => {
            const score = faq.keywords.reduce((acc, keyword) => {
                // Use word boundary check to avoid partial word matches (e.g. "remove" in "remover")
                const regex = new RegExp(`\\b${keyword}\\b`, 'i');
                return regex.test(lowerQuery) ? acc + 1 : acc;
            }, 0);
            return { ...faq, score };
        });

        const bestMatch = matches.sort((a, b) => b.score - a.score)[0];

        if (bestMatch && bestMatch.score > 0) {
            return bestMatch.answer;
        }

        return "I'm not sure about that one. Please contact us directly at (03) 9796 2709 or sales@suresealsealants.com.au for expert advice.";
    };

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputText.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: "user",
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText("");

        // Simulate bot delay
        setTimeout(() => {
            const answer = findAnswer(userMsg.text);
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: answer,
                sender: "bot",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
        }, 600);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-4">
            {/* Search/Chat Window */}
            {isOpen && (
                <div className="bg-background border border-border shadow-2xl rounded-lg w-[350px] sm:w-[400px] h-[500px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-200">
                    <div className="bg-primary p-4 flex justify-between items-center text-primary-foreground">
                        <div className="flex items-center gap-2">
                            <Bot className="h-6 w-6" />
                            <div>
                                <h3 className="font-semibold">Sure Seal Support</h3>
                                <p className="text-xs opacity-90">Ask me about our products</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-primary-foreground hover:bg-white/20"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
                        <div className="space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex w-full",
                                        msg.sender === "user" ? "justify-end" : "justify-start"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                                            msg.sender === "user"
                                                ? "bg-primary text-primary-foreground rounded-br-none"
                                                : "bg-muted text-foreground rounded-bl-none"
                                        )}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>

                    <form onSubmit={handleSendMessage} className="p-4 border-t border-border bg-background">
                        <div className="flex gap-2">
                            <Input
                                placeholder="Type a message..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                className="flex-1"
                                autoFocus
                            />
                            <Button type="submit" size="icon" disabled={!inputText.trim()}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="h-14 w-14 rounded-full shadow-lg p-0 bg-primary hover:bg-primary/90 transition-transform hover:scale-105"
            >
                {isOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <MessageCircle className="h-6 w-6" />
                )}
            </Button>
        </div>
    );
};

export default ChatWidget;
