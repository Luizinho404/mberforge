import { useEmberStore } from '../store';
import { Card } from './ui/Card';
import { useState, useEffect } from 'react';

export function Mundo() {
  const { gameDetected, profiles, updateProfileSettings } = useEmberStore();
  const activeProfile = profiles.find(p => p.active);
  
  const [velocidadeTempo, setVelocidadeTempo] = useState(10);

  useEffect(() => {
    if (activeProfile?.settings && typeof activeProfile.settings.velocidadeTempo === 'number') {
      setVelocidadeTempo(activeProfile.settings.velocidadeTempo);
    }
  }, [activeProfile]);

  const handleTimeChange = (val: number) => {
    setVelocidadeTempo(val);
    if (activeProfile) {
      updateProfileSettings(activeProfile.id, { velocidadeTempo: val });
    }
  };

  const executeCommand = (cmd: string) => {
    console.log(`Executando comando no mundo: ${cmd}`);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Mundo</h2>
        <p className="text-[var(--color-on-surface-variant)]">Controle aspectos climáticos, tempo e entidades do ambiente.</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--color-primary)]">schedule</span>
            Controle do Tempo
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button onClick={() => executeCommand('Amanhecer')} className="flex flex-col items-center justify-center p-4 rounded-xl bg-[var(--color-surface-container-low)] border border-[var(--color-surface-container-high)] hover:border-[var(--color-primary)]/30 transition-colors group">
              <span className="material-symbols-outlined text-3xl mb-2 text-[var(--color-on-surface-variant)] group-hover:text-amber-400 transition-colors">wb_sunny</span>
              <span className="text-sm font-medium text-white">Amanhecer</span>
            </button>
            <button onClick={() => executeCommand('Anoitecer')} className="flex flex-col items-center justify-center p-4 rounded-xl bg-[var(--color-surface-container-low)] border border-[var(--color-surface-container-high)] hover:border-[var(--color-primary)]/30 transition-colors group">
              <span className="material-symbols-outlined text-3xl mb-2 text-[var(--color-on-surface-variant)] group-hover:text-blue-400 transition-colors">bedtime</span>
              <span className="text-sm font-medium text-white">Anoitecer</span>
            </button>
          </div>
          
          <div>
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-[var(--color-on-surface-variant)]">Velocidade do Tempo ({(velocidadeTempo / 10).toFixed(1)}x)</span>
            </div>
            <input 
              type="range" 
              min="0" max="100" 
              value={velocidadeTempo}
              onChange={(e) => handleTimeChange(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[var(--color-surface-container-highest)] rounded-full appearance-none outline-none"
            />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--color-tertiary)]">thunderstorm</span>
            Clima e Ambiente
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface-container-low)] border border-[var(--color-surface-container-high)]">
              <div>
                <p className="text-sm text-white">Forçar Céu Limpo</p>
                <p className="text-xs text-[var(--color-on-surface-variant)]">Remove nuvens e tempestades</p>
              </div>
              <button onClick={() => executeCommand('CeuLimpo')} className="px-3 py-1 rounded-md text-xs font-medium bg-[var(--color-surface-container-highest)] hover:bg-[var(--color-primary)]/20 hover:text-[var(--color-primary)] transition-colors">Aplicar</button>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface-container-low)] border border-[var(--color-surface-container-high)]">
              <div>
                <p className="text-sm text-white">Gerar Chuva/Tempestade</p>
                <p className="text-xs text-[var(--color-on-surface-variant)]">Altera clima atual</p>
              </div>
              <button onClick={() => executeCommand('GerarChuva')} className="px-3 py-1 rounded-md text-xs font-medium bg-[var(--color-surface-container-highest)] hover:bg-[var(--color-primary)]/20 hover:text-[var(--color-primary)] transition-colors">Aplicar</button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface-container-low)] border border-[var(--color-surface-container-high)]">
              <div>
                <p className="text-sm text-white">Remover Inimigos da Área</p>
                <p className="text-xs text-[var(--color-on-surface-variant)]">Raio de 100m</p>
              </div>
              <button onClick={() => executeCommand('RemoverInimigos')} className="px-3 py-1 rounded-md text-xs font-medium bg-[var(--color-error)]/10 text-[var(--color-error)] hover:bg-[var(--color-error)]/20 transition-colors">Executar</button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
