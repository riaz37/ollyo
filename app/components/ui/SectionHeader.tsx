'use client';

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export default function SectionHeader({ title, className = '' }: SectionHeaderProps) {
  return (
    <h2 className={`text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 ${className}`}>
      {title}
    </h2>
  );
}

