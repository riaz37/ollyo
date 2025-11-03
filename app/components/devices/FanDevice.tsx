'use client';

import Image from 'next/image';
import { useAppStore } from '../../store';
import Toggle from '../ui/Toggle';
import Slider from '../ui/Slider';

export default function FanDevice() {
  const { fanSettings, updateFanSettings } = useAppStore();
  const { power, speed } = fanSettings;

  // Animation speed based on power and speed
  const animationDuration = power ? 3 - (speed / 100) * 2 : 0; // 1-3 seconds

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Fan Visual - Positioned at top center */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          <div
            className={`relative transition-all duration-300 origin-center ${
              power ? 'brightness-110' : 'brightness-[0.7] grayscale-[0.3]'
            }`}
            style={{
              animation: power ? `fan-spin ${animationDuration}s linear infinite` : 'none',
            }}
          >
            <Image
              src="/Fan.svg"
              alt="Fan device"
              width={328}
              height={320}
              className="w-80 h-auto"
              unoptimized
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
              onChange={(checked) => updateFanSettings({ power: checked })}
            />
          </div>

          {/* Speed Slider */}
          <Slider
            value={speed}
            onChange={(value) => updateFanSettings({ speed: value })}
            min={0}
            max={100}
            label="Speed"
            showPercentage={true}
          />
        </div>
      </div>
    </div>
  );
}

