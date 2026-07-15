// Sorbe — Facebook/Instagram Product Catalog Feed
// Edge Function that generates an XML product feed for Meta Commerce Manager

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function xmlEscape(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: products } = await supabase
      .from('products')
      .select('id, nombre, descripcion, precio, image_urls, in_stock')
      .eq('in_stock', true);

    const url = req.headers.get('host') || 'localhost:5173';
    const siteUrl = `https://${url}`;
    const items = (products || []).map((p: any) => {
      const price = `${p.precio.toFixed(2)} USD`;
      const availability = p.in_stock ? 'in stock' : 'out of stock';
      const link = `${siteUrl}/products/${p.id}`;
      const image = p.image_urls?.[0] || `${siteUrl}/placeholder.svg`;

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

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Sorbe — Helados Artesanales</title>
    <link>${xmlEscape(siteUrl)}</link>
    <description>Catálogo de helados artesanales Sorbe</description>
${items.join('\n')}
  </channel>
</rss>`;

    return new Response(xml, {
      headers: { ...corsHeaders, 'Content-Type': 'application/xml' },
    });
  } catch (err) {
    return new Response('Error generating feed', { status: 500, headers: corsHeaders });
  }
});
