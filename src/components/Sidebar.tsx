import React from 'react';
import { useEmberStore } from '../store';
import { cn } from '../lib/utils';
import { ViewState } from '../types';

export function Sidebar() {
  const { view, setView } = useEmberStore();

  const navItems: { id: ViewState; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'jogador', label: 'Jogador', icon: 'person' },
    { id: 'inventario', label: 'Inventário', icon: 'backpack' },
    { id: 'mundo', label: 'Mundo', icon: 'public' },
    { id: 'construcao', label: 'Construção', icon: 'architecture' },
    { id: 'perfis', label: 'Perfis', icon: 'tune' },
    { id: 'configuracoes', label: 'Configurações', icon: 'settings' },
  ];

  return (
    <aside className="w-64 glass-panel border-r-0 border-y-0 h-full flex flex-col shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-[var(--color-surface-container-highest)]">
        <span className="material-symbols-outlined text-[var(--color-primary)] mr-3 fill-icon">token</span>
        <h1 className="font-bold text-xl tracking-wider text-glow-cyan text-white">EmberForge</h1>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={cn(
              'w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
              view === item.id
                ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/30 glow-cyan-sm'
                : 'text-[var(--color-on-surface-variant)] hover:text-white hover:bg-[var(--color-surface-container)]'
            )}
          >
            <span className={cn('material-symbols-outlined mr-3', view === item.id ? 'fill-icon' : '')}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-[var(--color-surface-container-highest)]">
        <div className="text-xs text-[var(--color-on-surface-variant)] text-center">
          EmberForge v0.1.0<br/>· kali404
        </div>
      </div>
    </aside>
  );
}
