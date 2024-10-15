import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    name: string | null;
    setName: (name: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [name, setName] = useState<string | null>(localStorage.getItem("userName") || null);
    useEffect(() => {
        if (name) {
            localStorage.setItem("userName", name);
        }
    }, [name]);

    return (
        <AuthContext.Provider value={{ name, setName }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("context is undefined");
    }
    return context;
};
