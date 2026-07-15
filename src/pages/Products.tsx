import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Package, Search, Milk, Apple, Flame, Wine, Dumbbell } from 'lucide-react';

type Paquete = {
  id: string; sku: string; nombre: string; descripcion?: string;
  precio: number; image_urls?: string[]; is_new?: boolean;
};

type Sabor = {
  id: string; nombre: string; categoria: string; disponible: boolean;
};

const flavorCategories = [
  { key: 'con_leche', label: 'Con Leche', icon: Milk, color: 'text-amber-600 bg-amber-50' },
  { key: 'naturales', label: 'Naturales', icon: Apple, color: 'text-green-600 bg-green-50' },
  { key: 'chamoyados', label: 'Chamoyados', icon: Flame, color: 'text-red-600 bg-red-50' },
  { key: 'con_licor', label: 'Con Licor', icon: Wine, color: 'text-purple-600 bg-purple-50' },
  { key: 'con_proteina', label: 'Con Proteína', icon: Dumbbell, color: 'text-blue-600 bg-blue-50' },
];

const Products = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [packages, setPackages] = useState<Paquete[]>([]);
  const [sabores, setSabores] = useState<Sabor[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    supabase.from('products').select('*').order('precio').then(({ data }) => setPackages(data || []));
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

  const filteredSabores = sabores.filter(s => {
    if (activeCategory && s.categoria !== activeCategory) return false;
    if (search.trim() && !s.nombre.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartCount} />
      <section className="bg-gradient-to-b from-sorbe-chocolate to-background py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">Nuestros Productos</h1>
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

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Package className="w-6 h-6 text-sorbe-strawberry" /> Paquetes
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {packages.map(pkg => (
              <div key={pkg.id} onClick={() => navigate(`/products/${pkg.id}`)}
                className="bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer overflow-hidden group">
                <div className="aspect-square bg-muted overflow-hidden">
                  <img src={pkg.image_urls?.[0] || '/placeholder.svg'} alt={pkg.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {pkg.is_new && <span className="absolute top-2 left-2 bg-sorbe-mint text-sorbe-chocolate text-xs px-2 py-0.5 rounded-full">Popular</span>}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{pkg.nombre}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{pkg.descripcion}</p>
                  <p className="text-2xl font-bold text-primary mt-2">${pkg.precio.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-6">{sabores.length} Sabores Disponibles</h2>
          <div className="flex gap-2 flex-wrap mb-8">
            <button onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!activeCategory ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-primary/10'}`}>
              Todos
            </button>
            {flavorCategories.map(cat => (
              <button key={cat.key} onClick={() => setActiveCategory(cat.key === activeCategory ? null : cat.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${activeCategory === cat.key ? 'bg-primary text-primary-foreground' : `${cat.color} hover:opacity-80`}`}>
                <cat.icon className="w-4 h-4" /> {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredSabores.map(s => {
              const cat = flavorCategories.find(c => c.key === s.categoria);
              const CatIcon = cat?.icon;
              return (
                <div key={s.id} className={`${cat?.color} rounded-xl p-3 text-center hover:shadow-md transition-all cursor-default`}>
                  {CatIcon && <CatIcon className="w-5 h-5 mx-auto mb-1" />}
                  <p className="font-medium text-sm">{s.nombre}</p>
                  <p className="text-xs opacity-70">{cat?.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Products;
