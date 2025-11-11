'use client';

import { ReactNode } from 'react';
import SectionHeader from './SectionHeader';

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
}

export default function Section({ title, children, className = '', headerClassName = '' }: SectionProps) {
  return (
    <div className={className}>
      <SectionHeader title={title} className={headerClassName} />
      {children}
    </div>
  );
}

