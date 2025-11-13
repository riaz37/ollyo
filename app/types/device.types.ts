import type { DeviceType } from './store.types';
import { ReactNode } from 'react';

export interface DeviceConfig {
  type: DeviceType;
  label: string;
  icon: string;
  component: React.ComponentType;
}

export interface ColorSwatchConfig {
  color: string;
  variable: string;
}

export interface DeviceVisualProps {
  children: ReactNode;
  className?: string;
}

export interface BaseDeviceProps {
  power: boolean;
  onPowerToggle: (checked: boolean) => void;
  visual: ReactNode;
  controls: ReactNode;
  className?: string;
}

export interface DraggableDeviceProps {
  type: NonNullable<DeviceType>;
  label: string;
}

