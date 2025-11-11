'use client';

import { ReactNode } from 'react';

interface DeviceVisualProps {
  children: ReactNode;
  className?: string;
}

export default function DeviceVisual({ children, className = '' }: DeviceVisualProps) {
  return (
    <div className={`flex-1 flex items-center justify-center ${className}`}>
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

