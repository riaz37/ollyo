'use client';

import { useState } from 'react';
import { useAppStore } from '../store';
import LightDevice from './LightDevice';
import FanDevice from './FanDevice';
import Modal from './Modal';
import Toast from './Toast';

export default function Canvas() {
  const { activeDevice, setActiveDevice, savePreset, clearCanvas } = useAppStore();
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);

    const deviceType = e.dataTransfer.getData('deviceType') as 'light' | 'fan' | null;
    if (deviceType && (deviceType === 'light' || deviceType === 'fan')) {
      setActiveDevice(deviceType);
    }
  };

  const handleSavePreset = () => {
    if (!presetName.trim()) return;
    
    savePreset(presetName.trim());
    setShowModal(false);
    setPresetName('');
    setShowToast(true);
  };

  const handleClear = () => {
    clearCanvas();
  };

  const renderDevice = () => {
    if (activeDevice === 'light') {
      return <LightDevice />;
    } else if (activeDevice === 'fan') {
      return <FanDevice />;
    }
    return null;
  };

  return (
    <div className="flex-1 relative flex flex-col h-screen bg-[#0f1419]">
      {/* Top Right Buttons */}
      {activeDevice && (
        <div className="absolute top-4 right-4 z-10 flex gap-3">
          <button
            onClick={handleClear}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium transition-colors"
          >
            Clear
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
          >
            Save Preset
          </button>
        </div>
      )}

      {/* Canvas Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          flex-1 flex items-center justify-center p-8
          ${isDraggingOver ? 'bg-[#1a2332]' : ''}
          transition-colors duration-200
        `}
      >
        {activeDevice ? (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            {renderDevice()}
          </div>
        ) : (
          <div className="text-center">
            {isDraggingOver ? (
              <div className="text-6xl text-blue-500 animate-pulse">+</div>
            ) : (
              <p className="text-xl text-gray-500">Drag anything here</p>
            )}
          </div>
        )}
      </div>

      {/* Save Preset Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setPresetName('');
        }}
        title="Give me a name"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSavePreset();
              }
            }}
            placeholder="Name it"
            className="w-full px-4 py-3 rounded-lg bg-[#0f1419] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <p className="text-sm text-gray-400">
            By adding this effect as a preset you can reuse this anytime.
          </p>
          <div className="flex gap-3 justify-end pt-2">
            <button
              onClick={() => {
                setShowModal(false);
                setPresetName('');
              }}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSavePreset}
              disabled={!presetName.trim()}
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Preset
            </button>
          </div>
        </div>
      </Modal>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message="Preset saved"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

