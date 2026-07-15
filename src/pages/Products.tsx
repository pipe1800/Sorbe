import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { toast } from '@/hooks/use-toast';
import { Search, SlidersHorizontal, X, IceCream } from 'lucide-react';

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

const flavorOptions = ['Frutal', 'Cremoso', 'Chocolate', 'Cítrico', 'Tropical', 'Herbal'];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cartItemsCount');
    if (saved) setCartItemsCount(parseInt(saved));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    let query = supabase.from('products').select('*');

    const cat = searchParams.get('category');
    const s = searchParams.get('search');

    if (cat) {
      const { data: catData } = await supabase.from('categories').select('id').eq('nombre', cat).single();
      if (catData) {
        const { data: pcData } = await supabase.from('product_categories').select('product_id').eq('category_id', catData.id);
        if (pcData?.length) query = query.in('id', pcData.map(pc => pc.product_id));
      }
    }

    if (s) query = query.ilike('nombre', `%${s}%`);

    const { data } = await query.order('created_at', { ascending: false });
    setProducts((data || []) as Product[]);
    setIsLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (search.trim()) params.set('search', search.trim());
    else params.delete('search');
    setSearchParams(params);
  };

  const handleFlavorFilter = (flavor: string) => {
    setSelectedFlavor(prev => prev === flavor ? null : flavor);
  };

  const filteredProducts = selectedFlavor
    ? products.filter(p => p.perfil_sabor?.some(f => f.toLowerCase() === selectedFlavor.toLowerCase()))
    : products;

  const handleLike = async (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, likes_count: (p.likes_count || 0) + 1 } : p));
  };

  const handleAddToCart = (product: Product) => {
    if (!product.in_stock) {
      toast({ title: 'Producto agotado', variant: 'destructive' });
      return;
    }
    const existing = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const idx = existing.findIndex((i: any) => i.id === product.id);
    if (idx > -1) existing[idx].quantity += 1;
    else existing.push({ id: product.id, nombre: product.nombre, precio: product.precio, image: product.image_urls?.[0] || '', quantity: 1 });
    localStorage.setItem('cartItems', JSON.stringify(existing));
    setCartItemsCount(prev => prev + 1);
    localStorage.setItem('cartItemsCount', String(cartItemsCount + 1));
    toast({ title: 'Agregado al carrito', description: product.nombre });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartItemsCount} />

      {/* Header */}
      <section className="bg-gradient-to-b from-sorbe-chocolate to-background py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">Nuestros Productos</h1>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="max-w-lg mx-auto">
            <div className="flex items-stretch gap-2 bg-white/10 rounded-xl p-1 border border-white/10">
              <div className="flex items-center px-3 text-white/60"><Search className="w-5 h-5" /></div>
              <input type="search" placeholder="Buscar sabores..." value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent placeholder-white/40 text-white focus:outline-none py-2" />
              <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium">Buscar</button>
            </div>
          </form>
        </div>
      </section>

      {/* Filters + Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Filter toggle */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">{filteredProducts.length} productos</p>
            <button onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              <SlidersHorizontal className="w-4 h-4" /> Filtrar por sabor
            </button>
          </div>

          {/* Flavor filter chips */}
          {showFilters && (
            <div className="flex gap-2 flex-wrap mb-6 pb-4 border-b border-border">
              {flavorOptions.map(flavor => (
                <button key={flavor} onClick={() => handleFlavorFilter(flavor)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedFlavor === flavor
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-primary/10'
                  }`}>
                  {flavor}
                </button>
              ))}
              {selectedFlavor && (
                <button onClick={() => setSelectedFlavor(null)}
                  className="px-3 py-1.5 rounded-full text-sm text-destructive hover:bg-destructive/10 flex items-center gap-1">
                  <X className="w-3 h-3" /> Limpiar
                </button>
              )}
            </div>
          )}

          {/* Products grid */}
          {isLoading ? (
            <div className="text-center py-20">
              <IceCream className="w-12 h-12 mx-auto mb-4 text-muted-foreground animate-bounce" />
              <p className="text-muted-foreground">Cargando productos...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map(product => (
                <div key={product.id}>
                  <ProductCard product={product} onLike={handleLike} compact />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <IceCream className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-40" />
              <h3 className="text-lg font-semibold mb-1">No se encontraron productos</h3>
              <p className="text-muted-foreground">Intenta con otra búsqueda o categoría.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
