'use client';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
}

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
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        style={{
          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #374151 ${percentage}%, #374151 100%)`,
        }}
      />
    </div>
  );
}

