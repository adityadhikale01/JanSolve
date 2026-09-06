import { useContext } from "react";
import { AuthContext } from "./authContextValue.jsx";

export function useAuth() {
    return useContext(AuthContext);
}
