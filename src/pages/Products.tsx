import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, Milk, Apple, Flame, Wine, Dumbbell, ShoppingCart } from 'lucide-react';

type Sabor = {
  id: string; nombre: string; categoria: string; descripcion?: string;
  image_url?: string; disponible: boolean;
};

const flavorCategories = [
  { key: 'con_leche', label: 'Con Leche', icon: Milk, color: 'bg-amber-50 border-amber-200 text-amber-700', dot: 'bg-amber-500' },
  { key: 'naturales', label: 'Naturales', icon: Apple, color: 'bg-green-50 border-green-200 text-green-700', dot: 'bg-green-500' },
  { key: 'chamoyados', label: 'Chamoyados', icon: Flame, color: 'bg-red-50 border-red-200 text-red-700', dot: 'bg-red-500' },
  { key: 'con_licor', label: 'Con Licor', icon: Wine, color: 'bg-purple-50 border-purple-200 text-purple-700', dot: 'bg-purple-500' },
  { key: 'con_proteina', label: 'Con Proteína', icon: Dumbbell, color: 'bg-blue-50 border-blue-200 text-blue-700', dot: 'bg-blue-500' },
];

const Products = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sabores, setSabores] = useState<Sabor[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    supabase.from('sabores').select('*').eq('disponible', true).order('sort_order').then(({ data }) => setSabores(data || []));
    const saved = localStorage.getItem('cartItemsCount');
    if (saved) setCartCount(parseInt(saved));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) params.set('search', search.trim());
    setSearchParams(params);
  };

  const filtered = sabores.filter(s => {
    if (activeCategory && s.categoria !== activeCategory) return false;
    if (search.trim() && !s.nombre.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const quickAddToCart = (e: React.MouseEvent, sabor: Sabor) => {
    e.stopPropagation();
    const existing = JSON.parse(localStorage.getItem('cartItems') || '[]');
    existing.push({ id: sabor.id, nombre: sabor.nombre, precio: 0, image: sabor.image_url, sabores: [sabor.nombre], quantity: 1, tipo: 'sabor' });
    localStorage.setItem('cartItems', JSON.stringify(existing));
    setCartCount(prev => prev + 1);
    localStorage.setItem('cartItemsCount', String(cartCount + 1));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartCount} />

      <section className="bg-gradient-to-b from-sorbe-blue to-background py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">{sabores.length} Sabores</h1>
          <p className="text-sorbe-light/70 mb-6">Elige tus sabores favoritos y arma tu paquete</p>
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

      <section className="py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Category filter */}
          <div className="flex gap-2 flex-wrap mb-8 justify-center">
            <button onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!activeCategory ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-primary/10'}`}>
              Todos ({sabores.length})
            </button>
            {flavorCategories.map(cat => (
              <button key={cat.key} onClick={() => setActiveCategory(cat.key === activeCategory ? null : cat.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 border ${activeCategory === cat.key ? 'bg-primary text-primary-foreground border-primary' : `${cat.color} hover:opacity-80`}`}>
                <cat.icon className="w-4 h-4" /> {cat.label}
              </button>
            ))}
          </div>

          {/* Flavor grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map(s => {
              const cat = flavorCategories.find(c => c.key === s.categoria);
              return (
                <div key={s.id} onClick={() => navigate(`/products/${s.id}`)}
                  className="bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer overflow-hidden group">
                  <div className="aspect-square bg-muted overflow-hidden relative">
                    <img src={s.image_url || '/placeholder.svg'} alt={s.nombre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className={`absolute top-2 left-2 ${cat?.color} border text-xs px-2 py-0.5 rounded-full font-medium`}>
                      {cat?.label}
                    </span>
                    <button onClick={(e) => quickAddToCart(e, s)}
                      className="absolute bottom-2 right-2 bg-primary text-primary-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-semibold text-sm">{s.nombre}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">No se encontraron sabores.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
