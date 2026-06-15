function getAdmin(){ return JSON.parse(localStorage.getItem("xnihilo_admin") || "null"); }
function requireAdmin(){ if(!getAdmin()){ alert("Debe iniciar sesión como administrador."); location.href="login.html"; } }
function logout(){ localStorage.removeItem("xnihilo_admin"); location.href="login.html"; }
