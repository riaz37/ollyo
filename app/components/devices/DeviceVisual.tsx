'use client';

import type { DeviceVisualProps } from '@/app/types/device.types';

export default function DeviceVisual({ children, className = '' }: DeviceVisualProps) {
  return (
    <div className={`flex-1 flex items-center justify-center ${className}`}>
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

