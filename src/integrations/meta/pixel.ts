// Meta Pixel — Client-side tracking for Sorbe
// Pixel ID is loaded from VITE_META_PIXEL_ID env var

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '';

type PixelEvent =
  | 'PageView'
  | 'ViewContent'
  | 'AddToCart'
  | 'InitiateCheckout'
  | 'Purchase'
  | 'Search'
  | 'ViewCategory';

type EventParams = Record<string, string | number | boolean | string[] | undefined>;

class MetaPixel {
  private initialized = false;

  init(pixelId?: string) {
    const id = pixelId || PIXEL_ID;
    if (!id || this.initialized) return;

    // Load FB pixel script
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${id}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);
    this.initialized = true;
  }

  track(event: PixelEvent, params?: EventParams) {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', event, params);
    }
  }

  trackCustom(event: string, params?: EventParams) {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', event, params);
    }
  }

  pageView() {
    this.track('PageView');
  }

  viewContent(params: { content_name: string; content_ids?: string[]; content_type?: string; value?: number; currency?: string }) {
    this.track('ViewContent', params);
  }

  addToCart(params: { content_name: string; content_ids?: string[]; value?: number; currency?: string }) {
    this.track('AddToCart', { ...params, currency: params.currency || 'USD' });
  }

  initiateCheckout(params: { value: number; currency?: string; num_items?: number }) {
    this.track('InitiateCheckout', { ...params, currency: params.currency || 'USD' });
  }

  purchase(params: { value: number; currency?: string; transaction_id?: string }) {
    this.track('Purchase', { ...params, currency: params.currency || 'USD' });
  }

  search(params: { search_string: string }) {
    this.track('Search', params);
  }
}

export const metaPixel = new MetaPixel();
export default metaPixel;
