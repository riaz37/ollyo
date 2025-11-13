import { useState, useCallback } from 'react';
import type { DeviceType } from '@/app/types/store.types';
import type { UseDragAndDropOptions } from '@/app/types/hooks.types';

export function useDragAndDrop({ onDrop, allowedTypes }: UseDragAndDropOptions) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDraggingOver(false);

      const deviceType = e.dataTransfer.getData('deviceType') as DeviceType;
      if (deviceType && (!allowedTypes || allowedTypes.includes(deviceType))) {
        onDrop(deviceType);
      }
    },
    [onDrop, allowedTypes]
  );

  return {
    isDraggingOver,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}

