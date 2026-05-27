const API_BASE_URL = "";

async function apiGet(path) {
    const response = await fetch(`${API_BASE_URL}${path}`);
    return await response.json();
}

async function apiPost(path, data) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return await response.json();
}

async function apiPut(path, data) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return await response.json();
}

async function apiDelete(path) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        method: "DELETE"
    });

    return await response.json();
}