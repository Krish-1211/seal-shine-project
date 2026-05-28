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
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser && parsedUser.email) {
                    const username = parsedUser.email.toLowerCase();
                    const shouldBeWholesale = username !== "admin" && username !== "retail";
                    if (parsedUser.isWholesale !== shouldBeWholesale) {
                        parsedUser.isWholesale = shouldBeWholesale;
                        parsedUser.tags = shouldBeWholesale ? ["wholesale"] : [];
                        localStorage.setItem("customerUser", JSON.stringify(parsedUser));
                    }
                }
                setUser(parsedUser);
            } catch (e) {
                console.error("Error parsing stored user:", e);
            }
        }
        setIsLoading(false);
    }, []);

    const login = (email: string) => {
        // Mock login logic
        // Treat any username as a wholesale account unless it is 'admin' or 'retail'
        const isWholesale = email.toLowerCase() !== "admin" && email.toLowerCase() !== "retail";
        const tags = isWholesale ? ["wholesale"] : [];

        const newUser: User = {
            email,
            name: email,
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
