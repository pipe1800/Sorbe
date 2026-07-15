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
    <section className="relative bg-sorbe-hero text-white py-16 sm:py-20 overflow-hidden">
      {/* Animated bg */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-24 h-24 border-[3px] border-white/30 rounded-full animate-pulse" />
        <div className="absolute top-32 right-20 w-16 h-16 bg-white/15 rounded-full animate-bounce" />
        <div className="absolute bottom-20 right-16 w-8 h-8 bg-sorbe-lemon/30 rounded-full animate-bounce" />
        <div className="absolute bottom-32 left-20 w-12 h-12 border-[3px] border-white/25 rounded-full animate-pulse" />
        <IceCream className="absolute top-16 right-1/3 w-24 h-24 text-white/20 rotate-12" />
        <IceCream className="absolute bottom-24 left-1/4 w-32 h-32 text-white/15 -rotate-12" />
        <IceCream className="absolute top-40 right-10 w-16 h-16 text-white/15 rotate-45" />
        <IceCream className="absolute bottom-12 right-1/3 w-20 h-20 text-white/20 -rotate-6" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-4">
            <p className="text-sorbe-strawberry font-semibold tracking-wider uppercase text-sm mb-2">Desde 2013</p>
            <h1 className="text-5xl sm:text-7xl font-black mb-3 leading-tight">
              <span className="bg-gradient-to-r from-sorbe-strawberry to-sorbe-peach bg-clip-text text-transparent">Sorbe</span>
            </h1>
            <p className="text-xl sm:text-2xl text-sorbe-cream/80 font-light">Tu felicidad, nuestra pasión</p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="bg-white/15 text-white text-sm px-4 py-1.5 rounded-full font-medium border border-white/20">Sorbete Artesanal</span>
              <span className="bg-white/15 text-white text-sm px-4 py-1.5 rounded-full font-medium border border-white/20">Delivery San Salvador</span>
            </div>
          </div>

          {/* Search */}
          <form onSubmit={(e) => { e.preventDefault(); onSearchSubmit?.(); }}
            className="mx-auto max-w-xl mt-8">
            <div className="flex items-stretch gap-2 bg-white/15 rounded-xl p-1 border border-white/20">
              <div className="flex items-center px-3 text-white/70"><Search className="w-5 h-5" /></div>
              <input type="search" placeholder="Buscar sabores..." value={searchQuery}
                onChange={e => onSearchChange?.(e.target.value)}
                className="flex-1 bg-transparent placeholder-white/50 text-white focus:outline-none py-2" />
              <button type="submit" className="bg-sorbe-strawberry hover:bg-sorbe-raspberry text-white px-6 py-2 rounded-lg font-medium transition-colors">Buscar</button>
            </div>
          </form>

          {/* Features grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { icon: IceCream, label: 'Sorbete Artesanal', sub: '29 sabores', color: 'text-white', bg: 'bg-white/10', border: 'border-white/20' },
              { icon: Truck, label: 'Delivery', sub: 'San Salvador', color: 'text-white', bg: 'bg-white/10', border: 'border-white/20' },
              { icon: Shield, label: 'Calidad', sub: 'Desde 2013', color: 'text-white', bg: 'bg-white/10', border: 'border-white/20' },
              { icon: Clock, label: 'Eventos', sub: 'Servicio personalizado', color: 'text-white', bg: 'bg-white/10', border: 'border-white/20' },
            ].map((f, i) => (
              <div key={i} className={`${f.bg} backdrop-blur-sm rounded-2xl p-4 border ${f.border} text-center`}>
                <f.icon className={`w-8 h-8 ${f.color} mx-auto mb-2`} />
                <p className="font-bold text-sm">{f.label}</p>
                <p className="text-xs text-white/70">{f.sub}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12">
            <button onClick={() => navigate('/products')}
              className="bg-white hover:bg-white/90 text-sorbe-hero px-12 py-4 rounded-2xl text-lg font-bold transition-all hover:scale-105 shadow-xl inline-flex items-center gap-2">
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
