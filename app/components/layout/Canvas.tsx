"use client";

import { useState } from "react";
import { useAppStore } from "@/app/store";
import Modal from "@/app/components/ui/Modal";
import Toast from "@/app/components/ui/Toast";
import Button from "@/app/components/ui/Button";
import { getDeviceComponent } from "@/app/config/deviceRegistry";
import { useDragAndDrop } from "@/app/hooks/useDragAndDrop";
import { usePresetModal } from "@/app/hooks/usePresetModal";

export default function Canvas() {
  const { activeDevice, setActiveDevice, savePreset, clearCanvas } =
    useAppStore();
  const [showToast, setShowToast] = useState(false);

  const { isDraggingOver, handleDragOver, handleDragLeave, handleDrop } =
    useDragAndDrop({
      onDrop: setActiveDevice,
    });

  const {
    showModal,
    presetName,
    setPresetName,
    openModal,
    closeModal,
    handleSave,
    handleKeyDown,
  } = usePresetModal({
    onSave: (name) => {
      savePreset(name);
      setShowToast(true);
    },
  });

  const handleClear = () => {
    clearCanvas();
  };

  const renderDevice = () => {
    const DeviceComponent = getDeviceComponent(activeDevice);
    if (!DeviceComponent) return null;
    return <DeviceComponent />;
  };

  return (
    <div className="flex-1 relative flex flex-col h-screen">
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-2xl font-semibold text-primary">CanvasHome</h1>
      </div>
      {activeDevice && (
        <div className="absolute top-4 right-4 z-10 flex gap-3">
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="primary" onClick={openModal}>
            Save Preset
          </Button>
        </div>
      )}

      {!activeDevice && !isDraggingOver && (
        <div className="absolute top-[100px] z-20">
          <div className="relative bg-blue text-white px-6 py-4 rounded-lg shadow-lg">
            <p className="text-lg font-medium whitespace-nowrap">
              Drag items from here
            </p>
            <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 bubble-tail-left" />
          </div>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center mt-20 mb-0 mx-4">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex-1 flex items-center justify-center p-8 h-full transition-colors duration-200 rounded-[0.875rem] border-t-2 border-top-panel cursor-pointer ${
            isDraggingOver ? "bg-secondary-hover" : "bg-secondary"
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

      <Modal isOpen={showModal} onClose={closeModal} title="Give me a name">
        <div className="space-y-4">
          <input
            type="text"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Name it"
            className="w-full px-4 py-3 rounded-lg bg-input border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 ring-blue"
            autoFocus
          />
          <p className="text-sm text-gray-400"></p>
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={!presetName.trim()}
            >
              Save Preset
            </Button>
          </div>
        </div>
      </Modal>

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
