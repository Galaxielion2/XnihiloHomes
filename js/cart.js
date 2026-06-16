// Carrito simple usando localStorage. Suficiente para demostrar la lógica del proyecto.
function getCart() {
    return JSON.parse(localStorage.getItem("xnihiloCart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("xnihiloCart", JSON.stringify(cart));
    updateCartPreview();
}

function addToCart(product) {
    const cart = getCart();
    cart.push(product);
    saveCart(cart);
    alert("Producto agregado al carrito");
}

function updateCartPreview() {
    const cart = getCart();
    const count = document.getElementById("cart-count");
    const preview = document.getElementById("cart-preview");

    if (count) count.textContent = cart.length;

    if (preview) {
        if (cart.length === 0) {
            preview.innerHTML = "<p>No hay solicitudes todavía.</p>";
        } else {
            preview.innerHTML = cart.slice(0, 3).map(item => `<p>${item.name}</p>`).join("") +
                '<a class="btn" href="carrito.html">Ver carrito</a>';
        }
    }
}

document.addEventListener("DOMContentLoaded", updateCartPreview);
