'use client';

import Image from 'next/image';
import { useAppStore, type ColorTemperature } from '../../store';
import Toggle from '../ui/Toggle';
import Slider from '../ui/Slider';

const colorSwatches: Record<ColorTemperature, { color: string; variable: string }> = {
  warm: { color: '#FFE5B4', variable: 'var(--color-warm)' },
  cool: { color: '#F0F8FF', variable: 'var(--color-cool)' },
  blue: { color: '#87CEEB', variable: 'var(--color-light-blue)' },
  pink: { color: '#87CEEB', variable: 'var(--color-pink)' },
};

export default function LightDevice() {
  const { lightSettings, updateLightSettings } = useAppStore();
  const { power, brightness, colorTemperature } = lightSettings;

  // Calculate glow intensity based on power and brightness
  const glowIntensity = power ? brightness / 100 : 0;
  const selectedColor = colorSwatches[colorTemperature];

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* 3D Bulb Visual - Positioned at top center */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          {/* Glow effect overlay */}
          {power && (
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
              style={{
                opacity: glowIntensity,
                ['--glow-color' as string]: selectedColor.color,
                ['--glow-opacity' as string]: `${glowIntensity * 0.6}`,
              }}
            >
              <div
                className="w-20 h-20 rounded-full blur-2xl"
                style={{
                  backgroundColor: selectedColor.color,
                  opacity: glowIntensity * 0.6,
                }}
              />
            </div>
          )}
          {/* Light SVG */}
          <div
            className="relative transition-all duration-300"
            style={{
              filter: power
                ? `brightness(${0.5 + glowIntensity * 0.5}) drop-shadow(0 0 ${glowIntensity * 20}px ${selectedColor.color})`
                : 'brightness(0.7) grayscale(0.3)',
            }}
          >
            <Image
              src="/Light.svg"
              alt="Light device"
              width={128}
              height={196}
              className="w-32 h-auto"
              unoptimized
              style={{
                filter: power
                  ? `hue-rotate(${
                      colorTemperature === 'warm'
                        ? '30deg'
                        : colorTemperature === 'cool'
                        ? '0deg'
                        : colorTemperature === 'blue'
                        ? '-180deg'
                        : '340deg'
                    }) saturate(${0.8 + glowIntensity * 0.2})`
                  : 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* Control Panel - Positioned at bottom */}
      <div className="w-full flex justify-center pb-8">
        <div className="w-full max-w-md rounded-xl py-12 px-10 space-y-10 bg-panel">
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
                  w-12 h-12 rounded-lg transition-all duration-200
                  ${colorTemperature === key
                    ? 'outline outline-4 outline-blue outline-offset-2 scale-110'
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
    </div>
  );
}

