let cachedProducts = [];
async function renderProductGrid(){
  const grid=document.getElementById("product-grid"); if(!grid) return;
  const q=document.getElementById("search-input")?.value || "";
  const type=document.getElementById("type-filter")?.value || "";
  const params=new URLSearchParams(); if(q) params.set("q",q); if(type) params.set("type",type); params.set("status","Active");
  const lang=localStorage.getItem("xnihilo_lang")||"es"; const t=translations[lang]||translations.es;
  grid.innerHTML="<p>Cargando productos...</p>";
  try{
    cachedProducts=await apiGet(`/api/products?${params.toString()}`);
    grid.innerHTML=cachedProducts.map(product=>`<article class="card"><img src="${product.image_url}" alt="${product.name}"><div class="card-body"><span class="badge">${product.type} • ${product.category}</span><h3>${product.name}</h3><p>${product.location}</p><p class="price">$${Number(product.price).toLocaleString()}</p><p>${t.reserve}: $${Number(product.reservation_amount).toLocaleString()}</p><a class="btn" href="detalle.html?id=${product.id}">${t.view}</a></div></article>`).join("") || "<p>No hay productos activos.</p>";
  }catch(err){ grid.innerHTML=`<p class="message error">Error cargando productos: ${err.message}</p>`; }
}
document.addEventListener("DOMContentLoaded",()=>{ renderProductGrid(); document.getElementById("search-input")?.addEventListener("input", renderProductGrid); document.getElementById("type-filter")?.addEventListener("change", renderProductGrid); });
