'use client';

import { useAppStore, type ColorTemperature } from '../store';
import Toggle from './Toggle';
import Slider from './Slider';

const colorSwatches: Record<ColorTemperature, { color: string; bg: string }> = {
  warm: { color: '#F5E6C8', bg: 'bg-[#F5E6C8]' },
  cool: { color: '#FFFFFF', bg: 'bg-white' },
  blue: { color: '#7BC9E8', bg: 'bg-[#7BC9E8]' },
  pink: { color: '#F5A7B8', bg: 'bg-[#F5A7B8]' },
};

export default function LightDevice() {
  const { lightSettings, updateLightSettings } = useAppStore();
  const { power, brightness, colorTemperature } = lightSettings;

  // Calculate glow intensity based on power and brightness
  const glowIntensity = power ? brightness / 100 : 0;
  const selectedColor = colorSwatches[colorTemperature];

  return (
    <div className="flex flex-col items-center gap-8">
      {/* 3D Bulb Visual */}
      <div className="relative">
        <svg
          width="120"
          height="160"
          viewBox="0 0 120 160"
          className="transition-all duration-300"
        >
          <defs>
            <radialGradient id="glow-gradient">
              <stop offset="0%" stopColor={selectedColor.color} stopOpacity={power ? glowIntensity * 0.8 : 0} />
              <stop offset="50%" stopColor={selectedColor.color} stopOpacity={power ? glowIntensity * 0.4 : 0} />
              <stop offset="100%" stopColor={selectedColor.color} stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Glow effect */}
          {power && (
            <circle
              cx="60"
              cy="80"
              r="35"
              fill="url(#glow-gradient)"
              opacity={glowIntensity}
              className="transition-opacity duration-300"
            />
          )}
          
          {/* Bulb shape */}
          <ellipse
            cx="60"
            cy="70"
            rx="30"
            ry="35"
            fill={power ? selectedColor.color : '#4B5563'}
            stroke={power ? selectedColor.color : '#6B7280'}
            strokeWidth="2"
            filter={power ? 'url(#glow)' : undefined}
            className="transition-all duration-300"
          />
          
          {/* Bulb base */}
          <rect
            x="50"
            y="95"
            width="20"
            height="15"
            fill={power ? selectedColor.color : '#4B5563'}
            stroke={power ? selectedColor.color : '#6B7280'}
            strokeWidth="2"
            className="transition-all duration-300"
          />
          
          {/* Screw threads */}
          <path
            d="M 50 105 L 52 108 L 58 108 L 60 105 L 68 105 L 70 108 L 76 108 L 78 105"
            fill="none"
            stroke="#2D3748"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Control Panel */}
      <div className="w-full max-w-sm bg-black/40 backdrop-blur-sm rounded-xl p-6 space-y-6 border border-gray-700/50">
        {/* Power Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Power</span>
          <Toggle
            checked={power}
            onChange={(checked) => updateLightSettings({ power: checked })}
          />
        </div>

        {/* Color Temperature */}
        <div className="space-y-3">
          <label className="text-sm text-gray-300">Color Temperature</label>
          <div className="flex gap-3">
            {Object.entries(colorSwatches).map(([key, swatch]) => (
              <button
                key={key}
                onClick={() =>
                  updateLightSettings({
                    colorTemperature: key as ColorTemperature,
                  })
                }
                className={`
                  w-12 h-12 rounded-lg transition-all
                  ${swatch.bg}
                  ${colorTemperature === key
                    ? 'ring-4 ring-blue-500 ring-offset-2 ring-offset-[#0f1419] scale-110'
                    : 'opacity-70 hover:opacity-100'
                  }
                `}
                style={{ backgroundColor: swatch.color }}
                aria-label={`${key} color`}
              />
            ))}
          </div>
        </div>

        {/* Brightness Slider */}
        <Slider
          value={brightness}
          onChange={(value) => updateLightSettings({ brightness: value })}
          min={0}
          max={100}
          label="Brightness"
          showPercentage={true}
        />
      </div>
    </div>
  );
}

