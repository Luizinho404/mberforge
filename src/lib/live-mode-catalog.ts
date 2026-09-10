/**
 * Live Mode is deliberately separate from Patcher Mode.
 *
 * These entries are a research catalogue derived from a community Cheat Engine
 * table. They are NOT implemented game features and must be revalidated for
 * every supported Enshrouded build before any runtime adapter is released.
 */

export type LiveModeCategory = 'player' | 'movement' | 'world' | 'camera' | 'glider';
export type ValidationStatus = 'research' | 'experimental' | 'validated';

export interface LiveModeFeature {
  id: string;
  name: string;
  category: LiveModeCategory;
  status: ValidationStatus;
  notes: string;
  overlapsPatcher?: boolean;
}

export const LIVE_MODE_CATALOG: LiveModeFeature[] = [
  { id: 'infinite-health', name: 'Vida infinita', category: 'player', status: 'research', notes: 'Referência de alteração em memória; validar por build.' },
  { id: 'infinite-mana', name: 'Mana infinita', category: 'player', status: 'research', notes: 'Referência de alteração em memória; validar por build.' },
  { id: 'infinite-stamina', name: 'Stamina infinita', category: 'player', status: 'research', notes: 'Referência de alteração em memória; validar por build.' },
  { id: 'infinite-oxygen', name: 'Oxigênio infinito', category: 'player', status: 'research', notes: 'Referência de alteração em memória; validar por build.' },
  { id: 'infinite-fog-timer', name: 'Tempo de Névoa infinito', category: 'player', status: 'research', notes: 'Não confundir com parâmetros persistentes da Névoa.' },
  { id: 'infinite-frost-timer', name: 'Tempo de frio infinito', category: 'player', status: 'research', notes: 'Referência de alteração em memória; validar por build.' },
  { id: 'no-fall-damage', name: 'Sem dano de queda', category: 'movement', status: 'research', notes: 'Candidato para módulo de movimento.' },
  { id: 'high-jump', name: 'Salto alto', category: 'movement', status: 'research', notes: 'Candidato para módulo de movimento.' },
  { id: 'high-speed', name: 'Velocidade alta', category: 'movement', status: 'research', notes: 'Candidato para módulo de movimento.' },
  { id: 'flight', name: 'Voo', category: 'movement', status: 'experimental', notes: 'Maior risco de instabilidade; nunca habilitar por padrão.' },
  { id: 'low-gravity', name: 'Baixa gravidade', category: 'movement', status: 'experimental', notes: 'Maior risco de instabilidade; requer sessão isolada.' },
  { id: 'air-movement', name: 'Movimento no ar e submerso', category: 'movement', status: 'experimental', notes: 'Inclui natação no ar, caminhar no ar e sob a água.' },
  { id: 'day-time', name: 'Horário do dia', category: 'world', status: 'research', notes: 'Alteração temporária em memória; validar persistência.' },
  { id: 'free-craft', name: 'Craft e construção grátis', category: 'world', status: 'research', notes: 'Possui alternativa no Patcher Mode.', overlapsPatcher: true },
  { id: 'stack-split', name: 'Divisão ilimitada de pilha', category: 'world', status: 'research', notes: 'Possui relação com tamanho de pilha no Patcher Mode.', overlapsPatcher: true },
  { id: 'build-area', name: 'Área de construção', category: 'world', status: 'research', notes: 'Possui relação com limites de construção no Patcher Mode.', overlapsPatcher: true },
  { id: 'altar-and-areas', name: 'Altar, Névoa e cripta', category: 'world', status: 'research', notes: 'Inclui alcance/área; exige validação independente.' },
  { id: 'first-person', name: 'Câmera em primeira pessoa', category: 'camera', status: 'experimental', notes: 'A tabela descreve comportamento semelhante ao modo de construção.' },
  { id: 'camera-distance', name: 'Distância da câmera', category: 'camera', status: 'research', notes: 'Alteração visual; validar com controles e interface.' },
  { id: 'glider-flight', name: 'Controle do planador', category: 'glider', status: 'experimental', notes: 'Inclui ângulos de subida, descida e curva.' },
];

export const LIVE_MODE_NOTICE =
  'Live Mode é experimental. Cada item exige validação para a versão atual do jogo e só deve ser testado em single-player ou servidor privado sob seu controle.';
