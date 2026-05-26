document.addEventListener("DOMContentLoaded", async function () {
    const grid = document.getElementById("product-grid");
    if (!grid) return;

    const products = await apiGet("/api/products");

    grid.innerHTML = products
        .filter(product => product.status === "Active")
        .map(product => `
            <article class="card">
                <img src="${product.image_url}" alt="${product.name}">
                <div class="card-body">
                    <span class="badge">${product.type} • ${product.category}</span>
                    <h3>${product.name}</h3>
                    <p>${product.location}</p>
                    <p class="price">$${Number(product.price).toLocaleString()}</p>
                    <p>Reserva: $${Number(product.reservation_amount).toLocaleString()}</p>
                    <a class="btn" href="detalle.html?id=${product.id}">Ver detalle</a>
                </div>
            </article>
        `).join("");
});
