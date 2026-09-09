import { useState, useRef } from 'react';
import { useEmberStore } from '../store';
import { Card } from './ui/Card';
import { GameProfile } from '../types';

export function Profiles() {
  const { profiles, toggleProfileActive, deleteProfile, addProfile, importProfile } = useEmberStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');

  // PENDÊNCIA VISUAL: Não há botões desenhados no design original para Importação ou Duplicação.
  // A lógica de importação foi implementada abaixo e exposta na store,
  // mas o gatilho (input file) não está visível para respeitar a regra de não alterar o design visual.
  // const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (!newProfileName) return;
    addProfile({
      name: newProfileName,
      gameId: 'valheim',
      gameName: 'Valheim',
      active: false,
      settings: {}
    });
    setNewProfileName('');
    setIsAdding(false);
  };

  const handleExport = (profile: GameProfile) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${profile.name.replace(/\s+/g, '_')}_profile.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto w-full space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Perfis</h2>
          <p className="text-[var(--color-on-surface-variant)]">Salve e carregue diferentes configurações e presets de trapaça.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 rounded-lg text-sm bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary-container)] transition-colors font-medium flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Novo Perfil
        </button>
      </div>

      {isAdding && (
        <Card className="p-6 border-[var(--color-primary)]/30">
          <h3 className="text-lg font-medium text-white mb-4">Criar Novo Perfil</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-on-surface-variant)] mb-2">Nome do Perfil</label>
              <input 
                placeholder="Ex: Modo Construtor" 
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                className="bg-[var(--color-surface-container-low)] border border-[var(--color-surface-container-high)] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]/50 transition-colors w-full"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button 
              className="px-4 py-2 rounded-lg text-sm text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)] transition-colors"
              onClick={() => setIsAdding(false)}
            >
              Cancelar
            </button>
            <button 
              className="px-4 py-2 rounded-lg text-sm bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20 transition-colors border border-[var(--color-primary)]/30 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleAdd} 
              disabled={!newProfileName}
            >
              Salvar Perfil
            </button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map(profile => (
          <Card 
            key={profile.id} 
            className={`flex flex-col transition-all duration-300 ${profile.active ? 'border-[var(--color-primary)]/50 glow-cyan-sm relative overflow-hidden' : ''}`}
          >
            {profile.active && (
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[200%] h-[200%] -translate-y-1/2 translate-x-1/2 rotate-45 bg-[var(--color-primary)]/20"></div>
              </div>
            )}
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-[var(--color-surface-container-highest)]">
                  <span className={`material-symbols-outlined ${profile.active ? 'text-[var(--color-primary)]' : 'text-[var(--color-on-surface-variant)]'}`}>tune</span>
                </div>
                {profile.active && (
                  <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider bg-[var(--color-primary)]/10 px-2 py-1 rounded">Ativo</span>
                )}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{profile.name}</h3>
              <p className="text-sm text-[var(--color-on-surface-variant)] mb-4">{Object.keys(profile.settings).length} opções configuradas</p>
            </div>
            
            <div className="px-6 py-4 border-t border-[var(--color-surface-container-highest)] bg-[var(--color-surface-container-lowest)]/50 flex justify-between items-center">
              <button 
                className={`text-sm font-medium ${profile.active ? 'text-[var(--color-on-surface-variant)]' : 'text-[var(--color-primary)] hover:text-[var(--color-primary-container)]'}`}
                onClick={() => toggleProfileActive(profile.id)}
                disabled={profile.active}
              >
                {profile.active ? 'Em uso' : 'Ativar'}
              </button>
              <div className="flex gap-2">
                <button 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--color-on-surface-variant)] hover:text-white hover:bg-[var(--color-surface-container)] transition-colors"
                  title="Exportar"
                  onClick={() => handleExport(profile)}
                >
                  <span className="material-symbols-outlined text-[18px]">ios_share</span>
                </button>
                <button 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-colors"
                  onClick={() => deleteProfile(profile.id)}
                  title="Excluir"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          </Card>
        ))}
        {profiles.length === 0 && (
          <div className="col-span-full py-12 text-center border border-dashed border-[var(--color-surface-container-high)] rounded-xl bg-[var(--color-surface-container-lowest)]">
            <p className="text-[var(--color-on-surface-variant)]">Nenhum perfil encontrado. Crie um para começar.</p>
          </div>
        )}
      </div>
    </div>
  );
}
