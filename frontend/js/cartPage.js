function renderCartPage(){
  const box=document.getElementById("cart-page"); if(!box) return; const cart=getCart();
  if(!cart.length){ box.innerHTML=`<div class="panel"><p>El carrito está vacío.</p><a class="btn" href="index.html">Volver al inicio</a></div>`; return; }
  const total=cart.reduce((sum,item)=>sum+Number(item.reservation_amount||0),0);
  box.innerHTML=`<div class="table-container"><table><thead><tr><th>Producto</th><th>Reserva</th><th>Acción</th></tr></thead><tbody>
  ${cart.map(item=>`<tr><td>${item.name}</td><td>$${Number(item.reservation_amount).toLocaleString()}</td><td><button class="btn danger" onclick="removeFromCart(${item.id})">Quitar</button></td></tr>`).join("")}
  </tbody></table><h3>Total de reserva: $${total.toLocaleString()}
  </h3></div><form id="request-form" class="form panel"><h2>Enviar solicitud</h2><input name="customer_name" placeholder="Nombre completo" required><input name="customer_email" type="email" placeholder="Correo" required><input name="customer_phone" placeholder="Teléfono"><textarea name="notes" placeholder="Notas adicionales"></textarea><button class="btn">Enviar solicitud</button></form>`;
  document.getElementById("request-form").addEventListener("submit", async e=>{ e.preventDefault(); const data=Object.fromEntries(new FormData(e.target).entries()); data.items=getCart(); try{ const result=await apiPost("/api/requests",data); clearCart(); renderCartPage(); alert(`Solicitud creada. ID: ${result.request_id}`); }catch(err){ alert(err.message); } });
}
document.addEventListener("DOMContentLoaded", renderCartPage);
