// Archivo central para llamadas al backend.
// En Netlify usamos API_URL vacio porque _redirects manda /api/* al backend de AWS.
const API_URL = "";

async function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
}

async function apiGet(path) {
    const response = await fetch(API_URL + "/api" + path);
    return handleResponse(response);
}

async function apiPost(path, data) {
    const response = await fetch(API_URL + "/api" + path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return handleResponse(response);
}

async function apiPut(path, data) {
    const response = await fetch(API_URL + "/api" + path, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return handleResponse(response);
}

async function apiDelete(path) {
    const response = await fetch(API_URL + "/api" + path, { method: "DELETE" });
    return handleResponse(response);
}
