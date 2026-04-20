// js/app.js
document.addEventListener('DOMContentLoaded', () => {
    // Verificamos que la data exista antes de renderizar
    if (window.siteData) {
        renderNavbar();
        renderHero();
        renderServices();
        renderGallery();
        renderTestimonials();
        renderTeam();
        renderPromotions();
        renderLocation();
        renderFooter();
    } else {
        console.error("No se pudo cargar la información del sitio desde content.js");
    }
});