'use client';

import Image from 'next/image';
import { useAppStore } from '../../store';
import Slider from '../ui/Slider';
import ControlPanel from '../ui/ControlPanel';
import ControlRow from '../ui/ControlRow';
import DeviceVisual from './DeviceVisual';

export default function FanDevice() {
  const { fanSettings, updateFanSettings } = useAppStore();
  const { power, speed } = fanSettings;

  // Animation speed based on power and speed
  const animationDuration = power ? 3 - (speed / 100) * 2 : 0; // 1-3 seconds

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Fan Visual - Positioned at top center */}
      <DeviceVisual>
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
      </DeviceVisual>

      {/* Control Panel - Positioned at bottom */}
      <ControlPanel>
        {/* Power Toggle */}
        <ControlRow
          label="Power"
          checked={power}
          onToggle={(checked) => updateFanSettings({ power: checked })}
        />

        {/* Speed Slider */}
        <Slider
          value={speed}
          onChange={(value) => updateFanSettings({ speed: value })}
          min={0}
          max={100}
          label="Speed"
          showPercentage={true}
        />
      </ControlPanel>
    </div>
  );
}

