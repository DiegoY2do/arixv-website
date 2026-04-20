// js/data/content.js
const siteData = {
    contact: {
        phone: "+52 5621434770",
        address: "Av. Principal 123, Ciudad de México",
        email: "hola@salonstudio.com",
        social: {
            instagram: "https://www.instagram.com/arixv21/",
            facebook: "https://www.facebook.com/profile.php?id=61572553050464"
        }
    },
    hero: {
        title: "Todo por el cuidado de tu belleza",
        subtitle: "Descubre tu mejor versión con nuestros especialistas en cabello, uñas y pestañas.",
        ctaText: "Reservar Cita"
    },
    services: [
        {
            id: 'manicura-spa',
            category: 'uñas',
            name: "Manicura Rusa Spa",
            price: 450,
            duration: 60,
            img: 'https://images.unsplash.com/photo-1599206676335-193c82b13c9e?q=80&w=707&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: "Limpieza profunda de cutícula con técnica rusa, exfoliación, hidratación intensiva y acabado impecable. Ideal para uñas manos perfectas, limpias y duraderas."
        },
        {
            id: 'bano-color',
            category: 'uñas',
            name: "Baño de Color en Gel",
            price: 350,
            duration: 45,
            img: 'https://images.unsplash.com/photo-1705172516631-8b56622af144?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: "Capa de gel que fortalece la uña natural mientras aporta un color uniforme, brillante y de larga duración. Perfecto para un look limpio, natural y elegante."
        },
        {
            id: 'pedicura-spa',
            category: 'uñas',
            name: "Pedicura Spa Profunda",
            price: 550,
            duration: 60,
            img: 'https://images.unsplash.com/photo-1670432663688-6b61e0332330?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: "Tratamiento completo para pies con eliminación de durezas, exfoliación, hidratación profunda y esmaltado. Deja tus pies suaves, renovados y saludables."
        },
        {
            id: 'lifting-pestanas',
            category: 'pestañas',
            name: "Lifting de Pestañas + Tinte",
            price: 750,
            duration: 60,
            img: 'https://images.unsplash.com/photo-1735151226446-1d364b4adc2f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: "Eleva, curva y define tus pestañas naturales, complementado con tinte para intensificar la mirada sin necesidad de maquillaje diario."
        },
        {
            id: 'ext-clasicas',
            category: 'pestañas',
            name: "Extensiones Clásicas",
            price: 1100,
            duration: 120,
            img: 'https://images.unsplash.com/photo-1588683301867-c442a9ed1389?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: "Aplicación pelo a pelo que alarga y define tus pestañas de forma natural. Ideal para un look sutil, elegante y con mayor longitud."
        },
        {
            id: 'tratamiento-hidrata',
            category: 'cabello',
            name: "Tratamiento de Hidratación Profunda",
            price: 1200,
            duration: 60,
            img: 'https://images.unsplash.com/photo-1571454870646-86bf1e5b25ae?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ',
            description: "Repara y nutre el cabello desde el interior, devolviendo brillo, suavidad y manejabilidad. Ideal para cabello seco, dañado o maltratado."
        },
        {
            id: 'retoque-raiz',
            category: 'cabello',
            name: "Retoque de Raíz",
            price: 950,
            duration: 90,
            img: 'https://images.unsplash.com/photo-1757866332255-7ed25cb8d127?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: "Corrección de crecimiento para mantener un color uniforme desde la raíz. Ideal para prolongar tu coloración y mantener un acabado profesional."
        },
        {
            id: 'corte-autor',
            category: 'cabello',
            name: "Corte de Autor & Styling",
            price: 800,
            isVariablePrice: true,
            duration: 60,
            img: 'https://images.unsplash.com/photo-1757866332255-7ed25cb8d127?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: "Diseño de corte personalizado según tus facciones, estilo y tipo de cabello. Incluye styling para resaltar tu look final."
        },
        {
            id: 'color-balayage',
            category: 'cabello',
            name: "Coloración Balayage",
            price: 2500,
            isVariablePrice: true,
            duration: 180,
            img: 'https://images.unsplash.com/photo-1605980766335-d3a41c7332a1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: "Técnica de iluminación a mano alzada para lograr un degradado natural y luminoso. El precio varía según el largo y volumen del cabello."
        },
        {
            id: 'acrilico',
            category: 'uñas',
            name: "Aplicación de Acrílico (Corto/Medio)",
            price: 600,
            isVariablePrice: true,
            duration: 120,
            img: 'https://images.unsplash.com/photo-1690749138086-7422f71dc159?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: "Esculpido de uñas acrílicas con forma y estructura perfecta. El precio final depende del largo, diseño y nivel de detalle."
        },
        {
            id: 'volumen-ruso',
            category: 'pestanas',
            name: "Extensiones Volumen Ruso",
            price: 1500,
            isVariablePrice: true,
            duration: 150,
            img: 'https://images.unsplash.com/photo-1735151226446-1d364b4adc2f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: "Técnica avanzada que crea abanicos para lograr máximo volumen sin perder ligereza. El resultado depende del estado de tus pestañas naturales."
        },
        {
            id: 'retoque-pestanas',
            category: 'pestanas',
            name: "Retoque (2 a 3 semanas)",
            price: 600,
            isVariablePrice: true,
            duration: 90,
            img: 'https://images.unsplash.com/photo-1561453046-b951b726cf52?q=80&w=718&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: "Mantenimiento de extensiones para conservar volumen y forma. Se recomienda cada 2 a 3 semanas para un resultado siempre impecable."
        }
    ],
    gallery: [
        { id: 1, category: 'cabello', src: 'https://images.unsplash.com/photo-1554519934-e32b1629d9ee?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Corte y peinado con volumen natural' },
        { id: 2, category: 'uñas', src: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Manicura en tonos nude' },
        { id: 3, category: 'cabello', src: 'https://images.unsplash.com/photo-1605980766335-d3a41c7332a1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Tratamiento de coloración balayage' },
        { id: 4, category: 'pestañas', src: 'https://images.unsplash.com/photo-1556942000-13f122b8bb4d?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Lifting de pestañas natural' },
        { id: 5, category: 'uñas', src: 'https://images.unsplash.com/photo-1587729927069-ef3b7a5ab9b4?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Diseño de uñas minimalista' },
        { id: 6, category: 'cabello', src: 'https://images.unsplash.com/photo-1549236177-ca2f08365400?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Peinado editorial' },
        { id: 7, category: 'pestañas', src: 'https://images.unsplash.com/photo-1709477542149-f4e0e21d590b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Extensiones de pestañas volumen ruso' },
        { id: 8, category: 'uñas', src: 'https://images.unsplash.com/photo-1588359953494-0c215e3cedc6?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Detalle de esmaltado perfecto' },
        { id: 9, category: 'cabello', src: 'https://images.unsplash.com/photo-1574621100236-d25b64cfd647?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Corte y peinado con volumen natural' },
        { id: 10, category: 'uñas', src: 'https://images.unsplash.com/photo-1587729927069-ef3b7a5ab9b4?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Manicura en tonos nude' },
        { id: 11, category: 'cabello', src: 'https://images.unsplash.com/photo-1587729927069-ef3b7a5ab9b4?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Tratamiento de coloración balayage' },
        { id: 12, category: 'pestañas', src: 'https://images.unsplash.com/photo-1587673139010-62ca62bfafef?q=80&w=1633&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Lifting de pestañas natural' },
        { id: 13, category: 'uñas', src: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Diseño de uñas minimalista' },
        { id: 14, category: 'cabello', src: 'https://images.unsplash.com/photo-1497433550656-7fb185be365e?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Peinado editorial' },
        { id: 15, category: 'pestañas', src: 'https://images.unsplash.com/photo-1550005869-5fca7db35ddb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Extensiones de pestañas volumen ruso' },
        { id: 16, category: 'uñas', src: 'https://images.unsplash.com/photo-1597999709389-e29dc41e218a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Detalle de esmaltado perfecto' }
    ],
    pricing: [
        {
            category: "Cabello",
            items: [
                { name: "Corte de Autor & Styling", price: "Desde $800" },
                { name: "Coloración Balayage", price: "Desde $2,500" },
                { name: "Tratamiento de Hidratación Profunda", price: "$1,200" },
                { name: "Retoque de Raíz", price: "$950" }
            ]
        },
        {
            category: "Uñas",
            items: [
                { name: "Manicura Rusa Spa", price: "$450" },
                { name: "Aplicación de Acrílico (Corto/Medio)", price: "Desde $600" },
                { name: "Baño de Color en Gel", price: "$350" },
                { name: "Pedicura Spa Profunda", price: "$550" }
            ]
        },
        {
            category: "Pestañas",
            items: [
                { name: "Lifting de Pestañas + Tinte", price: "$750" },
                { name: "Extensiones Clásicas", price: "$1,100" },
                { name: "Extensiones Volumen Ruso", price: "Desde $1,500" },
                { name: "Retoque (2 a 3 semanas)", price: "Desde $600" }
            ]
        }
    ],
    testimonials: [
        {
            name: "Valeria M.",
            service: "Coloración & Styling",
            text: "Llevaba años buscando un estudio que entendiera exactamente el tono que quería sin maltratar mi cabello. El equipo no solo logró el color perfecto, sino que la experiencia en el salón es un oasis de calma.",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
        },
        {
            name: "Sofía R.",
            service: "Manicura Spa",
            text: "El nivel de detalle y perfeccionismo que tienen es increíble. Mis uñas nunca habían lucido tan elegantes y naturales. Además, la estética del lugar te hace sentir en una revista de moda.",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
        },
        {
            name: "Elena C.",
            service: "Lifting de Pestañas",
            text: "Quería un resultado que resaltara mi mirada sin lucir exagerado o artificial. Entendieron mi visión a la perfección. Es mi momento favorito del mes, la atención es impecable desde que cruzas la puerta.",
            avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop"
        }
    ],
    team: [
        { 
            id: 'isabella',
            name: "Isabella V.", 
            role: "Directora Creativa & Colorista", 
            quote: "El cabello es el lienzo; el color, la expresión de tu esencia.",
            facebook: "https://facebook.com/tu-enlace",
            instagram: "https://instagram.com/tu-enlace",
            img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
            skills: ['color-balayage', 'lifting-pestanas', 'ext-clasicas', 'volumen-ruso', 'retoque-pestanas','manicura-spa', 'bano-color', 'pedicura-spa', 'acrilico','corte-autor', 'tratamiento-hidrata', 'retoque-raiz']
        },
        { 
            id: 'camila',
            name: "Camila R.", 
            role: "Especialista Manicura Spa", 
            quote: "El cabello es el lienzo; el color, la expresión de tu esencia.",
            facebook: "https://facebook.com/tu-enlace",
            instagram: "https://instagram.com/tu-enlace",
            img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
            skills: ['manicura-spa', 'bano-color', 'pedicura-spa', 'acrilico'] 
        },
        { 
            id: 'valentina',
            name: "Valentina C.", 
            role: "Diseño de Mirada y Pestañas", 
            quote: "El cabello es el lienzo; el color, la expresión de tu esencia.",
            facebook: "https://facebook.com/tu-enlace",
            instagram: "https://instagram.com/tu-enlace",
            img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
            skills: ['corte-autor', 'tratamiento-hidrata', 'retoque-raiz']
        }
    ],
    promotions: [
        {
            id: "ritual-muse",
            title: "Ritual Muse",
            subtitle: "Renovación Total",
            description: "Nuestra experiencia insignia. Un día dedicado por completo a tu transformación, combinando nuestros servicios más solicitados en un solo ritual de relajación y belleza.",
            price: "$3,200",
            // Lo que ve el cliente en la tarjeta del Home
            features: [
                "Diseño de Color o Balayage",
                "Manicura Rusa Spa con Gel",
                "Lifting de Pestañas + Tinte",
                "Masaje Capilar Relajante",
                "Copa de Mimosa o Té Matcha de cortesía"
            ],
            // MAGIA: IDs exactos de 'services' para bloquear agenda y aplicar descuento VIP
            includes: ["color-balayage", "manicura-spa", "lifting-pestanas"] 
        },
        {
            id: "weekend-glow",
            title: "Weekend Glow",
            subtitle: "Preparación Perfecta",
            description: "El diseño ideal para antes de un evento importante o simplemente para iniciar el fin de semana sintiéndote espectacular. Styling impecable y manos perfectas.",
            price: "$1,600",
            // Lo que ve el cliente en la tarjeta del Home
            features: [
                "Styling Pro (Ondas o Lacio)",
                "Baño de Color en Gel (Manos)",
                "Tratamiento de Hidratación Exprés",
                "Bebida de cortesía"
            ],
            // MAGIA: IDs exactos de 'services' para bloquear agenda y aplicar descuento VIP
            // Nota: Asegúrate de tener 'styling-pro' y 'hidratacion-expres' en tus services fijos
            includes: ["styling-pro", "bano-color", "hidratacion-expres"]
        }
    ],
    location: { 
        title: "Visítanos",
        address: "Av. Presidente Masaryk",
        mapLink: "https://maps.app.goo.gl/oo67XvGzePgA8CmJ8", // Aquí irá el enlace a Google Maps
        hours: [
            { days: "Lunes a Viernes", time: "10:00 AM - 8:00 PM" },
            { days: "Sábados", time: "9:00 AM - 6:00 PM" },
            { days: "Domingos", time: "Cerrado" }
        ]
    },
    mockAppointments: {
        '2026-04-22': { // Escenario de prueba para el Miércoles, 22 de Abril de 2026
            '10:00': 'isabella',    // Isabella tiene cita a las 10:00 (digamos, 1h)
            '10:30': 'isabella',    // Isabella sigue ocupada
            '11:00': 'elena',       // Elena tiene cita a las 11:00 (digamos, 1.5h)
            '11:30': 'elena',       // Elena sigue ocupada
            '12:00': 'elena',       // Elena sigue ocupada
            '12:30': 'valentina',   // Valentina tiene cita a las 12:30 (digamos, 2h)
            '13:00': 'valentina',   // Valentina sigue ocupada
            '13:30': 'valentina',   // Valentina sigue ocupada
            '14:00': 'valentina',   // Valentina sigue ocupada
        },
        '2026-04-17': { // Escenario de prueba para el Viernes, 17 de Abril de 2026
            '10:00': 'valentina',   // Valentina tiene cita a las 10:00
            '10:30': 'elena',       // Elena tiene cita a las 10:30
        },
        '2026-04-18': { // Escenario de prueba para el Sábado, 18 de Abril de 2026
            '11:00': 'isabella',    // Isabella tiene cita a las 11:00
            '12:00': 'valentina',   // Valentina tiene cita a las 12:00
        },
    },
    rituals: [
        {
            id: 'ritual-muse',
            name: "Ritual Muse",
            // Los IDs EXACTOS de los servicios que componen este paquete
            includes: ['color-balayage', 'manicura-spa', 'lifting-pestanas'] 
        },
        {
            id: 'weekend-glow',
            name: "Weekend Glow",
            includes: ['corte-estilo', 'manicura-spa'] // Ajusta los IDs reales que correspondan
        }
    ],
};

window.siteData = siteData;