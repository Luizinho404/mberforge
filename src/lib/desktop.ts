export type PathValidation = { valid: boolean; message: string };

export function isDesktopApp(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
}

async function chooseExecutable(title: string): Promise<string | null> {
  if (!isDesktopApp()) return null;
  const { open } = await import('@tauri-apps/plugin-dialog');
  const selected = await open({ multiple: false, directory: false, title, filters: [{ name: 'Executável', extensions: ['exe'] }] });
  return typeof selected === 'string' ? selected : null;
}

export const chooseGameExecutable = () => chooseExecutable('Selecione o enshrouded.exe');
export const choosePatcherExecutable = () => chooseExecutable('Selecione seu patcher externo');

async function invokeValidation(command: string, path: string): Promise<PathValidation> {
  const { invoke } = await import('@tauri-apps/api/core');
  return invoke<PathValidation>(command, { path });
}

export const validateGameExecutable = (path: string) => invokeValidation('validate_game_executable', path);
export const validatePatcherExecutable = (path: string) => invokeValidation('validate_patcher_executable', path);

export async function isEnshroudedRunning(): Promise<boolean> {
  if (!isDesktopApp()) return false;
  const { invoke } = await import('@tauri-apps/api/core');
  return invoke<boolean>('is_enshrouded_running');
}

export type ApplyResult = { success: boolean; message: string; backup_path: string | null };

export async function chooseConfigJson(): Promise<string | null> {
  if (!isDesktopApp()) return null;
  const { open } = await import('@tauri-apps/plugin-dialog');
  const selected = await open({ multiple: false, directory: false, title: 'Selecione o config.json que será atualizado', filters: [{ name: 'JSON', extensions: ['json'] }] });
  return typeof selected === 'string' ? selected : null;
}

export async function applyPatcher(patcherPath: string, configPath: string, configContent: string): Promise<ApplyResult> {
  const { invoke } = await import('@tauri-apps/api/core');
  return invoke<ApplyResult>('apply_patcher', { patcherPath, configPath, configContent });
}
