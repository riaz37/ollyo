'use client';

import { useAppStore, type Preset } from '../../store';
import DeviceIcon from '../ui/DeviceIcon';
import Section from '../ui/Section';
import EmptyState from '../ui/EmptyState';

interface DraggableDeviceProps {
  type: 'light' | 'fan';
  label: string;
}

function DraggableDevice({ type, label }: DraggableDeviceProps) {
  const { activeDevice } = useAppStore();
  const isSelected = activeDevice === type;

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('deviceType', type);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="relative flex items-center">
      {/* Blue dot indicator when selected */}
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

  return (
    <div className="w-[200px] bg-sidebar border-r border-gray-800 flex flex-col h-screen overflow-y-auto">
      {/* Devices Section */}
      <Section title="Devices" className="p-4 border-b border-gray-800">
        <div className="space-y-2">
          <DraggableDevice type="light" label="Light" />
          <DraggableDevice type="fan" label="Fan" />
        </div>
      </Section>

      {/* Saved Presets Section */}
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

