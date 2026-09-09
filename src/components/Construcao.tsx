import { useEmberStore } from '../store';
import { Card } from './ui/Card';
import { useState, useEffect } from 'react';

export function Construcao() {
  const { gameDetected, profiles, updateProfileSettings } = useEmberStore();
  const activeProfile = profiles.find(p => p.active);

  const [vooLivre, setVooLivre] = useState(false);
  const [ignorarColisoes, setIgnorarColisoes] = useState(false);
  const [construcaoGratuita, setConstrucaoGratuita] = useState(false);
  const [integridadeEstrutural, setIntegridadeEstrutural] = useState(false);

  useEffect(() => {
    if (activeProfile?.settings) {
      setVooLivre(Boolean(activeProfile.settings.vooLivre));
      setIgnorarColisoes(Boolean(activeProfile.settings.ignorarColisoes));
      setConstrucaoGratuita(Boolean(activeProfile.settings.construcaoGratuita));
      setIntegridadeEstrutural(Boolean(activeProfile.settings.integridadeEstrutural));
    }
  }, [activeProfile]);

  const handleToggle = (key: string, value: boolean) => {
    if (key === 'vooLivre') setVooLivre(value);
    if (key === 'ignorarColisoes') setIgnorarColisoes(value);
    if (key === 'construcaoGratuita') setConstrucaoGratuita(value);
    if (key === 'integridadeEstrutural') setIntegridadeEstrutural(value);
    if (activeProfile) {
      updateProfileSettings(activeProfile.id, { [key]: value });
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Construção</h2>
        <p className="text-[var(--color-on-surface-variant)]">Ative permissões especiais e desbloqueios para facilitar a criação.</p>
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
        <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-[var(--color-primary)]">architecture</span>
          Modos de Construção
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[var(--color-surface-container-low)] border border-[var(--color-surface-container-high)] hover:border-[var(--color-primary)]/30 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-container-highest)] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[var(--color-primary)]">rocket_launch</span>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-white mb-1">Voo Livre</h4>
              <p className="text-xs text-[var(--color-on-surface-variant)]">Permite voar e atravessar estruturas para posicionamento perfeito de peças.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={vooLivre} onChange={(e) => handleToggle('vooLivre', e.target.checked)} />
              <div className="w-9 h-5 bg-[var(--color-surface-container-highest)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
            </label>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-[var(--color-surface-container-low)] border border-[var(--color-surface-container-high)] hover:border-[var(--color-primary)]/30 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-container-highest)] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[var(--color-primary)]">unfold_more</span>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-white mb-1">Ignorar Colisões</h4>
              <p className="text-xs text-[var(--color-on-surface-variant)]">Coloque peças umas dentro das outras ignorando restrições do jogo.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={ignorarColisoes} onChange={(e) => handleToggle('ignorarColisoes', e.target.checked)} />
              <div className="w-9 h-5 bg-[var(--color-surface-container-highest)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
            </label>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-[var(--color-surface-container-low)] border border-[var(--color-surface-container-high)] hover:border-[var(--color-primary)]/30 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-container-highest)] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[var(--color-primary)]">all_inclusive</span>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-white mb-1">Construção Gratuita</h4>
              <p className="text-xs text-[var(--color-on-surface-variant)]">Construir não consome recursos do inventário.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={construcaoGratuita} onChange={(e) => handleToggle('construcaoGratuita', e.target.checked)} />
              <div className="w-9 h-5 bg-[var(--color-surface-container-highest)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
            </label>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[var(--color-surface-container-low)] border border-[var(--color-surface-container-high)] hover:border-[var(--color-primary)]/30 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-container-highest)] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[var(--color-primary)]">foundation</span>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-white mb-1">Integridade Estrutural</h4>
              <p className="text-xs text-[var(--color-on-surface-variant)]">Desativa sistema de gravidade e suporte de peso nas estruturas.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={integridadeEstrutural} onChange={(e) => handleToggle('integridadeEstrutural', e.target.checked)} />
              <div className="w-9 h-5 bg-[var(--color-surface-container-highest)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
            </label>
          </div>
        </div>
      </Card>
    </div>
  );
}
