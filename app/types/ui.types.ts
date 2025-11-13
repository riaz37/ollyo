import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export interface ControlPanelProps {
  children: ReactNode;
  className?: string;
}

export interface ControlRowProps {
  label: string;
  checked: boolean;
  onToggle: (checked: boolean) => void;
  className?: string;
}

export interface ColorSwatchProps {
  color: string;
  isSelected: boolean;
  onClick: () => void;
  ariaLabel: string;
  className?: string;
}

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
}

export interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface SectionHeaderProps {
  title: string;
  className?: string;
}

export interface EmptyStateProps {
  message: string;
  className?: string;
}

export interface DeviceIconProps {
  type: 'light' | 'fan';
  size?: 20 | 24;
  className?: string;
}

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

