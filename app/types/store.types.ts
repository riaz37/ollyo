export type DeviceType = 'light' | 'fan' | null;

export type ColorTemperature = 'warm' | 'cool' | 'blue' | 'pink';

export interface LightSettings {
  power: boolean;
  brightness: number; // 0-100
  colorTemperature: ColorTemperature;
}

export interface FanSettings {
  power: boolean;
  speed: number; // 0-100
}

export interface Preset {
  id: string;
  name: string;
  deviceType: 'light' | 'fan';
  settings: LightSettings | FanSettings;
}

export interface AppState {
  activeDevice: DeviceType;
  lightSettings: LightSettings;
  fanSettings: FanSettings;
  presets: Preset[];
  
  setActiveDevice: (device: DeviceType) => void;
  updateLightSettings: (settings: Partial<LightSettings>) => void;
  updateFanSettings: (settings: Partial<FanSettings>) => void;
  savePreset: (name: string) => void;
  loadPreset: (preset: Preset) => void;
  deletePreset: (id: string) => void;
  clearCanvas: () => void;
}

