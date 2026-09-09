import { useEmberStore } from '../store';
import { Card } from './ui/Card';

export function Dashboard() {
  const { profiles, gameDetected, versionCompatible, setView } = useEmberStore();
  const activeProfile = profiles.find(p => p.active);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Dashboard</h2>
        <p className="text-[var(--color-on-surface-variant)]">Visão geral da sua sessão e dos seus perfis.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${gameDetected ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)]'}`}>
              <span className="material-symbols-outlined text-3xl">sports_esports</span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[var(--color-on-surface-variant)]">Jogo</h3>
              <p className={`text-lg font-bold ${gameDetected ? 'text-white' : 'text-[var(--color-on-surface-variant)]'}`}>
                {gameDetected ? 'Jogo detectado' : 'Aguardando o jogo'}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${versionCompatible ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)]'}`}>
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[var(--color-on-surface-variant)]">Compatibilidade</h3>
              <p className={`text-lg font-bold ${versionCompatible ? 'text-white' : 'text-[var(--color-on-surface-variant)]'}`}>
                {versionCompatible ? 'Versão compatível' : 'Compatibilidade não verificada'}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary)] flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">tune</span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[var(--color-on-surface-variant)]">Perfil Ativo</h3>
              <p className="text-lg font-bold text-white">
                {activeProfile ? activeProfile.name : 'Nenhum'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium text-white mb-6">Ações Rápidas</h3>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => setView('jogador')} className="flex flex-col items-center justify-center p-6 rounded-xl bg-[var(--color-surface-container-low)] hover:bg-[var(--color-surface-container)] border border-[var(--color-surface-container-high)] hover:border-[var(--color-primary)]/30 transition-all group">
              <span className="material-symbols-outlined text-4xl mb-3 text-[var(--color-on-surface-variant)] group-hover:text-[var(--color-primary)] transition-colors">person</span>
              <span className="font-medium">Jogador</span>
            </button>
            <button onClick={() => setView('inventario')} className="flex flex-col items-center justify-center p-6 rounded-xl bg-[var(--color-surface-container-low)] hover:bg-[var(--color-surface-container)] border border-[var(--color-surface-container-high)] hover:border-[var(--color-primary)]/30 transition-all group">
              <span className="material-symbols-outlined text-4xl mb-3 text-[var(--color-on-surface-variant)] group-hover:text-[var(--color-primary)] transition-colors">backpack</span>
              <span className="font-medium">Inventário</span>
            </button>
            <button onClick={() => setView('mundo')} className="flex flex-col items-center justify-center p-6 rounded-xl bg-[var(--color-surface-container-low)] hover:bg-[var(--color-surface-container)] border border-[var(--color-surface-container-high)] hover:border-[var(--color-primary)]/30 transition-all group">
              <span className="material-symbols-outlined text-4xl mb-3 text-[var(--color-on-surface-variant)] group-hover:text-[var(--color-primary)] transition-colors">public</span>
              <span className="font-medium">Mundo</span>
            </button>
            <button onClick={() => setView('construcao')} className="flex flex-col items-center justify-center p-6 rounded-xl bg-[var(--color-surface-container-low)] hover:bg-[var(--color-surface-container)] border border-[var(--color-surface-container-high)] hover:border-[var(--color-primary)]/30 transition-all group">
              <span className="material-symbols-outlined text-4xl mb-3 text-[var(--color-on-surface-variant)] group-hover:text-[var(--color-primary)] transition-colors">architecture</span>
              <span className="font-medium">Construção</span>
            </button>
          </div>
        </Card>

        <Card className="p-6 flex flex-col">
          <h3 className="text-lg font-medium text-white mb-6">Atividade Recente</h3>
          <div className="flex-1 flex flex-col items-center justify-center p-8 rounded-xl bg-[var(--color-surface-container-low)] border border-dashed border-[var(--color-surface-container-high)] text-center">
            <span className="material-symbols-outlined text-5xl mb-4 text-[var(--color-surface-container-highest)]">history</span>
            <p className="text-[var(--color-on-surface-variant)] mb-2">Nenhuma atividade recente.</p>
            <p className="text-sm text-[var(--color-outline)]">As alterações de configurações e troca de perfis aparecerão aqui.</p>
          </div>
        </Card>
      </div>

      <div className="mt-8 pt-8 border-t border-[var(--color-surface-container-highest)] text-center pb-4">
        <p className="text-sm text-[var(--color-on-surface-variant)] mb-2">
          O EmberForge é um projeto de código aberto, livre para modificar e distribuir.
        </p>
        <div className="flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">code</span>
          <span className="text-sm text-[var(--color-primary)] hover:underline cursor-pointer">Contribuir no GitHub</span>
        </div>
      </div>
    </div>
  );
}
