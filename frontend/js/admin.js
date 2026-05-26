async function loadAdminProducts() {
    const tbody = document.getElementById("admin-products");
    if (!tbody) return;

    const products = await apiGet("/api/products");

    tbody.innerHTML = products.map(product => `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.type}</td>
            <td>$${Number(product.price).toLocaleString()}</td>
            <td>$${Number(product.reservation_amount).toLocaleString()}</td>
            <td>${product.status}</td>
            <td>
                <a class="btn" href="editarProducto.html?id=${product.id}">Editar</a>
                <button class="btn secondary" onclick="deleteProduct(${product.id})">Eliminar</button>
            </td>
        </tr>
    `).join("");
}

async function deleteProduct(id) {
    if (!confirm("¿Desea eliminar este listado?")) return;
    await apiDelete(`/api/products/${id}`);
    loadAdminProducts();
}

document.addEventListener("DOMContentLoaded", loadAdminProducts);
