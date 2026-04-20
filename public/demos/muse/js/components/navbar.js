// js/components/navbar.js
const renderNavbar = () => {
    const navbar = document.getElementById('navbar');
    
    const currentPath = window.location.pathname;
    const isHome = currentPath === '/' || currentPath.endsWith('index.html');
    const prefix = isHome ? '' : 'index.html';

    const existingMobileMenu = document.getElementById('mobile-menu');
    if (existingMobileMenu) existingMobileMenu.remove();

    // 1. Navbar Superior
    navbar.className = "fixed w-full top-0 z-50 transition-transform duration-300 transform translate-y-0";
    navbar.innerHTML = `
        <div id="nav-background" class="absolute inset-0 bg-transparent transition-all duration-300"></div>
        <div class="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex justify-between items-center relative z-50">
            <a href="${isHome ? '#' : 'index.html'}" class="font-serif text-3xl font-bold tracking-wider text-brand-dark relative z-50">
                MUSE<span class="text-brand-sand">.</span>
            </a>
            
            <nav class="hidden lg:flex space-x-8 font-sans text-xs tracking-[0.2em] uppercase font-medium">
                <a href="${isHome ? '#' : 'index.html'}" class="hover:opacity-70 transition-opacity duration-300">Inicio</a>
                <a href="${prefix}#services" class="hover:opacity-70 transition-opacity duration-300">Servicios</a>
                <a href="${prefix}#gallery" class="hover:opacity-70 transition-opacity duration-300">Galería</a>
                <a href="${prefix}#pricing" class="hover:opacity-70 transition-opacity duration-300">Tarifas</a>
                <a href="${prefix}#team" class="hover:opacity-70 transition-opacity duration-300">Team</a>
                <a href="${prefix}#promotions" class="hover:opacity-70 transition-opacity duration-300">Rituales</a>
                <a href="${prefix}#location" class="hover:opacity-70 transition-opacity duration-300">Ubicación</a>
            </nav>

            <div class="hidden lg:flex items-center gap-6">
                <a href="https://www.facebook.com/profile.php?id=61572553050464" target="_blank" rel="noopener noreferrer" class="text-brand-dark hover:opacity-70 hover:-translate-y-1 transition-all duration-300" aria-label="Facebook">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"></path></svg>
                </a>
                <a href="https://www.instagram.com/arixv21/" target="_blank" rel="noopener noreferrer" class="text-brand-dark hover:opacity-70 hover:-translate-y-1 transition-all duration-300" aria-label="Instagram">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path></svg>
                </a>
                <a href="https://api.whatsapp.com/send/?phone=525621434770&text=Hola" target="_blank" rel="noopener noreferrer" class="text-brand-dark hover:opacity-70 hover:-translate-y-1 transition-all duration-300" aria-label="WhatsApp">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.405-.881-.733-1.476-1.639-1.649-1.937-.173-.298-.019-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.22 5.22 0 00-.571-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                </a>
            </div>

            <button id="mobile-menu-btn" class="lg:hidden text-brand-dark focus:outline-none relative z-50 transition-transform duration-300">
                <svg id="menu-icon" class="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
                <svg id="close-icon" class="w-8 h-8 opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <div class="w-8 h-8"></div>
            </button>
        </div>
    `;

    // 2. Menú Móvil
    const mobileMenuHTML = `
        <div id="mobile-menu" class="fixed inset-0 bg-brand-light z-40 hidden flex-col justify-center items-center opacity-0 lg:hidden">
            <div id="mobile-menu-content" class="flex flex-col items-center transform translate-y-8">
                <nav class="flex flex-col space-y-8 font-serif text-3xl text-center text-brand-dark">
                    <a href="${isHome ? '#' : 'index.html'}" class="mobile-link">Inicio</a>
                    <a href="${prefix}#services" class="mobile-link">Servicios</a>
                    <a href="${prefix}#gallery" class="mobile-link">Galería</a>
                    <a href="${prefix}#pricing" class="mobile-link">Tarifas</a>
                    <a href="${prefix}#team" class="mobile-link">Team</a>
                    <a href="${prefix}#promotions" class="mobile-link">Rituales</a>
                    <a href="${prefix}#location" class="mobile-link">Ubicación</a>
                </nav>

                <div class="mt-12 flex items-center gap-8">
                    <a href="https://www.facebook.com/profile.php?id=61572553050464" target="_blank" rel="noopener noreferrer" class="mobile-link text-brand-dark hover:opacity-70 transition-opacity duration-300">
                        <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"></path></svg>
                    </a>
                    <a href="https://www.instagram.com/arixv21/" target="_blank" rel="noopener noreferrer" class="mobile-link text-brand-dark hover:opacity-70 transition-opacity duration-300">
                        <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path></svg>
                    </a>
                    <a href="https://api.whatsapp.com/send/?phone=525621434770&text=Hola" target="_blank" rel="noopener noreferrer" class="mobile-link text-brand-dark hover:opacity-70 transition-opacity duration-300">
                        <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.405-.881-.733-1.476-1.639-1.649-1.937-.173-.298-.019-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.22 5.22 0 00-.571-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                    </a>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', mobileMenuHTML);

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuContent = document.getElementById('mobile-menu-content');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    const toggleMenu = () => {
        const isOpening = mobileMenu.classList.contains('hidden');
        
        if (isOpening) {
            // ABRIR
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            
            // Forzamos el render y LUEGO añadimos las animaciones
            requestAnimationFrame(() => {
                mobileMenu.classList.add('transition-opacity', 'duration-500', 'ease-in-out');
                mobileMenuContent.classList.add('transition-transform', 'duration-700', 'ease-out');
                
                requestAnimationFrame(() => {
                    mobileMenu.classList.add('opacity-100');
                    mobileMenuContent.classList.remove('translate-y-8');
                    mobileMenuContent.classList.add('translate-y-0');
                });
            });

            menuIcon.classList.add('opacity-0');
            closeIcon.classList.remove('opacity-0');
            document.body.classList.add('overflow-hidden');
        } else {
            // CERRAR
            mobileMenu.classList.remove('opacity-100');
            mobileMenu.classList.add('opacity-0');
            mobileMenuContent.classList.add('translate-y-8');

            menuIcon.classList.remove('opacity-0');
            closeIcon.classList.add('opacity-0');
            document.body.classList.remove('overflow-hidden');
            
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('transition-opacity', 'duration-500');
            }, 500);
        }
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => setTimeout(toggleMenu, 150));
    });

    // Lógica de Scroll
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        if (!mobileMenu.classList.contains('hidden')) return;
        
        const navBg = document.getElementById('nav-background');
        if (currentScrollY > 50) {
            navBg.classList.add('bg-brand-light', 'shadow-sm');
        } else {
            navBg.classList.remove('bg-brand-light', 'shadow-sm');
        }

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.classList.add('-translate-y-full');
        } else {
            navbar.classList.remove('-translate-y-full');
        }
        lastScrollY = currentScrollY;
    });
};