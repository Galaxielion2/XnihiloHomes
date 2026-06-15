document.addEventListener("DOMContentLoaded",async()=>{
  const table=document.getElementById("products-table"); if(!table) return; requireAdmin();
  document.getElementById("logout-btn")?.addEventListener("click",logout);
  try{ const products=await apiGet("/api/products");
    table.innerHTML=`<table><thead><tr><th>ID</th><th>Nombre</th><th>Tipo</th><th>Precio</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>${products.map(p=>`<tr><td>${p.id}</td><td>${p.name}</td><td>${p.type}</td><td>$${Number(p.price).toLocaleString()}</td><td>${p.status}</td><td class="actions"><a class="btn" href="editarProducto.html?id=${p.id}">Editar</a><button class="btn danger" onclick="deleteProduct(${p.id})">Eliminar</button></td></tr>`).join("")}</tbody></table>`;}
    catch(err){ table.innerHTML=`<p class="message error">${err.message}</p>`; }
});
async function deleteProduct(id){ if(!confirm("¿Eliminar este producto?")) return; try{ await apiDelete(`/api/products/${id}`); location.reload(); }catch(err){ alert(err.message); } }
