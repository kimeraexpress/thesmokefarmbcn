import { DB } from "../data.js";
import { t, mountLangSelector } from "../i18n.js";
import { ICONS } from "../icons.js";

function renderLanding() {
    // 1. Bio
    const bioElem = document.getElementById("profile-bio");
    if (bioElem) {
        bioElem.textContent = t("bio");
    }

    // 2. Canali Ufficiali (MENU, CANALE TELEGRAM, SITO WEB, INSTAGRAM - tutti identici)
    const linksContainer = document.getElementById("links-container");
    if (linksContainer) {
        const channels = [
            {
                id: "menu",
                title: t("btn_menu"),
                desc: t("btn_menu_desc"),
                url: "./pages/catalogo.html",
                icon: ICONS.menu,
                isInternal: true
            },
            {
                id: "telegram",
                title: t("telegram_title"),
                desc: t("telegram_desc"),
                url: "https://t.me/+fe7RDT8eo9E0MjZk",
                icon: ICONS.telegram,
                isInternal: false
            },
            {
                id: "website",
                title: t("website_title"),
                desc: t("website_desc"),
                url: "https://thesmokefarmspain.vercel.app/",
                icon: ICONS.website,
                isInternal: false
            },
            {
                id: "instagram",
                title: t("instagram_title"),
                desc: t("instagram_desc"),
                url: "https://instagram.com/officialbcn123",
                icon: ICONS.instagram,
                isInternal: false
            }
        ];

        linksContainer.innerHTML = channels.map(c => `
            <a href="${c.url}" ${c.isInternal ? '' : 'target="_blank" rel="noopener noreferrer"'} class="link-card link-${c.id}">
                <span class="link-icon">${c.icon}</span>
                <div class="link-content">
                    <span class="link-title">${c.title}</span>
                    <span class="link-desc">${c.desc}</span>
                </div>
                <span class="link-arrow">${ICONS.arrowRight}</span>
            </a>
        `).join("");
    }
}

function initLanding() {
    renderLanding();

    // Ricarica testi al cambio lingua senza refresh della pagina
    window.addEventListener("tsf_langchange", () => {
        renderLanding();
    });
}

document.addEventListener("DOMContentLoaded", initLanding);
