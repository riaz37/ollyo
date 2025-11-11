'use client';

import { useEffect } from 'react';
import Image from 'next/image';

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
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-5">
      <div className="px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 bg-toast">
        {/* Tick mark */}
        <Image
          src="/check.svg"
          alt="check"
          width={24}
          height={24}
          className="flex-shrink-0"
        />
        {message}
      </div>
    </div>
  );
}

