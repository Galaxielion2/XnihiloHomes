document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("product-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const data = readProductForm();
        const result = await apiPost("/products", data);
        document.getElementById("form-message").innerHTML = `<p class="message">${result.message || "Producto guardado"}</p>`;
        form.reset();
    });
});

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
