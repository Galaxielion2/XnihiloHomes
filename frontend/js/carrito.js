function renderCart() {
    const container = document.getElementById("cart-container");
    const cart = getCart();

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <p>El carrito de solicitudes está vacío.</p>
            <a class="btn" href="index.html">Volver al catálogo</a>
        `;
        return;
    }

    const total = cart.reduce((sum, item) => sum + Number(item.reservation_amount), 0);

    container.innerHTML = `
        ${cart.map(item => `
            <div class="panel" style="margin-bottom:12px;">
                <h3>${item.name}</h3>
                <p>${item.location}</p>
                <p>Reserva: $${Number(item.reservation_amount).toFixed(2)}</p>
                <button class="btn secondary" onclick="removeFromCart(${item.id})">Eliminar</button>
            </div>
        `).join("")}
        <h2>Total de reservas: $${total.toFixed(2)}</h2>
    `;
}

document.addEventListener("DOMContentLoaded", function () {
    renderCart();

    const form = document.getElementById("request-form");
    const message = document.getElementById("request-message");

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            const cart = getCart();
            if (cart.length === 0) {
                message.innerHTML = '<div class="message error">No hay solicitudes para enviar.</div>';
                return;
            }

            const result = await apiPost("/api/requests", {
                customer_name: document.getElementById("customer-name").value,
                customer_email: document.getElementById("customer-email").value,
                items: cart
            });

            if (result.error) {
                message.innerHTML = `<div class="message error">${result.error}</div>`;
            } else {
                clearCart();
                renderCart();
                message.innerHTML = `<div class="message">Solicitud enviada. Número: ${result.request_id}</div>`;
            }
        });
    }
});
