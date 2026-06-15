// Cambiar esta URL si Flask corre en otro puerto.
const API_URL = "http://127.0.0.1:5000/api";

async function apiGet(path) {
    const response = await fetch(API_URL + path);
    return response.json();
}

async function apiPost(path, data) {
    const response = await fetch(API_URL + path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return response.json();
}

async function apiPut(path, data) {
    const response = await fetch(API_URL + path, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return response.json();
}

async function apiDelete(path) {
    const response = await fetch(API_URL + path, { method: "DELETE" });
    return response.json();
}
