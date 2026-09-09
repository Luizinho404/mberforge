import { useEmberStore } from '../store';
import { Card } from './ui/Card';
import { useState, useEffect } from 'react';

function SliderItem({ label, value, min = 0, max = 100, onChange, suffix = '' }: any) {
  return (
    <div>
      <div className="flex justify-between mb-2 text-sm">
        <span className="text-[var(--color-on-surface-variant)]">{label} (Max: {max})</span>
        <span className="text-white font-mono">{value}{suffix}</span>
      </div>
      <input 
        type="range" 
        min={min} max={max} 
        value={value} 
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-1.5 bg-[var(--color-surface-container-highest)] rounded-full appearance-none outline-none"
      />
    </div>
  );
}

function ToggleItem({ label, sublabel, checked, onChange }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface-container-low)] border border-[var(--color-surface-container-high)]">
      <div>
        <p className="text-sm text-white">{label}</p>
        {sublabel && <p className="text-xs text-[var(--color-on-surface-variant)]">{sublabel}</p>}
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <div className="w-9 h-5 bg-[var(--color-surface-container-highest)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
      </label>
    </div>
  );
}

const initialState = {
  vida: 100,
  mana: 100,
  stamina: 100,
  fome: 100,
  sede: 100,
  tempoNevoa: 0,
  conforto: 1,
  resistenciaAmbiental: false,
  modoDeus: false,
  invisibilidade: false,
  chanceCritico: 0,
  danoCritico: 100,
  danoCorpo: 100,
  danoDistancia: 100,
  danoMagico: 100,
  multiplicadorXp: 1,
  xpAtual: 0,
  pontosHabilidade: 0,
  manterPontosHabilidade: false,
  velocidadeJogador: 1,
  velocidadeJogo: 1,
};

export function Jogador() {
  const { gameDetected, profiles, updateProfileSettings } = useEmberStore();
  const activeProfile = profiles.find(p => p.active);
  
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (activeProfile?.settings) {
      setState(prev => ({ ...prev, ...activeProfile.settings }));
    }
  }, [activeProfile]);

  const handleChange = (key: string, value: any) => {
    setState(prev => ({ ...prev, [key]: value }));
    if (activeProfile) {
      updateProfileSettings(activeProfile.id, { [key]: value });
    }
  };

  const handleApply = () => {
    if (activeProfile) {
      updateProfileSettings(activeProfile.id, state);
    }
  };

  const handleReset = () => {
    setState(initialState);
    if (activeProfile) {
      updateProfileSettings(activeProfile.id, initialState);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Jogador</h2>
        <p className="text-[var(--color-on-surface-variant)]">Gerencie os status e atributos vitais do personagem.</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <Card className="p-6">
          <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--color-primary)]">favorite</span>
            Status e Sobrevivência
          </h3>
          <div className="space-y-6">
            <SliderItem label="Vida" value={state.vida} max={1000} onChange={(v: number) => handleChange('vida', v)} />
            <SliderItem label="Mana" value={state.mana} max={1000} onChange={(v: number) => handleChange('mana', v)} />
            <SliderItem label="Stamina" value={state.stamina} max={1000} onChange={(v: number) => handleChange('stamina', v)} />
            <SliderItem label="Fome" value={state.fome} max={100} onChange={(v: number) => handleChange('fome', v)} />
            <SliderItem label="Sede" value={state.sede} max={100} onChange={(v: number) => handleChange('sede', v)} />
            <SliderItem label="Tempo na Névoa" value={state.tempoNevoa} max={100} onChange={(v: number) => handleChange('tempoNevoa', v)} suffix="m" />
            <SliderItem label="Conforto" value={state.conforto} min={1} max={100} onChange={(v: number) => handleChange('conforto', v)} />
            
            <div className="pt-2 space-y-4 border-t border-[var(--color-surface-container-high)]">
              <ToggleItem label="Resistência Ambiental" sublabel="Ignorar frio e umidade" checked={state.resistenciaAmbiental} onChange={(v: boolean) => handleChange('resistenciaAmbiental', v)} />
              <ToggleItem label="Modo Deus" sublabel="Imunidade a dano" checked={state.modoDeus} onChange={(v: boolean) => handleChange('modoDeus', v)} />
              <ToggleItem label="Invisibilidade" sublabel="Inimigos não detectam você" checked={state.invisibilidade} onChange={(v: boolean) => handleChange('invisibilidade', v)} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--color-tertiary)]">sports_martial_arts</span>
            Combate
          </h3>
          <div className="space-y-6">
            <SliderItem label="Chance de Crítico" value={state.chanceCritico} max={100} onChange={(v: number) => handleChange('chanceCritico', v)} suffix="%" />
            <SliderItem label="Dano Crítico" value={state.danoCritico} max={500} onChange={(v: number) => handleChange('danoCritico', v)} suffix="%" />
            <SliderItem label="Dano Corpo a Corpo" value={state.danoCorpo} max={500} onChange={(v: number) => handleChange('danoCorpo', v)} suffix="%" />
            <SliderItem label="Dano à Distância" value={state.danoDistancia} max={500} onChange={(v: number) => handleChange('danoDistancia', v)} suffix="%" />
            <SliderItem label="Dano Mágico" value={state.danoMagico} max={500} onChange={(v: number) => handleChange('danoMagico', v)} suffix="%" />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--color-primary)]">trending_up</span>
            Progressão e Utilidades
          </h3>
          <div className="space-y-6">
            <SliderItem label="Multiplicador de XP" value={state.multiplicadorXp} min={1} max={100} onChange={(v: number) => handleChange('multiplicadorXp', v)} suffix="x" />
            <SliderItem label="Adicionar XP" value={state.xpAtual} max={10000} onChange={(v: number) => handleChange('xpAtual', v)} />
            <SliderItem label="Pontos de Habilidade" value={state.pontosHabilidade} max={100} onChange={(v: number) => handleChange('pontosHabilidade', v)} />
            
            <div className="pt-2 space-y-4 border-t border-[var(--color-surface-container-high)]">
              <ToggleItem label="Manter Pontos" sublabel="Não consumir ao desbloquear habilidades" checked={state.manterPontosHabilidade} onChange={(v: boolean) => handleChange('manterPontosHabilidade', v)} />
            </div>

            <SliderItem label="Velocidade do Jogador" value={state.velocidadeJogador} min={1} max={10} onChange={(v: number) => handleChange('velocidadeJogador', v)} suffix="x" />
            <SliderItem label="Velocidade do Jogo" value={state.velocidadeJogo} min={1} max={10} onChange={(v: number) => handleChange('velocidadeJogo', v)} suffix="x" />
          </div>
        </Card>

      </div>

      <div className="mt-8 flex justify-end gap-3 border-t border-[var(--color-surface-container-highest)] pt-6">
        <button onClick={handleReset} className="px-4 py-2 rounded-lg text-sm text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)] transition-colors">
          Restaurar Padrões
        </button>
        <button onClick={handleApply} className="px-4 py-2 rounded-lg text-sm bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20 transition-colors border border-[var(--color-primary)]/30">
          Aplicar Modificações
        </button>
      </div>

    </div>
  );
}
