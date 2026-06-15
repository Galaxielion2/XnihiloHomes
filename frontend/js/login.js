document.addEventListener("DOMContentLoaded",()=>{
  const loginForm=document.getElementById("login-form");
  const registerForm=document.getElementById("register-form");
  loginForm?.addEventListener("submit",async e=>{e.preventDefault(); const data=Object.fromEntries(new FormData(e.target).entries()); if(!data.username||!data.password){alert("Complete usuario y contraseña.");return;} try{const res=await apiPost("/api/login",data); localStorage.setItem("xnihilo_admin",JSON.stringify(res.admin)); location.href="producto.html";}catch(err){alert(err.message);}});
  registerForm?.addEventListener("submit",async e=>{e.preventDefault(); const data=Object.fromEntries(new FormData(e.target).entries()); if(data.password.length<4){alert("La contraseña debe tener al menos 4 caracteres.");return;} try{await apiPost("/api/admins",data); alert("Administrador registrado. Ahora puede iniciar sesión."); location.href="login.html";}catch(err){alert(err.message);}});
});
