// Página del carrito: muestra solicitudes guardadas y permite enviarlas al backend.
document.addEventListener("DOMContentLoaded", function () {
  const list = document.getElementById("cart-list");
  const totalBox = document.getElementById("cart-total");
  const sendButton = document.getElementById("send-request");
  const clearButton = document.getElementById("clear-cart");

  if (!list || !totalBox) return;

  const cart = getCart();

  if (cart.length === 0) {
    list.innerHTML = '<p class="message">El carrito está vacío. Regresa al catálogo para agregar productos.</p>';
    totalBox.textContent = "";
    if (sendButton) sendButton.style.display = "none";
    return;
  }

  let total = 0;

  list.innerHTML = cart.map((item, index) => {
    total += Number(item.reservation_amount || 0);

    return `
      <div class="cart-line panel" style="margin-bottom:12px; box-shadow:none; border:1px solid #e5e7eb;">
        <strong>${item.name}</strong><br>
        <span>${item.type} • ${item.category}</span><br>
        <span>${item.location}</span><br>
        <span>Reserva: $${Number(item.reservation_amount || 0).toLocaleString()}</span><br>
        <button class="btn secondary remove-cart-item" data-index="${index}" type="button">Quitar</button>
      </div>
    `;
  }).join("");

  totalBox.textContent = `Total de reservas: $${total.toLocaleString()}`;

  document.querySelectorAll(".remove-cart-item").forEach(button => {
    button.addEventListener("click", function () {
      const index = Number(this.dataset.index);
      const updatedCart = getCart();
      updatedCart.splice(index, 1);
      saveCart(updatedCart);
      location.reload();
    });
  });

  if (clearButton) {
    clearButton.addEventListener("click", function () {
      localStorage.removeItem("xnihiloCart");
      location.reload();
    });
  }

  if (sendButton) {
    sendButton.addEventListener("click", async function () {
      const data = {
        customer_name: "Cliente Demo",
        customer_email: "cliente@email.com",
        items: getCart()
      };

      try {
        const result = await apiPost("/requests", data);
        alert(result.message || "Solicitud enviada correctamente");
        localStorage.removeItem("xnihiloCart");
        location.reload();
      } catch (error) {
        alert("No se pudo enviar la solicitud. Revisa que Flask esté corriendo.");
      }
    });
  }
});
