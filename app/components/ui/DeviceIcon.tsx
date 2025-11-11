'use client';

import Image from 'next/image';

interface DeviceIconProps {
  type: 'light' | 'fan';
  size?: 20 | 24;
  className?: string;
}

const iconMap = {
  light: '/lighticon.svg',
  fan: '/fanicon.svg',
};

const sizeClasses = {
  20: 'w-5 h-5',
  24: 'w-6 h-6',
};

export default function DeviceIcon({ type, size = 24, className = '' }: DeviceIconProps) {
  return (
    <Image
      src={iconMap[type]}
      alt={type === 'light' ? 'Light' : 'Fan'}
      width={size}
      height={size}
      className={className || sizeClasses[size]}
    />
  );
}

