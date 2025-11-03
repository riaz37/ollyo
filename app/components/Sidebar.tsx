'use client';

import { useAppStore, type DeviceType, type Preset } from '../store';

interface DraggableDeviceProps {
  type: 'light' | 'fan';
  icon: React.ReactNode;
  label: string;
}

function DraggableDevice({ type, icon, label }: DraggableDeviceProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('deviceType', type);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1f2e] border border-gray-700 cursor-grab active:cursor-grabbing hover:bg-[#252a3a] transition-colors"
    >
      <div className="text-2xl">{icon}</div>
      <span className="text-gray-200 font-medium">{label}</span>
    </div>
  );
}

function PresetItem({ preset }: { preset: Preset }) {
  const { loadPreset } = useAppStore();

  const getIcon = () => {
    if (preset.deviceType === 'light') {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.05-.682.097-1H7.903a13.838 13.838 0 01.097 1h4z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.5 2a.5.5 0 010 1h-3a.5.5 0 010-1h3zm5 9.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
          <path fillRule="evenodd" d="M10 6a4 4 0 100 8 4 4 0 000-8zm-5 4a5 5 0 1110 0 5 5 0 01-10 0z" clipRule="evenodd" />
        </svg>
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
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.05-.682.097-1H7.903a13.838 13.838 0 01.097 1h4z" />
              </svg>
            }
          />
          <DraggableDevice
            type="fan"
            label="Fan"
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.5 2a.5.5 0 010 1h-3a.5.5 0 010-1h3zm5 9.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                <path fillRule="evenodd" d="M10 6a4 4 0 100 8 4 4 0 000-8zm-5 4a5 5 0 1110 0 5 5 0 01-10 0z" clipRule="evenodd" />
              </svg>
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

