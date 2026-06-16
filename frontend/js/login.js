document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");
    const message = document.getElementById("login-message");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (username === "" || password === "") {
            message.innerHTML = '<p class="message error">Debe escribir usuario y contraseña.</p>';
            return;
        }

        const result = await apiPost("/login", { username, password });

        if (result.error) {
            message.innerHTML = `<p class="message error">${result.error}</p>`;
        } else {
            localStorage.setItem("adminLogged", "true");
            window.location.href = "producto.html";
        }
    });
});
