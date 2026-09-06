const API_URL = import.meta.env.VITE_API_URL;
export async function refreshToken() {

    const response = await fetch(
        `${API_URL}/users/refresh`,
        {
            method: "POST",
            credentials: "include",
        }
    );

    if (!response.ok) {
        return null;
    }

    return await response.json();
}