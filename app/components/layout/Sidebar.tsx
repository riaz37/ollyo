'use client';

import Image from 'next/image';
import { useAppStore, type DeviceType, type Preset } from '../../store';

interface DraggableDeviceProps {
  type: 'light' | 'fan';
  icon: React.ReactNode;
  label: string;
}

function DraggableDevice({ type, icon, label }: DraggableDeviceProps) {
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
        <div className="absolute left-0 w-2 h-2 rounded-full -ml-4 z-10" style={{ background: 'var(--color-blue)' }} />
      )}
      <div
        draggable
        onDragStart={handleDragStart}
        className={`
          flex items-center gap-3 p-3 rounded-[0.625rem] cursor-grab active:cursor-grabbing transition-colors duration-200 flex-1
          ${isSelected
            ? 'bg-device-selected'
            : 'bg-[#1a1f2e] border border-gray-700 hover:bg-[#252a3a]'
          }
        `}
      >
        <div className="w-6 h-6">{icon}</div>
        <span className="text-gray-200 font-medium">{label}</span>
      </div>
    </div>
  );
}

function PresetItem({ preset }: { preset: Preset }) {
  const { loadPreset } = useAppStore();

  const getIcon = () => {
    if (preset.deviceType === 'light') {
      return (
        <Image
          src="/lighticon.svg"
          alt="Light"
          width={20}
          height={20}
          className="w-5 h-5"
        />
      );
    } else {
      return (
        <Image
          src="/fanicon.svg"
          alt="Fan"
          width={20}
          height={20}
          className="w-5 h-5"
        />
      );
    }
  };

  return (
    <button
      onClick={() => loadPreset(preset)}
      className="w-full flex items-center gap-3 p-3 rounded-lg bg-[#1a1f2e] border border-gray-700 hover:bg-[#252a3a] transition-colors text-left"
    >
      <div className="text-gray-400">{getIcon()}</div>
      <span className="text-gray-200 text-sm font-medium flex-1 truncate">
        {preset.name}
      </span>
    </button>
  );
}

export default function Sidebar() {
  const { presets } = useAppStore();

  return (
    <div className="w-[200px] bg-[#1a1f2e] border-r border-gray-800 flex flex-col h-screen overflow-y-auto">
      {/* Devices Section */}
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Devices
        </h2>
        <div className="space-y-2">
          <DraggableDevice
            type="light"
            label="Light"
            icon={
              <Image
                src="/lighticon.svg"
                alt="Light"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            }
          />
          <DraggableDevice
            type="fan"
            label="Fan"
            icon={
              <Image
                src="/fanicon.svg"
                alt="Fan"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            }
          />
        </div>
        <p className="text-xs text-gray-500 mt-3 italic">
          Drag items from here
        </p>
      </div>

      {/* Saved Presets Section */}
      <div className="flex-1 p-4">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Saved Presets
        </h2>
        {presets.length === 0 ? (
          <p className="text-xs text-gray-500 italic">
            No presets saved yet
          </p>
        ) : (
          <div className="space-y-2">
            {presets.map((preset) => (
              <PresetItem key={preset.id} preset={preset} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

