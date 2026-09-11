export type GamePathValidation = { valid: boolean; message: string };

export function isDesktopApp(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
}

export async function chooseGameExecutable(): Promise<string | null> {
  if (!isDesktopApp()) return null;
  const { open } = await import('@tauri-apps/plugin-dialog');
  const selected = await open({
    multiple: false,
    directory: false,
    filters: [{ name: 'Enshrouded', extensions: ['exe'] }],
  });
  return typeof selected === 'string' ? selected : null;
}

export async function validateGameExecutable(path: string): Promise<GamePathValidation> {
  const { invoke } = await import('@tauri-apps/api/core');
  return invoke<GamePathValidation>('validate_game_executable', { path });
}
