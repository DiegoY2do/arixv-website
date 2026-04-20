import { siteData, propertiesData } from './data.js';
import { Navbar } from './navbar.js';
import { Hero } from './hero.js';
import { SearchBar } from './search.js';
import { PropertiesGrid } from './properties.js';
import { AboutSection } from './about.js';
import { LocationsSection } from './locations.js';
import { TestimonialsSection } from './testimonials.js';
import { ExclusiveSection } from './exclusive.js';
import { ServicesSection } from './services.js';
import { InsightsSection } from './insights.js';
import { ContactSection } from './contact.js';
import { Footer } from './footer.js';

import { PropertyDetail } from './property-detail.js';
import { LocationDetail } from './location-detail.js';
import { BlogDetail } from './blog-detail.js';

import { LegalPage } from './legal.js';

let globalLang = localStorage.getItem('nexa_lang') || 'es';
let globalCurrency = localStorage.getItem('nexa_currency') || 'mxn';

let currentFilters = {
    location: 'all',
    type: 'all',
    price: 'all'
};

const formatPrice = (mxn, usd) => {
    const rawVal = globalCurrency === 'mxn' ? mxn : usd;
    const curr = globalCurrency.toUpperCase(); 
    const locale = globalCurrency === 'mxn' ? 'es-MX' : 'en-US';
    
    const formattedNumber = new Intl.NumberFormat(locale, { 
        style: 'currency', 
        currency: curr, 
        minimumFractionDigits: 0 
    }).format(rawVal);

    return `${formattedNumber} ${curr}`;
};

const filterProperties = () => {
    return propertiesData.filter(prop => {
        const matchLocation = currentFilters.location === 'all' || prop.address.includes(currentFilters.location.split(',')[0]);
        const matchType = currentFilters.type === 'all' || prop.type === currentFilters.type;
        let matchPrice = true;
        if (currentFilters.price !== 'all') {
            const maxPrice = parseInt(currentFilters.price);
            matchPrice = maxPrice === 20000001 ? prop.raw_price_mxn > 20000000 : prop.raw_price_mxn <= maxPrice;
        }
        return matchLocation && matchType && matchPrice;
    });
};

const renderGridOnly = () => {
    const filteredData = filterProperties();
    const gridContainer = document.getElementById('properties-grid');
    if (!gridContainer) return;

    gridContainer.innerHTML = `
        <section class="pb-20 pt-24 px-6 max-w-7xl mx-auto" id="catalog-section">
            <div class="text-center mb-16 animate-on-scroll">
                <h2 class="text-4xl md:text-5xl font-bold text-[#0A2640] mb-4">${siteData.most_viewed.title[globalLang]}</h2>
                <p class="text-gray-400 max-w-lg mx-auto text-sm md:text-base leading-relaxed mb-6">${siteData.most_viewed.desc[globalLang]}</p>
                <span class="bg-blue-50 text-blue-600 font-bold px-4 py-2 rounded-full text-sm">
                    ${filteredData.length} ${globalLang === 'es' ? 'Propiedades Encontradas' : 'Properties Found'}
                </span>
            </div>
            <div class="w-full animate-on-scroll">
                ${PropertiesGrid(filteredData, globalLang, formatPrice)}
            </div>
        </section>
    `;
    initScrollAnimations();
};

// --- RENDERIZADO DE LA LANDING PAGE ---
const renderLandingPage = () => {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <div id="hero-root"></div>
        <div id="search-root"></div>
        <div id="properties-grid"></div>
        <div id="about-root"></div>
        <div id="locations-root"></div>
        <div id="testimonials-root"></div>
        <div id="services-root"></div>  
        <div id="insights-root"></div>
        <div id="contact-root"></div>
    `;

    document.getElementById('hero-root').innerHTML = Hero(globalLang);
    document.getElementById('search-root').innerHTML = SearchBar(globalLang, currentFilters);
    renderGridOnly();
    
    const aboutRoot = document.getElementById('about-root');
    if (aboutRoot) aboutRoot.innerHTML = `<div class="animate-on-scroll">${AboutSection(globalLang)}</div>`;

    const locationsRoot = document.getElementById('locations-root');
    if (locationsRoot) locationsRoot.innerHTML = LocationsSection(globalLang);

    const testimonialRoot = document.getElementById('testimonials-root');
    if (testimonialRoot) testimonialRoot.innerHTML = TestimonialsSection(globalLang);

    const servicesRoot = document.getElementById('services-root');
    if (servicesRoot) servicesRoot.innerHTML = ServicesSection(globalLang);

    const insightsRoot = document.getElementById('insights-root');
    if (insightsRoot) insightsRoot.innerHTML = InsightsSection(globalLang);

    const contactRoot = document.getElementById('contact-root');
    if (contactRoot) contactRoot.innerHTML = ContactSection(globalLang);

    initScrollAnimations();
};

// --- LÓGICA DE NAVBAR INTELIGENTE ---
let lastScrollTop = 0;
let isNavbarScrollInitialized = false;

const initNavbarScroll = () => {
    if (isNavbarScrollInitialized) return; 
    
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-nav');
        if (!nav) return;

        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 80) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
    }, { passive: true });
    
    isNavbarScrollInitialized = true;
};

// --- EL ENRUTADOR (ROUTER) PARA SEO Y NAVEGACIÓN ---
const router = (preserveScroll = false) => {
    const keepScroll = preserveScroll === true;

    const navbarRoot = document.getElementById('navbar-root');
    if (navbarRoot) {
        navbarRoot.innerHTML = Navbar(globalLang, globalCurrency);
        initNavbarScroll(); 
    }
    
    const footerRoot = document.getElementById('footer-root');
    if (footerRoot) footerRoot.innerHTML = Footer(globalLang);

    const urlParams = new URLSearchParams(window.location.search);
    const view = urlParams.get('view');
    const id = urlParams.get('id');
    const scrollTo = urlParams.get('scroll');

    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    if (view === 'location' && id) {
        document.title = `Zona Exclusiva | Nexa`;
        mainContent.innerHTML = LocationDetail(id, globalLang, formatPrice);
        if (!keepScroll) window.scrollTo(0, 0); 
        
    }else if (view === 'page' && id) { // <--- AÑADE ESTE BLOQUE
        document.title = `${id.toUpperCase()} | Nexa`;
        mainContent.innerHTML = LegalPage(id, globalLang);
        if (!keepScroll) window.scrollTo(0, 0);
        } else if (view === 'blog' && id) {
        document.title = `Nexa Insights`;
        mainContent.innerHTML = BlogDetail(id, globalLang);
        if (!keepScroll) window.scrollTo(0, 0); 
        
    } else if (view === 'property' && id) {
        document.title = `Propiedad Premium | Nexa`;
        mainContent.innerHTML = PropertyDetail(id, globalLang, formatPrice);
        if (!keepScroll) window.scrollTo(0, 0); 
        
    } else {
        document.title = `${siteData.brandName[globalLang]} | Real Estate`;
        renderLandingPage(); 
        
        if (scrollTo) {
            setTimeout(() => {
                const section = document.getElementById(scrollTo);
                if (section) {
                    const yOffset = -100; 
                    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({top: y, behavior: 'smooth'});
                }
                window.history.replaceState({}, '', window.location.pathname);
            }, 100); 
        } else if (!keepScroll) {
            window.scrollTo(0, 0);
        }
    }
};

const navigateTo = (view, id = null) => {
    let newUrl = window.location.pathname;
    if (view !== 'home') {
        newUrl += `?view=${view}&id=${id}`;
    }
    window.history.pushState({}, '', newUrl);
    router(false); 
};

// --- ANIMACIONES DE SCROLL ---
const initScrollAnimations = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); 
            }
        });
    }, { root: null, threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
};

// --- EVENT LISTENERS ---
document.addEventListener('click', (e) => {
    
    // 1. Idioma y Moneda (Ahora guardan en localStorage y quitan el bloqueo del body)
    if (e.target.closest('[data-lang]')) { 
        const y = window.scrollY; 
        globalLang = e.target.closest('[data-lang]').dataset.lang; 
        localStorage.setItem('nexa_lang', globalLang); // Guardamos la preferencia
        document.body.classList.remove('mobile-menu-open'); // CORRECCIÓN: Destrabamos el scroll del body
        router(true); 
        window.scrollTo(0, y); 
    }
    
    if (e.target.closest('[data-currency]')) { 
        const y = window.scrollY; 
        globalCurrency = e.target.closest('[data-currency]').dataset.currency; 
        localStorage.setItem('nexa_currency', globalCurrency); // Guardamos la preferencia
        document.body.classList.remove('mobile-menu-open'); // CORRECCIÓN: Destrabamos el scroll del body
        router(true); 
        window.scrollTo(0, y); 
    }
    
    // 2. Botones del Menú Móvil
    if (e.target.closest('#btn-menu-toggle')) { document.getElementById('mobile-menu').classList.remove('translate-x-full'); document.body.classList.add('mobile-menu-open'); }
    if (e.target.closest('#btn-menu-close')) { document.getElementById('mobile-menu').classList.add('translate-x-full'); document.body.classList.remove('mobile-menu-open'); }

    // 3. Opciones de Filtros
    const isTrigger = e.target.closest('.select-trigger');
    document.querySelectorAll('.select-menu').forEach(menu => {
        if (isTrigger && menu.closest('.custom-select-container') === isTrigger.closest('.custom-select-container')) return;
        menu.classList.remove('opacity-100', 'visible', 'translate-y-0');
        menu.classList.add('opacity-0', 'invisible', 'translate-y-2');
        const chevron = menu.closest('.custom-select-container')?.querySelector('.chevron');
        if (chevron) chevron.classList.remove('rotate-180');
    });

    if (isTrigger) {
        const container = isTrigger.closest('.custom-select-container');
        const menu = container.querySelector('.select-menu');
        const chevron = container.querySelector('.chevron');
        const isOpen = menu.classList.contains('opacity-100');
        
        if (isOpen) {
            menu.classList.remove('opacity-100', 'visible', 'translate-y-0');
            menu.classList.add('opacity-0', 'invisible', 'translate-y-2');
            if (chevron) chevron.classList.remove('rotate-180');
        } else {
            menu.classList.remove('opacity-0', 'invisible', 'translate-y-2');
            menu.classList.add('opacity-100', 'visible', 'translate-y-0');
            if (chevron) chevron.classList.add('rotate-180');
        }
    }

    const optionItem = e.target.closest('.option-item');
    if (optionItem) {
        const container = optionItem.closest('.custom-select-container');
        const filterId = container.dataset.id;
        
        container.querySelector('.select-current-text').textContent = optionItem.textContent.trim();
        container.querySelectorAll('.option-item').forEach(opt => opt.classList.remove('bg-slate-50', 'text-[#0A2640]'));
        optionItem.classList.add('bg-slate-50', 'text-[#0A2640]');

        if (filterId === 'filter-location') currentFilters.location = optionItem.dataset.value;
        if (filterId === 'filter-type') currentFilters.type = optionItem.dataset.value;
        if (filterId === 'filter-price') currentFilters.price = optionItem.dataset.value;
        
        renderGridOnly(); 
    }

    if (e.target.closest('#btn-search')) {
        const catalog = document.getElementById('catalog-section');
        if (catalog) {
            const y = catalog.getBoundingClientRect().top + window.pageYOffset - 100;
            window.scrollTo({top: y, behavior: 'smooth'});
        }
    }

    // 4. Lógica de Enlaces de Secciones
    const propertyCard = e.target.closest('.property-link'); 
    const dataProp = e.target.closest('[data-prop-id]');
    if (propertyCard || dataProp) {
        e.preventDefault();
        const propId = propertyCard ? propertyCard.dataset.id : dataProp.dataset.propId;
        navigateTo('property', propId);
    }

    const locCard = e.target.closest('[data-loc-id]');
    if (locCard) {
        e.preventDefault();
        const locId = locCard.getAttribute('data-loc-id');
        navigateTo('location', locId);
    }

    const blogCard = e.target.closest('[data-blog-id]');
    if (blogCard) {
        e.preventDefault();
        const blogId = blogCard.getAttribute('data-blog-id');
        navigateTo('blog', blogId);
    }

    // 5. Clics en el Menú de Navegación
    const navLink = e.target.closest('.nav-link') || e.target.closest('.nav-link-mobile');
    if (navLink && !navLink.closest('.property-link')) {
        e.preventDefault();
        
        const targetId = navLink.getAttribute('href').substring(1);
        
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) mobileMenu.classList.add('translate-x-full');
        document.body.classList.remove('mobile-menu-open');

        const urlParams = new URLSearchParams(window.location.search);
        const view = urlParams.get('view');

        if (view) {
            window.history.pushState({}, '', `${window.location.pathname}?scroll=${targetId}`);
            router(false); 
        } else {
            const section = document.getElementById(targetId);
            if (section) {
                const yOffset = -90; 
                const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
        }
    }

    // 6. Lógica de Acordeón para FAQ
    const faqBtn = e.target.closest('.faq-btn');
    if (faqBtn) {
        const answer = faqBtn.nextElementSibling;
        const icon = faqBtn.querySelector('.faq-icon');
        
        if (answer.classList.contains('hidden')) {
            answer.classList.remove('hidden');
            icon.classList.add('rotate-180');
        } else {
            answer.classList.add('hidden');
            icon.classList.remove('rotate-180');
        }
    }
});

// Escuchadores de eventos
window.addEventListener('popstate', () => router(false));
document.addEventListener('DOMContentLoaded', () => router(false));