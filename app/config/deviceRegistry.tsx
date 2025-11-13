'use client';

import { ComponentType } from 'react';
import type { DeviceType } from '@/app/types/store.types';
import LightDevice from '@/app/components/devices/LightDevice';
import FanDevice from '@/app/components/devices/FanDevice';
import { DEVICE_LABELS } from './devices';

export const DEVICE_REGISTRY: Record<
  NonNullable<DeviceType>,
  {
    component: ComponentType;
    label: string;
  }
> = {
  light: {
    component: LightDevice,
    label: DEVICE_LABELS.light,
  },
  fan: {
    component: FanDevice,
    label: DEVICE_LABELS.fan,
  },
};

export const getDeviceComponent = (type: DeviceType) => {
  if (!type) return null;
  return DEVICE_REGISTRY[type]?.component || null;
};

export const getDeviceLabel = (type: DeviceType) => {
  if (!type) return '';
  return DEVICE_REGISTRY[type]?.label || '';
};

export const getAllDeviceTypes = (): NonNullable<DeviceType>[] => {
  return Object.keys(DEVICE_REGISTRY) as NonNullable<DeviceType>[];
};

