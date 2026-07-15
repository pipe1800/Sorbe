import React from 'react';

type FlavorBadgeProps = {
  flavor: string;
  size?: 'sm' | 'md';
};

const flavorColors: Record<string, { bg: string; text: string; dot: string }> = {
  frutal:   { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  cremoso:  { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  chocolate:{ bg: 'bg-amber-900/20', text: 'text-amber-800', dot: 'bg-amber-700' },
  citrico:  { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  tropical: { bg: 'bg-pink-100', text: 'text-pink-700', dot: 'bg-pink-500' },
  herbal:   { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
};

const FlavorBadge = ({ flavor, size = 'md' }: FlavorBadgeProps) => {
  const key = flavor.toLowerCase();
  const colors = flavorColors[key] || { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500' };
  const sizing = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span className={`inline-flex items-center gap-1.5 ${colors.bg} ${colors.text} ${sizing} rounded-full font-medium`}>
      <span className={`w-2 h-2 ${colors.dot} rounded-full`} />
      {flavor.charAt(0).toUpperCase() + flavor.slice(1)}
    </span>
  );
};

export default FlavorBadge;
