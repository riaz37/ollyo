'use client';

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = 'success',
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5">
      <div
        className={`
          px-4 py-3 rounded-lg shadow-lg text-white font-medium
          ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}
        `}
      >
        {message}
      </div>
    </div>
  );
}

