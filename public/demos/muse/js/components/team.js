// js/components/team.js
const renderTeam = () => {
    const teamSection = document.getElementById('team');
    const teamData = window.siteData.team;

    const cardsHTML = teamData.map(member => `
        <div class="group flex flex-col items-center">
            <div class="w-full aspect-[3/4] overflow-hidden mb-6 relative bg-brand-sand/20">
                <div class="absolute inset-0 bg-brand-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <img src="${member.img}" 
                     alt="Retrato de ${member.name}" 
                     class="w-full h-full object-cover grayscale-[80%] group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out">
            </div>
            
            <h3 class="font-serif text-2xl text-brand-dark mb-1">${member.name}</h3>
            <p class="font-sans text-xs uppercase tracking-[0.2em] text-brand-charcoal opacity-70 text-center mb-4">
                ${member.role}
            </p>
            
            <p class="font-serif italic text-brand-charcoal/80 text-center text-sm px-4 mb-5 min-h-[2.5rem] flex items-center justify-center">
                "${member.quote || 'Dedicada a revelar tu mejor versión.'}"
            </p>

            <div class="flex items-center gap-5">
                ${member.facebook ? `
                <a href="${member.facebook}" target="_blank" rel="noopener noreferrer" class="text-brand-charcoal hover:text-brand-dark hover:-translate-y-1 transition-all duration-300" aria-label="Facebook de ${member.name}">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"></path>
                    </svg>
                </a>
                ` : ''}
                
                ${member.instagram ? `
                <a href="${member.instagram}" target="_blank" rel="noopener noreferrer" class="text-brand-charcoal hover:text-brand-dark hover:-translate-y-1 transition-all duration-300" aria-label="Instagram de ${member.name}">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                    </svg>
                </a>
                ` : ''}
            </div>
            
            <div class="w-0 h-[1px] bg-brand-dark mt-6 group-hover:w-16 transition-all duration-500"></div>
        </div>
    `).join('');

    teamSection.innerHTML = `
        <div class="max-w-7xl mx-auto w-full">
            
            <div class="text-center mb-16 md:mb-24 flex flex-col items-center">
                <p class="font-sans text-brand-dark uppercase tracking-[0.2em] text-sm mb-4">El Talento</p>
                <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark mb-8">Nuestras Especialistas</h2>
                <div class="w-16 h-[1px] bg-brand-charcoal"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 px-6 lg:px-0">
                ${cardsHTML}
            </div>
            
        </div>
    `;
};