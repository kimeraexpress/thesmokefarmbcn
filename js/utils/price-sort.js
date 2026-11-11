/**
 * The Smoke Farm BCN - Shared Price Sorting Utilities
 * Ordina sempre i prodotti dal piu costoso al meno costoso (per prezzo unitario mediano / valore listino).
 * Compatibile sia con browser (<script>) sia con Node ESM (import).
 */
(function(root) {
    'use strict';

    function parseLocalizedNumber(str) {
        if (str == null) return 0;
        const raw = String(str).trim();
        if (!raw) return 0;

        const match = raw.match(/\d[\d.,]*/);
        if (!match) return 0;

        let s = match[0].replace(/[.,]+$/, "");
        if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) {
            s = s.replace(/\./g, "").replace(",", ".");
        } else if (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(s)) {
            s = s.replace(/,/g, "");
        } else if (/^\d+\.\d{3}$/.test(s)) {
            s = s.replace(".", "");
        } else {
            s = s.replace(",", ".");
        }

        const num = parseFloat(s);
        return Number.isFinite(num) ? num : 0;
    }

    function parseQuantityGrams(qtyStr) {
        if (qtyStr == null) return null;
        const s = String(qtyStr).toLowerCase().trim();
        if (!s) return null;

        // Grammi espliciti (es. "50g", "3.5g", "1000g (1 Kg)", "2 Jars (4g)")
        const gMatch = s.match(/(\d[\d.,]*)\s*g(?:\b|\s|\)|$)/);
        if (gMatch && !/\d[\d.,]*\s*kg/i.test(gMatch[0])) {
            const val = parseLocalizedNumber(gMatch[1]);
            if (val > 0) return val;
        }

        // Kilogrammi (es. "1kg", "3 kg", "10kg")
        const kgMatch = s.match(/(\d[\d.,]*)\s*kg(?:\b|\s|\)|$)/);
        if (kgMatch) {
            const val = parseLocalizedNumber(kgMatch[1]);
            if (val > 0) return val * 1000;
        }

        // Once (es. "1 oz")
        const ozMatch = s.match(/(\d[\d.,]*)\s*oz(?:\b|\s|\)|$)/);
        if (ozMatch) {
            const val = parseLocalizedNumber(ozMatch[1]);
            if (val > 0) return val * 28.35;
        }

        // Jars senza indicazione grammi esplicita (standard 2g per jar)
        const jarMatch = s.match(/(\d[\d.,]*)\s*jars?(?:\b|\s|\)|$)/);
        if (jarMatch) {
            const val = parseLocalizedNumber(jarMatch[1]);
            if (val > 0) return val * 2;
        }

        // Pezzi / Unita (es. "1 pz", "5 pz")
        const unitMatch = s.match(/(\d[\d.,]*)\s*(?:pz|pcs|pc|pezzi|bars?|packs?)(?:\b|\s|\)|$)/);
        if (unitMatch) {
            const val = parseLocalizedNumber(unitMatch[1]);
            if (val > 0) return val;
        }

        return null;
    }

    function getProductPriceScore(product) {
        const tiers = (product && Array.isArray(product.pricing_tiers)) ? product.pricing_tiers : [];
        if (tiers.length === 0) {
            return { medianUnit: 0, avgUnit: 0, maxPrice: 0 };
        }

        const unitPrices = [];
        let maxPrice = 0;

        for (let i = 0; i < tiers.length; i++) {
            const tier = tiers[i] || {};
            const price = parseLocalizedNumber(tier.price);
            if (price > maxPrice) maxPrice = price;

            const grams = parseQuantityGrams(tier.qty);
            if (grams && grams > 0 && price > 0) {
                unitPrices.push(price / grams);
            }
        }

        if (unitPrices.length > 0) {
            unitPrices.sort(function(a, b) { return a - b; });
            const mid = Math.floor(unitPrices.length / 2);
            const medianUnit = unitPrices.length % 2 !== 0
                ? unitPrices[mid]
                : (unitPrices[mid - 1] + unitPrices[mid]) / 2;
            const avgUnit = unitPrices.reduce(function(acc, v) { return acc + v; }, 0) / unitPrices.length;
            return { medianUnit: medianUnit, avgUnit: avgUnit, maxPrice: maxPrice };
        }

        return { medianUnit: maxPrice, avgUnit: maxPrice, maxPrice: maxPrice };
    }

    function compareProductsByPriceDesc(a, b) {
        const sa = getProductPriceScore(a);
        const sb = getProductPriceScore(b);
        if (Math.abs(sb.medianUnit - sa.medianUnit) > 1e-6) {
            return sb.medianUnit - sa.medianUnit;
        }
        if (Math.abs(sb.avgUnit - sa.avgUnit) > 1e-6) {
            return sb.avgUnit - sa.avgUnit;
        }
        if (Math.abs(sb.maxPrice - sa.maxPrice) > 1e-6) {
            return sb.maxPrice - sa.maxPrice;
        }
        return String((a && a.name) || "").localeCompare(String((b && b.name) || ""));
    }

    function sortProductsByPriceDesc(products) {
        if (!Array.isArray(products)) return [];
        return products.sort(compareProductsByPriceDesc);
    }

    root.TSFPriceSort = {
        parsePriceValue: parseLocalizedNumber,
        parseQuantityGrams: parseQuantityGrams,
        getProductPriceScore: getProductPriceScore,
        compareProductsByPriceDesc: compareProductsByPriceDesc,
        sortProductsByPriceDesc: sortProductsByPriceDesc
    };
})(typeof window !== 'undefined' ? window : globalThis);
