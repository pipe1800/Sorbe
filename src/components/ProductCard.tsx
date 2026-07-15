import React from 'react';
import { Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FlavorBadge from './IndicadorSabor';
import DietaryIcons from './IconosDieta';

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

type ProductCardProps = {
  product: Product;
  onLike?: (id: string) => void;
  compact?: boolean;
};

const ProductCard = ({ product, onLike, compact = false }: ProductCardProps) => {
  const navigate = useNavigate();

  const image = product.image_urls?.[0] || '/placeholder.svg';
  const discount = product.precio_original
    ? Math.round((1 - product.precio / product.precio_original) * 100)
    : 0;

  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={product.nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.es_temporal && (
            <span className="bg-sorbe-primary text-white text-xs px-2 py-0.5 rounded-full font-medium">Temporal</span>
          )}
          {product.is_new && (
            <span className="bg-sorbe-teal text-sorbe-blue text-xs px-2 py-0.5 rounded-full font-medium">Nuevo</span>
          )}
          {discount > 0 && (
            <span className="bg-sorbe-orange text-white text-xs px-2 py-0.5 rounded-full font-medium">-{discount}%</span>
          )}
        </div>
        {/* Like button */}
        <button
          onClick={(e) => { e.stopPropagation(); onLike?.(product.id); }}
          className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white rounded-full transition-colors"
        >
          <Heart className="w-4 h-4 text-sorbe-primary" fill={product.likes_count && product.likes_count > 0 ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Content */}
      <div className={`p-3 sm:p-4 ${compact ? 'space-y-1' : 'space-y-2'}`}>
        {/* Flavor badges */}
        {product.perfil_sabor && product.perfil_sabor.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {product.perfil_sabor.map((f) => (
              <FlavorBadge key={f} flavor={f} size="sm" />
            ))}
          </div>
        )}

        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-sm sm:text-base">
          {product.nombre}
        </h3>

        {/* Dietary info */}
        {product.info_dietetica && (
          <DietaryIcons info={product.info_dietetica} size="sm" />
        )}

        {/* Rating */}
        {product.rating && product.rating > 0 && (
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-sorbe-green" fill="currentColor" />
            <span className="text-xs font-medium">{product.rating.toFixed(1)}</span>
            {product.review_count && product.review_count > 0 && (
              <span className="text-xs text-muted-foreground">({product.review_count})</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-primary">${product.precio.toFixed(2)}</span>
          {product.precio_original && (
            <span className="text-sm text-muted-foreground line-through">${product.precio_original.toFixed(2)}</span>
          )}
        </div>

        {!product.in_stock && (
          <p className="text-xs text-destructive font-medium">Agotado</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
