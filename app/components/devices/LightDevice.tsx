'use client';

import Image from 'next/image';
import { useAppStore, type ColorTemperature } from '../../store';
import Slider from '../ui/Slider';
import ControlPanel from '../ui/ControlPanel';
import ControlRow from '../ui/ControlRow';
import DeviceVisual from './DeviceVisual';
import ColorSwatch from '../ui/ColorSwatch';

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
      <DeviceVisual>
        {/* Glow effect overlay */}
        {power && (
          <div
            className="light-glow-container"
            style={{
              opacity: glowIntensity,
            }}
          >
            <div
              className="light-glow-circle"
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
      </DeviceVisual>

      {/* Control Panel - Positioned at bottom */}
      <ControlPanel>
        {/* Power Toggle */}
        <ControlRow
          label="Power"
          checked={power}
          onToggle={(checked) => updateLightSettings({ power: checked })}
        />

        {/* Color Temperature */}
        <div className="space-y-3">
          <label className="text-sm text-gray-300">Color Temperature</label>
          <div className="grid grid-cols-4 gap-3 w-full">
            {Object.entries(colorSwatches).map(([key, swatch]) => (
              <ColorSwatch
                key={key}
                color={swatch.color}
                isSelected={colorTemperature === key}
                onClick={() =>
                  updateLightSettings({
                    colorTemperature: key as ColorTemperature,
                  })
                }
                ariaLabel={`${key} color`}
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
      </ControlPanel>
    </div>
  );
}

