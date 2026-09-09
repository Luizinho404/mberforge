export type ViewState = 'dashboard' | 'jogador' | 'inventario' | 'mundo' | 'construcao' | 'perfis' | 'configuracoes';

export interface GameProfile {
  id: string;
  name: string;
  gameId: string;
  gameName: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  settings: Record<string, string | boolean | number>;
}

export interface AppSettings {
  autoLaunch: boolean;
  theme: 'dark' | 'system' | 'light';
  hardwareAcceleration: boolean;
  overlayEnabled: boolean;
  language: string;
  minimizeToTray: boolean;
  confirmBeforeApply: boolean;
  visualIntensity: 'low' | 'medium' | 'high';
  reduceAnimations: boolean;
}
