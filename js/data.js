/**
 * The Smoke Farm BCN - Data Store
 * Configurazione minimale, canali, categorie, sottocategorie e prodotti.
 */

export const DB = {
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
            title: "MENU",
            desc: "Catalogo Completo & Listino Prezzi",
            url: "./pages/catalogo.html",
            icon: "menu"
        },
        {
            id: 2,
            title: "CANALE TELEGRAM",
            desc: "Drop Live, Macro Video & Aggiornamenti",
            url: "https://t.me/+fe7RDT8eo9E0MjZk",
            icon: "telegram"
        },
        {
            id: 3,
            title: "GALLERIA PRODOTTI",
            desc: "Foto HD, Dettagli & Macro delle Cime",
            url: "https://thesmokefarmspain.vercel.app/",
            icon: "website"
        },
        {
            id: 4,
            title: "INSTAGRAM",
            desc: "Galleria, Lifestyle & Community",
            url: "https://instagram.com/officialbcn123",
            icon: "instagram"
        }
    ],

    // Footer rapido del catalogo
    footer_links: [
        { id: 1, title: "Telegram", url: "https://t.me/+fe7RDT8eo9E0MjZk" },
        { id: 2, title: "Galleria Prodotti", url: "https://thesmokefarmspain.vercel.app/" },
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
