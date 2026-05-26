document.addEventListener("DOMContentLoaded", async function () {
    const container = document.getElementById("detail-container");
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!container || !id) {
        container.innerHTML = "<p>No product selected.</p>";
        return;
    }

    const product = await apiGet(`/api/products/${id}`);

    if (product.error) {
        container.innerHTML = "<p>Product not found.</p>";
        return;
    }

    container.innerHTML = `
        <img class="detail-image" src="${product.image_url}" alt="${product.name}">
        <div class="panel">
            <span class="badge">${product.type} • ${product.category}</span>
            <h1>${product.name}</h1>
            <p>${product.description}</p>
            <p><strong>Location:</strong> ${product.location}</p>
            <p class="price">$${Number(product.price).toLocaleString()}</p>
            <p><strong>Reservation amount:</strong> $${Number(product.reservation_amount).toLocaleString()}</p>
            <button class="btn" id="add-request">Agregar a solicitudes</button>
        </div>
    `;

    document.getElementById("add-request").addEventListener("click", function () {
        addToCart(product);
    });
});
