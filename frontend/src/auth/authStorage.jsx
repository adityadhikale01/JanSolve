export function getAccessToken() {
    return localStorage.getItem("accessToken");
}

export function saveAccessToken(token) {
    localStorage.setItem("accessToken", token);
}

export function getUser() {
    return JSON.parse(localStorage.getItem("user"));
}

export function saveUser(user) {
    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );
}

export function clearAuth() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
}