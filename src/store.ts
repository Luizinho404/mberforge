import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameProfile, AppSettings, ViewState } from './types';

import { defaultPatcherConfig, PatcherSection } from './lib/patcher-schema';

export type PatcherConfig = Record<string, unknown> & Record<PatcherSection, Record<string, Record<string, unknown>>>;
const patcherSections: PatcherSection[] = ['player', 'inventory', 'world', 'gameplay'];

function mergePatcherConfig(config: Record<string, unknown>): PatcherConfig {
  const defaults = defaultPatcherConfig() as PatcherConfig;
  const merged: PatcherConfig = { ...config, ...defaults } as PatcherConfig;
  for (const section of patcherSections) {
    const imported = config[section];
    if (!imported || typeof imported !== 'object' || Array.isArray(imported)) continue;
    merged[section] = { ...merged[section] };
    for (const [key, value] of Object.entries(imported as Record<string, unknown>)) {
      if (value && typeof value === 'object' && !Array.isArray(value)) merged[section][key] = { ...(merged[section][key] ?? {}), ...(value as Record<string, unknown>) };
    }
  }
  if (config.settings && typeof config.settings === 'object' && !Array.isArray(config.settings)) merged.settings = config.settings;
  return merged;
}

function parsePatcherConfig(text: string): PatcherConfig | null {
  try {
    const parsed = JSON.parse(text.replace(/\\(?!["\\/bfnrtu])/g, '\\\\')) as unknown;
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? mergePatcherConfig(parsed as Record<string, unknown>) : null;
  } catch { return null; }
}

interface EmberStore {
  view: ViewState;
  setView: (view: ViewState) => void;
  
  gameDetected: boolean;
  versionCompatible: boolean;

  profiles: GameProfile[];
  addProfile: (profile: Omit<GameProfile, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProfile: (id: string, profile: Partial<GameProfile>) => void;
  deleteProfile: (id: string) => void;
  toggleProfileActive: (id: string) => void;
  duplicateProfile: (id: string) => void;
  importProfile: (jsonString: string) => boolean;
  updateProfileSettings: (id: string, settings: Record<string, any>) => void;
  wipeProfiles: () => void;

  patcherConfig: PatcherConfig;
  updatePatcherOption: (section: PatcherSection, key: string, values: Record<string, unknown>) => void;
  importPatcherConfig: (text: string) => boolean;
  exportPatcherConfig: () => string;


  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: AppSettings = {
  autoLaunch: false,
  theme: 'dark',
  hardwareAcceleration: true,
  overlayEnabled: true,
  language: 'pt-BR',
  minimizeToTray: false,
  confirmBeforeApply: true,
  visualIntensity: 'medium',
  reduceAnimations: false,
};

export const useEmberStore = create<EmberStore>()(
  persist(
    (set, get) => ({
      view: 'dashboard',
      setView: (view) => set({ view }),
      
      gameDetected: false,
      versionCompatible: false,

      profiles: [
        {
          id: '1',
          name: 'Exploração equilibrada',
          gameId: 'sys-perf',
          gameName: 'Global',
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          settings: {
            processPriority: 'high',
            disableBackgroundApps: true,
          },
        },
      ],
      
      addProfile: (profileData) => set((state) => ({
        profiles: [
          ...state.profiles,
          {
            ...profileData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        ]
      })),
      
      updateProfile: (id, data) => set((state) => ({
        profiles: state.profiles.map(p => 
          p.id === id 
            ? { ...p, ...data, updatedAt: new Date().toISOString() }
            : p
        )
      })),
      
      deleteProfile: (id) => set((state) => ({
        profiles: state.profiles.filter(p => p.id !== id)
      })),
      
      toggleProfileActive: (id) => set((state) => ({
        profiles: state.profiles.map(p => {
          if (p.id === id) {
            return { ...p, active: true };
          }
          return { ...p, active: false };
        })
      })),

      duplicateProfile: (id) => {
        const profile = get().profiles.find(p => p.id === id);
        if (profile) {
          get().addProfile({
            name: `${profile.name} (Cópia)`,
            gameId: profile.gameId,
            gameName: profile.gameName,
            active: false,
            settings: { ...profile.settings }
          });
        }
      },

      importProfile: (jsonString: string) => {
        try {
          const data = JSON.parse(jsonString);
          if (data && typeof data === 'object' && data.name && data.gameId) {
            get().addProfile({
              name: data.name,
              gameId: data.gameId,
              gameName: data.gameName || data.gameId,
              active: false,
              settings: data.settings || {}
            });
            return true;
          }
          return false;
        } catch (e) {
          return false;
        }
      },

      updateProfileSettings: (id, settings) => set((state) => ({
        profiles: state.profiles.map(p => 
          p.id === id 
            ? { ...p, settings: { ...p.settings, ...settings }, updatedAt: new Date().toISOString() }
            : p
        )
      })),

      wipeProfiles: () => set({ profiles: [] }),



      patcherConfig: defaultPatcherConfig() as PatcherConfig,
      updatePatcherOption: (section, key, values) => set((state) => ({
        patcherConfig: { ...state.patcherConfig, [section]: { ...state.patcherConfig[section], [key]: { ...(state.patcherConfig[section]?.[key] ?? {}), ...values } } },
      })),
      importPatcherConfig: (text) => {
        const patcherConfig = parsePatcherConfig(text);
        if (!patcherConfig) return false;
        set({ patcherConfig });
        return true;
      },
      exportPatcherConfig: () => JSON.stringify(get().patcherConfig, null, 2),

      settings: { ...defaultSettings },
      
      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),

      resetSettings: () => set({ settings: { ...defaultSettings } }),
    }),
    {
      name: 'emberforge-storage',
    }
  )
);
