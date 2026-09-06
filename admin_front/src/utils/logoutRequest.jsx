const API_URL = import.meta.env.VITE_API_URL;
export async function logoutRequest() {

    return fetch(
        `${API_URL}/users/logout`,
        {
            method: "POST",
            credentials: "include",
        }
    );

}