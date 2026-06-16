// Vista administrativa de productos.
document.addEventListener("DOMContentLoaded", async function () {
  const container = document.getElementById("products-table") || document.getElementById("admin-products");
  if (!container) return;

  try {
    const products = await apiGet("/products");

    const rows = products.map(product => `
      <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.type}</td>
        <td>${product.category}</td>
        <td>$${Number(product.price).toLocaleString()}</td>
        <td>${product.status}</td>
        <td>
          <a href="editarProducto.html?id=${product.id}">Editar</a> |
          <a href="#" onclick="deleteProduct(${product.id})">Eliminar</a>
        </td>
      </tr>
    `).join("");

    container.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Tipo</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;

  } catch (error) {
    container.innerHTML = `<p class="message error">Error cargando productos: ${error.message}</p>`;
  }
});

async function deleteProduct(id) {
  if (confirm("¿Seguro que desea eliminar este producto?")) {
    await apiDelete(`/products/${id}`);
    location.reload();
  }
}
