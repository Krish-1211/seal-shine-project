import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
    email: string;
    name?: string;
    tags: string[];
    isWholesale: boolean;
}

interface UserContextType {
    user: User | null;
    login: (email: string, password?: string) => boolean;
    logout: () => void;
    isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage on mount
        const storedUser = localStorage.getItem("customerUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = (email: string, password?: string) => {
        // Enforce specific credentials for wholesale
        if (email === "wholesale@example.com") {
            if (password !== "wholesale") {
                // Incorrect password for the specific wholesale account
                return false;
            }
            // Correct credentials
            const newUser: User = {
                email,
                name: "Wholesale Partner",
                tags: ["wholesale"],
                isWholesale: true
            };
            setUser(newUser);
            localStorage.setItem("customerUser", JSON.stringify(newUser));
            return true;
        }

        // Prevent other random "wholesale" emails from getting wholesale status automatically if we want to be strict
        // The user said "only the email wholesale@example.com ... can access that page"
        // So we should probably prevent isWholesale from being true for anyone else

        const isWholesale = false; // logic changed: strict check above
        const tags: string[] = [];

        const newUser: User = {
            email,
            name: email.split("@")[0],
            tags,
            isWholesale
        };

        setUser(newUser);
        localStorage.setItem("customerUser", JSON.stringify(newUser));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("customerUser");
    };

    return (
        <UserContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
