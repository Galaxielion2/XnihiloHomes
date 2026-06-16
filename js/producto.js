document.addEventListener("DOMContentLoaded", async function () {
    const table = document.getElementById("admin-products");
    const products = await apiGet("/products");

    table.innerHTML = products.map(product => `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.type}</td>
            <td>$${Number(product.price).toLocaleString()}</td>
            <td>${product.status}</td>
            <td>
                <a href="editarProducto.html?id=${product.id}">Editar</a> |
                <a href="#" onclick="deleteProduct(${product.id})">Eliminar</a>
            </td>
        </tr>
    `).join("");
});

async function deleteProduct(id) {
    if (confirm("¿Seguro que desea eliminar este producto?")) {
        await apiDelete(`/products/${id}`);
        location.reload();
    }
}
