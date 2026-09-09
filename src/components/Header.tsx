import { useEmberStore } from '../store';

export function Header() {
  const { view, settings } = useEmberStore();

  const getTitle = () => {
    switch (view) {
      case 'dashboard': return 'Dashboard';
      case 'jogador': return 'Jogador';
      case 'inventario': return 'Inventário';
      case 'mundo': return 'Mundo';
      case 'construcao': return 'Construção';
      case 'perfis': return 'Perfis';
      case 'configuracoes': return 'Configurações';
      default: return 'EmberForge';
    }
  };

  return (
    <header className="h-16 glass-panel border-x-0 border-t-0 flex items-center justify-between px-8 shrink-0 relative z-10">
      <h2 className="text-lg font-semibold text-white tracking-wide">
        {getTitle()}
      </h2>
      
      <div className="flex items-center space-x-4">
        {settings.hardwareAcceleration && (
          <div className="flex items-center px-3 py-1 rounded-full bg-[var(--color-tertiary)]/10 border border-[var(--color-tertiary)]/30 text-[var(--color-tertiary)] text-xs font-medium">
            <span className="material-symbols-outlined text-[14px] mr-1">memory</span>
            HW Accel: ON
          </div>
        )}
        <button className="p-2 rounded-lg text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-container)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </div>
    </header>
  );
}
