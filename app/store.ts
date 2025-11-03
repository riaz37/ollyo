import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

interface AppState {
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

const defaultLightSettings: LightSettings = {
  power: false,
  brightness: 50,
  colorTemperature: 'warm',
};

const defaultFanSettings: FanSettings = {
  power: false,
  speed: 50,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      activeDevice: null,
      lightSettings: defaultLightSettings,
      fanSettings: defaultFanSettings,
      presets: [],

      setActiveDevice: (device) => set({ activeDevice: device }),

      updateLightSettings: (settings) =>
        set((state) => ({
          lightSettings: { ...state.lightSettings, ...settings },
        })),

      updateFanSettings: (settings) =>
        set((state) => ({
          fanSettings: { ...state.fanSettings, ...settings },
        })),

      savePreset: (name) =>
        set((state) => {
          if (!state.activeDevice) return state;

          const preset: Preset = {
            id: Date.now().toString(),
            name,
            deviceType: state.activeDevice,
            settings:
              state.activeDevice === 'light'
                ? state.lightSettings
                : state.fanSettings,
          };

          return {
            presets: [...state.presets, preset],
          };
        }),

      loadPreset: (preset) =>
        set((state) => {
          if (preset.deviceType === 'light') {
            return {
              activeDevice: 'light',
              lightSettings: preset.settings as LightSettings,
            };
          } else {
            return {
              activeDevice: 'fan',
              fanSettings: preset.settings as FanSettings,
            };
          }
        }),

      deletePreset: (id) =>
        set((state) => ({
          presets: state.presets.filter((p) => p.id !== id),
        })),

      clearCanvas: () =>
        set({
          activeDevice: null,
          lightSettings: defaultLightSettings,
          fanSettings: defaultFanSettings,
        }),
    }),
    {
      name: 'smart-home-storage',
    }
  )
);

