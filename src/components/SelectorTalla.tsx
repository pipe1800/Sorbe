import React from 'react';

type SizeOption = {
  nombre: string;
  modificador_precio: number;
};

type SizeSelectorProps = {
  sizes: SizeOption[];
  selected: string | null;
  onSelect: (size: SizeOption) => void;
};

const SizeSelector = ({ sizes, selected, onSelect }: SizeSelectorProps) => {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div className="flex gap-2">
      {sizes.map((size) => {
        const isSelected = selected === size.nombre;
        const priceText = size.modificador_precio > 0
          ? `+$${size.modificador_precio.toFixed(2)}`
          : 'Base';

        return (
          <button
            key={size.nombre}
            onClick={() => onSelect(size)}
            className={`flex flex-col items-center px-4 py-2 rounded-xl border-2 transition-all text-sm font-medium ${
              isSelected
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border hover:border-primary/50 text-foreground'
            }`}
          >
            <span>{size.nombre}</span>
            <span className={`text-xs ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
              {priceText}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default SizeSelector;
