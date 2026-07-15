import React from 'react';
import { Sparkles } from 'lucide-react';

type SeasonalBannerProps = {
  title?: string;
  subtitle?: string;
};

const SeasonalBanner = ({
  title = 'Sabores de Temporada',
  subtitle = 'Edición limitada — disponibles por tiempo limitado',
}: SeasonalBannerProps) => {
  return (
    <div className="bg-gradient-to-r from-sorbe-strawberry/10 via-sorbe-peach/10 to-sorbe-lemon/10 border border-sorbe-strawberry/20 rounded-2xl p-4 sm:p-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-sorbe-strawberry" />
        <h2 className="text-lg sm:text-xl font-bold text-sorbe-strawberry">{title}</h2>
        <Sparkles className="w-5 h-5 text-sorbe-strawberry" />
      </div>
      <p className="text-muted-foreground text-sm">{subtitle}</p>
    </div>
  );
};

export default SeasonalBanner;
