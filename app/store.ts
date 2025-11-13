import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  DeviceType,
  ColorTemperature,
  LightSettings,
  FanSettings,
  Preset,
  AppState,
} from '@/app/types/store.types';

export type { DeviceType, ColorTemperature, LightSettings, FanSettings, Preset };

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

