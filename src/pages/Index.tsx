import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { IceCream, Package, Truck, MapPin } from 'lucide-react';

type Paquete = {
  id: string; sku: string; nombre: string; descripcion?: string;
  precio: number; image_urls?: string[]; is_new?: boolean;
};

type FlavorCount = {
  con_leche: number; naturales: number; chamoyados: number; con_licor: number;
};

const Index = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<Paquete[]>([]);
  const [flavorCount, setFlavorCount] = useState<FlavorCount>({ con_leche: 0, naturales: 0, chamoyados: 0, con_licor: 0 });
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    supabase.from('products').select('*').order('precio').then(({ data }) => setPackages((data || []) as Paquete[]));
    supabase.from('sabores').select('categoria').then(({ data }) => {
      const counts = { con_leche: 0, naturales: 0, chamoyados: 0, con_licor: 0 };
      (data || []).forEach((s: any) => { if (s.categoria in counts) counts[s.categoria as keyof FlavorCount]++; });
      setFlavorCount(counts);
    });
    const saved = localStorage.getItem('cartItemsCount');
    if (saved) setCartCount(parseInt(saved));
  }, []);

  const totalFlavors = Object.values(flavorCount).reduce((a, b) => a + b, 0);

  const handleSearch = () => {
    if (searchQuery.trim()) navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartCount} />
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} onSearchSubmit={handleSearch} />

      {/* Flavor stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">{totalFlavors} Sabores Artesanales</h2>
          <p className="text-muted-foreground mb-8">Elige los sabores que más te gustan para tu paquete</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {[
              { label: 'Con Leche', count: flavorCount.con_leche, color: 'bg-amber-100 text-amber-800', icon: '🥛' },
              { label: 'Naturales', count: flavorCount.naturales, color: 'bg-green-100 text-green-800', icon: '🍉' },
              { label: 'Chamoyados', count: flavorCount.chamoyados, color: 'bg-red-100 text-red-800', icon: '🌶️' },
              { label: 'Con Licor', count: flavorCount.con_licor, color: 'bg-purple-100 text-purple-800', icon: '🍸' },
            ].map(c => (
              <div key={c.label} className={`${c.color} rounded-2xl px-6 py-3 text-center min-w-[120px]`}>
                <p className="text-2xl mb-1">{c.icon}</p>
                <p className="font-bold">{c.label}</p>
                <p className="text-sm opacity-75">{c.count} sabores</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Package className="w-10 h-10 mx-auto mb-3 text-sorbe-strawberry" />
            <h2 className="text-3xl font-bold mb-2">Nuestros Paquetes</h2>
            <p className="text-muted-foreground">Incluyen sorbetes, barquillos y miel</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
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
        </div>
      </section>

      {/* Delivery info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Truck className="w-10 h-10 mx-auto mb-3 text-sorbe-mint" />
          <h2 className="text-2xl font-bold mb-6">Delivery en San Salvador</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            <div className="bg-muted rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-sorbe-strawberry" />
                <h3 className="font-bold">San Jacinto y alrededores</h3>
              </div>
              <p className="text-muted-foreground text-sm">Mínimo $10.00 • Delivery $1.00</p>
            </div>
            <div className="bg-muted rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-sorbe-mint" />
                <h3 className="font-bold">Otras áreas de San Salvador</h3>
              </div>
              <p className="text-muted-foreground text-sm">Mínimo $35.00 • Delivery $3.00</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
