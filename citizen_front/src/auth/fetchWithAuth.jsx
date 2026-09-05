import {
    getAccessToken,
    saveAccessToken,
    clearAuth,
} from "../auth/authStorage";

import { refreshToken } from "./authApi";

export async function fetchWithAuth(url, options = {}) {
    let accessToken = getAccessToken();
    const isFormData = options.body instanceof FormData;
  
    const makeRequest = (token) =>
        fetch(url, {
            ...options,
            headers: {
                ...(isFormData ? {} : { "Content-Type": "application/json" }),
                ...options.headers,
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });

    // First request
    let response = await makeRequest(accessToken);

    // Access token is still valid or the API returned a non-auth error.
    // Let loaders/actions decide how to display validation and server errors.
    if (response.status !== 401) {
        return response;
    }
 // Try refreshing the token
    const refresh = await refreshToken();

    if (!refresh) {
        clearAuth();

        // Redirect to login
        window.location.href = "/login";

        throw new Response(null, {
            status: 401,
            statusText: "Session expired. Please login again.",
        });
    }

    // Save new access token
    saveAccessToken(refresh.accessToken);

    // Retry original request
    response = await makeRequest(refresh.accessToken);

    return response;
}
