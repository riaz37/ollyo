'use client';

import type { SliderProps } from '@/app/types/ui.types';

export default function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  label,
  showPercentage = true,
}: SliderProps) {
  const percentage = Math.round(((value - min) / (max - min)) * 100);

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">{label}</span>
          {showPercentage && (
            <span className="text-sm font-medium text-gray-200">
              {percentage}%
            </span>
          )}
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider-indicator w-full h-2 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-solid"
        style={{
          background: `linear-gradient(to right, var(--color-blue) 0%, var(--color-blue) ${percentage}%, var(--color-gray-700) ${percentage}%, var(--color-gray-700) 100%)`,
          accentColor: 'var(--color-blue)',
        }}
      />
    </div>
  );
}

