import { describe, it, expect, beforeEach } from 'vitest';
import { useEmberStore } from './store';

describe('EmberStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useEmberStore.setState({
      profiles: [],
      view: 'dashboard',
      gameDetected: false,
      versionCompatible: false,
      settings: {
        autoLaunch: false,
        theme: 'dark',
        hardwareAcceleration: true,
        overlayEnabled: true,
        language: 'pt-BR',
        minimizeToTray: false,
        confirmBeforeApply: true,
        visualIntensity: 'medium',
        reduceAnimations: false,
      }
    });
  });

  it('should initialize with dashboard view', () => {
    const { view } = useEmberStore.getState();
    expect(view).toBe('dashboard');
  });

  it('should allow adding a profile', () => {
    const { addProfile } = useEmberStore.getState();
    
    addProfile({
      name: 'Test Profile',
      gameId: 'test-game',
      gameName: 'Test Game',
      active: true,
      settings: {}
    });

    const { profiles } = useEmberStore.getState();
    expect(profiles).toHaveLength(1);
    expect(profiles[0].name).toBe('Test Profile');
    expect(profiles[0].gameId).toBe('test-game');
  });

  it('should toggle profile active state', () => {
    const { addProfile, toggleProfileActive } = useEmberStore.getState();
    
    addProfile({
      name: 'Test Profile',
      gameId: 'test-game',
      gameName: 'Test Game',
      active: false,
      settings: {}
    });

    let { profiles } = useEmberStore.getState();
    const profileId = profiles[0].id;
    
    toggleProfileActive(profileId);
    
    profiles = useEmberStore.getState().profiles;
    expect(profiles[0].active).toBe(true);
  });
});
