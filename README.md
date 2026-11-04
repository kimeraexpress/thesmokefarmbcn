# 🌿 The Smoke Farm BCN - Sito Vetrina & Catalogo Digitale

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kimeraexpress/tsf-bcn-vetrina)

Vetrina luxury e catalogo digitale ultra-rapido per **The Smoke Farm BCN** (Barcellona 🇪🇸), sviluppato secondo l'architettura editoriale del sito di riferimento (`packzbcn.eth.limo`), con palette nero puro `#000000` e accenti in oro cromato `#e0b46b`.

---

## 📱 Caratteristiche Principali

- **Mini Video Intro:** Video animato in apertura con visualizzazione del logo e transizione fluida verso la schermata principale.
- **Landing Page Linktree-style Luxury (`index.html`):**
  - Selettore lingua istantaneo: **Italiano (IT)**, **Español (ES)**, **English (EN)**.
  - Pulsanti principali:
    - `MENU` (collegato a `pages/catalogo.html`)
    - `CANALE TELEGRAM` (drop live, video macro e annunci)
    - `SITO WEB` (portale ufficiale)
    - `INSTAGRAM` (profilo ufficiale)
- **Catalogo Prodotti Editoriale Senza Foto (`pages/catalogo.html`):**
  - Formattazione a tabellone testuale continuo per una lettura immediata e caricamento ultra-veloce.
  - Righe di prodotto: `NOME - Varietà/Terpeni - Quantità & Prezzi`.
  - Pulsante integrato `💬 Ordina` su ciascun prodotto con messaggio precompilato per Telegram.
- **Macrocategorie & Sottocategorie Dedicate:**
  - **ASH:** `STATIC`, `FRESH FROZEN`, `DRY SIFT`
  - **WEED:** `CALI SPAIN`, `CALI USA`
  - **ICE:** Categoria diretta a livello singolo (senza sottocategorie)
  - **INFO ℹ:** Informazioni su spedizioni stealth, meet-up a Barcellona, pagamenti crypto e regole d'ordine.
- **Pannello di Amministrazione Riservato (`admin.html`):**
  - Accesso protetto da PIN (predefinito: `tsfbcn2026`).
  - Gestione autonoma completa dei prodotti (aggiunta, modifica, eliminazione, stock).
  - Gestore dedicato di categorie e sottocategorie.
  - Editor del testo di spedizioni & info.
  - Strumenti di sincronizzazione e backup (`data.json` e `menu-data.js`).

---

## 🚀 Deploy su Vercel

1. Fai il push di questo repository su GitHub (`kimeraexpress/tsf-bcn-vetrina`).
2. Accedi a [Vercel](https://vercel.com) e importa il repository `tsf-bcn-vetrina`.
3. Clicca **Deploy** per avere il sito immediatamente online con dominio HTTPS (es. `tsf-bcn-vetrina.vercel.app`).
