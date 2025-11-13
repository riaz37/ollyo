import type { DeviceType, ColorTemperature } from '@/app/types/store.types';
import type { DeviceConfig, ColorSwatchConfig } from '@/app/types/device.types';

export type { DeviceConfig, ColorSwatchConfig };

export const COLOR_SWATCHES: Record<ColorTemperature, ColorSwatchConfig> = {
  warm: { color: '#FFE5B4', variable: 'var(--color-warm)' },
  cool: { color: '#F0F8FF', variable: 'var(--color-cool)' },
  blue: { color: '#87CEEB', variable: 'var(--color-light-blue)' },
  pink: { color: '#87CEEB', variable: 'var(--color-pink)' },
};

export const DEVICE_LABELS: Record<NonNullable<DeviceType>, string> = {
  light: 'Light',
  fan: 'Fan',
};

