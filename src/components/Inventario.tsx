import { useEmberStore } from '../store';
import { Card } from './ui/Card';

export function Inventario() {
  const { gameDetected } = useEmberStore();
  
  const handleItemClick = (item: string) => {
    console.log(`Adicionando item: ${item} via conexão de jogo`);
  };

  const handleClear = () => {
    console.log('Limpando inventário...');
  };

  const handleUnlockAll = () => {
    console.log('Desbloqueando todos os itens...');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Inventário</h2>
        <p className="text-[var(--color-on-surface-variant)]">Gerencie itens e recursos do personagem.</p>
      </div>

      {!gameDetected && (
        <div className="bg-[var(--color-surface-container)]/50 border border-[var(--color-surface-container-high)] rounded-xl p-4 flex items-start gap-3">
          <span className="material-symbols-outlined text-[var(--color-tertiary)]">info</span>
          <div>
            <p className="text-sm text-white font-medium">Aguardando o jogo</p>
            <p className="text-xs text-[var(--color-on-surface-variant)] mt-1">Conecte-se ao jogo para sincronizar os dados em tempo real.</p>
          </div>
        </div>
      )}

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--color-primary)]">category</span>
            Adicionar Itens
          </h3>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)] text-sm">search</span>
            <input 
              type="text" 
              placeholder="Buscar item..." 
              className="bg-[var(--color-surface-container-low)] border border-[var(--color-surface-container-high)] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]/50 transition-colors w-64"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div onClick={() => handleItemClick('Madeira')} className="p-4 rounded-xl bg-[var(--color-surface-container-low)] border border-[var(--color-surface-container-high)] hover:border-[var(--color-primary)]/30 transition-colors cursor-pointer group text-center">
            <span className="material-symbols-outlined text-3xl mb-2 text-[var(--color-on-surface-variant)] group-hover:text-[var(--color-primary)] transition-colors">hardware</span>
            <p className="text-sm font-medium text-white">Madeira</p>
            <p className="text-xs text-[var(--color-primary)] mt-1">+100 un</p>
          </div>
          <div onClick={() => handleItemClick('Pedra')} className="p-4 rounded-xl bg-[var(--color-surface-container-low)] border border-[var(--color-surface-container-high)] hover:border-[var(--color-primary)]/30 transition-colors cursor-pointer group text-center">
            <span className="material-symbols-outlined text-3xl mb-2 text-[var(--color-on-surface-variant)] group-hover:text-[var(--color-primary)] transition-colors">diamond</span>
            <p className="text-sm font-medium text-white">Pedra</p>
            <p className="text-xs text-[var(--color-primary)] mt-1">+100 un</p>
          </div>
          <div onClick={() => handleItemClick('Comida')} className="p-4 rounded-xl bg-[var(--color-surface-container-low)] border border-[var(--color-surface-container-high)] hover:border-[var(--color-primary)]/30 transition-colors cursor-pointer group text-center">
            <span className="material-symbols-outlined text-3xl mb-2 text-[var(--color-on-surface-variant)] group-hover:text-[var(--color-primary)] transition-colors">local_dining</span>
            <p className="text-sm font-medium text-white">Comida</p>
            <p className="text-xs text-[var(--color-primary)] mt-1">+50 un</p>
          </div>
          <div onClick={() => handleItemClick('Agua')} className="p-4 rounded-xl bg-[var(--color-surface-container-low)] border border-[var(--color-surface-container-high)] hover:border-[var(--color-primary)]/30 transition-colors cursor-pointer group text-center">
            <span className="material-symbols-outlined text-3xl mb-2 text-[var(--color-on-surface-variant)] group-hover:text-[var(--color-primary)] transition-colors">water_drop</span>
            <p className="text-sm font-medium text-white">Água</p>
            <p className="text-xs text-[var(--color-primary)] mt-1">+50 un</p>
          </div>
        </div>

        <div className="border-t border-[var(--color-surface-container-highest)] pt-6">
          <h4 className="text-sm font-medium text-[var(--color-on-surface-variant)] mb-4">Ações Globais</h4>
          <div className="flex gap-4">
            <button onClick={handleClear} className="px-4 py-2 rounded-lg text-sm bg-[var(--color-error)]/10 text-[var(--color-error)] hover:bg-[var(--color-error)]/20 transition-colors border border-[var(--color-error)]/30 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">delete</span>
              Limpar Inventário
            </button>
            <button onClick={handleUnlockAll} className="px-4 py-2 rounded-lg text-sm bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary)] hover:bg-[var(--color-tertiary)]/20 transition-colors border border-[var(--color-tertiary)]/30 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Desbloquear Todos
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
