document.addEventListener("DOMContentLoaded", async()=>{
  const container=document.getElementById("detail-container"); if(!container) return;
  const id=new URLSearchParams(location.search).get("id"); if(!id){ container.innerHTML="<p class='message error'>Producto no especificado.</p>"; return; }
  try{
    const p=await apiGet(`/api/products/${id}`);
    container.innerHTML=`<div><img class="detail-image" src="${p.image_url}" alt="${p.name}"></div><aside class="panel"><span class="badge">${p.type} • ${p.category}</span><h1>${p.name}</h1><p class="muted">${p.location}</p><p>${p.description}</p><p class="price">Precio: $${Number(p.price).toLocaleString()}</p><p><strong>Reserva:</strong> $${Number(p.reservation_amount).toLocaleString()}</p><p><strong>Habitaciones:</strong> ${p.bedrooms || 0} | <strong>Baños:</strong> ${p.bathrooms || 0}</p><p><strong>Área:</strong> ${p.area_m2 || 0} m² | <strong>Parqueos:</strong> ${p.parking_spaces || 0}</p><p><strong>Condición:</strong> ${p.asset_condition || "N/A"}</p><button class="btn" id="add-cart">Agregar al carrito</button></aside>`;
    document.getElementById("add-cart").addEventListener("click",()=>addToCart(p));
  }catch(err){ container.innerHTML=`<p class="message error">${err.message}</p>`; }
});
