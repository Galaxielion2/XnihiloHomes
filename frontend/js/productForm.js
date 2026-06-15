const productFields=["name","type","category","price","location","reservation_amount","image_url","status","description","bedrooms","bathrooms","area_m2","parking_spaces","asset_condition"];
function collectProductForm(form){ const data=Object.fromEntries(new FormData(form).entries()); return data; }
function fillProductForm(product){ productFields.forEach(field=>{ const el=document.querySelector(`[name='${field}']`); if(el) el.value=product[field] ?? ""; }); }
document.addEventListener("DOMContentLoaded",async()=>{
  const form=document.getElementById("product-form"); if(!form) return; requireAdmin();
  const id=new URLSearchParams(location.search).get("id");
  if(id){ try{ const product=await apiGet(`/api/products/${id}`); fillProductForm(product); }catch(err){ alert(err.message); } }
  form.addEventListener("submit",async e=>{ e.preventDefault(); const data=collectProductForm(form); try{ if(id){ await apiPut(`/api/products/${id}`,data); alert("Producto actualizado."); } else { await apiPost("/api/products",data); alert("Producto creado."); } location.href="producto.html"; }catch(err){ alert(err.message); } });
});
