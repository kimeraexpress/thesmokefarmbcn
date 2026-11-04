# 🌿 The Smoke Farm BCN - Sito Vetrina & Catalogo Digitale

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kimeraexpress/thesmokefarmbcn)

Vetrina luxury e catalogo digitale ultra-rapido per **The Smoke Farm BCN** (Barcellona 🇪🇸), sviluppato secondo l'architettura editoriale del sito di riferimento (`packzbcn.eth.limo`), con palette nero puro `#000000` e accenti in oro cromato `#e0b46b`.

---

## 📱 Caratteristiche Principali

- **Mini Video Intro:** Video animato in apertura con visualizzazione del logo e transizione fluida verso la schermata principale.
- **Landing Page Linktree-style Luxury (`index.html`):**
  - Selettore lingua istantaneo: **Italiano (IT)**, **Español (ES)**, **English (EN)**.
  - Pulsanti principali:
    - `MENU` (collegato a `pages/catalogo.html` o `/menu`)
    - `CANALE TELEGRAM` (drop live, video macro e annunci)
    - `SITO WEB` (portale ufficiale)
    - `INSTAGRAM` (profilo ufficiale)
- **Catalogo Prodotti Editoriale Senza Foto (`pages/catalogo.html` o `/menu`):**
  - Formattazione a tabellone testuale continuo per una lettura immediata e caricamento ultra-veloce.
  - Righe di prodotto: `NOME - Varietà/Terpeni - Quantità & Prezzi`.
  - Pulsante integrato `💬 Ordina` su ciascun prodotto con messaggio precompilato per Telegram.
- **Macrocategorie & Sottocategorie Dedicate:**
  - **ASH:** `STATIC`, `FRESH FROZEN`, `DRY SIFT`
  - **WEED:** `CALI SPAIN`, `CALI USA`
  - **ICE:** Categoria diretta a livello singolo (senza sottocategorie)
  - **INFO ℹ:** Informazioni su spedizioni stealth, meet-up a Barcellona, pagamenti crypto e regole d'ordine.
- **Pannello di Amministrazione Riservato (`admin.html` o `/admin`):**
  - Accesso protetto da PIN (predefinito: `tsfbcn2026`).
  - Gestione autonoma completa dei prodotti (aggiunta, modifica, eliminazione, stock).
  - Gestore dedicato di categorie e sottocategorie.
  - Editor del testo di spedizioni & info.
  - Strumenti di sincronizzazione e backup (`data.json` e `menu-data.js`).

---

## 🚀 Deploy su Vercel

1. Fai il push di questo repository su GitHub (`kimeraexpress/thesmokefarmbcn`).
2. Accedi a [Vercel](https://vercel.com) e importa il repository `thesmokefarmbcn`.
3. Il nome del progetto sarà automaticamente `thesmokefarmbcn`.
4. Clicca **Deploy** per avere il sito live all'indirizzo pubblico `https://thesmokefarmbcn.vercel.app` e il pannello admin all'indirizzo `https://thesmokefarmbcn.vercel.app/admin`.
