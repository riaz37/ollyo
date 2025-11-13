'use client';

import Toggle from './Toggle';
import type { ControlRowProps } from '@/app/types/ui.types';

export default function ControlRow({ label, checked, onToggle, className = '' }: ControlRowProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <span className="text-gray-300">{label}</span>
      <Toggle checked={checked} onChange={onToggle} />
    </div>
  );
}

