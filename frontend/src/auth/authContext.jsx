import { createContext, useEffect, useState } from "react";
import {
    getUser,
    saveUser,
    saveAccessToken,
    getAccessToken,
    clearAuth
} from "./authStorage";
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
 
    const [currentUser, setCurrentUser] = useState(null);

    const [accessToken, setAccessToken] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("AuthProvider mounted");
        const storedUser = getUser();

        const storedToken = getAccessToken();

        if (storedUser && storedToken) {

            setCurrentUser(storedUser);

            setAccessToken(storedToken);

        }

        setLoading(false);

    }, []);

    function login(user, token) {
     
        saveUser(user);
        saveAccessToken(token);

        setCurrentUser(user);
        setAccessToken(token);

    }

    function logout() {

        clearAuth();

        setCurrentUser(null);
        
        setAccessToken(null);
        
    }

    return (

        <AuthContext.Provider

            value={{

                currentUser,

                accessToken,

                loading,

                isAuthenticated: !!currentUser,

                login,

                logout,

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}