document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return;

    const product = await apiGet(`/products/${id}`);

    document.getElementById("detail-image").src = product.image_url;
    document.getElementById("detail-badge").textContent = `${product.type} • ${product.category}`;
    document.getElementById("detail-name").textContent = product.name;
    document.getElementById("detail-price").textContent = `$${Number(product.price).toLocaleString()}`;
    document.getElementById("detail-location").textContent = product.location;
    document.getElementById("detail-description").textContent = product.description;
    document.getElementById("detail-reservation").textContent = `$${Number(product.reservation_amount).toLocaleString()}`;

    document.getElementById("add-to-cart").addEventListener("click", function () {
        addToCart(product);
    });
});
