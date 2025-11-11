'use client';

import { ReactNode } from 'react';
import Toggle from './Toggle';

interface ControlRowProps {
  label: string;
  checked: boolean;
  onToggle: (checked: boolean) => void;
  className?: string;
}

export default function ControlRow({ label, checked, onToggle, className = '' }: ControlRowProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <span className="text-gray-300">{label}</span>
      <Toggle checked={checked} onChange={onToggle} />
    </div>
  );
}

