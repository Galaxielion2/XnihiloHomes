document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const form = document.getElementById("product-form");

    if (!id) return;

    const product = await apiGet(`/products/${id}`);
    fillForm(product);

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const data = readProductForm();
        const result = await apiPut(`/products/${id}`, data);
        document.getElementById("form-message").innerHTML = `<p class="message">${result.message || "Producto actualizado"}</p>`;
    });
});

function fillForm(product) {
    document.getElementById("name").value = product.name;
    document.getElementById("type").value = product.type;
    document.getElementById("category").value = product.category;
    document.getElementById("price").value = product.price;
    document.getElementById("location").value = product.location;
    document.getElementById("reservation_amount").value = product.reservation_amount;
    document.getElementById("image_url").value = product.image_url;
    document.getElementById("status").value = product.status;
    document.getElementById("description").value = product.description;
}

function readProductForm() {
    return {
        name: document.getElementById("name").value,
        type: document.getElementById("type").value,
        category: document.getElementById("category").value,
        price: document.getElementById("price").value,
        location: document.getElementById("location").value,
        reservation_amount: document.getElementById("reservation_amount").value,
        image_url: document.getElementById("image_url").value,
        status: document.getElementById("status").value,
        description: document.getElementById("description").value
    };
}
