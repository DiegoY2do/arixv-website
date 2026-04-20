import { siteData } from './data.js';

// Dropdown Customizado
const CustomSelect = (id, label, options, currentValue) => `
    <div class="flex flex-col flex-1 px-4 lg:px-6 relative custom-select-container" data-id="${id}">
        <span class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
            ${label}
        </span>
        <button type="button" class="w-full text-left font-extrabold text-[#0A2640] text-lg lg:text-xl bg-transparent outline-none flex items-center justify-between gap-4 select-trigger group">
            <span class="select-current-text truncate group-hover:text-blue-600 transition-colors">${options.find(o => o.value === currentValue)?.text || options[0].text}</span>
            <svg class="w-5 h-5 text-blue-500 transition-transform duration-200 chevron shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        
        <div class="absolute top-[120%] left-0 w-full min-w-[240px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 opacity-0 invisible translate-y-2 transition-all duration-200 z-[100] select-menu">
            <div class="p-2 flex flex-col gap-1 max-h-[250px] overflow-y-auto custom-scrollbar">
                ${options.map(opt => `
                    <div class="px-4 py-3 rounded-xl text-sm font-bold cursor-pointer transition-colors option-item ${opt.value === currentValue ? 'bg-slate-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-[#0A2640]'}" data-value="${opt.value}">
                        ${opt.text}
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
`;

export const SearchBar = (lang, currentFilters) => {
    const allLocationsText = lang === 'es' ? "Todas las Zonas" : "All Locations";
    const allTypesText = lang === 'es' ? "Todas" : "All Types";

    const locationOptions = [
        { value: "all", text: allLocationsText },
        { value: "Polanco, CDMX", text: "Polanco, CDMX" },
        { value: "Condesa, CDMX", text: "Condesa, CDMX" },
        { value: "Roma Norte, CDMX", text: "Roma Norte, CDMX" },
        { value: "Coyoacán, CDMX", text: "Coyoacán, CDMX" },
        { value: "Valle de Bravo, MEX", text: "Valle de Bravo, MEX" },
        { value: "Lomas de Chapultepec, CDMX", text: "Las Lomas, CDMX" }
    ];

    const typeOptions = [
        { value: "all", text: allTypesText },
        { value: "Casa", text: lang === 'es' ? "Casa" : "House" },
        { value: "Departamento", text: lang === 'es' ? "Departamento" : "Apartment" },
        { value: "Villa", text: "Villa" },
        { value: "Penthouse", text: "Penthouse" }
    ];

    const priceOptions = [
        { value: "all", text: lang === 'es' ? "Cualquier Precio" : "Any Price" },
        { value: "10000000", text: lang === 'es' ? "Hasta $10M MXN" : "Up to $500K USD" },
        { value: "20000000", text: lang === 'es' ? "Hasta $20M MXN" : "Up to $1M USD" },
        { value: "20000001", text: lang === 'es' ? "Más de $20M MXN" : "Over $1M USD" }
    ];

    return `
        <div class="bg-white rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] p-3 lg:p-2 w-full flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0 border border-slate-100">
            
            ${CustomSelect('filter-location', siteData.search_bar.inputs[0].label[lang], locationOptions, currentFilters.location)}
            
            <div class="hidden lg:block w-[1px] h-12 bg-slate-200 shrink-0"></div>
            
            ${CustomSelect('filter-type', siteData.search_bar.inputs[1].label[lang], typeOptions, currentFilters.type)}
            
            <div class="hidden lg:block w-[1px] h-12 bg-slate-200 shrink-0"></div>
            
            ${CustomSelect('filter-price', siteData.search_bar.inputs[2].label[lang], priceOptions, currentFilters.price)}
            
            <div class="w-full lg:w-auto shrink-0 pl-0 lg:pl-4">
                <button id="btn-search" class="w-full lg:w-auto bg-[#0A2640] text-white px-10 py-5 lg:py-4 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    ${siteData.search_bar.btn[lang]}
                </button>
            </div>
            
        </div>
    `;
};