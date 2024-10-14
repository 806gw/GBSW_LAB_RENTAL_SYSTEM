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
            localStorage.setItem("userName", name); // name이 변경될 때마다 업데이트
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
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};
