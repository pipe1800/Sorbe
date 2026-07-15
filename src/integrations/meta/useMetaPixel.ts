import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import metaPixel from '@/integrations/meta/pixel';

// Initialize Pixel on app load + track page views on route change
export const useMetaPixel = () => {
  const location = useLocation();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      metaPixel.init();
      initialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (initialized.current) {
      metaPixel.pageView();
    }
  }, [location.pathname]);
};

export default useMetaPixel;
