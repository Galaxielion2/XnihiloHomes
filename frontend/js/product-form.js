document.addEventListener("DOMContentLoaded", async function () {
    const form = document.getElementById("product-form");
    const message = document.getElementById("form-message");
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
        const product = await apiGet(`/api/products/${id}`);
        document.getElementById("name").value = product.name;
        document.getElementById("type").value = product.type;
        document.getElementById("category").value = product.category;
        document.getElementById("price").value = product.price;
        document.getElementById("location").value = product.location;
        document.getElementById("reservation_amount").value = product.reservation_amount;
        document.getElementById("image_url").value = product.image_url;
        document.getElementById("status").value = product.status;
        document.getElementById("description").value = product.description;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const data = {
            name: document.getElementById("name").value,
            type: document.getElementById("type").value,
            category: document.getElementById("category").value,
            price: document.getElementById("price").value,
            location: document.getElementById("location").value,
            reservation_amount: document.getElementById("reservation_amount").value,
            image_url: document.getElementById("image_url").value,
            status: document.getElementById("status").value,
            description: document.getElementById("description").value
        };

        const result = id
            ? await apiPut(`/api/products/${id}`, data)
            : await apiPost("/api/products", data);

        if (result.error) {
            message.innerHTML = `<div class="message error">${result.error}</div>`;
        } else {
            message.innerHTML = '<div class="message">Listado guardado correctamente.</div>';
            setTimeout(() => window.location.href = "producto.html", 800);
        }
    });
});
