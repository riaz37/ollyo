import type { DeviceType } from './store.types';

export interface UseDragAndDropOptions {
  onDrop: (deviceType: DeviceType) => void;
  allowedTypes?: DeviceType[];
}

export interface UsePresetModalOptions {
  onSave: (name: string) => void;
  onCancel?: () => void;
}

