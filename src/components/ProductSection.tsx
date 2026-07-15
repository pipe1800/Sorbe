import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import SeasonalBanner from './BannerTemporal';
import { Sparkles, Flame, Star, TrendingUp, IceCream } from 'lucide-react';

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
  is_on_sale?: boolean;
  is_new?: boolean;
  in_stock?: boolean;
  likes_count?: number;
};

type ProductSectionProps = {
  title: string;
  products: Product[];
  onLike?: (id: string) => void;
  seasonal?: boolean;
};

const ProductSection = ({ title, products, onLike, seasonal = false }: ProductSectionProps) => {
  const navigate = useNavigate();

  const isNewSection = title.toLowerCase().includes('nuevo');
  const isOfferSection = title.toLowerCase().includes('oferta');

  const sectionConfig = isNewSection
    ? { icon: Sparkles, color: 'text-sorbe-teal', gradient: 'from-sorbe-teal to-sorbe-primary', desc: 'Los sabores más recientes que debes probar' }
    : isOfferSection
    ? { icon: Flame, color: 'text-sorbe-primary', gradient: 'from-sorbe-primary to-sorbe-orange', desc: 'Precios especiales por tiempo limitado' }
    : { icon: Star, color: 'text-sorbe-green', gradient: 'from-sorbe-green to-sorbe-tan', desc: '' };

  const Icon = sectionConfig.icon;

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Seasonal banner */}
        {seasonal && (
          <div className="mb-8">
            <SeasonalBanner />
          </div>
        )}

        {/* Section header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-1 w-16 bg-gradient-to-r rounded" style={{ backgroundImage: `linear-gradient(to right, transparent, var(--tw-gradient-stops))` }}></div>
            <Icon className={`w-7 h-7 ${sectionConfig.color}`} />
            <div className="h-1 w-16 bg-gradient-to-l rounded"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-2">{title}</h2>

          {sectionConfig.desc && (
            <p className="text-muted-foreground">{sectionConfig.desc}</p>
          )}
        </div>

        {/* Products grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <div key={product.id} className="transform hover:scale-[1.02] transition-all duration-300">
                <ProductCard product={product} onLike={onLike} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <IceCream className="w-16 h-16 mx-auto mb-4 opacity-40" />
            <p className="text-lg">No hay productos en esta sección todavía.</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-lg"
          >
            <IceCream className="w-5 h-5" />
            Ver Todos los Sabores
            <TrendingUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
