import React from 'react';
import { Leaf, Wheat, Droplet, Milk } from 'lucide-react';

type DietaryInfo = {
  vegano?: boolean;
  sin_gluten?: boolean;
  sin_azucar?: boolean;
  sin_lactosa?: boolean;
};

type DietaryIconsProps = {
  info: DietaryInfo;
  size?: 'sm' | 'md';
};

const icons = [
  { key: 'vegano' as const, label: 'Vegano', Icon: Leaf, color: 'text-green-600' },
  { key: 'sin_gluten' as const, label: 'Sin Gluten', Icon: Wheat, color: 'text-amber-600' },
  { key: 'sin_azucar' as const, label: 'Sin Azúcar', Icon: Droplet, color: 'text-blue-500' },
  { key: 'sin_lactosa' as const, label: 'Sin Lactosa', Icon: Milk, color: 'text-indigo-500' },
];

const DietaryIcons = ({ info, size = 'md' }: DietaryIconsProps) => {
  const active = icons.filter(i => info[i.key]);
  if (active.length === 0) return null;

  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {active.map(({ key, label, Icon, color }) => (
        <span key={key} className={`inline-flex items-center gap-1 ${color} ${size === 'sm' ? 'text-xs' : 'text-sm'}`} title={label}>
          <Icon className={iconSize} />
          {size === 'md' && <span>{label}</span>}
        </span>
      ))}
    </div>
  );
};

export default DietaryIcons;
