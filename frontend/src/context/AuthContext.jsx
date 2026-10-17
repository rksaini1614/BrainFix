import { createContext, useState, useEffect } from 'react';

// 1. Context Create kar rahe hain
export const AuthContext = createContext();

// 2. Provider function jo doosre components ko data dega
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Jab app load ho, toh check karo ki kya pehle se koi user local storage mein save hai
    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Login function - User data ko state aur local storage dono mein save karega
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('userInfo', JSON.stringify(userData));
    };

    // Logout function - User data ko state aur local storage se hata dega
    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
    };

    return (
        // Value prop mein hum wo data pass karte hain jo poori app ko chahiye (user, login, logout)
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};