// Archivo central para llamar al backend Flask.
// Como API_URL termina en /api, los otros archivos deben usar rutas como /products, /login, /requests.
const API_URL = "http://127.0.0.1:5000/api";

async function apiGet(path) {
    const response = await fetch(API_URL + path);
    if (!response.ok) throw new Error("HTTP " + response.status);
    return response.json();
}

async function apiPost(path, data) {
    const response = await fetch(API_URL + path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error("HTTP " + response.status);
    return response.json();
}

async function apiPut(path, data) {
    const response = await fetch(API_URL + path, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error("HTTP " + response.status);
    return response.json();
}

async function apiDelete(path) {
    const response = await fetch(API_URL + path, { method: "DELETE" });
    if (!response.ok) throw new Error("HTTP " + response.status);
    return response.json();
}
