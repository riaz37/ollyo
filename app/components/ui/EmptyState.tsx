'use client';

import type { EmptyStateProps } from '@/app/types/ui.types';

export default function EmptyState({ message, className = '' }: EmptyStateProps) {
  return (
    <p className={`text-xs text-gray-500 italic ${className}`}>
      {message}
    </p>
  );
}

