'use client';

interface EmptyStateProps {
  message: string;
  className?: string;
}

export default function EmptyState({ message, className = '' }: EmptyStateProps) {
  return (
    <p className={`text-xs text-gray-500 italic ${className}`}>
      {message}
    </p>
  );
}

