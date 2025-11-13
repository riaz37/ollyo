'use client';

import { useAppStore } from '@/app/store';
import type { Preset } from '@/app/types/store.types';
import DeviceIcon from '@/app/components/ui/DeviceIcon';
import Section from '@/app/components/ui/Section';
import EmptyState from '@/app/components/ui/EmptyState';
import { getAllDeviceTypes, getDeviceLabel } from '@/app/config/deviceRegistry';
import { useDraggableDevice } from '@/app/hooks/useDraggableDevice';
import type { DraggableDeviceProps } from '@/app/types/device.types';

function DraggableDevice({ type, label }: DraggableDeviceProps) {
  const { isSelected, handleDragStart } = useDraggableDevice(type);

  return (
    <div className="relative flex items-center">
      {isSelected && (
        <div className="absolute left-0 w-2 h-2 rounded-full -ml-4 z-10 bg-blue-dot" />
      )}
      <div
        draggable
        onDragStart={handleDragStart}
          className={`
          flex items-center gap-3 p-3 rounded-[0.625rem] cursor-grab active:cursor-grabbing transition-colors duration-200 flex-1
          ${isSelected
            ? 'bg-device-selected'
            : 'bg-device-item border border-gray-700 hover:bg-device-item-hover'
          }
        `}
      >
        <div className="w-6 h-6">
          <DeviceIcon type={type} size={24} />
        </div>
        <span className="text-gray-200 font-medium">{label}</span>
      </div>
    </div>
  );
}

function PresetItem({ preset }: { preset: Preset }) {
  const { loadPreset } = useAppStore();

  return (
    <button
      onClick={() => loadPreset(preset)}
      className="w-full flex items-center gap-3 p-3 rounded-lg bg-device-item border border-gray-700 hover:bg-device-item-hover transition-colors text-left"
    >
      <div className="text-gray-400">
        <DeviceIcon type={preset.deviceType} size={20} />
      </div>
      <span className="text-gray-200 text-sm font-medium flex-1 truncate">
        {preset.name}
      </span>
    </button>
  );
}

export default function Sidebar() {
  const { presets } = useAppStore();
  const deviceTypes = getAllDeviceTypes();

  return (
    <div className="w-[200px] bg-sidebar border-r border-gray-800 flex flex-col h-screen overflow-y-auto">
      <Section title="Devices" className="p-4 border-b border-gray-800">
        <div className="space-y-2">
          {deviceTypes.map((type) => (
            <DraggableDevice
              key={type}
              type={type}
              label={getDeviceLabel(type)}
            />
          ))}
        </div>
      </Section>

      <Section title="Saved Presets" className="flex-1 p-4">
        {presets.length === 0 ? (
          <EmptyState message="No presets saved yet" />
        ) : (
          <div className="space-y-2">
            {presets.map((preset) => (
              <PresetItem key={preset.id} preset={preset} />
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}

