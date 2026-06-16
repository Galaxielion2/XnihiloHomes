// Protección básica visual para páginas admin.
// Para proyecto académico: se guarda el login en localStorage.
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop();
  const publicAdminPages = ["login.html"];
  const isAdminPage = ["producto.html", "nuevoProducto.html", "editarProducto.html", "solicitudes.html"].includes(currentPage);

  if (isAdminPage && !publicAdminPages.includes(currentPage)) {
    const logged = localStorage.getItem("adminLogged");
    if (logged !== "true") {
      window.location.href = "login.html";
      return;
    }
  }

  const logoutButton = document.getElementById("logout-btn");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      localStorage.removeItem("adminLogged");
      window.location.href = "login.html";
    });
  }
});
