import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductSection from '@/components/ProductSection';
import CompanyInfo from '@/components/CompanyInfo';
import Footer from '@/components/Footer';
import { toast } from '@/hooks/use-toast';

type Product = {
  id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  precio_original?: number;
  perfil_sabor?: string[];
  info_dietetica?: Record<string, boolean>;
  es_temporal?: boolean;
  image_urls?: string[];
  rating?: number;
  review_count?: number;
  is_new?: boolean;
  is_on_sale?: boolean;
  in_stock?: boolean;
  stock_count?: number;
  likes_count?: number;
};

const Index = () => {
  const navigate = useNavigate();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
    const saved = localStorage.getItem('cartItemsCount');
    if (saved) setCartItemsCount(parseInt(saved));
  }, []);

  const fetchProducts = async () => {
    const { data: newData } = await supabase.from('products').select('*').eq('is_new', true).limit(4);
    const { data: saleData } = await supabase.from('products').select('*').eq('is_on_sale', true).limit(4);
    setNewProducts((newData || []) as Product[]);
    setSaleProducts((saleData || []) as Product[]);
  };

  const handleAddToCart = (productId: string) => {
    const product = [...newProducts, ...saleProducts].find(p => p.id === productId);
    if (!product?.in_stock) {
      toast({ title: 'Producto agotado', description: 'Este producto no está disponible.', variant: 'destructive' });
      return;
    }
    const existing = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const idx = existing.findIndex((i: any) => i.id === productId);
    if (idx > -1) existing[idx].quantity += 1;
    else existing.push({ id: productId, nombre: product.nombre, precio: product.precio, image: product.image_urls?.[0] || '', quantity: 1 });
    localStorage.setItem('cartItems', JSON.stringify(existing));
    setCartItemsCount(prev => prev + 1);
    localStorage.setItem('cartItemsCount', String(cartItemsCount + 1));
    toast({ title: 'Agregado al carrito', description: `${product.nombre} ha sido agregado.` });
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleLike = async (id: string) => {
    const { error } = await supabase.rpc('increment_likes', { product_id: id });
    if (!error) {
      setNewProducts(prev => prev.map(p => p.id === id ? { ...p, likes_count: (p.likes_count || 0) + 1 } : p));
      setSaleProducts(prev => prev.map(p => p.id === id ? { ...p, likes_count: (p.likes_count || 0) + 1 } : p));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartItemsCount} onCartClick={() => {}} />
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} onSearchSubmit={handleSearchSubmit} />

      {newProducts.length > 0 && (
        <ProductSection title="Nuevos Sabores" products={newProducts} onLike={handleLike} />
      )}

      {saleProducts.length > 0 && (
        <ProductSection title="Ofertas Especiales" products={saleProducts} onLike={handleLike} />
      )}

      <CompanyInfo />
      <Footer />
    </div>
  );
};

export default Index;
