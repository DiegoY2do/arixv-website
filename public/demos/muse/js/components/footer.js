// js/components/footer.js
const renderFooter = () => {
    const footerSection = document.getElementById('footer');
    const contactData = window.siteData.contact;
    const currentYear = new Date().getFullYear();

    // MAGIA: Detectamos en qué página estamos (Igual que en el Navbar)
    const currentPath = window.location.pathname;
    const isHome = currentPath === '/' || currentPath.endsWith('index.html');
    const prefix = isHome ? '' : 'index.html';

    footerSection.innerHTML = `
        <div class="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 flex flex-col md:flex-row justify-between items-center md:items-start gap-12 lg:gap-8">
            
            <div class="flex flex-col items-center md:items-start w-full md:w-1/3">
                <a href="${isHome ? '#' : 'index.html'}" class="font-serif text-4xl font-bold tracking-wider text-brand-light mb-6 relative z-50">
                    MUSE<span class="text-brand-sand">.</span>
                </a>
                <p class="font-sans text-brand-light/70 font-light text-sm text-center md:text-left max-w-xs leading-relaxed mb-8">
                    El arte de revelar tu verdadera esencia a través de experiencias de belleza excepcionales.
                </p>
                <div class="flex flex-col items-center md:items-start gap-2">
                    <a href="mailto:${contactData.email}" class="font-sans text-brand-light/90 hover:text-brand-sand text-sm transition-colors duration-300">
                        ${contactData.email}
                    </a>
                    <a href="tel:${contactData.phone.replace(/\s+/g, '')}" class="font-sans text-brand-light/90 hover:text-brand-sand text-sm transition-colors duration-300">
                        ${contactData.phone}
                    </a>
                </div>
            </div>

            <div class="w-full md:w-1/3 flex flex-col items-center">
                <h4 class="font-sans text-xs uppercase tracking-widest text-brand-sand mb-6">Explorar</h4>
                <nav class="flex flex-col gap-4 text-center">
                    <a href="${isHome ? '#' : 'index.html'}" class="font-sans text-brand-light/80 hover:text-brand-light transition-colors duration-300 text-sm">Inicio</a>
                    <a href="${prefix}#services" class="font-sans text-brand-light/80 hover:text-brand-light transition-colors duration-300 text-sm">Servicios</a>
                    <a href="${prefix}#gallery" class="font-sans text-brand-light/80 hover:text-brand-light transition-colors duration-300 text-sm">Galería</a>
                    <a href="${prefix}#team" class="font-sans text-brand-light/80 hover:text-brand-light transition-colors duration-300 text-sm">Team</a>
                    <a href="${prefix}#promotions" class="font-sans text-brand-light/80 hover:text-brand-light transition-colors duration-300 text-sm">Rituales</a>
                    <a href="${prefix}#location" class="font-sans text-brand-light/80 hover:text-brand-light transition-colors duration-300 text-sm">Ubicación</a>
                </nav>
            </div>

            <div class="w-full md:w-1/3 flex flex-col items-center md:items-end">
                <h4 class="font-sans text-xs uppercase tracking-widest text-brand-sand mb-6">Conecta</h4>
                <div class="flex flex-col items-center md:items-end gap-4">
                    <a href="${contactData.social.instagram}" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center gap-3 transition-all">
                        <span class="font-sans text-brand-light/80 group-hover:text-brand-light text-sm uppercase tracking-widest transition-colors duration-300">Instagram</span>
                        <span class="w-4 h-[1px] bg-brand-light/50 group-hover:bg-brand-light group-hover:w-6 transition-all duration-300"></span>
                    </a>
                    <a href="${contactData.social.facebook}" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center gap-3 transition-all">
                        <span class="font-sans text-brand-light/80 group-hover:text-brand-light text-sm uppercase tracking-widest transition-colors duration-300">Facebook</span>
                        <span class="w-4 h-[1px] bg-brand-light/50 group-hover:bg-brand-light group-hover:w-6 transition-all duration-300"></span>
                    </a>
                    <a href="https://api.whatsapp.com/send/?phone=525621434770&text=Hola" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center gap-3 transition-all">
                        <span class="font-sans text-brand-light/80 group-hover:text-brand-light text-sm uppercase tracking-widest transition-colors duration-300">WhatsApp</span>
                        <span class="w-4 h-[1px] bg-brand-light/50 group-hover:bg-brand-light group-hover:w-6 transition-all duration-300"></span>
                    </a>
                </div>
            </div>
        </div>

        <div class="border-t border-brand-sand/20">
            <div class="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="font-sans text-brand-light/50 text-xs text-center md:text-left">
                    &copy; ${currentYear} MUSE Estudio de Belleza. Diseñado por A.Y.A.F Consulting.
                </p>
                <div class="flex gap-6">
                    <a href="#" class="font-sans text-brand-light/50 hover:text-brand-light/80 text-xs transition-colors duration-300">Aviso de Privacidad</a>
                    <a href="#" class="font-sans text-brand-light/50 hover:text-brand-light/80 text-xs transition-colors duration-300">Términos y Condiciones</a>
                </div>
            </div>
        </div>
    `;
};