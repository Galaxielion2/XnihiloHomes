document.addEventListener("DOMContentLoaded", function () {
    const list = document.getElementById("cart-list");
    const totalBox = document.getElementById("cart-total");
    const cart = getCart();

    if (cart.length === 0) {
        list.innerHTML = '<p class="message">El carrito está vacío. Regresa al catálogo para agregar productos.</p>';
        totalBox.textContent = "";
        return;
    }

    let total = 0;
    list.innerHTML = cart.map(item => {
        total += Number(item.reservation_amount);
        return `<div class="cart-line"><strong>${item.name}</strong><br>Reserva: $${Number(item.reservation_amount).toLocaleString()}</div>`;
    }).join("");

    totalBox.textContent = `Total de reservas: $${total.toLocaleString()}`;

    document.getElementById("send-request").addEventListener("click", async function () {
        const data = {
            customer_name: "Cliente Demo",
            customer_email: "cliente@email.com",
            items: cart
        };
        const result = await apiPost("/requests", data);
        alert(result.message || "Solicitud enviada");
        localStorage.removeItem("xnihiloCart");
        location.reload();
    });
});
