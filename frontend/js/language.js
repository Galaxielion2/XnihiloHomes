// Traducción sencilla del sitio.
// No usa librerías externas: solo cambia textos marcados con data-i18n.

const translations = {
  es: {
    home: "Inicio",
    admin: "Admin",
    login: "Login",
    cart: "Solicitudes",
    view: "Ver detalle",
    reserve: "Reserva",
    catalog: "Ver catálogo",
    adminLogin: "Admin Login",
    heroTitle: "Encuentra, reserva y mejora activos inmobiliarios con Xnihilo Homes.",
    heroText: "Un marketplace para propiedades, rentas, servicios legales, contratistas, renovaciones y soporte inmobiliario.",
    availableListings: "Listados disponibles",
    loadingProducts: "Cargando productos...",
    noProducts: "No hay productos activos.",
    addToCart: "Agregar al carrito",
    emptyCart: "El carrito está vacío. Regresa al catálogo para agregar productos.",
    totalReservations: "Total de reservas",
    requestSent: "Solicitud enviada",
    language: "Español"
  },
  en: {
    home: "Home",
    admin: "Admin",
    login: "Login",
    cart: "Requests",
    view: "View details",
    reserve: "Reservation",
    catalog: "View catalog",
    adminLogin: "Admin Login",
    heroTitle: "Find, reserve, and improve real estate assets with Xnihilo Homes.",
    heroText: "A marketplace for properties, rentals, legal services, contractors, renovations, and real estate support.",
    availableListings: "Available listings",
    loadingProducts: "Loading products...",
    noProducts: "No active products.",
    addToCart: "Add to cart",
    emptyCart: "The cart is empty. Return to the catalog to add products.",
    totalReservations: "Total reservations",
    requestSent: "Request sent",
    language: "English"
  },
  pt: {
    home: "Início",
    admin: "Admin",
    login: "Login",
    cart: "Solicitações",
    view: "Ver detalhe",
    reserve: "Reserva",
    catalog: "Ver catálogo",
    adminLogin: "Login Admin",
    heroTitle: "Encontre, reserve e melhore ativos imobiliários com Xnihilo Homes.",
    heroText: "Um marketplace para propriedades, aluguéis, serviços legais, contratistas, reformas e suporte imobiliário.",
    availableListings: "Listagens disponíveis",
    loadingProducts: "Carregando produtos...",
    noProducts: "Não há produtos ativos.",
    addToCart: "Adicionar ao carrinho",
    emptyCart: "O carrinho está vazio. Volte ao catálogo para adicionar produtos.",
    totalReservations: "Total de reservas",
    requestSent: "Solicitação enviada",
    language: "Português"
  }
};

function getCurrentLanguage() {
  return localStorage.getItem("xnihilo_lang") || localStorage.getItem("selectedLanguage") || "es";
}

function applyLanguage(language) {
  const t = translations[language] || translations.es;

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");
    if (t[key]) element.textContent = t[key];
  });

  const languageButtonText = document.querySelector(".language-button span");
  if (languageButtonText) languageButtonText.textContent = t.language;

  document.querySelectorAll(".language-menu a").forEach(link => {
    link.classList.toggle("active-language", link.getAttribute("data-lang") === language);
  });

  localStorage.setItem("xnihilo_lang", language);
  localStorage.setItem("selectedLanguage", language);
}

document.addEventListener("DOMContentLoaded", function () {
  const savedLanguage = getCurrentLanguage();
  applyLanguage(savedLanguage);

  document.querySelectorAll(".language-menu a").forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const selectedLanguage = link.getAttribute("data-lang");
      applyLanguage(selectedLanguage);

      // Re-renderiza catálogo si la página tiene esa función.
      if (typeof renderProductGrid === "function") {
        renderProductGrid();
      }
    });
  });
});
