// Formulario compartido para nuevo producto y editar producto.
document.addEventListener("DOMContentLoaded", async function () {
  const form = document.getElementById("product-form");
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const isEditing = Boolean(id);

  if (isEditing) {
    try {
      const product = await apiGet(`/products/${id}`);
      fillForm(form, product);
    } catch (error) {
      showFormMessage("Error cargando producto: " + error.message, true);
    }
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const data = readForm(form);

    try {
      const result = isEditing
        ? await apiPut(`/products/${id}`, data)
        : await apiPost("/products", data);

      showFormMessage(result.message || "Guardado correctamente", false);

      if (!isEditing) form.reset();
    } catch (error) {
      showFormMessage("Error guardando producto: " + error.message, true);
    }
  });
});

function readForm(form) {
  const data = {};
  new FormData(form).forEach((value, key) => {
    data[key] = value;
  });

  return data;
}

function fillForm(form, product) {
  Object.keys(product).forEach(key => {
    const field = form.querySelector(`[name="${key}"]`);
    if (field) field.value = product[key] ?? "";
  });
}

function showFormMessage(message, isError) {
  let box = document.getElementById("form-message");
  if (!box) {
    box = document.createElement("div");
    box.id = "form-message";
    const form = document.getElementById("product-form");
    form.parentNode.insertBefore(box, form);
  }

  box.innerHTML = `<p class="message ${isError ? "error" : ""}">${message}</p>`;
}
