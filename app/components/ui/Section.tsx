'use client';

import SectionHeader from './SectionHeader';
import type { SectionProps } from '@/app/types/ui.types';

export default function Section({ title, children, className = '', headerClassName = '' }: SectionProps) {
  return (
    <div className={className}>
      <SectionHeader title={title} className={headerClassName} />
      {children}
    </div>
  );
}

