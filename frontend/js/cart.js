function getCart() {
    return JSON.parse(localStorage.getItem("xnihiloCart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("xnihiloCart", JSON.stringify(cart));
    updateCartPreview();
}

function addToCart(product) {
    const cart = getCart();
    const exists = cart.find(item => item.id === product.id);

    if (!exists) {
        cart.push(product);
        saveCart(cart);
        alert("Listado agregado a solicitudes.");
    } else {
        alert("Este listado ya está en solicitudes.");
    }
}

function removeFromCart(productId) {
    const cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
    if (typeof renderCart === "function") {
        renderCart();
    }
}

function clearCart() {
    localStorage.removeItem("xnihiloCart");
    updateCartPreview();
}

function updateCartPreview() {
    const cart = getCart();
    const count = document.getElementById("cart-count");
    const preview = document.getElementById("cart-preview");

    if (count) {
        count.textContent = cart.length;
    }

    if (preview) {
        if (cart.length === 0) {
            preview.innerHTML = "<p>No hay solicitudes todavía.</p>";
        } else {
            preview.innerHTML = cart.slice(0, 3).map(item => `
                <p><strong>${item.name}</strong><br>Reserva: $${Number(item.reservation_amount).toFixed(2)}</p>
            `).join("") + '<a class="btn" href="carrito.html">Ver solicitudes</a>';
        }
    }
}

document.addEventListener("DOMContentLoaded", updateCartPreview);
