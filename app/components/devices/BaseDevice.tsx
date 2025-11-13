'use client';

import DeviceVisual from './DeviceVisual';
import ControlPanel from '@/app/components/ui/ControlPanel';
import ControlRow from '@/app/components/ui/ControlRow';
import type { BaseDeviceProps } from '@/app/types/device.types';

export default function BaseDevice({
  power,
  onPowerToggle,
  visual,
  controls,
  className = '',
}: BaseDeviceProps) {
  return (
    <div className={`relative w-full h-full flex flex-col ${className}`}>
      <DeviceVisual>{visual}</DeviceVisual>

      <ControlPanel>
        <ControlRow
          label="Power"
          checked={power}
          onToggle={onPowerToggle}
        />
        {controls}
      </ControlPanel>
    </div>
  );
}

