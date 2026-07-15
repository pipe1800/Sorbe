import React from 'react';
import { IceCream, Sun, Star, Search, Truck, CreditCard, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type HeroProps = {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: () => void;
};

const Hero = ({ searchQuery = '', onSearchChange, onSearchSubmit }: HeroProps) => {
  const navigate = useNavigate();
  return (
    <section className="relative bg-gradient-to-br from-sorbe-chocolate via-[#3D2618] to-sorbe-chocolate text-white py-16 sm:py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-24 h-24 border-2 border-sorbe-strawberry/20 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-sorbe-mint/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 bg-sorbe-raspberry/15 rounded-2xl rotate-45 animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-8 h-8 bg-sorbe-lemon/20 rounded-full animate-bounce"></div>

        <div className="absolute top-20 right-1/4 opacity-10">
          <IceCream className="w-32 h-32 text-sorbe-strawberry rotate-12" />
        </div>
        <div className="absolute bottom-16 left-1/4 opacity-10">
          <IceCream className="w-24 h-24 text-sorbe-lemon -rotate-12" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-1 w-16 bg-gradient-to-r from-sorbe-strawberry to-sorbe-peach rounded"></div>
              <Sun className="w-6 h-6 text-sorbe-lemon animate-pulse" />
              <div className="h-1 w-16 bg-gradient-to-r from-sorbe-peach to-sorbe-strawberry rounded"></div>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black mb-6 leading-tight">
              <span className="text-white">Helados </span>
              <span className="bg-gradient-to-r from-sorbe-strawberry to-sorbe-peach bg-clip-text text-transparent">
                artesanales
              </span>
              <span className="text-white"> con sabor</span>
            </h1>

            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-xl text-sorbe-cream/70">en</span>
              <span className="text-2xl font-bold text-sorbe-lemon border-2 border-sorbe-lemon px-4 py-1 rounded-lg">
                El Salvador
              </span>
              <Star className="w-6 h-6 text-sorbe-mint animate-pulse" fill="currentColor" />
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); onSearchSubmit?.(); }}
              className="mx-auto max-w-xl w-full"
              role="search"
            >
              <div className="flex items-stretch gap-2 bg-white/10 rounded-xl p-1 backdrop-blur-sm border border-white/10">
                <div className="flex items-center px-3 text-white/80">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="search"
                  placeholder="Buscar sabores..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="flex-1 bg-transparent placeholder-white/60 text-white focus:outline-none py-2 px-1 text-base sm:text-lg"
                />
                <button type="submit" className="bg-gradient-to-r from-sorbe-strawberry to-sorbe-raspberry hover:from-sorbe-raspberry hover:to-sorbe-strawberry text-white font-bold px-6 py-2 rounded-lg transition-all">
                  Buscar
                </button>
              </div>
            </form>
          </div>

          <p className="text-xl mb-12 text-sorbe-cream/70 max-w-3xl mx-auto leading-relaxed">
            <span className="font-semibold text-sorbe-strawberry">Sabores naturales</span>, ingredientes frescos y recetas artesanales.
            Desde <span className="text-sorbe-mint">paletas frutales</span> hasta
            <span className="text-sorbe-peach"> postres cremosos</span>.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16">
            {[
              { icon: Truck, color: 'bg-sorbe-mint text-sorbe-chocolate', border: 'border-sorbe-mint/30 hover:border-sorbe-mint/60', bg: 'from-sorbe-mint/20 to-sorbe-mint/5', title: 'Entrega a Domicilio', desc: 'Recibe donde estés' },
              { icon: CreditCard, color: 'bg-sorbe-lemon text-sorbe-chocolate', border: 'border-sorbe-lemon/30 hover:border-sorbe-lemon/60', bg: 'from-sorbe-lemon/20 to-sorbe-lemon/5', title: 'Pago Fácil', desc: 'Efectivo, tarjeta, Wompi' },
              { icon: MapPin, color: 'bg-sorbe-strawberry text-white', border: 'border-sorbe-strawberry/30 hover:border-sorbe-strawberry/60', bg: 'from-sorbe-strawberry/20 to-sorbe-strawberry/5', title: 'Todo El Salvador', desc: 'Recoger o envío' },
              { icon: Clock, color: 'bg-sorbe-raspberry text-white', border: 'border-sorbe-raspberry/30 hover:border-sorbe-raspberry/60', bg: 'from-sorbe-raspberry/20 to-sorbe-raspberry/5', title: 'Hechos al Momento', desc: 'Frescura garantizada' },
            ].map((feat, i) => (
              <div key={i} className="group relative h-full">
                <div className={`h-full bg-gradient-to-br ${feat.bg} backdrop-blur-sm rounded-2xl p-4 sm:p-6 border ${feat.border} transition-all duration-300 hover:scale-105 flex flex-col items-center text-center`}>
                  <div className={`${feat.color} p-2.5 sm:p-3 rounded-full w-fit mx-auto mb-3 sm:mb-4 group-hover:animate-bounce`}>
                    <feat.icon className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-lg mb-1.5 sm:mb-2">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-sorbe-cream/70">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16">
            <button
              onClick={() => navigate('/products')}
              className="group relative bg-gradient-to-r from-sorbe-strawberry to-sorbe-raspberry hover:from-sorbe-raspberry hover:to-sorbe-strawberry text-white px-12 py-4 rounded-2xl text-lg font-black transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <span className="relative z-10 flex items-center gap-3">
                <IceCream className="w-6 h-6 group-hover:animate-bounce" />
                Ver Todos los Sabores
                <Star className="w-5 h-5 group-hover:animate-spin" fill="currentColor" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
