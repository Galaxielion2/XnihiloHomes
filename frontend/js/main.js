let cachedProducts = [];

async function renderProductGrid() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  const lang = getCurrentLanguage ? getCurrentLanguage() : "es";
  const t = translations[lang] || translations.es;

  grid.innerHTML = `<p>${t.loadingProducts}</p>`;

  try {
    cachedProducts = await apiGet("/products");

    const activeProducts = cachedProducts.filter(product => product.status === "Active");

    grid.innerHTML = activeProducts.map(product => `
      <article class="card">
        <img src="${product.image_url}" alt="${product.name}">
        <div class="card-body">
          <span class="badge">${product.type} • ${product.category}</span>
          <h3>${product.name}</h3>
          <p>${product.location}</p>
          <p class="price">$${Number(product.price).toLocaleString()}</p>
          <p>${t.reserve}: $${Number(product.reservation_amount).toLocaleString()}</p>
          <a class="btn" href="detalle.html?id=${product.id}">${t.view}</a>
        </div>
      </article>
    `).join("") || `<p>${t.noProducts}</p>`;

  } catch (error) {
    grid.innerHTML = `<p class="message error">Error cargando productos: ${error.message}</p>`;
  }
}

document.addEventListener("DOMContentLoaded", renderProductGrid);
