'use client';

import { useState } from 'react';
import { useAppStore } from '../../store';
import LightDevice from '../devices/LightDevice';
import FanDevice from '../devices/FanDevice';
import Modal from '../ui/Modal';
import Toast from '../ui/Toast';
import Button from '../ui/Button';

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
    <div className="flex-1 relative flex flex-col h-screen">
      {/* Title */}
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-2xl font-semibold text-primary">
          CanvasHome
        </h1>
      </div>
      {/* Top Right Buttons */}
      {activeDevice && (
        <div className="absolute top-4 right-4 z-10 flex gap-3">
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Save Preset
          </Button>
        </div>
      )}

      {/* Bubble pointing to Devices section - positioned relative to sidebar */}
      {!activeDevice && !isDraggingOver && (
        <div className="absolute top-[100px] z-20">
          {/* Speech bubble */}
          <div className="relative bg-blue text-white px-6 py-4 rounded-lg shadow-lg">
            <p className="text-lg font-medium whitespace-nowrap">Drag items from here</p>
            {/* Bubble tail pointing left towards Devices section */}
            <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 bubble-tail-left" />
          </div>
        </div>
      )}

      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center mt-20 mb-0 mx-4">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex-1 flex items-center justify-center p-8 h-full transition-colors duration-200 rounded-[0.875rem] border-t-2 border-top-panel cursor-pointer ${
            isDraggingOver ? 'bg-secondary-hover' : 'bg-secondary'
          }`}
        >
          {activeDevice ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 w-full h-full">
              {renderDevice()}
            </div>
          ) : (
            <>
              {isDraggingOver && (
                <div className="text-6xl text-blue animate-pulse">+</div>
              )}
            </>
          )}
        </div>
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
            className="w-full px-4 py-3 rounded-lg bg-input border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 ring-blue"
            autoFocus
          />
          <p className="text-sm text-gray-400">
            By adding this effect as a preset you can reuse this anytime.
          </p>
          <div className="flex gap-3 justify-end pt-2">
            <Button
              variant="secondary"
              onClick={() => {
                setShowModal(false);
                setPresetName('');
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSavePreset}
              disabled={!presetName.trim()}
            >
              Save Preset
            </Button>
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

