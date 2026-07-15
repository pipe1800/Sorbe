import React from 'react';
import { IceCream, Star, Search, Truck, MapPin, Clock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type HeroProps = {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: () => void;
};

const Hero = ({ searchQuery = '', onSearchChange, onSearchSubmit }: HeroProps) => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-sorbe-blue via-[#3D2618] to-sorbe-blue text-white py-16 sm:py-20 overflow-hidden">
      {/* Animated bg */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-24 h-24 border-2 border-sorbe-primary/20 rounded-full animate-pulse" />
        <div className="absolute top-32 right-20 w-16 h-16 bg-sorbe-teal/10 rounded-full animate-bounce" />
        <div className="absolute bottom-20 right-16 w-8 h-8 bg-sorbe-green/20 rounded-full animate-bounce" />
        <div className="absolute top-20 right-1/4 opacity-10">
          <IceCream className="w-32 h-32 text-sorbe-primary rotate-12" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-4">
            <p className="text-sorbe-primary font-semibold tracking-wider uppercase text-sm mb-2">Desde 2013</p>
            <h1 className="text-5xl sm:text-7xl font-black mb-3 leading-tight">
              <span className="bg-gradient-to-r from-sorbe-primary to-sorbe-tan bg-clip-text text-transparent">Sorbe</span>
            </h1>
            <p className="text-xl sm:text-2xl text-sorbe-light/80 font-light">Tu felicidad, nuestra pasión</p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="bg-sorbe-primary/20 text-sorbe-primary text-sm px-4 py-1.5 rounded-full font-medium">Sorbete Artesanal</span>
              <span className="bg-sorbe-teal/20 text-sorbe-teal text-sm px-4 py-1.5 rounded-full font-medium">Delivery San Salvador</span>
            </div>
          </div>

          {/* Search */}
          <form onSubmit={(e) => { e.preventDefault(); onSearchSubmit?.(); }}
            className="mx-auto max-w-xl mt-8">
            <div className="flex items-stretch gap-2 bg-white/10 rounded-xl p-1 border border-white/10">
              <div className="flex items-center px-3 text-white/60"><Search className="w-5 h-5" /></div>
              <input type="search" placeholder="Buscar sabores..." value={searchQuery}
                onChange={e => onSearchChange?.(e.target.value)}
                className="flex-1 bg-transparent placeholder-white/40 text-white focus:outline-none py-2" />
              <button type="submit" className="bg-sorbe-primary hover:bg-sorbe-orange text-white px-6 py-2 rounded-lg font-medium transition-colors">Buscar</button>
            </div>
          </form>

          {/* Features grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { icon: IceCream, label: 'Sorbete Artesanal', sub: '29 sabores', color: 'text-sorbe-primary', bg: 'bg-sorbe-primary/10', border: 'border-sorbe-primary/20' },
              { icon: Truck, label: 'Delivery', sub: 'San Salvador', color: 'text-sorbe-teal', bg: 'bg-sorbe-teal/10', border: 'border-sorbe-teal/20' },
              { icon: Shield, label: 'Calidad', sub: 'Desde 2013', color: 'text-sorbe-green', bg: 'bg-sorbe-green/10', border: 'border-sorbe-green/20' },
              { icon: Clock, label: 'Eventos', sub: 'Servicio personalizado', color: 'text-sorbe-orange', bg: 'bg-sorbe-orange/10', border: 'border-sorbe-orange/20' },
            ].map((f, i) => (
              <div key={i} className={`${f.bg} backdrop-blur-sm rounded-2xl p-4 border ${f.border} text-center`}>
                <f.icon className={`w-8 h-8 ${f.color} mx-auto mb-2`} />
                <p className="font-bold text-sm">{f.label}</p>
                <p className="text-xs text-sorbe-light/60">{f.sub}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12">
            <button onClick={() => navigate('/products')}
              className="bg-sorbe-primary hover:bg-sorbe-orange text-white px-12 py-4 rounded-2xl text-lg font-bold transition-all hover:scale-105 shadow-xl inline-flex items-center gap-2">
              <IceCream className="w-5 h-5" />
              Ver Paquetes
              <Star className="w-4 h-4" fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
