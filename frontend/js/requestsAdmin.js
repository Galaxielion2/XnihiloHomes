// Listado simple de solicitudes recibidas.
document.addEventListener("DOMContentLoaded", async function () {
  const container = document.getElementById("requests-table");
  if (!container) return;

  try {
    const requests = await apiGet("/requests");

    if (requests.length === 0) {
      container.innerHTML = "<p>No hay solicitudes registradas.</p>";
      return;
    }

    container.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Email</th>
            <th>Total reserva</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          ${requests.map(req => `
            <tr>
              <td>${req.id}</td>
              <td>${req.customer_name}</td>
              <td>${req.customer_email}</td>
              <td>$${Number(req.total_reservation).toLocaleString()}</td>
              <td>${req.created_at || ""}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  } catch (error) {
    container.innerHTML = `<p class="message error">Error cargando solicitudes: ${error.message}</p>`;
  }
});
