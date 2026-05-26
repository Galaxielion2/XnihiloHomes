document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");
    const message = document.getElementById("login-message");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const result = await apiPost("/api/login", {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        });

        if (result.error) {
            message.innerHTML = `<div class="message error">${result.error}</div>`;
        } else {
            localStorage.setItem("adminLoggedIn", "true");
            window.location.href = "producto.html";
        }
    });
});
