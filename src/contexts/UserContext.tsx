import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
    email: string;
    name?: string;
    tags: string[];
    isWholesale: boolean;
}

interface UserContextType {
    user: User | null;
    login: (email: string) => void;
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

    const login = (email: string) => {
        // Mock login logic
        const isWholesale = email.includes("wholesale");
        const tags = isWholesale ? ["wholesale"] : [];

        const newUser: User = {
            email,
            name: email.split("@")[0],
            tags,
            isWholesale
        };

        setUser(newUser);
        localStorage.setItem("customerUser", JSON.stringify(newUser));
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
