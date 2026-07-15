// Meta Pixel event helpers for purchase flow
// Import and call these from your components

import metaPixel from './pixel';

export const trackViewContent = (product: { nombre: string; id: string; precio: number }) => {
  metaPixel.viewContent({
    content_name: product.nombre,
    content_ids: [product.id],
    content_type: 'product',
    value: product.precio,
    currency: 'USD',
  });
};

export const trackAddToCart = (product: { nombre: string; id: string; precio: number; quantity?: number }) => {
  metaPixel.addToCart({
    content_name: product.nombre,
    content_ids: [product.id],
    value: product.precio * (product.quantity || 1),
    currency: 'USD',
  });
};

export const trackInitiateCheckout = (total: number, itemCount: number) => {
  metaPixel.initiateCheckout({
    value: total,
    currency: 'USD',
    num_items: itemCount,
  });
};

export const trackPurchase = (total: number, orderId: string) => {
  metaPixel.purchase({
    value: total,
    currency: 'USD',
    transaction_id: orderId,
  });
};

export const trackSearch = (query: string) => {
  metaPixel.search({ search_string: query });
};
