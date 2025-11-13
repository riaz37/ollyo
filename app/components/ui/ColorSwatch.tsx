'use client';

import type { ColorSwatchProps } from '@/app/types/ui.types';

export default function ColorSwatch({
  color,
  isSelected,
  onClick,
  ariaLabel,
  className = '',
}: ColorSwatchProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full h-12 rounded-lg transition-all duration-200
        ${isSelected
          ? 'ring-2 ring-blue scale-105'
          : 'opacity-70 hover:opacity-100'
        }
        ${className}
      `}
      style={{ backgroundColor: color }}
      aria-label={ariaLabel}
    />
  );
}

