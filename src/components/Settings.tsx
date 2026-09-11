import { useEmberStore } from '../store';
import { Card } from './ui/Card';
import { ChangeEvent, useRef, useState } from 'react';
import { applyPatcher, chooseConfigJson, chooseGameExecutable, choosePatcherExecutable, isDesktopApp, isEnshroudedRunning, validateGameExecutable, validatePatcherExecutable } from '../lib/desktop';

export function Settings() {
  const { settings, updateSettings, resetSettings, wipeProfiles, importPatcherConfig, exportPatcherConfig } = useEmberStore();
  const configInputRef = useRef<HTMLInputElement>(null);
  const [configMessage, setConfigMessage] = useState('Nenhum arquivo importado nesta sessão.');
  const [originalConfig, setOriginalConfig] = useState<string | null>(null);
  const [gamePath, setGamePath] = useState('');
  const [patcherPath, setPatcherPath] = useState('');
  const [patcherMessage, setPatcherMessage] = useState('Selecione seu patcher externo.');
  const [preflightMessage, setPreflightMessage] = useState('Aguardando validação.');
  const [configPath, setConfigPath] = useState('');
  const [applyMessage, setApplyMessage] = useState('Nenhuma aplicação executada nesta sessão.');
  const [gameMessage, setGameMessage] = useState(isDesktopApp() ? 'Selecione a instalação do Enshrouded.' : 'Disponível no aplicativo Windows.');

  const handleReset = () => {
    if (settings.confirmBeforeApply && !window.confirm('Deseja realmente restaurar as configurações originais?')) return;
    resetSettings();
  };

  const handleWipe = () => {
    if (settings.confirmBeforeApply && !window.confirm('CUIDADO: Isso excluirá todos os perfis locais permanentemente. Deseja continuar?')) return;
    wipeProfiles();
  };


  const handleConfigImport = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const source = typeof reader.result === 'string' ? reader.result : '';
      const valid = Boolean(source) && importPatcherConfig(source);
      if (valid) setOriginalConfig(source);
      setConfigMessage(valid ? `Configuração “${file.name}” importada e validada. A cópia original será baixada antes da exportação.` : 'Não foi possível validar este arquivo. Selecione um config.json compatível.');
    };
    reader.onerror = () => setConfigMessage('Não foi possível ler o arquivo selecionado.');
    reader.readAsText(file);
    event.target.value = '';
  };

  const downloadJson = (content: string, filename: string) => {
    const url = URL.createObjectURL(new Blob([content], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleConfigExport = () => {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    if (originalConfig) downloadJson(originalConfig, `config.backup-${stamp}.json`);
    downloadJson(exportPatcherConfig(), 'config.json');
    setConfigMessage(originalConfig ? 'Backup original e novo config.json preparados para download.' : 'Novo config.json preparado para download. Importe um arquivo antes de exportar para gerar backup automático.');
  };

  const handleGameSelection = async () => {
    if (!isDesktopApp()) {
      setGameMessage('Abra o EmberForge para Windows para selecionar a instalação do jogo.');
      return;
    }
    try {
      const selected = await chooseGameExecutable();
      if (!selected) return;
      setGamePath(selected);
      const result = await validateGameExecutable(selected);
      setGameMessage(result.message);
    } catch {
      setGameMessage('Não foi possível validar a instalação selecionada.');
    }
  };

  const handlePatcherSelection = async () => {
    if (!isDesktopApp()) { setPatcherMessage('Abra o EmberForge para Windows para selecionar o patcher.'); return; }
    try {
      const selected = await choosePatcherExecutable();
      if (!selected) return;
      setPatcherPath(selected);
      const result = await validatePatcherExecutable(selected);
      setPatcherMessage(result.message);
    } catch { setPatcherMessage('Não foi possível validar o patcher selecionado.'); }
  };

  const handlePreflight = async () => {
    if (!gamePath || !patcherPath) { setPreflightMessage('Selecione o jogo e o patcher antes de continuar.'); return; }
    const running = await isEnshroudedRunning();
    setPreflightMessage(running ? 'Feche o Enshrouded antes de aplicar o patch.' : 'Pré-verificação concluída: jogo fechado e caminhos validados.');
  };

  const handleConfigTarget = async () => {
    if (!isDesktopApp()) { setApplyMessage('Abra o EmberForge para Windows para selecionar o config.json real.'); return; }
    const selected = await chooseConfigJson();
    if (selected) { setConfigPath(selected); setApplyMessage('config.json selecionado. Revise e confirme antes de aplicar.'); }
  };

  const handleApplyPatcher = async () => {
    if (!gamePath || !patcherPath || !configPath) { setApplyMessage('Selecione jogo, patcher e config.json antes de aplicar.'); return; }
    if (!window.confirm('O EmberForge criará um backup do config.json, salvará as opções atuais e iniciará o patcher. O jogo deve permanecer fechado. Deseja continuar?')) return;
    try {
      const result = await applyPatcher(patcherPath, configPath, exportPatcherConfig());
      setApplyMessage(result.backup_path ? `${result.message} Backup: ${result.backup_path}` : result.message);
    } catch { setApplyMessage('Não foi possível iniciar a aplicação do patch.'); }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto w-full space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Configurações</h2>
        <p className="text-[var(--color-on-surface-variant)]">Personalize o comportamento do EmberForge.</p>
      </div>
      
      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--color-primary)]">tune</span>
            Geral
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-white">Idioma</h4>
                <p className="text-xs text-[var(--color-on-surface-variant)] mt-1">Selecione o idioma da interface.</p>
              </div>
              <select 
                className="bg-[var(--color-surface-container-low)] border border-[var(--color-surface-container-high)] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]/50 transition-colors"
                value={settings.language}
                onChange={(e) => updateSettings({ language: e.target.value })}
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Español</option>
              </select>
            </div>
            
            <div className="h-px bg-[var(--color-surface-container-highest)] w-full" />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-white">Minimizar para a bandeja</h4>
                <p className="text-xs text-[var(--color-on-surface-variant)] mt-1">Ao fechar, manter o EmberForge rodando em segundo plano.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.minimizeToTray}
                  onChange={(e) => updateSettings({ minimizeToTray: e.target.checked })}
                />
                <div className="w-11 h-6 bg-[var(--color-surface-container-highest)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
              </label>
            </div>

            <div className="h-px bg-[var(--color-surface-container-highest)] w-full" />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-white">Confirmar antes de aplicar</h4>
                <p className="text-xs text-[var(--color-on-surface-variant)] mt-1">Exibir um alerta antes de aplicar cheats ou configurações destrutivas.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={settings.confirmBeforeApply}
                  onChange={(e) => updateSettings({ confirmBeforeApply: e.target.checked })}
                />
                <div className="w-11 h-6 bg-[var(--color-surface-container-highest)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
              </label>
            </div>
          </div>
        </Card>


        <Card className="p-6">
          <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--color-primary)]">sports_esports</span>
            Instalação do jogo
          </h3>
          <p className="text-sm text-[var(--color-on-surface-variant)] mb-4">
            Selecione o enshrouded.exe. O EmberForge verifica o arquivo antes de liberar a aplicação do patch.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={handleGameSelection} className="px-4 py-2 rounded-lg text-sm bg-[var(--color-surface-container-low)] border border-[var(--color-surface-container-high)] text-white hover:border-[var(--color-primary)]/50 transition-colors">Localizar Enshrouded</button>
            {gamePath && <code className="max-w-full truncate px-3 py-2 text-xs text-[var(--color-primary)] bg-[var(--color-surface-container-low)] rounded-lg">{gamePath}</code>}
          </div>
          <p className="text-xs text-[var(--color-on-surface-variant)] mt-4" role="status">{gameMessage}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--color-tertiary)]">extension</span>
            Patcher externo
          </h3>
          <p className="text-sm text-[var(--color-on-surface-variant)] mb-4">
            Selecione a cópia do patcher que você já possui. O EmberForge não distribui executáveis de terceiros.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={handlePatcherSelection} className="px-4 py-2 rounded-lg text-sm bg-[var(--color-surface-container-low)] border border-[var(--color-surface-container-high)] text-white hover:border-[var(--color-primary)]/50 transition-colors">Localizar patcher</button>
            {patcherPath && <code className="max-w-full truncate px-3 py-2 text-xs text-[var(--color-tertiary)] bg-[var(--color-surface-container-low)] rounded-lg">{patcherPath}</code>}
          </div>
          <p className="text-xs text-[var(--color-on-surface-variant)] mt-4" role="status">{patcherMessage}</p>
          <div className="mt-5 pt-5 border-t border-[var(--color-surface-container-highest)]">
            <div className="flex flex-wrap gap-3">
              <button onClick={handlePreflight} className="px-4 py-2 rounded-lg text-sm bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/20 transition-colors">Verificar antes de aplicar</button>
              <button onClick={handleConfigTarget} className="px-4 py-2 rounded-lg text-sm bg-[var(--color-surface-container-low)] border border-[var(--color-surface-container-high)] text-white hover:border-[var(--color-primary)]/50 transition-colors">Selecionar config.json</button>
              <button onClick={handleApplyPatcher} className="px-4 py-2 rounded-lg text-sm bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:brightness-110 transition-colors">Aplicar patch</button>
            </div>
            {configPath && <code className="block max-w-full truncate mt-3 px-3 py-2 text-xs text-[var(--color-primary)] bg-[var(--color-surface-container-low)] rounded-lg">{configPath}</code>}
            <p className="text-xs text-[var(--color-on-surface-variant)] mt-3" role="status">{preflightMessage}</p>
            <p className="text-xs text-[var(--color-on-surface-variant)] mt-2" role="status">{applyMessage}</p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--color-primary)]">data_object</span>
            Patcher Mode — config.json
          </h3>
          <p className="text-sm text-[var(--color-on-surface-variant)] mb-6">
            Importe a configuração existente, ajuste as opções no painel e exporte o JSON pronto. Aplicar o patch e reiniciar o jogo continuam sendo etapas externas.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => configInputRef.current?.click()} className="px-4 py-2 rounded-lg text-sm bg-[var(--color-surface-container-low)] border border-[var(--color-surface-container-high)] text-white hover:border-[var(--color-primary)]/50 transition-colors">Importar config.json</button>
            <button onClick={handleConfigExport} className="px-4 py-2 rounded-lg text-sm bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:brightness-110 transition-colors font-medium">Exportar config.json</button>
            <input ref={configInputRef} type="file" accept="application/json,.json" className="hidden" onChange={handleConfigImport} />
          </div>
          <p className="text-xs text-[var(--color-on-surface-variant)] mt-4" role="status">{configMessage}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--color-tertiary)]">brush</span>
            Aparência
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-white">Intensidade Visual</h4>
                <p className="text-xs text-[var(--color-on-surface-variant)] mt-1">Ajusta o nível de brilho, glow e contrastes cyberpunk.</p>
              </div>
              <select 
                className="bg-[var(--color-surface-container-low)] border border-[var(--color-surface-container-high)] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]/50 transition-colors"
                value={settings.visualIntensity}
                onChange={(e) => updateSettings({ visualIntensity: e.target.value as 'low' | 'medium' | 'high' })}
              >
                <option value="low">Sutil</option>
                <option value="medium">Equilibrado</option>
                <option value="high">Overdrive</option>
              </select>
            </div>

            <div className="h-px bg-[var(--color-surface-container-highest)] w-full" />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-white">Reduzir animações</h4>
                <p className="text-xs text-[var(--color-on-surface-variant)] mt-1">Desativa transições e efeitos de partículas para economizar recursos.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={settings.reduceAnimations}
                  onChange={(e) => updateSettings({ reduceAnimations: e.target.checked })}
                />
                <div className="w-11 h-6 bg-[var(--color-surface-container-highest)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
              </label>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-[var(--color-error)]/30 bg-[var(--color-error)]/5">
          <h3 className="text-lg font-medium text-[var(--color-error)] mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined">warning</span>
            Zona de Perigo
          </h3>
          <p className="text-sm text-[var(--color-on-surface-variant)] mb-6">
            Ações irreversíveis que afetam seus dados locais.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={handleReset}
              className="px-4 py-2 rounded-lg text-sm bg-transparent text-[var(--color-error)] hover:bg-[var(--color-error)]/10 border border-[var(--color-error)] transition-colors"
            >
              Restaurar Padrões
            </button>
            <button 
              onClick={handleWipe}
              className="px-4 py-2 rounded-lg text-sm bg-[var(--color-error)] text-[var(--color-on-error)] hover:bg-[#ff897d] transition-colors font-medium"
            >
              Excluir Todos os Perfis
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
