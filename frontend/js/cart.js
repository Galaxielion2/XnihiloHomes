const CART_KEY = "xnihilo_cart";
function getCart(){ return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartPreview(); }
function addToCart(product){ const cart=getCart(); if(!cart.some(item=>Number(item.id)===Number(product.id))){ cart.push(product); saveCart(cart); alert("Producto agregado a solicitudes."); } else { alert("Este producto ya está en solicitudes."); }}
function removeFromCart(id){ saveCart(getCart().filter(item=>Number(item.id)!==Number(id))); if(location.pathname.includes("carrito")) renderCartPage(); }
function clearCart(){ saveCart([]); }
function updateCartPreview(){ const count=document.getElementById("cart-count"); const preview=document.getElementById("cart-preview"); const cart=getCart(); if(count) count.textContent=cart.length; if(preview){ preview.innerHTML = cart.length ? cart.slice(0,4).map(item=>`<div class="cart-row"><span>${item.name}</span><strong>$${Number(item.reservation_amount).toLocaleString()}</strong></div>`).join("") + `<p><a class="btn" href="carrito.html">Ver solicitudes</a></p>` : "<p>No hay solicitudes todavía.</p>"; }}
document.addEventListener("DOMContentLoaded", updateCartPreview);
