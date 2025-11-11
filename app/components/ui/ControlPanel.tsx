'use client';

import { ReactNode } from 'react';

interface ControlPanelProps {
  children: ReactNode;
  className?: string;
}

export default function ControlPanel({ children, className = '' }: ControlPanelProps) {
  return (
    <div className={`w-full flex justify-center pb-8 ${className}`}>
      <div className="w-full max-w-md rounded-xl py-6 px-6 space-y-6 bg-panel">
        {children}
      </div>
    </div>
  );
}

