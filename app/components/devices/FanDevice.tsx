'use client';

import Image from 'next/image';
import { useAppStore } from '@/app/store';
import Slider from '@/app/components/ui/Slider';
import BaseDevice from './BaseDevice';

export default function FanDevice() {
  const { fanSettings, updateFanSettings } = useAppStore();
  const { power, speed } = fanSettings;

  const animationDuration = power ? 3 - (speed / 100) * 2 : 0;

  const visual = (
    <div
      className={`relative transition-all duration-300 origin-center ${
        power ? 'brightness-110 fan-spin-animation' : 'brightness-[0.7] grayscale-[0.3]'
      }`}
      style={power ? { animationDuration: `${animationDuration}s` } : undefined}
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
  );

  const controls = (
    <Slider
      value={speed}
      onChange={(value) => updateFanSettings({ speed: value })}
      min={0}
      max={100}
      label="Speed"
      showPercentage={true}
    />
  );

  return (
    <BaseDevice
      power={power}
      onPowerToggle={(checked) => updateFanSettings({ power: checked })}
      visual={visual}
      controls={controls}
    />
  );
}

