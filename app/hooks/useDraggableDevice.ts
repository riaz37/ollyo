import { useCallback } from 'react';
import type { DeviceType } from '@/app/types/store.types';
import { useAppStore } from '@/app/store';

export function useDraggableDevice(type: NonNullable<DeviceType>) {
  const { activeDevice } = useAppStore();
  const isSelected = activeDevice === type;

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      e.dataTransfer.setData('deviceType', type);
      e.dataTransfer.effectAllowed = 'move';
    },
    [type]
  );

  return {
    isSelected,
    handleDragStart,
  };
}

