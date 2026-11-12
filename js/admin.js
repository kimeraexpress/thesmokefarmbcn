/**
 * The Smoke Farm BCN - Admin Panel Logic
 * Indipendente, completo e intuitivo.
 */

(function() {
    'use strict';

    // --- Configurazione & Stato ---
    const DEFAULT_PIN = "tsfbcn2026";
    const STORAGE_KEY_DATA = "tsfbcn_menu_data";
    const STORAGE_KEY_PIN = "tsfbcn_admin_pin";
    const STORAGE_KEY_AUTH = "tsfbcn_admin_auth";
    const STORAGE_KEY_CLOUD = "tsfbcn_cloud_sync";

    let currentData = null;
    let activeCategoryTabId = 1;
    let modalStrains = [];
    let modalPricingTiers = [];
    let modalMediaFiles = [];
    let hasUnsavedChanges = false;

    // Filtri Prodotti
    let filterSearch = "";
    let filterCategory = "ALL";
    let filterSubcategory = "ALL";
    let filterStatus = "ALL";

    // --- 1. Autenticazione & PIN ---
    function getStoredPin() {
        return localStorage.getItem(STORAGE_KEY_PIN) || DEFAULT_PIN;
    }

    function checkAuth() {
        const isAuth = sessionStorage.getItem(STORAGE_KEY_AUTH) === "true";
        const lockScreen = document.getElementById("admin-lock-screen");
        if (isAuth) {
            lockScreen.style.display = "none";
        } else {
            lockScreen.style.display = "flex";
            const pinInput = document.getElementById("admin-pin-input");
            if (pinInput) pinInput.focus();
        }
    }

    window.handleAdminLogin = function() {
        const pinInput = document.getElementById("admin-pin-input");
        const errorMsg = document.getElementById("lock-error-msg");
        const enteredPin = (pinInput.value || "").trim();

        if (enteredPin === getStoredPin()) {
            sessionStorage.setItem(STORAGE_KEY_AUTH, "true");
            errorMsg.style.display = "none";
            document.getElementById("admin-lock-screen").style.display = "none";
            showToast("✅ Accesso effettuato! Benvenuto nel pannello.");
            pinInput.value = "";
        } else {
            errorMsg.style.display = "block";
            pinInput.select();
        }
    };

    window.handleAdminLogout = function() {
        if (confirm("Vuoi davvero disconnetterti dal pannello admin?")) {
            sessionStorage.removeItem(STORAGE_KEY_AUTH);
            checkAuth();
        }
    };

    window.handleChangePin = function() {
        const cur = document.getElementById("current-pin-input").value.trim();
        const n1 = document.getElementById("new-pin-input").value.trim();
        const n2 = document.getElementById("confirm-new-pin-input").value.trim();

        if (cur !== getStoredPin()) {
            alert("Il PIN attuale inserito non è corretto.");
            return;
        }
        if (!n1 || n1.length < 4) {
            alert("Il nuovo PIN deve contenere almeno 4 caratteri.");
            return;
        }
        if (n1 !== n2) {
            alert("I due nuovi PIN non coincidono.");
            return;
        }

        localStorage.setItem(STORAGE_KEY_PIN, n1);
        document.getElementById("current-pin-input").value = "";
        document.getElementById("new-pin-input").value = "";
        document.getElementById("confirm-new-pin-input").value = "";
        showToast("🔒 Nuovo PIN salvato con successo!");
    };


    function sortCurrentProducts() {
        if (currentData && Array.isArray(currentData.products) && window.TSFPriceSort) {
            window.TSFPriceSort.sortProductsByPriceDesc(currentData.products);
        }
    }

    // --- 2. Caricamento Dati ---
    function loadData() {
        try {
            const local = localStorage.getItem(STORAGE_KEY_DATA);
            if (local) {
                const parsed = JSON.parse(local);
                if (parsed && Array.isArray(parsed.products) && Array.isArray(parsed.categories)) {
                    if (parsed.categories.length > 0) {
                        currentData = parsed;
                        sortCurrentProducts();
                        return;
                    }
                }
            }
        } catch(e) {
            console.error("Errore lettura dati da localStorage:", e);
        }

        if (window.TSF_INITIAL_DATA) {
            currentData = JSON.parse(JSON.stringify(window.TSF_INITIAL_DATA));
            sortCurrentProducts();
            try {
                localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(currentData));
            } catch(e) {}
        } else {
            currentData = { profile: {}, channels: [], categories: [], products: [] };
        }
    }

    window.saveAllChanges = async function(showFeedback = true) {
        if (!currentData) return;
        try {
            sortCurrentProducts();
            localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(currentData));
            hasUnsavedChanges = false;
            updateSaveButtonIndicator();
            if (showFeedback) {
                showToast("💾 Salvataggio in corso...");
            }

            // Sincronizzazione in tempo reale con Vercel Blob
            const syncRes = await syncToVercelBlob(currentData);
            if (syncRes && syncRes.success) {
                if (showFeedback) {
                    showToast("☁️ Modifiche salvate e sincronizzate online!");
                }
            } else if (syncRes && syncRes.error) {
                console.warn("Vercel Blob sync note:", syncRes.error);
                if (showFeedback) {
                    showToast("💾 Salvato in locale (Cloud: " + syncRes.error + ")");
                }
            }
        } catch(e) {
            console.error("Errore salvataggio:", e);
            alert("Errore durante il salvataggio dei dati: " + e.message);
        }
    };

    function markUnsaved() {
        hasUnsavedChanges = true;
        updateSaveButtonIndicator();
    }

    function updateSaveButtonIndicator() {
        const btn = document.getElementById("btn-save-all");
        if (!btn) return;
        if (hasUnsavedChanges) {
            btn.classList.add("unsaved-pulse");
            btn.innerHTML = `<span>💾</span> <span>Salva Modifiche *</span>`;
        } else {
            btn.classList.remove("unsaved-pulse");
            btn.innerHTML = `<span>💾</span> <span>Salva Modifiche</span>`;
        }
    }


    // --- 3. Navigazione Schede (Tabs) ---
    window.switchTab = function(tabId) {
        document.querySelectorAll(".nav-tab-btn").forEach(btn => {
            btn.classList.toggle("active", btn.dataset.tab === tabId);
        });
        document.querySelectorAll(".tab-panel").forEach(panel => {
            panel.classList.toggle("active", panel.id === tabId);
        });

        if (tabId === "tab-categories") {
            renderCategoriesManager();
        } else if (tabId === "tab-info") {
            loadInfoText();
        } else if (tabId === "tab-products") {
            renderProductsList();

        }
    };


    // --- 4. Gestione Prodotti (Tab 1) ---
    function renderProductsList() {
        const container = document.getElementById("admin-products-container");
        if (!container) return;

        sortCurrentProducts();
        const products = currentData.products || [];
        const categories = currentData.categories || [];

        // Aggiorna contatori statistiche
        const total = products.length;
        const soldOutCount = products.filter(p => p.status === "soldout").length;
        const activeCount = total - soldOutCount;
        const catCount = categories.filter(c => c.kind !== "text").length;

        document.getElementById("stat-total-products").textContent = total;
        document.getElementById("stat-active-products").textContent = activeCount;
        document.getElementById("stat-soldout-products").textContent = soldOutCount;
        document.getElementById("stat-total-categories").textContent = catCount;
        document.getElementById("badge-prod-count").textContent = total;
        document.getElementById("badge-cat-count").textContent = catCount;

        // Popola dropdown filtri categorie
        populateFilterDropdowns();

        // Filtra lista
        let filtered = products;

        if (filterSearch) {
            const s = filterSearch.toLowerCase();
            filtered = filtered.filter(p => {
                const nameMatch = (p.name || "").toLowerCase().includes(s);
                const descMatch = (p.description || "").toLowerCase().includes(s);
                const strainsMatch = (p.flavours_strains || []).some(st => st.toLowerCase().includes(s));
                return nameMatch || descMatch || strainsMatch;
            });
        }

        if (filterCategory !== "ALL") {
            const catId = Number(filterCategory);
            filtered = filtered.filter(p => p.category_id === catId);
        }

        if (filterSubcategory !== "ALL") {
            filtered = filtered.filter(p => p.subcategory_id === filterSubcategory);
        }

        if (filterStatus === "ACTIVE") {
            filtered = filtered.filter(p => p.status !== "soldout");
        } else if (filterStatus === "SOLDOUT") {
            filtered = filtered.filter(p => p.status === "soldout");
        }

        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-secondary); background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-subtle);">
                    <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">Nessun prodotto trovato</p>
                    <small>Modifica i filtri o clicca su "+ Nuovo Prodotto" per aggiungerne uno.</small>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(p => {
            const isSoldOut = p.status === "soldout";
            const mediaUrl = (p.media_files && p.media_files[0] && p.media_files[0].url) 
                ? p.media_files[0].url 
                : "assets/logo-badge.png";

            const strainsHtml = (p.flavours_strains || []).slice(0, 4).map(st => `
                <span class="admin-strain-tag">${st}</span>
            `).join("") + ((p.flavours_strains || []).length > 4 ? `<span class="admin-strain-tag">+${p.flavours_strains.length - 4}</span>` : "");

            const pricesHtml = (p.pricing_tiers || []).slice(0, 4).map(tier => `
                <span class="admin-price-pill">${tier.qty}: <strong>${tier.price}</strong></span>
            `).join("") + ((p.pricing_tiers || []).length > 4 ? `<span class="admin-price-pill">+altri</span>` : "");

            return `
                <article class="admin-product-card" data-id="${p.id}">
                    <div class="admin-card-media">
                        <img src="${mediaUrl}" alt="${p.name}" class="admin-card-img" onerror="this.src='assets/logo-badge.png'">
                        <button type="button" class="admin-card-status-pill ${isSoldOut ? 'status-soldout' : 'status-active'}" onclick="toggleProductStatus(${p.id})">
                            ${isSoldOut ? '🔴 Esaurito' : '🟢 Disponibile'}
                        </button>
                        <span class="admin-card-cat-badge">${p.category_name || ''} · ${p.subcategory_name || p.subcategory_id || ''}</span>
                    </div>

                    <div class="admin-card-body">
                        <h4 class="admin-card-title">${p.name}</h4>
                        ${p.description ? `<p class="admin-card-desc">${p.description}</p>` : ''}
                        
                        ${strainsHtml ? `<div class="admin-card-strains">${strainsHtml}</div>` : ''}
                        
                        <div class="admin-card-prices">
                            ${pricesHtml || '<span style="font-size:0.75rem; color:var(--text-muted);">Nessun prezzo impostato</span>'}
                        </div>

                        <div class="admin-card-actions">
                            <button type="button" class="btn-card-action" onclick="openProductModal(${p.id})">✏️ Modifica</button>
                            <button type="button" class="btn-card-action" onclick="duplicateProduct(${p.id})">📋 Duplica</button>
                            <button type="button" class="btn-card-action btn-delete" onclick="deleteProduct(${p.id})">🗑️</button>
                        </div>
                    </div>
                </article>
            `;
        }).join("");
    }

    function populateFilterDropdowns() {
        const catSelect = document.getElementById("filter-category-select");
        const subSelect = document.getElementById("filter-subcategory-select");
        if (!catSelect || !subSelect) return;

        const categories = (currentData.categories || []).filter(c => c.kind !== "text");

        const selectedCat = filterCategory;
        catSelect.innerHTML = `<option value="ALL">Tutte le Categorie</option>` + categories.map(c => `
            <option value="${c.id}" ${String(c.id) === String(selectedCat) ? 'selected' : ''}>${c.name}</option>
        `).join("");

        // Sottocategorie dipendono dalla categoria selezionata
        if (filterCategory === "ALL") {
            subSelect.innerHTML = `<option value="ALL">Tutte le Sottocategorie</option>`;
            subSelect.disabled = true;
        } else {
            const targetCat = categories.find(c => String(c.id) === String(filterCategory));
            const subcats = targetCat ? (targetCat.subcategories || []).filter(s => s.id !== "all") : [];
            if (subcats.length === 0) {
                subSelect.innerHTML = `<option value="ALL">Nessuna Sottocategoria (ICE)</option>`;
                subSelect.disabled = true;
            } else {
                subSelect.disabled = false;
                subSelect.innerHTML = `<option value="ALL">Tutte le Sottocategorie</option>` + subcats.map(s => `
                    <option value="${s.id}" ${s.id === filterSubcategory ? 'selected' : ''}>${s.name}</option>
                `).join("");
            }
        }
    }

    window.handleProductSearch = function(val) {
        filterSearch = val.trim();
        renderProductsList();
    };

    window.handleCategoryFilter = function(val) {
        filterCategory = val;
        filterSubcategory = "ALL";
        renderProductsList();
    };

    window.handleSubcategoryFilter = function(val) {
        filterSubcategory = val;
        renderProductsList();
    };

    window.handleStatusFilter = function(val) {
        filterStatus = val;
        renderProductsList();
    };

    window.toggleProductStatus = function(productId) {
        const prod = (currentData.products || []).find(p => p.id === Number(productId));
        if (!prod) return;
        prod.status = prod.status === "soldout" ? "available" : "soldout";
        saveAllChanges(false);
        renderProductsList();
        showToast(prod.status === "soldout" ? "🔴 Prodotto contrassegnato come Esaurito" : "🟢 Prodotto contrassegnato come Disponibile");
    };

    window.duplicateProduct = function(productId) {
        const original = (currentData.products || []).find(p => p.id === Number(productId));
        if (!original) return;

        const clone = JSON.parse(JSON.stringify(original));
        clone.id = Date.now();
        clone.name = clone.name + " (Copia)";
        clone.status = "available";

        currentData.products.unshift(clone);
        saveAllChanges(false);
        renderProductsList();
        showToast("📋 Prodotto duplicato con successo!");
    };

    window.deleteProduct = function(productId) {
        const prod = (currentData.products || []).find(p => p.id === Number(productId));
        if (!prod) return;

        if (confirm(`Sei sicuro di voler eliminare definitivamente "${prod.name}"?`)) {
            currentData.products = currentData.products.filter(p => p.id !== Number(productId));
            saveAllChanges(false);
            renderProductsList();
            showToast("🗑️ Prodotto rimosso dal menu.");
        }
    };


    // --- 5. Modale Creazione / Modifica Prodotto ---
    window.openProductModal = function(productId = null) {
        const modal = document.getElementById("product-modal-overlay");
        const titleEl = document.getElementById("product-modal-title");
        const form = document.getElementById("product-edit-form");

        const categories = (currentData.categories || []).filter(c => c.kind !== "text");
        const catSelect = document.getElementById("edit-prod-category");

        catSelect.innerHTML = categories.map(c => `
            <option value="${c.id}">${c.name}</option>
        `).join("");

        if (productId) {
            // Modifica
            const prod = currentData.products.find(p => p.id === Number(productId));
            if (!prod) return;

            titleEl.textContent = "Modifica Prodotto";
            document.getElementById("edit-prod-id").value = prod.id;
            document.getElementById("edit-prod-name").value = prod.name || "";
            document.getElementById("edit-prod-desc").value = prod.description || "";
            
            catSelect.value = prod.category_id || (categories[0] ? categories[0].id : "");
            onModalCategoryChange(catSelect.value, prod.subcategory_id);

            if (prod.status === "soldout") {
                document.getElementById("status-soldout").checked = true;
            } else {
                document.getElementById("status-available").checked = true;
            }

            modalStrains = [...(prod.flavours_strains || [])];
            modalPricingTiers = JSON.parse(JSON.stringify(prod.pricing_tiers || []));
            modalMediaFiles = JSON.parse(JSON.stringify(prod.media_files || []));
        } else {
            // Nuovo Prodotto
            titleEl.textContent = "Nuovo Prodotto";
            form.reset();
            document.getElementById("edit-prod-id").value = "";
            catSelect.value = categories[0] ? categories[0].id : "";
            onModalCategoryChange(catSelect.value);

            document.getElementById("status-available").checked = true;
            modalStrains = [];
            modalPricingTiers = [
                { qty: "3.5g", price: "100€" },
                { qty: "7g", price: "200€" }
            ];
            modalMediaFiles = [
                { type: "image", url: "assets/logo-badge.png" }
            ];
        }

        window.modalPricingTiers = modalPricingTiers;
        renderModalStrainsTags();
        renderModalPricingTiers();
        renderModalMediaPreviews();

        modal.classList.add("open");
    };

    window.closeProductModal = function() {
        document.getElementById("product-modal-overlay").classList.remove("open");
    };

    window.onModalCategoryChange = function(selectedCatId, preselectSubId = null) {
        const subSelect = document.getElementById("edit-prod-subcategory");
        const category = (currentData.categories || []).find(c => String(c.id) === String(selectedCatId));
        const subcats = category ? (category.subcategories || []).filter(s => s.id !== "all") : [];

        if (subcats.length === 0) {
            subSelect.innerHTML = `<option value="all">Nessuna Sottocategoria (ICE)</option>`;
            subSelect.value = "all";
            subSelect.disabled = true;
        } else {
            subSelect.disabled = false;
            subSelect.innerHTML = subcats.map(s => `
                <option value="${s.id}" ${s.id === preselectSubId ? 'selected' : ''}>${s.name}</option>
            `).join("");

            if (!preselectSubId && subcats.length > 0) {
                subSelect.value = subcats[0].id;
            }
        }
    };

    // Strains Tags
    window.addStrainTag = function() {
        const input = document.getElementById("strain-input");
        const val = (input.value || "").trim();
        if (val && !modalStrains.includes(val)) {
            modalStrains.push(val);
            input.value = "";
            renderModalStrainsTags();
        }
    };

    window.removeStrainTag = function(idx) {
        modalStrains.splice(idx, 1);
        renderModalStrainsTags();
    };

    function renderModalStrainsTags() {
        const cont = document.getElementById("strains-tags-container");
        cont.innerHTML = modalStrains.map((st, i) => `
            <span class="admin-strain-tag" style="background: rgba(224, 180, 107, 0.15); color: #fff; padding: 4px 9px; display: inline-flex; align-items: center; gap: 6px;">
                ${st}
                <button type="button" onclick="removeStrainTag(${i})" style="background:none; border:none; color:var(--accent); cursor:pointer; font-weight:bold;">✕</button>
            </span>
        `).join("");
    }

    function escapeHtml(str) {
        if (!str) return "";
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    // Sincronizza sempre i formati e i prezzi direttamente dai campi di input visibili nel DOM
    function syncPricingTiersFromDOM() {
        const cont = document.getElementById("pricing-tiers-container");
        if (!cont) return;
        const rows = cont.querySelectorAll(".tier-row");
        if (!rows || rows.length === 0) return;

        const freshTiers = [];
        rows.forEach(row => {
            const qtyInput = row.querySelector(".tier-qty-input") || row.querySelectorAll("input")[0];
            const priceInput = row.querySelector(".tier-price-input") || row.querySelectorAll("input")[1];
            const qty = qtyInput ? qtyInput.value.trim() : "";
            const price = priceInput ? priceInput.value.trim() : "";
            freshTiers.push({ qty, price });
        });

        if (freshTiers.length > 0) {
            modalPricingTiers = freshTiers;
            window.modalPricingTiers = modalPricingTiers;
        }
    }

    // Aggiornamento in tempo reale di un singolo campo listino prezzi
    window.updatePricingTier = function(idx, field, val) {
        if (!modalPricingTiers[idx]) {
            modalPricingTiers[idx] = { qty: "", price: "" };
        }
        modalPricingTiers[idx][field] = val;
        window.modalPricingTiers = modalPricingTiers;
    };
    window.modalPricingTiers = modalPricingTiers;

    // Listino Prezzi & Formati
    window.applyPricingPreset = function(type) {
        if (type === "flower") {
            modalPricingTiers = [
                { qty: "3.5g", price: "100€" },
                { qty: "7g", price: "200€" },
                { qty: "14g", price: "350€" },
                { qty: "28g (1 oz)", price: "650€" }
            ];
        } else if (type === "hash") {
            modalPricingTiers = [
                { qty: "10g", price: "150€" },
                { qty: "25g", price: "300€" },
                { qty: "50g", price: "550€" },
                { qty: "100g", price: "1050€" },
                { qty: "1000g (1 Kg)", price: "9500€" }
            ];
        } else if (type === "spain") {
            modalPricingTiers = [
                { qty: "10g", price: "100€" },
                { qty: "25g", price: "200€" },
                { qty: "50g", price: "350€" },
                { qty: "100g", price: "600€" },
                { qty: "1000g (1 Kg)", price: "4800€" }
            ];
        } else if (type === "pieces") {
            modalPricingTiers = [
                { qty: "1 pz", price: "75€" },
                { qty: "5 pz", price: "350€" },
                { qty: "10 pz", price: "600€" },
                { qty: "25 pz", price: "1375€" }
            ];
        }
        window.modalPricingTiers = modalPricingTiers;
        renderModalPricingTiers();
    };

    window.addPricingTierRow = function(qty = "", price = "") {
        syncPricingTiersFromDOM();
        modalPricingTiers.push({ qty, price });
        window.modalPricingTiers = modalPricingTiers;
        renderModalPricingTiers();
    };

    window.removePricingTierRow = function(idx) {
        syncPricingTiersFromDOM();
        modalPricingTiers.splice(idx, 1);
        if (modalPricingTiers.length === 0) {
            modalPricingTiers = [{ qty: "", price: "" }];
        }
        window.modalPricingTiers = modalPricingTiers;
        renderModalPricingTiers();
    };

    function renderModalPricingTiers() {
        const cont = document.getElementById("pricing-tiers-container");
        if (!cont) return;
        if (!modalPricingTiers || modalPricingTiers.length === 0) {
            modalPricingTiers = [{ qty: "", price: "" }];
        }
        window.modalPricingTiers = modalPricingTiers;

        cont.innerHTML = modalPricingTiers.map((tier, i) => `
            <div class="tier-row" data-tier-index="${i}">
                <input type="text" class="form-input tier-qty-input" placeholder="Formato (es. 3.5g, 100g)" value="${escapeHtml(tier.qty || '')}" oninput="updatePricingTier(${i}, 'qty', this.value)" onchange="updatePricingTier(${i}, 'qty', this.value)">
                <input type="text" class="form-input tier-price-input" placeholder="Prezzo (es. 100€)" value="${escapeHtml(tier.price || '')}" oninput="updatePricingTier(${i}, 'price', this.value)" onchange="updatePricingTier(${i}, 'price', this.value)">
                <button type="button" class="btn-icon-sm delete-subcat" title="Rimuovi riga" onclick="removePricingTierRow(${i})">🗑️</button>
            </div>
        `).join("");
    }

    // Media & Immagini
    window.addMediaFromUrl = function() {
        const input = document.getElementById("media-url-input");
        const url = (input.value || "").trim();
        if (url) {
            modalMediaFiles.push({ type: "image", url });
            input.value = "";
            renderModalMediaPreviews();
        }
    };

    window.handleLocalImageUpload = function(event) {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            const dataUrl = e.target.result;
            modalMediaFiles.push({ type: "image", url: dataUrl });
            renderModalMediaPreviews();
            showToast("📸 Immagine caricata!");
        };
        reader.readAsDataURL(file);
    };

    window.removeMediaItem = function(idx) {
        modalMediaFiles.splice(idx, 1);
        renderModalMediaPreviews();
    };

    function renderModalMediaPreviews() {
        const cont = document.getElementById("media-previews-container");
        if (modalMediaFiles.length === 0) {
            cont.innerHTML = `<span style="font-size:0.8rem; color:var(--text-muted);">Nessuna immagine aggiunta (verrà usato il logo predefinito).</span>`;
            return;
        }

        cont.innerHTML = modalMediaFiles.map((m, i) => `
            <div style="position: relative; width: 70px; height: 70px; border-radius: var(--radius-sm); overflow: hidden; border: 1px solid var(--border-gold);">
                <img src="${m.url}" style="width:100%; height:100%; object-fit: cover;" onerror="this.src='assets/logo-badge.png'">
                <button type="button" onclick="removeMediaItem(${i})" style="position: absolute; top: 2px; right: 2px; background: rgba(0,0,0,0.85); color: #fff; border: none; width: 20px; height: 20px; border-radius: 50%; cursor: pointer; font-size: 11px;">✕</button>
            </div>
        `).join("");
    }

    // Salvataggio Prodotto
    window.handleSaveProduct = async function() {
        // 1. Sincronizza sempre i prezzi direttamente dai campi di input visibili nel DOM!
        syncPricingTiersFromDOM();

        // 2. Se l'utente ha scritto una varietà e ha dimenticato di premere "+ Aggiungi"
        const strainInput = document.getElementById("strain-input");
        const leftoverStrain = (strainInput ? strainInput.value : "").trim();
        if (leftoverStrain && !modalStrains.includes(leftoverStrain)) {
            modalStrains.push(leftoverStrain);
            if (strainInput) strainInput.value = "";
        }

        const idVal = document.getElementById("edit-prod-id").value;
        const nameVal = document.getElementById("edit-prod-name").value.trim();
        const catIdVal = Number(document.getElementById("edit-prod-category").value);
        const subIdVal = document.getElementById("edit-prod-subcategory").value;
        const descVal = document.getElementById("edit-prod-desc").value.trim();
        const isSoldOut = document.getElementById("status-soldout").checked;

        if (!nameVal) {
            alert("Inserisci il nome del prodotto.");
            return;
        }

        const category = currentData.categories.find(c => c.id === catIdVal);
        const catName = category ? category.name : "";
        const subcat = category ? (category.subcategories || []).find(s => s.id === subIdVal) : null;
        const subcatName = subcat ? subcat.name : subIdVal;

        // Pulisci listino prezzi
        const validTiers = modalPricingTiers.filter(t => (t.qty && t.qty.trim()) || (t.price && t.price.trim()));
        if (validTiers.length === 0) {
            alert("Inserisci almeno un formato e prezzo nel listino.");
            return;
        }

        const validMedia = modalMediaFiles.length > 0 
            ? modalMediaFiles 
            : [{ type: "image", url: "assets/logo-badge.png" }];

        const prodObj = {
            id: idVal ? Number(idVal) : Date.now(),
            name: nameVal,
            category_id: catIdVal,
            category_name: catName,
            subcategory_id: subIdVal,
            subcategory_name: subcatName,
            description: descVal,
            status: isSoldOut ? "soldout" : "available",
            flavours_strains: modalStrains,
            pricing_tiers: validTiers,
            media_files: validMedia
        };

        if (idVal) {
            // Aggiorna esistente
            const idx = currentData.products.findIndex(p => p.id === Number(idVal));
            if (idx !== -1) {
                currentData.products[idx] = prodObj;
            }
        } else {
            // Nuovo
            currentData.products.unshift(prodObj);
        }

        // Mantieni sempre i prodotti in ordine dal piu costoso al meno costoso
        sortCurrentProducts();

        closeProductModal();
        renderProductsList();
        showToast(`✅ Prodotto "${nameVal}" salvato con successo!`);
        await saveAllChanges(false);
    };


    // --- 6. Gestione Categorie & Sottocategorie (Tab 2) ---
    function renderCategoriesManager() {
        const categories = (currentData.categories || []).filter(c => c.kind !== "text");
        const navList = document.getElementById("cat-nav-list");

        // Assicurati che activeCategoryTabId sia valido
        if (!categories.some(c => c.id === activeCategoryTabId) && categories.length > 0) {
            activeCategoryTabId = categories[0].id;
        }
        window.__activeCategoryTabId = activeCategoryTabId;

        navList.innerHTML = categories.map(c => `
            <button type="button" class="cat-nav-btn ${c.id === activeCategoryTabId ? 'active' : ''}" onclick="selectCategoryTab(${c.id})">
                <span>${c.icon || '📁'} ${c.name}</span>
                <span class="subcat-count-badge">${(c.subcategories || []).length}</span>
            </button>
        `).join("");

        const currentCat = categories.find(c => c.id === activeCategoryTabId);
        if (!currentCat) return;

        document.getElementById("active-cat-title").textContent = currentCat.name;
        document.getElementById("active-cat-slug").textContent = `slug: ${currentCat.slug || currentCat.name.toLowerCase().replace(/ /g, '-')}`;
        document.getElementById("active-cat-count").textContent = `${(currentCat.subcategories || []).length} Sottocategorie`;

        const subContainer = document.getElementById("subcategories-container");
        const subcats = currentCat.subcategories || [];

        if (subcats.length === 0) {
            subContainer.innerHTML = `<p style="font-size:0.85rem; color:var(--text-muted); padding:1rem; background:var(--bg-input); border-radius:var(--radius-md);">Nessuna sottocategoria presente in questa categoria. Aggiungine una qui sotto!</p>`;
            return;
        }

        subContainer.innerHTML = subcats.map(s => {
            // Calcola quanti prodotti appartengono a questa sottocategoria
            const count = (currentData.products || []).filter(p => p.category_id === currentCat.id && p.subcategory_id === s.id).length;

            return `
                <div class="subcategory-item-row" data-sub-id="${s.id}">
                    <div class="subcat-info-col">
                        <span class="subcat-name-text">${s.name}</span>
                        <span class="subcat-id-badge">${s.id}</span>
                        <span class="subcat-count-badge">${count} prodotti</span>
                    </div>
                    <div class="subcat-actions">
                        <button type="button" class="btn-icon-sm" title="Rinomina sottocategoria" onclick="renameSubcategory('${s.id}')">✏️</button>
                        ${s.id !== 'all' ? `
                            <button type="button" class="btn-icon-sm delete-subcat" title="Elimina sottocategoria" onclick="deleteSubcategory('${s.id}')">🗑️</button>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join("");
    }

    window.selectCategoryTab = function(catId) {
        activeCategoryTabId = Number(catId);
        window.__activeCategoryTabId = activeCategoryTabId;
        renderCategoriesManager();
    };

    window.handleAddSubcategory = function() {
        const input = document.getElementById("new-subcat-name-input");
        const name = (input.value || "").trim();
        if (!name) return;

        const currentCat = (currentData.categories || []).find(c => c.id === activeCategoryTabId);
        if (!currentCat) return;

        if (!currentCat.subcategories) currentCat.subcategories = [];

        // Genera ID slug automatico
        const slug = name.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        if (currentCat.subcategories.some(s => s.id === slug)) {
            alert(`Esiste già una sottocategoria con ID "${slug}". Scegli un nome diverso.`);
            return;
        }

        currentCat.subcategories.push({ id: slug, name });
        input.value = "";

        saveAllChanges(false);
        renderCategoriesManager();
        showToast(`📁 Sottocategoria "${name}" creata con successo!`);
    };

    window.renameSubcategory = function(subcatId) {
        const currentCat = (currentData.categories || []).find(c => c.id === activeCategoryTabId);
        if (!currentCat) return;

        const sub = (currentCat.subcategories || []).find(s => s.id === subcatId);
        if (!sub) return;

        const newName = prompt(`Inserisci il nuovo nome per la sottocategoria "${sub.name}":`, sub.name);
        if (newName && newName.trim() && newName.trim() !== sub.name) {
            sub.name = newName.trim();

            // Aggiorna anche nei prodotti corrispondenti
            (currentData.products || []).forEach(p => {
                if (p.category_id === currentCat.id && p.subcategory_id === subcatId) {
                    p.subcategory_name = sub.name;
                }
            });

            saveAllChanges(false);
            renderCategoriesManager();
            showToast(`✏️ Sottocategoria rinominata in "${sub.name}".`);
        }
    };

    window.deleteSubcategory = function(subcatId) {
        const currentCat = (currentData.categories || []).find(c => c.id === activeCategoryTabId);
        if (!currentCat) return;

        const sub = (currentCat.subcategories || []).find(s => s.id === subcatId);
        if (!sub) return;

        const linkedProducts = (currentData.products || []).filter(p => p.category_id === currentCat.id && p.subcategory_id === subcatId);

        let confirmMsg = `Vuoi eliminare la sottocategoria "${sub.name}"?`;
        if (linkedProducts.length > 0) {
            confirmMsg = `Attenzione: ci sono ${linkedProducts.length} prodotti in questa sottocategoria!\n\nSe procedi, verranno riassegnati alla categoria principale "${currentCat.name}". Continuare?`;
        }

        if (confirm(confirmMsg)) {
            // Riassegna prodotti alla prima sottocategoria disponibile o "all"
            const fallbackSub = (currentCat.subcategories.find(s => s.id === "all") || currentCat.subcategories[0]);
            const fallbackId = fallbackSub ? fallbackSub.id : "all";
            const fallbackName = fallbackSub ? fallbackSub.name : currentCat.name;

            linkedProducts.forEach(p => {
                p.subcategory_id = fallbackId;
                p.subcategory_name = fallbackName;
            });

            currentCat.subcategories = currentCat.subcategories.filter(s => s.id !== subcatId);

            saveAllChanges(false);
            renderCategoriesManager();
            showToast(`🗑️ Sottocategoria "${sub.name}" eliminata.`);
        }
    };


    // --- 6b. Gestione Macro Categorie ---

    function makeSlug(name) {
        return name.toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }

    window.handleAddCategory = function() {
        const iconInput = document.getElementById("new-macrocat-icon-input");
        const nameInput = document.getElementById("new-macrocat-name-input");
        const name = (nameInput ? nameInput.value : "").trim().toUpperCase();
        const icon = (iconInput ? iconInput.value : "").trim();
        if (!name) return;

        const slug = makeSlug(name);
        if ((currentData.categories || []).some(c => c.slug === slug || c.name.toUpperCase() === name)) {
            alert("Esiste Ã  giÃ  una macro categoria con questo nome. Scegli un nome diverso.");
            return;
        }

        const maxId = (currentData.categories || []).reduce(
            (m, c) => Math.max(m, typeof c.id === "number" ? c.id : 0), 0);
        const newCat = {
            id: maxId + 1,
            name,
            slug,
            icon: icon || "ð",
            kind: "products",
            subcategories: [{ id: "all", name: "All " + name }]
        };

        if (!currentData.categories) currentData.categories = [];
        const infoIdx = currentData.categories.findIndex(c => c.kind === "text");
        if (infoIdx !== -1) {
            currentData.categories.splice(infoIdx, 0, newCat);
        } else {
            currentData.categories.push(newCat);
        }

        if (iconInput) iconInput.value = "";
        if (nameInput) nameInput.value = "";

        activeCategoryTabId = newCat.id;
        window.__activeCategoryTabId = newCat.id;
        saveAllChanges(false);
        renderCategoriesManager();
        renderProductsList();
        showToast("â Macro categoria \"" + name + "\" creata con successo!");
    };

    window.editCategory = function(catId) {
        const cat = (currentData.categories || []).find(c => c.id === catId);
        if (!cat || cat.kind === "text") return;

        const newName = prompt("Nuovo nome per la macro categoria \"" + cat.name + "\":", cat.name);
        if (!newName || !newName.trim()) return;
        const trimmedName = newName.trim().toUpperCase();

        const newIconRaw = prompt("Nuova icona emoji per \"" + trimmedName + "\" (lascia vuoto per mantenere \"" + (cat.icon || "ð") + "\"):", cat.icon || "");
        const newIcon = (newIconRaw !== null && newIconRaw.trim()) ? newIconRaw.trim() : (cat.icon || "ð");

        const oldName = cat.name;
        cat.name = trimmedName;
        cat.icon = newIcon;
        cat.slug = makeSlug(trimmedName);

        // Aggiorna sottocategoria "All <NOME>" se presente
        const allSub = (cat.subcategories || []).find(s => s.id === "all" || s.name === "All " + oldName);
        if (allSub) allSub.name = "All " + trimmedName;

        // Cascata: aggiorna category_name in tutti i prodotti collegati
        (currentData.products || []).forEach(p => {
            if (p.category_id === cat.id) p.category_name = trimmedName;
        });

        saveAllChanges(false);
        renderCategoriesManager();
        renderProductsList();
        showToast("âï¸ Macro categoria rinominata in \"" + trimmedName + "\".");
    };

    window.deleteCategory = function(catId) {
        const cat = (currentData.categories || []).find(c => c.id === catId);
        if (!cat || cat.kind === "text") {
            alert("Questa categoria non puÃ² essere eliminata.");
            return;
        }
        const productCats = (currentData.categories || []).filter(c => c.kind !== "text");
        if (productCats.length <= 1) {
            alert("Non puoi eliminare l'ultima macro categoria. Crea prima un'altra categoria.");
            return;
        }
        const linked = (currentData.products || []).filter(p => p.category_id === cat.id);
        const otherCats = productCats.filter(c => c.id !== cat.id);
        const targetCat = otherCats[0];
        let confirmMsg = "Eliminare la macro categoria \"" + cat.name + "\"?";
        if (linked.length > 0) {
            confirmMsg = "â ï¸ Attenzione: " + linked.length + " prodotti appartengono a \"" + cat.name + "\".

Se procedi, verranno spostati in \"" + targetCat.name + "\". Continuare?";
        }
        if (!confirm(confirmMsg)) return;

        if (linked.length > 0) {
            const targetAllSub = (targetCat.subcategories || []).find(s => s.id === "all") || (targetCat.subcategories || [])[0];
            linked.forEach(p => {
                p.category_id = targetCat.id;
                p.category_name = targetCat.name;
                if (targetAllSub) {
                    p.subcategory_id = targetAllSub.id;
                    p.subcategory_name = targetAllSub.name;
                }
            });
        }

        currentData.categories = currentData.categories.filter(c => c.id !== cat.id);
        activeCategoryTabId = null;
        window.__activeCategoryTabId = null;

        saveAllChanges(false);
        renderCategoriesManager();
        renderProductsList();
        showToast("ðï¸ Macro categoria \"" + cat.name + "\" eliminata.");
    };

    // --- 7. Info & Spedizioni (Tab 3) ---
    function loadInfoText() {
        const infoCat = (currentData.categories || []).find(c => c.kind === "text" || c.slug === "info");
        const textarea = document.getElementById("info-text-input");
        if (infoCat && textarea) {
            textarea.value = infoCat.text_content || "";
        }
    }

    window.saveInfoText = function() {
        const infoCat = (currentData.categories || []).find(c => c.kind === "text" || c.slug === "info");
        const textarea = document.getElementById("info-text-input");
        if (infoCat && textarea) {
            infoCat.text_content = textarea.value;
            saveAllChanges(true);
            showToast("ℹ️ Testo Info & Spedizioni aggiornato!");
        }
    };

    window.resetInfoText = function() {
        if (confirm("Vuoi ripristinare il testo originale di default per la sezione Info?")) {
            const origCat = (window.TSF_INITIAL_DATA.categories || []).find(c => c.kind === "text" || c.slug === "info");
            if (origCat) {
                document.getElementById("info-text-input").value = origCat.text_content || "";
                saveInfoText();
            }
        }
    };


    // --- 8. Sincronizzazione Vercel Blob in Tempo Reale ---
    function updateCloudIndicator(state, label) {
        const pill = document.getElementById("cloud-sync-pill");
        const text = document.getElementById("cloud-status-text");
        if (!pill) return;
        pill.className = "cloud-sync-pill " + state;
        if (text && label) text.textContent = label;
    }

    async function syncToVercelBlob(data) {
        updateCloudIndicator("syncing", "Salvataggio Cloud...");
        try {
            const res = await fetch("/api/menu", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    data: data,
                    pin: getStoredPin()
                })
            });

            if (res.ok) {
                const json = await res.json();
                updateCloudIndicator("online", "Vercel Blob Live");
                return { success: true, message: json.message };
            } else {
                const err = await res.json().catch(() => ({}));
                updateCloudIndicator("offline", "Vercel Blob Sync");
                return { success: false, error: err.error || ("HTTP " + res.status) };
            }
        } catch(e) {
            updateCloudIndicator("offline", "Vercel Blob Sync");
            return { success: false, error: e.message };
        }
    }

    // --- 9. Toast Notifiche ---
    function showToast(message) {
        const toast = document.getElementById("admin-toast");
        const msgEl = document.getElementById("toast-message");
        if (!toast || !msgEl) return;

        msgEl.textContent = message;
        toast.classList.add("show");

        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => {
            toast.classList.remove("show");
        }, 3200);
    }


    // --- 8b. Caricamento & Ripristino Dati Cloud ---
    async function fetchLatestFromCloud(showFeedback = false) {
        if (!window.location.protocol.startsWith("http")) {
            return false;
        }

        updateCloudIndicator("syncing", "Connessione Cloud...");
        try {
            const res = await fetch("/api/menu?t=" + Date.now(), { cache: "no-store" });
            if (res.ok) {
                const cloudData = await res.json();
                if (cloudData && Array.isArray(cloudData.products) && Array.isArray(cloudData.categories)) {
                    currentData = cloudData;
                    sortCurrentProducts();
                    try {
                        localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(currentData));
                    } catch(e) {}
                    renderProductsList();
                    renderCategoriesManager();
                    updateCloudIndicator("online", "Vercel Blob Live");
                    if (showFeedback) {
                        showToast(`☁️ Sincronizzato dal Cloud: ${currentData.products.length} prodotti`);
                    }
                    return true;
                }
            }
            updateCloudIndicator("offline", "Vercel Blob Offline");
            if (showFeedback) {
                showToast("⚠️ Impossibile caricare dal Cloud. Usati dati locali.");
            }
        } catch(e) {
            console.warn("fetchLatestFromCloud error:", e);
            updateCloudIndicator("offline", "Vercel Blob Offline");
            if (showFeedback) {
                showToast("⚠️ Connessione Cloud: " + e.message);
            }
        }
        return false;
    }
    window.fetchLatestFromCloud = fetchLatestFromCloud;

    window.restoreFactoryData = async function() {
        if (!confirm("Attenzione: vuoi davvero ripristinare il menu originale di fabbrica (16 prodotti e 4 categorie)? Tutte le modifiche locali verranno reimpostate.")) {
            return;
        }
        if (window.TSF_INITIAL_DATA) {
            currentData = JSON.parse(JSON.stringify(window.TSF_INITIAL_DATA));
            localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(currentData));
            renderProductsList();
            renderCategoriesManager();
            showToast("🔄 Menu originale ricaricato! Salvataggio sul Cloud...");
            await saveAllChanges(true);
        }
    };

    // --- 10. Inizializzazione ---
    async function init() {
        checkAuth();
        loadData();
        renderProductsList();

        // Se online su HTTP/HTTPS, sincronizza automaticamente l'ultimo stato da Vercel Blob
        if (window.location.protocol.startsWith("http")) {
            await fetchLatestFromCloud(false);
        }
    }

    document.addEventListener("DOMContentLoaded", init);
})();
