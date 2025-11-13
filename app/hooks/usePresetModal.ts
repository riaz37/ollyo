import { useState, useCallback } from 'react';
import type { UsePresetModalOptions } from '@/app/types/hooks.types';

export function usePresetModal({ onSave, onCancel }: UsePresetModalOptions) {
  const [showModal, setShowModal] = useState(false);
  const [presetName, setPresetName] = useState('');

  const openModal = useCallback(() => {
    setShowModal(true);
    setPresetName('');
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setPresetName('');
    onCancel?.();
  }, [onCancel]);

  const handleSave = useCallback(() => {
    if (!presetName.trim()) return;
    onSave(presetName.trim());
    closeModal();
  }, [presetName, onSave, closeModal]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSave();
      }
    },
    [handleSave]
  );

  return {
    showModal,
    presetName,
    setPresetName,
    openModal,
    closeModal,
    handleSave,
    handleKeyDown,
  };
}

