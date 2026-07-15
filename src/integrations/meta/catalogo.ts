// Facebook/Instagram Product Catalog Feed Generator
// Creates XML feed compatible with Facebook Commerce Manager

import { supabase } from '@/integrations/supabase/client';

const SITE_URL = window.location.origin;

type FeedProduct = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  image_urls: string[];
  in_stock: boolean;
};

export async function generateFacebookFeed(): Promise<string> {
  const { data } = await supabase
    .from('products')
    .select('id, nombre, descripcion, precio, image_urls, in_stock')
    .eq('in_stock', true);

  const products = (data || []) as FeedProduct[];

  const items = products.map((p) => {
    const price = `${p.precio.toFixed(2)} USD`;
    const availability = p.in_stock ? 'in stock' : 'out of stock';
    const link = `${SITE_URL}/products/${p.id}`;
    const image = p.image_urls?.[0] || `${SITE_URL}/placeholder.svg`;

    return `  <item>
    <g:id>${xmlEscape(p.id)}</g:id>
    <g:title>${xmlEscape(p.nombre)}</g:title>
    <g:description>${xmlEscape(p.descripcion || p.nombre)}</g:description>
    <g:link>${xmlEscape(link)}</g:link>
    <g:image_link>${xmlEscape(image)}</g:image_link>
    <g:price>${xmlEscape(price)}</g:price>
    <g:availability>${availability}</g:availability>
    <g:condition>new</g:condition>
    <g:brand>Sorbe</g:brand>
    <g:google_product_category>Food, Beverages &amp; Tobacco &gt; Food Items &gt; Frozen Desserts</g:google_product_category>
  </item>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Sorbe — Helados Artesanales</title>
    <link>${xmlEscape(SITE_URL)}</link>
    <description>Catálogo de helados artesanales Sorbe</description>
${items.join('\n')}
  </channel>
</rss>`;
}

function xmlEscape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Generate feed and download
export async function downloadFeed() {
  const xml = await generateFacebookFeed();
  const blob = new Blob([xml], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sorbe-product-feed.xml';
  a.click();
  URL.revokeObjectURL(url);
}
