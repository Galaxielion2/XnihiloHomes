// Carga el detalle del producto seleccionado por id en la URL.
document.addEventListener("DOMContentLoaded", async function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const container = document.getElementById("detail-container");

  if (!id) {
    if (container) container.innerHTML = '<p class="message error">No se seleccionó producto.</p>';
    return;
  }

  try {
    const product = await apiGet(`/products/${id}`);
    const lang = getCurrentLanguage ? getCurrentLanguage() : "es";
    const t = translations[lang] || translations.es;

    if (container) {
      container.innerHTML = `
        <div>
          <img class="detail-image" src="${product.image_url}" alt="${product.name}">
        </div>
        <aside class="panel">
          <span class="badge">${product.type} • ${product.category}</span>
          <h1>${product.name}</h1>
          <p class="price">$${Number(product.price).toLocaleString()}</p>
          <p><strong>Ubicación:</strong> ${product.location}</p>
          <p>${product.description}</p>
          <p><strong>${t.reserve}:</strong> $${Number(product.reservation_amount).toLocaleString()}</p>
          <button class="btn" id="add-to-cart">${t.addToCart}</button>
        </aside>
      `;
    } else {
      // Compatibilidad con versión anterior de la página.
      document.getElementById("detail-image").src = product.image_url;
      document.getElementById("detail-badge").textContent = `${product.type} • ${product.category}`;
      document.getElementById("detail-name").textContent = product.name;
      document.getElementById("detail-price").textContent = `$${Number(product.price).toLocaleString()}`;
      document.getElementById("detail-location").textContent = product.location;
      document.getElementById("detail-description").textContent = product.description;
      document.getElementById("detail-reservation").textContent = `$${Number(product.reservation_amount).toLocaleString()}`;
    }

    document.getElementById("add-to-cart")?.addEventListener("click", function () {
      addToCart(product);
    });

  } catch (error) {
    if (container) container.innerHTML = `<p class="message error">Error cargando detalle: ${error.message}</p>`;
  }
});
