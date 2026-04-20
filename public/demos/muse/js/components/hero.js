// js/components/hero.js
const renderHero = () => {
    const hero = document.getElementById('hero');
    const data = window.siteData.hero;

    hero.innerHTML = `
        <div class="w-full max-w-7xl mx-auto px-6 lg:px-12 pt-36 lg:pt-40 pb-12 z-10 relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            
            <div class="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left mt-8 md:mt-0">
                <p class="font-sans text-brand-dark uppercase tracking-[0.2em] text-sm mb-4">Estudio de Belleza</p>
                <h1 class="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 text-brand-dark max-w-xl">
                    ${data.title}
                </h1>
                <p class="font-sans text-base md:text-lg mb-10 text-brand-charcoal max-w-md font-light">
                    ${data.subtitle}
                </p>
                
                <div class="flex items-center gap-6">
                    <a href="../servicios.html" class="bg-brand-dark text-brand-light px-10 py-4 uppercase tracking-[0.2em] text-xs hover:bg-brand-charcoal transition-all duration-300">
                        ${data.ctaText}
                    </a>
                </div>
            </div>

            <div class="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <div class="w-[85%] md:w-[320px] lg:w-[400px] aspect-[3/4] overflow-hidden rounded-t-full rounded-b-md shadow-2xl relative">
                    <img src="https://images.unsplash.com/photo-1633681926035-ec1ac984418a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                         alt="Cuidado facial y belleza natural" 
                         class="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700">
                </div>
            </div>

        </div>
    `;
};