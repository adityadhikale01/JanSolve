import { useCallback, useState } from "react";
import {
    getUser,
    saveUser,
    saveAccessToken,
    getAccessToken,
    clearAuth
} from "./authStorage";
import { AuthContext } from "./authContextValue.jsx";

export function AuthProvider({ children }) {
 
    const [currentUser, setCurrentUser] = useState(() => getUser());

    const [accessToken, setAccessToken] = useState(() => getAccessToken());

    const loading = false;

    const login = useCallback(function login(user, token) {
     
        saveUser(user);
        saveAccessToken(token);

        setCurrentUser(user);
        setAccessToken(token);

    }, []);

    const logout = useCallback(function logout() {

        clearAuth();

        setCurrentUser(null);
        
        setAccessToken(null);
        
    }, []);

    return (

        <AuthContext.Provider

            value={{

                currentUser,

                accessToken,

                loading,

                isAuthenticated: Boolean(currentUser && accessToken),

                login,

                logout,

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}
