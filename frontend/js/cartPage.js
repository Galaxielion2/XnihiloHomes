// Página del carrito / solicitudes.
document.addEventListener("DOMContentLoaded", function () {
  const list = document.getElementById("cart-list");
  const totalBox = document.getElementById("cart-total");
  const sendButton = document.getElementById("send-request");
  if (!list) return;

  const lang = getCurrentLanguage ? getCurrentLanguage() : "es";
  const t = translations[lang] || translations.es;
  const cart = getCart();

  if (cart.length === 0) {
    list.innerHTML = `<p class="message">${t.emptyCart}</p><a class="btn" href="index.html">${t.catalog}</a>`;
    if (totalBox) totalBox.textContent = "";
    if (sendButton) sendButton.style.display = "none";
    return;
  }

  let total = 0;
  list.innerHTML = cart.map(item => {
    total += Number(item.reservation_amount);
    return `
      <div class="cart-line panel">
        <strong>${item.name}</strong><br>
        ${t.reserve}: $${Number(item.reservation_amount).toLocaleString()}
      </div>
    `;
  }).join("");

  if (totalBox) totalBox.textContent = `${t.totalReservations}: $${total.toLocaleString()}`;

  if (sendButton) {
    sendButton.addEventListener("click", async function () {
      const data = {
        customer_name: "Cliente Demo",
        customer_email: "cliente@email.com",
        items: cart
      };

      try {
        const result = await apiPost("/requests", data);
        alert(result.message || t.requestSent);
        localStorage.removeItem("xnihiloCart");
        location.reload();
      } catch (error) {
        alert("Error enviando solicitud: " + error.message);
      }
    });
  }
});
