import { put, list } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import '../js/utils/price-sort.js';

function normalizeMenuOrder(menuData) {
  if (menuData && Array.isArray(menuData.products) && globalThis.TSFPriceSort) {
    globalThis.TSFPriceSort.sortProductsByPriceDesc(menuData.products);
  }
  return menuData;
}

export default async function handler(req, res) {
  // CORS & Anti-Cache Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Restituisce il menu corrente da Vercel Blob (o data.json di fallback)
  if (req.method === 'GET') {
    try {
      if (process.env.BLOB_READ_WRITE_TOKEN) {
        const { blobs } = await list({ prefix: 'tsfbcn_menu.json' });
        if (blobs && blobs.length > 0) {
          const blobUrl = blobs[0].url;
          const resp = await fetch(blobUrl, { cache: 'no-store' });
          if (resp.ok) {
            const data = normalizeMenuOrder(await resp.json());
            return res.status(200).json(data);
          }
        }
      }
    } catch (err) {
      console.warn('Vercel Blob GET error, using fallback:', err.message);
    }

    // Fallback: Lettura di data.json incluso nel repository
    try {
      const localPath = path.join(process.cwd(), 'data.json');
      if (fs.existsSync(localPath)) {
        const localData = normalizeMenuOrder(JSON.parse(fs.readFileSync(localPath, 'utf8')));
        return res.status(200).json(localData);
      }
    } catch (err) {
      console.error('Local fallback data.json error:', err.message);
    }

    return res.status(500).json({ error: 'Nessun dato menu disponibile' });
  }

  // POST: Salva il menu aggiornato su Vercel Blob in tempo reale
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const { data } = body;

      if (!data || !Array.isArray(data.products) || !Array.isArray(data.categories)) {
        return res.status(400).json({ error: 'Struttura dati non valida' });
      }

      // Ordina sempre tutti i prodotti dal piu costoso al meno costoso prima di salvare
      normalizeMenuOrder(data);

      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return res.status(500).json({
          error: 'BLOB_READ_WRITE_TOKEN non configurato su Vercel. Crea un Blob Store nella tab Storage del progetto Vercel.'
        });
      }

      // Salva il file tsfbcn_menu.json su Vercel Blob sovrascrivendo la versione precedente
      const blob = await put('tsfbcn_menu.json', JSON.stringify(data, null, 2), {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
      });

      return res.status(200).json({
        success: true,
        message: 'Menu aggiornato in tempo reale su Vercel Blob!',
        url: blob.url,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      console.error('Vercel Blob POST error:', err);
      return res.status(500).json({ error: err.message || 'Errore salvataggio Vercel Blob' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
