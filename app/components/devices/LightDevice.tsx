'use client';

import Image from 'next/image';
import { useAppStore } from '@/app/store';
import type { ColorTemperature } from '@/app/types/store.types';
import Slider from '@/app/components/ui/Slider';
import ColorSwatch from '@/app/components/ui/ColorSwatch';
import BaseDevice from './BaseDevice';
import { COLOR_SWATCHES } from '@/app/config/devices';

export default function LightDevice() {
  const { lightSettings, updateLightSettings } = useAppStore();
  const { power, brightness, colorTemperature } = lightSettings;

  const glowIntensity = power ? brightness / 100 : 0;
  const selectedColor = COLOR_SWATCHES[colorTemperature];

  const visual = (
    <>
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
    </>
  );

  const controls = (
    <>
      <div className="space-y-3">
        <label className="text-sm text-gray-300">Color Temperature</label>
        <div className="grid grid-cols-4 gap-3 w-full">
          {Object.entries(COLOR_SWATCHES).map(([key, swatch]) => (
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

      <Slider
        value={brightness}
        onChange={(value) => updateLightSettings({ brightness: value })}
        min={0}
        max={100}
        label="Brightness"
        showPercentage={true}
      />
    </>
  );

  return (
    <BaseDevice
      power={power}
      onPowerToggle={(checked) => updateLightSettings({ power: checked })}
      visual={visual}
      controls={controls}
    />
  );
}

