/**
 * The Smoke Farm BCN - Product Catalog (Standalone / Zero-CORS)
 * Funziona sia con server HTTP che con doppio clic diretto (file:///)
 */
(function() {
/**
 * The Smoke Farm BCN - Professional Vector SVG Icons
 * Stile minimal, elegante e ultra-professionale.
 */

const ICONS = {
    // Menu / Catalogo editoriale
    menu: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path><line x1="9" y1="7" x2="15" y2="7"></line><line x1="9" y1="11" x2="14" y2="11"></line></svg>`,

    // Telegram (Icona ufficiale Paper Plane in vettoriale)
    telegram: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>`,

    // Sito Web (Globo geometrico minimalista)
    website: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,

    // Instagram (Camera outline ufficiale)
    instagram: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`,

    // Fotocamera per badge multimediale
    camera: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,

    // Freccia destra elegante
    arrowRight: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`
};


/**
 * The Smoke Farm BCN - Internationalization (i18n)
 * Lingue supportate: Italiano (it), Español (es), English (en)
 */

const TRANSLATIONS = {
    it: {
        bio: "Link Ufficiali & Menu Riservato · Barcellona 🇪🇸",
        btn_menu: "MENU",
        btn_menu_desc: "Catalogo Completo & Listino",
        
        // Tasti Ufficiali
        telegram_title: "CANALE TELEGRAM",
        telegram_desc: "Drop Live, Macro Video & Aggiornamenti",
        telegram_badge: "DROP & VIDEO",
        
        website_title: "SITO WEB",
        website_desc: "Portale Ufficiale & Info Club",
        
        instagram_title: "INSTAGRAM",
        instagram_desc: "Galleria, Lifestyle & Community",

        // Catalogo
        btn_back: "← Indietro",
        menu_title: "MENU",
        cat_all: "TUTTI",
        showing: "Mostrando: ",
        all_products: "Tutti i prodotti",
        strains_label: "Varietà / Terpeni:",
        strains_more: "+{n} altre",
        see_all_prices: "Vedi tutti i {n} prezzi",
        no_products: "Nessun prodotto in questa categoria.",
        modal_all_strains: "Tutte le Varietà ({n}):",
        modal_all_prices: "Tutti i Formati & Prezzi:",
        modal_cta: "Ordina su Telegram",
        order_msg_prefix: "Ciao The Smoke Farm BCN! Vorrei informazioni/ordinare:",
        footer_telegram: "Telegram",
        footer_website: "Sito Web",
        footer_instagram: "Instagram",

        // Categorie
        cat_ash: "ASH",
        cat_weed: "WEED",
        cat_ice: "ICE",
        cat_info: "INFO ℹ",

        // Sottocategorie
        sub_all: "TUTTI",
        sub_static: "STATIC",
        sub_fresh_frozen: "FRESH FROZEN",
        sub_dry_sift: "DRY SIFT",
        sub_cali_spain: "CALI SPAIN",
        sub_cali_usa: "CALI USA"
    },
    es: {
        bio: "Enlaces Oficiales & Menú Privado · Barcelona 🇪🇸",
        btn_menu: "MENÚ",
        btn_menu_desc: "Catálogo Completo y Precios",
        
        // Tasti Ufficiali
        telegram_title: "CANAL TELEGRAM",
        telegram_desc: "Drops en Vivo, Macro Vídeos & Novedades",
        telegram_badge: "DROPS Y VÍDEOS",
        
        website_title: "SITIO WEB",
        website_desc: "Portal Oficial & Info del Club",
        
        instagram_title: "INSTAGRAM",
        instagram_desc: "Galería, Lifestyle & Comunidad",

        // Catalogo
        btn_back: "← Volver",
        menu_title: "MENÚ",
        cat_all: "TODOS",
        showing: "Mostrando: ",
        all_products: "Todos los productos",
        strains_label: "Variedades / Terpenos:",
        strains_more: "+{n} más",
        see_all_prices: "Ver todos los {n} precios",
        no_products: "No hay productos en esta categoría.",
        modal_all_strains: "Todas las Variedades ({n}):",
        modal_all_prices: "Todos los Formatos y Precios:",
        modal_cta: "Ordenar en Telegram",
        order_msg_prefix: "¡Hola The Smoke Farm BCN! Quisiera consultar/ordenar:",
        footer_telegram: "Telegram",
        footer_website: "Sitio Web",
        footer_instagram: "Instagram",

        // Categorie
        cat_ash: "ASH",
        cat_weed: "WEED",
        cat_ice: "ICE",
        cat_info: "INFO ℹ",

        // Sottocategorie
        sub_all: "TODOS",
        sub_static: "STATIC",
        sub_fresh_frozen: "FRESH FROZEN",
        sub_dry_sift: "DRY SIFT",
        sub_cali_spain: "CALI SPAIN",
        sub_cali_usa: "CALI USA"
    },
    en: {
        bio: "Official Links & Private Menu · Barcelona 🇪🇸",
        btn_menu: "MENU",
        btn_menu_desc: "Full Catalog & Price List",
        
        // Tasti Ufficiali
        telegram_title: "TELEGRAM CHANNEL",
        telegram_desc: "Live Drops, Macro Videos & Updates",
        telegram_badge: "DROPS & VIDEOS",
        
        website_title: "OFFICIAL WEBSITE",
        website_desc: "Official Portal & Club Info",
        
        instagram_title: "INSTAGRAM",
        instagram_desc: "Gallery, Lifestyle & Community",

        // Catalogo
        btn_back: "← Back",
        menu_title: "MENU",
        cat_all: "ALL",
        showing: "Showing: ",
        all_products: "All products",
        strains_label: "Flavours / Strains:",
        strains_more: "+{n} more",
        see_all_prices: "See all {n} prices",
        no_products: "No products in this category.",
        modal_all_strains: "All Flavours / Strains ({n}):",
        modal_all_prices: "All Quantities & Prices:",
        modal_cta: "Order via Telegram",
        order_msg_prefix: "Hello The Smoke Farm BCN! I would like to inquire/order:",
        footer_telegram: "Telegram",
        footer_website: "Website",
        footer_instagram: "Instagram",

        // Categorie
        cat_ash: "ASH",
        cat_weed: "WEED",
        cat_ice: "ICE",
        cat_info: "INFO ℹ",

        // Sottocategorie
        sub_all: "ALL",
        sub_static: "STATIC",
        sub_fresh_frozen: "FRESH FROZEN",
        sub_dry_sift: "DRY SIFT",
        sub_cali_spain: "CALI SPAIN",
        sub_cali_usa: "CALI USA"
    }
};

const STORAGE_KEY = "tsfbcn_lang";
const SUPPORTED_LANGS = ["it", "es", "en"];

function getLang() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && SUPPORTED_LANGS.includes(saved)) {
            return saved;
        }
    } catch (e) {
        // fallback
    }
    // Default: IT
    return "it";
}

function setLang(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    try {
        localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    window.dispatchEvent(new CustomEvent("tsf_langchange", { detail: { lang } }));
}

function t(key, params = {}) {
    const lang = getLang();
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.it;
    let text = dict[key] || TRANSLATIONS.it[key] || key;
    for (const [k, v] of Object.entries(params)) {
        text = text.replace(new RegExp(`\\{${k}\\}`, "g"), v);
    }
    return text;
}

/**
 * Monta il selettore di lingua minimale nel container indicato
 */
function mountLangSelector(containerElement) {
    if (!containerElement) return;
    const current = getLang();

    containerElement.innerHTML = `
        <div class="lang-selector" role="group" aria-label="Language Selector">
            <button type="button" class="lang-btn ${current === 'it' ? 'active' : ''}" data-lang="it">IT</button>
            <span class="lang-sep">|</span>
            <button type="button" class="lang-btn ${current === 'es' ? 'active' : ''}" data-lang="es">ES</button>
            <span class="lang-sep">|</span>
            <button type="button" class="lang-btn ${current === 'en' ? 'active' : ''}" data-lang="en">EN</button>
        </div>
    `;

    containerElement.querySelectorAll(".lang-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const nextLang = btn.dataset.lang;
            if (nextLang === getLang()) return;
            setLang(nextLang);
            containerElement.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });
}


/**
 * The Smoke Farm BCN - Data Store
 * Configurazione minimale, canali, categorie, sottocategorie e prodotti.
 */

const DB = {
    profile: {
        title: "The Smoke Farm BCN",
        bio: "Official Links & Private Menu • Barcelona 🇪🇸",
        avatar_url: "assets/logo-badge.png",
        logo_text_url: "assets/scritta-transparent.png"
    },

    // Link ufficiali (Linktree landing)
    links: [
        {
            id: 1,
            title: "CANALE TELEGRAM",
            desc: "Drop Live, Macro Video & Aggiornamenti",
            url: "https://t.me/+fe7RDT8eo9E0MjZk",
            icon: "telegram"
        },
        {
            id: 2,
            title: "SITO WEB",
            desc: "Portale Ufficiale & Info Club",
            url: "https://thesmokefarmspain.vercel.app/",
            icon: "website"
        },
        {
            id: 3,
            title: "INSTAGRAM",
            desc: "Galleria, Lifestyle & Community",
            url: "https://instagram.com/officialbcn123",
            icon: "instagram"
        }
    ],

    // Footer rapido del catalogo
    footer_links: [
        { id: 1, title: "Telegram", url: "https://t.me/+fe7RDT8eo9E0MjZk" },
        { id: 2, title: "Sito Web", url: "https://thesmokefarmspain.vercel.app/" },
        { id: 3, title: "Instagram", url: "https://instagram.com/officialbcn123" }
    ],

    // Categorie con Sottocategorie
    categories: [
        {
            id: 1,
            name: "Cali Flower",
            slug: "cali-flower",
            kind: "products",
            subcategories: [
                { id: "all", name: "All Cali" },
                { id: "limited-jars", name: "Limited Jars/Boxes" },
                { id: "top-shelf", name: "Top Shelf Indoor" }
            ]
        },
        {
            id: 2,
            name: "Cali Hash",
            slug: "cali-hash",
            kind: "products",
            subcategories: [
                { id: "all", name: "All Hash" },
                { id: "wpff-frozen", name: "WPFF & Ice Hash" },
                { id: "static-sift", name: "Static Sift" },
                { id: "live-rosin", name: "Live Rosin Jars" }
            ]
        },
        {
            id: 3,
            name: "Spanish Flower",
            slug: "spanish-flower",
            kind: "products",
            subcategories: [
                { id: "all", name: "All Spanish" },
                { id: "top-shelf-esp", name: "Top Shelf Indoor" },
                { id: "worker-selection", name: "Worker Selection" },
                { id: "amnesia-haze", name: "Amnesia Haze" }
            ]
        },
        {
            id: 4,
            name: "Moroccan Hash",
            slug: "moroccan-hash",
            kind: "products",
            subcategories: [
                { id: "all", name: "All Moroccan" },
                { id: "blue-magic", name: "Blue Magic" },
                { id: "static-plasma", name: "Static & Plasma" },
                { id: "drysift-classic", name: "Drysift & Semi-Dry" },
                { id: "la-mousse", name: "La Mousse" }
            ]
        },
        {
            id: 5,
            name: "Other Products",
            slug: "other-products",
            kind: "products",
            subcategories: [
                { id: "all", name: "All Extras" },
                { id: "pre-rolls", name: "Pre-Rolls Cali" },
                { id: "edibles", name: "Chocolates & Syrup" }
            ]
        },
        {
            id: 6,
            name: "Info",
            slug: "info",
            kind: "text",
            text_content: `<b>THE SMOKE FARM BCN 🇪🇸 • SHIPPING & PAYMENT INFO 🚢</b>
<i><u>MUST READ BEFORE ORDERING:</u></i>
• EVERYTHING IS AT YOUR OWN RISK, % AVAILABLE FOR RESHIPS 📦
• LANDING RATE IS 95%+ ✍️ WORLDWIDE & EUROPE STEALTH SHIPPING 🌐
• IF YOU MAKE AN ORDER DO NOT USE ANY DELETING MESSAGE TIMERS 🔜
• DROPSHIPPING ALSO AVAILABLE (PLAIN PACKAGING) 🛬

<i><u>MEET UP IN BARCELONA 🇪🇸:</u></i>
• Minimum Order: €500
• Crypto ONLY unless you are a Verified Customer!
• Meet-ups arranged in discreet and safe spots across central Barcelona.

<i><u>SHIPPING OPTIONS & RATES 📦:</u></i>
• <b>€50</b> - Make your own Label / Correos with Signature / Letter
• <b>€75</b> - Correos without Signature / Package
• <b>€100</b> - Mondial Relay / InPost Locker / UPS / DHL / DPD (SEUR)
• <b>€100</b> - Transit+ No Address Needed (100% Landing Rate to collection point)
• <b>€100</b> - Extra Stealth Multi-Layer (Recommended for larger orders)
• <b>€200</b> - Cold Shipping & Express Stealth (Isothermic pack for Rosin & WPFF)

<i><u>ACCEPTED PAYMENT METHODS 💳:</u></i>
• <b>ALL Crypto Accepted (Instant Confirmation)</b>:
  - <b>BTC</b>: <code>bc1qsfhzwrkv64sefs9sdjv48jmxpv8pzh4w32rpmm</code>
  - <b>ETH & USDT (ERC20)</b>: <code>0xBDeB4ACA79b1ccFCd6EBC648f8e496Ecb046F228</code>
  - <b>TRX & USDT (TRC20)</b>: <code>TJUuH9TuRdkCroAFq7r5eq1utVVr5xswxJ</code>
• Cash In Barcelona (Meet-up)
• Western Union / RIA / Moneygram (Ask for receiver details)
• Bank Transfer (Verified Customers Only)
• Cash Drop service available in major EU cities upon request 🇪🇺

<i><u>PAYMENT & ORDER INSTRUCTIONS ✍️:</u></i>
AFTER PAYMENT MUST SEND <b>3 SEPARATE MESSAGES</b>:
1- (Amount of EURO - Time & Date) - <i>e.g. €1250 15:30 02/11/2026 + TXID photo</i>
2- (Actual Order & Chosen Courier) - <i>e.g. 50g Blue Zushi / DHL Express</i>
3- (Full Name & Address / Locker Name) - <i>e.g. InPost Locker Code, Phone Number & Email (Mandatory for couriers)</i>

🚨 <b>PHOTO CONFIRMATION OF TXID IS REQUIRED. PRIVNOTE NOT ACCEPTED.</b>`
        }
    ],

    // Prodotti con descrizioni, varietà e listino prezzi
    products: [
        // CALI FLOWER
        {
            id: 101,
            name: "The Ten Co - Blue Zushi (Limited Edition)",
            category_id: 1,
            category_name: "Cali Flower",
            subcategory_id: "limited-jars",
            subcategory_name: "Limited Jars/Boxes",
            description: "The world renowned award-winning cultivar directly in original sealed collectible jars. Rare minty sweet gas profile with pristine frosty trichomes.",
            flavours_strains: [
                "Blue Zushi (The Ten Co Cut)"
            ],
            pricing_tiers: [
                { qty: "3.5g", price: "100€" },
                { qty: "7g", price: "200€" },
                { qty: "14g", price: "350€" },
                { qty: "28g (1 oz)", price: "650€" }
            ],
            media_files: [
                { type: "image", url: "https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=700&auto=format&fit=crop&q=80" },
                { type: "image", url: "https://images.unsplash.com/photo-1568644396922-5c3bfae12521?w=700&auto=format&fit=crop&q=80" }
            ]
        },
        {
            id: 102,
            name: "Cali Jars & Boxes (Z Money & Jhonny Dank)",
            category_id: 1,
            category_name: "Cali Flower",
            subcategory_id: "limited-jars",
            subcategory_name: "Limited Jars/Boxes",
            description: "Top-tier curated exotic drops from the most respected growers in California. Sealed glass jars with terpene shield.",
            flavours_strains: [
                "Sticky Z (Z Money)",
                "Blue Zu (Jhonny Dank Co)",
                "White Tahoe Cookies (Jhonny Dank Co)"
            ],
            pricing_tiers: [
                { qty: "7g", price: "150€" },
                { qty: "14g", price: "275€" },
                { qty: "28g", price: "500€" },
                { qty: "56g", price: "900€" },
                { qty: "112g (Q-Pack)", price: "1750€" }
            ],
            media_files: [
                { type: "image", url: "https://images.unsplash.com/photo-1568644396922-5c3bfae12521?w=700&auto=format&fit=crop&q=80" }
            ]
        },
        {
            id: 103,
            name: "Cali Selection Top Shelf Indoor",
            category_id: 1,
            category_name: "Cali Flower",
            subcategory_id: "top-shelf",
            subcategory_name: "Top Shelf Indoor",
            description: "Hand-trimmed dense buds grown in state-of-the-art indoor facilities. Explosive dessert, fruit and fuel profiles.",
            flavours_strains: [
                "Lemon Cherry Gelato (LCG)",
                "Zkittlez Original",
                "RS11 (Rainbow Sherbet #11)",
                "Permanent Marker (Doja Cut)",
                "Blue Zushi",
                "Gary Payton (Powerzzzup)",
                "Jealousy F2",
                "Biscotti Sundae"
            ],
            pricing_tiers: [
                { qty: "3.5g", price: "35€" },
                { qty: "10g", price: "90€" },
                { qty: "25g", price: "200€" },
                { qty: "50g", price: "370€" },
                { qty: "100g", price: "680€" }
            ],
            media_files: [
                { type: "image", url: "https://images.unsplash.com/photo-1536939459926-301728717817?w=700&auto=format&fit=crop&q=80" }
            ]
        },

        // CALI HASH & EXTRACTS
        {
            id: 201,
            name: "Summer 6-Star WPFF & Ice Hash (50g Plates)",
            category_id: 2,
            category_name: "Cali Hash",
            subcategory_id: "wpff-frozen",
            subcategory_name: "WPFF & Ice Hash",
            description: "Whole Plant Fresh Frozen wash. 73u-120u resin glands, melted cleanly with zero plant residue. Available in single fruit strains or DUO blends.",
            flavours_strains: [
                "SINGLE: Jugs, Fresa, Kumquat, Stardust",
                "DUO: Passion Fruit x Mazapan",
                "DUO: Papaya Splash x Banana Blast",
                "DUO: Blackberry x Georgia Peach",
                "DUO: Pink Champagne x Fruit Salad"
            ],
            pricing_tiers: [
                { qty: "10g", price: "375€" },
                { qty: "25g", price: "900€" },
                { qty: "50g (Placa)", price: "1750€" },
                { qty: "100g", price: "3000€" },
                { qty: "250g", price: "6875€" }
            ],
            media_files: [
                { type: "image", url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=700&auto=format&fit=crop&q=80" }
            ]
        },
        {
            id: 202,
            name: "MLTD Labs Static Sift (25g Plates)",
            category_id: 2,
            category_name: "Cali Hash",
            subcategory_id: "static-sift",
            subcategory_name: "Static Sift",
            description: "99.9% pure resin heads isolated through electrostatic charge. Glassy amber texture that greases up instantly at room temperature.",
            flavours_strains: [
                "Funfetti",
                "Blockberry (Super Boof)",
                "Tropical Z",
                "Frozen Bananas",
                "Guaraná",
                "Tractor Fuel",
                "Candy Fumez",
                "Grape Gas",
                "Pink Amaretto",
                "Peaches & Cream",
                "Rainbow Guava"
            ],
            pricing_tiers: [
                { qty: "10g", price: "325€" },
                { qty: "25g (Placa)", price: "750€" },
                { qty: "50g", price: "1375€" },
                { qty: "100g", price: "2625€" },
                { qty: "250g", price: "6250€" },
                { qty: "500g", price: "12000€" }
            ],
            media_files: [
                { type: "image", url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=700&auto=format&fit=crop&q=80" }
            ]
        },
        {
            id: 203,
            name: "Karma Cartel x Static Labz (w/ 2g Jars)",
            category_id: 2,
            category_name: "Cali Hash",
            subcategory_id: "static-sift",
            subcategory_name: "Static Sift",
            description: "50g original plates delivered with branded 2g glass jars. Premium Collab and Ultra Filtered WPFF static grades.",
            flavours_strains: [
                "COLLAB: Forbidden Blueprint, 4Z, Zun Tan, Zaddy, Lime Heads, Egyptian Papaya, Nitro Fumez, Cherry Blossom",
                "ULTRA FILTERED: Jelly Rancher, Nectarine, Chemlato, Strawguava, Hollywood Trop, ZkittleZ, Lemon Cherry Sherb"
            ],
            pricing_tiers: [
                { qty: "10g", price: "300€" },
                { qty: "25g", price: "725€" },
                { qty: "50g (Placa)", price: "1425€" },
                { qty: "100g", price: "2800€" },
                { qty: "250g", price: "6875€" }
            ],
            media_files: [
                { type: "image", url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=700&auto=format&fit=crop&q=80" }
            ]
        },
        {
            id: 204,
            name: "Golden Heads Warriors - Cold Cure Rosin (2g)",
            category_id: 2,
            category_name: "Cali Hash",
            subcategory_id: "live-rosin",
            subcategory_name: "Live Rosin Jars",
            description: "First press 90u live rosin cold cured to a creamy wet badder consistency. Maximum terpene preservation.",
            flavours_strains: [
                "Neonz Live Rosin",
                "Honey Banana Cold Cure",
                "Zkittlez 3rd Gen",
                "Blumosa Terp Jam"
            ],
            pricing_tiers: [
                { qty: "1 Jar (2g)", price: "250€" },
                { qty: "2 Jars (4g)", price: "475€" },
                { qty: "5 Jars (10g)", price: "1125€" },
                { qty: "10 Jars (20g)", price: "2000€" }
            ],
            media_files: [
                { type: "image", url: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=700&auto=format&fit=crop&q=80" }
            ]
        },

        // SPANISH FLOWER
        {
            id: 301,
            name: "La Bomba - Premium Spanish (+ 3.5g Bags)",
            category_id: 3,
            category_name: "Spanish Flower",
            subcategory_id: "top-shelf-esp",
            subcategory_name: "Top Shelf Indoor",
            description: "Indoor Barcelona private reserve (Wedding Cake x Jet Fuel Gelato). High density and sharp gassy nose. Comes with 3.5g retail bags.",
            flavours_strains: [
                "La Bomba (Club Selection)"
            ],
            pricing_tiers: [
                { qty: "25g", price: "175€" },
                { qty: "50g", price: "300€" },
                { qty: "100g", price: "550€" },
                { qty: "250g", price: "1300€" },
                { qty: "500g", price: "2500€" }
            ],
            media_files: [
                { type: "image", url: "https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=700&auto=format&fit=crop&q=80" }
            ]
        },
        {
            id: 302,
            name: "Top Shelf Spanish (Runtz & Cherry Bomb)",
            category_id: 3,
            category_name: "Spanish Flower",
            subcategory_id: "top-shelf-esp",
            subcategory_name: "Top Shelf Indoor",
            description: "Clean machine and hand-trimmed flower with rich terpene profiles. Bulk batches up to 5kg available.",
            flavours_strains: [
                "Runtz Spanish Cut",
                "Cherry Bomb Sweet & Sour"
            ],
            pricing_tiers: [
                { qty: "250g", price: "1125€" },
                { qty: "500g", price: "2000€" },
                { qty: "1000g (1 Kg)", price: "3750€" },
                { qty: "2500g (2.5 Kg)", price: "9000€" },
                { qty: "5000g (5 Kg)", price: "17500€" }
            ],
            media_files: [
                { type: "image", url: "https://images.unsplash.com/photo-1568644396922-5c3bfae12521?w=700&auto=format&fit=crop&q=80" }
            ]
        },
        {
            id: 303,
            name: "Top Amnesia Haze Spanish Indoor",
            category_id: 3,
            category_name: "Spanish Flower",
            subcategory_id: "amnesia-haze",
            subcategory_name: "Amnesia Haze",
            description: "Classic European favorite with intense lemon citrus and spicy pine aromas. Big frosty buds.",
            flavours_strains: [
                "Top Tier Amnesia Haze",
                "Commercial Amnesia Haze"
            ],
            pricing_tiers: [
                { qty: "250g (Top)", price: "800€" },
                { qty: "500g (Top)", price: "1500€" },
                { qty: "1000g (1 Kg Top)", price: "2750€" },
                { qty: "5000g (5 Kg Bulk)", price: "12750€" }
            ],
            media_files: [
                { type: "image", url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=700&auto=format&fit=crop&q=80" }
            ]
        },

        // MOROCCAN HASH
        {
            id: 401,
            name: "Blue Magic 2025/2026 - Premium Static",
            category_id: 4,
            category_name: "Moroccan Hash",
            subcategory_id: "blue-magic",
            subcategory_name: "Blue Magic",
            description: "The most sought-after static sift in Europe. Modern genetic crosses grown in the Rif with European lab standards.",
            flavours_strains: [
                "Cherry Ville",
                "The Hashaahin",
                "Zafiro Anejo (GMO x Azulcar)",
                "Forbidden Aglio",
                "Five Guys (Hashburger x Tropi Cherry)",
                "Mansa Musa (24K x Papaya)",
                "Boofed Out (Superboof Cherry 26mm)",
                "Mad Honey"
            ],
            pricing_tiers: [
                { qty: "10g", price: "175€" },
                { qty: "25g", price: "300€" },
                { qty: "50g", price: "550€" },
                { qty: "100g", price: "1050€" },
                { qty: "250g", price: "2500€" },
                { qty: "1000g (1 Kg)", price: "9500€" }
            ],
            media_files: [
                { type: "image", url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=700&auto=format&fit=crop&q=80" }
            ]
        },
        {
            id: 402,
            name: "Blue Magic 2025/2026 - Premium Frozen",
            category_id: 4,
            category_name: "Moroccan Hash",
            subcategory_id: "blue-magic",
            subcategory_name: "Blue Magic",
            description: "Soft melting resin sifted at freezing temperatures. Creamy sweet fruit and candy gas notes.",
            flavours_strains: [
                "Forbidden Aglio",
                "Double Zulcar",
                "Sumo Shock",
                "Hash Cherry",
                "Peachy Gas",
                "Butter Barb",
                "Peach Squeeze"
            ],
            pricing_tiers: [
                { qty: "10g", price: "150€" },
                { qty: "25g", price: "275€" },
                { qty: "50g", price: "500€" },
                { qty: "100g", price: "950€" },
                { qty: "250g", price: "2350€" },
                { qty: "1000g (1 Kg)", price: "9000€" }
            ],
            media_files: [
                { type: "image", url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=700&auto=format&fit=crop&q=80" }
            ]
        },
        {
            id: 403,
            name: "La Mousse & Premium Gold La Mousse",
            category_id: 4,
            category_name: "Moroccan Hash",
            subcategory_id: "la-mousse",
            subcategory_name: "La Mousse",
            description: "Super soft, light spongy texture that crumbles effortlessly. Consistent bulk availability with Packz Farmz or plain neutral stickers.",
            flavours_strains: [
                "Classic Yellow Mousse",
                "Premium Gold La Mousse"
            ],
            pricing_tiers: [
                { qty: "100g (Panetta)", price: "200€ - 250€" },
                { qty: "250g", price: "500€" },
                { qty: "500g", price: "900€" },
                { qty: "1000g (1 Kg)", price: "1750€" },
                { qty: "2500g (2.5 Kg)", price: "4000€" },
                { qty: "5000g (5 Kg)", price: "7500€" }
            ],
            media_files: [
                { type: "image", url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=700&auto=format&fit=crop&q=80" }
            ]
        },

        // OTHER PRODUCTS
        {
            id: 501,
            name: "Cali 1.5g Pre-Rolls (Clean Trim / Small Buds)",
            category_id: 5,
            category_name: "Other Products",
            subcategory_id: "pre-rolls",
            subcategory_name: "Pre-Rolls Cali",
            description: "1.5g pre-rolls crafted exclusively with premium California sugar leaves and small bud flowers. Rolled with Raw papers. With or without tobacco upon request.",
            flavours_strains: [
                "100% Cali Small Buds Blend"
            ],
            pricing_tiers: [
                { qty: "25 Packs", price: "100€" },
                { qty: "50 Packs", price: "175€" },
                { qty: "100 Packs", price: "325€" },
                { qty: "250 Packs", price: "750€" }
            ],
            media_files: [
                { type: "image", url: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=700&auto=format&fit=crop&q=80" }
            ]
        },
        {
            id: 502,
            name: "Vybz Mushroom Chocolate Bars (85g)",
            category_id: 5,
            category_name: "Other Products",
            subcategory_id: "edibles",
            subcategory_name: "Chocolates & Syrup",
            description: "85g premium Belgian chocolate bars infused with botanical extract. 15 calibrated squares for microdosing or full journeys.",
            flavours_strains: [
                "Dark Chocolate Sea Salt",
                "Milk Hazelnut Crunch",
                "Cookies & Cream"
            ],
            pricing_tiers: [
                { qty: "1 Bar", price: "75€" },
                { qty: "5 Bars", price: "350€" },
                { qty: "10 Bars", price: "600€" },
                { qty: "25 Bars", price: "1375€" },
                { qty: "50 Bars", price: "2500€" }
            ],
            media_files: [
                { type: "image", url: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=700&auto=format&fit=crop&q=80" }
            ]
        }
    ]
};



const MAX_VISIBLE_STRAINS = 3;
const MAX_VISIBLE_PRICES = 3;

function loadStoreData() {
    try {
        const stored = localStorage.getItem("tsfbcn_menu_data");
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed && Array.isArray(parsed.products) && Array.isArray(parsed.categories)) {
                const hasAsh = parsed.categories.some(c => c.slug === "ash" || c.name === "ASH");
                if (hasAsh) {
                    return parsed;
                }
            }
        }
    } catch(e) {
        console.warn("Storage load error:", e);
    }
    if (typeof window !== "undefined" && window.TSF_INITIAL_DATA) {
        try {
            localStorage.setItem("tsfbcn_menu_data", JSON.stringify(window.TSF_INITIAL_DATA));
        } catch(e) {}
        return window.TSF_INITIAL_DATA;
    }
    return DB;
}

let currentStore = loadStoreData();
let allProducts = currentStore.products || [];
let allCategories = currentStore.categories || [];
let activeCategoryId = "ALL";
let activeSubcategoryId = "all";
let activeModalProduct = null;
let activeMediaIndex = 0;

function formatMediaUrl(url) {
    if (!url) return "";
    if (url.startsWith("assets/") && (window.location.pathname.includes("/pages/") || window.location.pathname.includes("\\pages\\"))) {
        return "../" + url;
    }
    return url;
}

// Protezione Multimedia (Anti-download clic destro / drag)
function renderProtectedMedia(media, altName, isModal = false) {
    if (!media || !media.url) {
        return `
            <div class="protected-media no-media-placeholder">
                <span>NO MEDIA</span>
            </div>
        `;
    }

    if (media.type === "video") {
        return `
            <div class="protected-media">
                <video 
                    src="${formatMediaUrl(media.url)}" 
                    autoplay 
                    muted 
                    loop 
                    playsinline 
                    controlsList="nodownload noplaybackrate" 
                    disablePictureInPicture
                    oncontextmenu="return false;"
                ></video>
                <div class="media-shield"></div>
            </div>
        `;
    }

    return `
        <div class="protected-media">
            <img 
                src="${formatMediaUrl(media.url)}" 
                alt="${altName}" 
                loading="lazy" 
                draggable="false" 
                oncontextmenu="return false;"
            >
            <div class="media-shield"></div>
        </div>
    `;
}

// Generazione Card Prodotto
function createProductCard(product) {
    const mediaList = product.media_files || [];
    const mainMedia = mediaList[0] || null;
    const extraMediaCount = mediaList.length > 1 ? `<span class="media-count-badge">1/${mediaList.length} ${ICONS.camera}</span>` : "";

    const strains = product.flavours_strains || [];
    const visibleStrains = strains.slice(0, MAX_VISIBLE_STRAINS);
    const hasMoreStrains = strains.length > MAX_VISIBLE_STRAINS;

    let strainsHTML = visibleStrains
        .map(strain => `<span class="strain-tag" title="${strain}">${strain}</span>`)
        .join("");

    if (hasMoreStrains) {
        const remaining = strains.length - MAX_VISIBLE_STRAINS;
        strainsHTML += `<span class="strain-tag strain-more" data-ignore-modal="true">${t("strains_more", { n: remaining })}</span>`;
    }

    const tiers = product.pricing_tiers || [];
    const visiblePrices = tiers.slice(0, MAX_VISIBLE_PRICES);
    const hasMorePrices = tiers.length > MAX_VISIBLE_PRICES;

    const pricingHTML = visiblePrices
        .map(tier => `
            <div class="price-row">
                <span class="price-qty">${tier.qty}</span>
                <span class="price-val">${tier.price}</span>
            </div>
        `).join("");

    const seeMoreBtnHTML = hasMorePrices
        ? `<button type="button" class="btn-see-more">${t("see_all_prices", { n: tiers.length })}</button>`
        : "";

    return `
        <article class="product-card" data-product-id="${product.id}">
            <div class="product-media">
                <span class="product-badge">${product.category_name}</span>
                ${extraMediaCount}
                ${renderProtectedMedia(mainMedia, product.name, false)}
            </div>
            <div class="product-body">
                <h2 class="product-title">${product.name}</h2>
                <div>
                    <small>${t("strains_label")}</small>
                    <div class="strains-list">${strainsHTML}</div>
                </div>
                <div class="pricing-table">
                    ${pricingHTML}
                    ${seeMoreBtnHTML}
                </div>
            </div>
        </article>
    `;
}

// Generazione Modale Completa
function createProductModal(product, currentMediaIndex = 0) {
    const mediaList = product.media_files || [];
    const currentMedia = mediaList[currentMediaIndex] || null;
    const hasMultipleMedia = mediaList.length > 1;

    const galleryControlsHTML = hasMultipleMedia ? `
        <button type="button" class="gallery-nav gallery-prev" data-gallery-dir="-1">‹</button>
        <button type="button" class="gallery-nav gallery-next" data-gallery-dir="1">›</button>
        <span class="media-count-badge">${currentMediaIndex + 1} / ${mediaList.length} ${ICONS.camera}</span>
    ` : "";

    const allStrainsHTML = (product.flavours_strains || [])
        .map(strain => `<span class="strain-tag strain-tag-full">${strain}</span>`)
        .join("");

    const allPricingHTML = (product.pricing_tiers || [])
        .map(tier => `
            <div class="price-row">
                <span class="price-qty">${tier.qty}</span>
                <span class="price-val">${tier.price}</span>
            </div>
        `).join("");

    const orderMsg = encodeURIComponent(`${t("order_msg_prefix")} ${product.name}`);
    const telegramOrderUrl = `https://t.me/+fe7RDT8eo9E0MjZk?text=${orderMsg}`;

    return `
        <div class="modal-media">
            <span class="product-badge">${product.category_name}</span>
            <button type="button" class="modal-close" data-close-modal aria-label="Close">✕</button>
            ${galleryControlsHTML}
            <div id="modal-media-stage" style="width:100%; height:100%;">
                ${renderProtectedMedia(currentMedia, product.name, true)}
            </div>
        </div>
        <div class="modal-body">
            <h2 class="product-title modal-title">${product.name}</h2>
            ${product.description ? `<p class="modal-desc-text">${product.description}</p>` : ""}
            <div>
                <small>${t("modal_all_strains", { n: (product.flavours_strains || []).length })}</small>
                <div class="strains-list">${allStrainsHTML}</div>
            </div>
            <div class="pricing-table">
                <small>${t("modal_all_prices")}</small>
                ${allPricingHTML}
            </div>
            <a href="${telegramOrderUrl}" target="_blank" rel="noopener noreferrer" class="modal-cta-btn">
                ${ICONS.telegram} ${t("modal_cta")}
            </a>
        </div>
    `;
}

// Funzione rendering riga prodotto testuale (Zero Foto - Stile Reference packzbcn)
function renderTextMenuItem(product) {
    const isSoldOut = product.status === "soldout";

    // Varietà / Terpeni o Descrizione
    let detailsText = "";
    if (product.flavours_strains && product.flavours_strains.length > 0) {
        detailsText = product.flavours_strains.join(", ");
    } else if (product.description) {
        detailsText = product.description;
    }

    // Listino Prezzi & Formati (es: 10g/€100, 25g/€225, 50g/€400, 100g/€750)
    const pricesText = (product.pricing_tiers || []).map(tier => {
        let priceStr = (tier.price || "").trim();
        if (!priceStr.includes("€") && !priceStr.includes("EUR")) {
            priceStr = "€" + priceStr;
        }
        return `${tier.qty}/${priceStr}`;
    }).join(", ");

    const orderMsg = encodeURIComponent(`Ciao The Smoke Farm BCN! Vorrei ordinare: ${product.name}`);
    const telegramUrl = `https://t.me/+fe7RDT8eo9E0MjZk?text=${orderMsg}`;

    return `
        <div class="menu-text-item ${isSoldOut ? 'menu-item-soldout' : ''}" data-product-id="${product.id}" onclick="window.open('${telegramUrl}', '_blank', 'noopener')">
            <span class="menu-item-name">${product.name}</span>
            ${detailsText ? `<span class="menu-item-sep"> - </span><span class="menu-item-strains">${detailsText}</span>` : ''}
            ${pricesText ? `<span class="menu-item-sep"> - </span><span class="menu-item-prices">${pricesText}</span>` : ''}
            ${isSoldOut ? `<span class="menu-item-soldout-badge">ESAURITO / SOLD OUT</span>` : ''}
            <span class="menu-item-order-tag" title="Clicca per ordinare su Telegram">💬 Ordina</span>
        </div>
    `;
}

// Render Prodotti in Elenco Testuale (Zero Foto - Come Reference packzbcn)
function renderProducts() {
    const board = document.getElementById("catalog-board") || document.getElementById("products-grid");
    const banner = document.getElementById("active-category-banner");

    const selectedCat = activeCategoryId === "ALL"
        ? null
        : allCategories.find(c => c.id === activeCategoryId);

    const catName = selectedCat ? selectedCat.name : t("all_products");
    const subcatName = activeSubcategoryId !== "all" 
        ? ` > ${activeSubcategoryId.replace(/-/g, " ").toUpperCase()}` 
        : "";

    if (banner) {
        banner.innerHTML = `${t("showing")} <strong>${catName}${subcatName}</strong>`;
    }

    // Se è la categoria Info di testo
    if (selectedCat && selectedCat.kind === "text") {
        const content = (selectedCat.text_content || "").trim();
        board.className = "catalog-text-board";
        board.innerHTML = `
            <div class="menu-category-section">
                <h2 class="menu-category-heading">📦 ${selectedCat.name}</h2>
                <div class="menu-info-text-body">${content}</div>
            </div>
        `;
        return;
    }

    // Categorie da mostrare
    let categoriesToRender = [];
    if (activeCategoryId === "ALL") {
        categoriesToRender = allCategories.filter(c => c.kind !== "text");
    } else if (selectedCat) {
        categoriesToRender = [selectedCat];
    }

    if (categoriesToRender.length === 0) {
        board.innerHTML = `<p class="skeleton-loader">${t("no_products")}</p>`;
        return;
    }

    let boardHTML = "";

    categoriesToRender.forEach(cat => {
        let catProducts = allProducts.filter(p => p.category_id === cat.id);

        if (activeSubcategoryId !== "all" && activeCategoryId === cat.id) {
            catProducts = catProducts.filter(p => p.subcategory_id === activeSubcategoryId);
        }

        if (catProducts.length === 0 && activeCategoryId !== "ALL") {
            boardHTML += `
                <div class="menu-category-section">
                    <h2 class="menu-category-heading">${cat.name.toUpperCase()} ${cat.icon || ''}</h2>
                    <p style="color: var(--text-muted); font-size: 0.88rem;">${t("no_products")}</p>
                </div>
            `;
            return;
        }

        if (catProducts.length === 0) return;

        const subcategories = cat.subcategories || [{ id: "all", name: cat.name }];
        let sectionsHTML = "";

        subcategories.forEach(sub => {
            if (activeSubcategoryId !== "all" && activeCategoryId === cat.id && sub.id !== activeSubcategoryId) {
                return;
            }

            const prodsInSub = catProducts.filter(p => (p.subcategory_id || "all") === sub.id);
            if (prodsInSub.length === 0) return;

            const subTitle = (sub.id !== "all" && sub.name) ? `-${sub.name.toUpperCase()}` : `-${cat.name.toUpperCase()}`;

            sectionsHTML += `
                <div class="menu-subcategory-block" id="subcat-section-${sub.id}">
                    <h3 class="menu-subcategory-title"><u>${subTitle}</u></h3>
                    <div class="menu-items-group">
                        ${prodsInSub.map(p => renderTextMenuItem(p)).join("")}
                    </div>
                </div>
            `;
        });

        // Prodotti senza sottocategoria specifica
        const unassignedProds = catProducts.filter(p => !subcategories.some(s => s.id === p.subcategory_id));
        if (unassignedProds.length > 0 && (activeSubcategoryId === "all" || activeCategoryId !== cat.id)) {
            sectionsHTML += `
                <div class="menu-subcategory-block">
                    <div class="menu-items-group">
                        ${unassignedProds.map(p => renderTextMenuItem(p)).join("")}
                    </div>
                </div>
            `;
        }

        boardHTML += `
            <div class="menu-category-section">
                <h2 class="menu-category-heading">${cat.name.toUpperCase()} ${cat.icon || ''}</h2>
                ${sectionsHTML}
            </div>
        `;
    });

    board.className = "catalog-text-board";
    board.innerHTML = boardHTML || `<p class="skeleton-loader">${t("no_products")}</p>`;
}

// Render Sottocategorie Minimal
function renderSubcategories() {
    const subContainer = document.getElementById("subfilter-container");
    if (!subContainer) return;

    if (activeCategoryId === "ALL") {
        subContainer.style.display = "none";
        subContainer.innerHTML = "";
        return;
    }

    const currentCat = allCategories.find(c => c.id === activeCategoryId);
    if (!currentCat || currentCat.kind === "text" || !currentCat.subcategories || currentCat.subcategories.length <= 1) {
        subContainer.style.display = "none";
        subContainer.innerHTML = "";
        return;
    }

    subContainer.style.display = "block";
    subContainer.innerHTML = `
        <div class="subcategory-pills">
            ${currentCat.subcategories.map(sub => {
                const subKey = `sub_${sub.id.replace(/-/g, "_")}`;
                const localizedName = t(subKey) !== subKey ? t(subKey) : sub.name;
                return `
                    <button type="button" class="subfilter-option ${activeSubcategoryId === sub.id ? "active" : ""}" data-sub-id="${sub.id}">
                        ${localizedName}
                    </button>
                `;
            }).join("")}
        </div>
    `;

    subContainer.querySelectorAll(".subfilter-option").forEach(btn => {
        btn.addEventListener("click", () => {
            activeSubcategoryId = btn.dataset.subId;
            subContainer.querySelectorAll(".subfilter-option").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderProducts();
        });
    });
}

// Render Categorie Principali (Pills Track)
function renderCategoryFilter() {
    const container = document.getElementById("filter-container");
    if (!container) return;

    container.innerHTML = `
        <div class="category-pills" role="tablist">
            <button type="button" class="filter-option ${activeCategoryId === "ALL" ? "active" : ""}" data-id="ALL">
                ${t("cat_all")}
            </button>
            ${allCategories.map(cat => {
                const catKey = `cat_${cat.slug.replace(/-/g, "_")}`;
                const localizedName = t(catKey) !== catKey ? t(catKey) : cat.name;
                return `
                    <button type="button" class="filter-option ${cat.id === activeCategoryId ? "active" : ""}" data-id="${cat.id}">
                        ${localizedName}
                    </button>
                `;
            }).join("")}
        </div>
    `;

    const pillsTrack = container.querySelector(".category-pills");
    const options = container.querySelectorAll(".filter-option");

    // Scroll orizzontale con rotella mouse
    pillsTrack.addEventListener("wheel", (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            pillsTrack.scrollLeft += e.deltaY;
        }
    }, { passive: false });

    // Selezione Categoria
    options.forEach(opt => {
        opt.addEventListener("click", () => {
            options.forEach(o => o.classList.remove("active"));
            opt.classList.add("active");

            opt.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });

            activeCategoryId = opt.dataset.id === "ALL" ? "ALL" : Number(opt.dataset.id);
            activeSubcategoryId = "all";

            renderSubcategories();
            renderProducts();
        });
    });
}

// Modale Interazioni
function openModal(productId) {
    const product = allProducts.find(p => p.id === Number(productId));
    if (!product) return;

    activeModalProduct = product;
    activeMediaIndex = 0;

    const modalOverlay = document.getElementById("product-modal");
    const modalContent = document.getElementById("modal-content");

    modalContent.innerHTML = createProductModal(activeModalProduct, activeMediaIndex);
    modalOverlay.classList.add("open");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    const modalOverlay = document.getElementById("product-modal");
    const modalContent = document.getElementById("modal-content");

    modalOverlay.classList.remove("open");
    modalOverlay.setAttribute("aria-hidden", "true");
    modalContent.innerHTML = "";
    activeModalProduct = null;
    document.body.style.overflow = "";
}

function setupInteractions() {
    const grid = document.getElementById("catalog-board") || document.getElementById("products-grid");
    const modalOverlay = document.getElementById("product-modal");
    const modalContent = document.getElementById("modal-content");

    if (grid) {
        grid.addEventListener("click", (e) => {
        if (e.target.closest("[data-ignore-modal]")) {
            e.stopPropagation();
            return;
        }

        const card = e.target.closest(".product-card");
        if (card) {
            openModal(card.dataset.productId);
        }
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay || e.target.closest("[data-close-modal]")) {
            closeModal();
            return;
        }

        const navBtn = e.target.closest("[data-gallery-dir]");
        if (navBtn && activeModalProduct) {
            const total = activeModalProduct.media_files.length;
            const dir = Number(navBtn.dataset.galleryDir);
            activeMediaIndex = (activeMediaIndex + dir + total) % total;
            modalContent.innerHTML = createProductModal(activeModalProduct, activeMediaIndex);
        }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });

    // Blocco tasto destro su protected-media
    document.addEventListener("contextmenu", (e) => {
        if (e.target.closest(".protected-media")) e.preventDefault();
    });
}

function renderFooter() {
    const footer = document.getElementById("catalog-footer");
    if (!footer) return;
    footer.innerHTML = `
        <a href="https://t.me/+fe7RDT8eo9E0MjZk" target="_blank" rel="noopener noreferrer" class="footer-btn">
            ${ICONS.telegram} ${t("footer_telegram")}
        </a>
        <a href="https://thesmokefarmspain.vercel.app/" target="_blank" rel="noopener noreferrer" class="footer-btn">
            ${ICONS.website} ${t("footer_website")}
        </a>
        <a href="https://instagram.com/officialbcn123" target="_blank" rel="noopener noreferrer" class="footer-btn">
            ${ICONS.instagram} ${t("footer_instagram")}
        </a>
        <a href="../admin.html" class="footer-btn" title="Pannello Amministratore" style="opacity: 0.35; padding: 0.5rem 0.65rem;">
            🔒
        </a>
    `;
}

function updateTopbarTexts() {
    const btnBack = document.getElementById("btn-back");
    const topbarTitle = document.getElementById("topbar-title");
    if (btnBack) btnBack.textContent = t("btn_back");
    if (topbarTitle) topbarTitle.textContent = t("menu_title");
}

function updateCatalogUI() {
    updateTopbarTexts();
    renderCategoryFilter();
    renderSubcategories();
    renderProducts();
    renderFooter();

    // Se modale aperta, aggiorna la lingua all'interno
    if (activeModalProduct) {
        const modalContent = document.getElementById("modal-content");
        if (modalContent) {
            modalContent.innerHTML = createProductModal(activeModalProduct, activeMediaIndex);
        }
    }
}

function initCatalog() {
    setupInteractions();

    // Monta selettore lingua nella topbar
    const langPicker = document.getElementById("catalog-lang-picker");
    if (langPicker) {
        mountLangSelector(langPicker);
    }

    updateCatalogUI();

    window.addEventListener("tsf_langchange", () => {
        updateCatalogUI();
    });

    // Ascolta aggiornamenti da localStorage (se salvati dal pannello admin)
    window.addEventListener("storage", (e) => {
        if (e.key === "tsfbcn_menu_data") {
            currentStore = loadStoreData();
            allProducts = currentStore.products || [];
            allCategories = currentStore.categories || [];
            updateCatalogUI();
        }
    });

    // Sincronizzazione remota cloud opzionale
    try {
        const cloudConfig = localStorage.getItem("tsfbcn_cloud_sync");
        if (cloudConfig) {
            const conf = JSON.parse(cloudConfig);
            if (conf && conf.url) {
                const headers = {};
                if (conf.apiKey) headers["X-Master-Key"] = conf.apiKey;
                fetch(conf.url, { headers })
                    .then(r => r.ok ? r.json() : null)
                    .then(data => {
                        const rec = (data && data.record) ? data.record : data;
                        if (rec && Array.isArray(rec.products) && Array.isArray(rec.categories)) {
                            localStorage.setItem("tsfbcn_menu_data", JSON.stringify(rec));
                            allProducts = rec.products;
                            allCategories = rec.categories;
                            updateCatalogUI();
                        }
                    })
                    .catch(() => {});
            }
        }
    } catch(e) {}
}

document.addEventListener("DOMContentLoaded", initCatalog);
})();
