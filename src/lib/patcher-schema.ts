export type PatcherSection = 'player' | 'inventory' | 'world' | 'gameplay';
export type OptionDefinition = { key: string; label: string; description: string; fields?: { key: string; label: string; value: number }[] };

export const PATCHER_OPTIONS: Record<PatcherSection, OptionDefinition[]> = {
  player: [
    { key: 'adjustPlayerMaxLevel', label: 'Nível máximo', description: 'Ajusta o nível máximo do personagem.', fields: [{ key: 'value', label: 'Nível', value: 100 }] },
    { key: 'adjustSkillPointsPerLevel', label: 'Pontos por nível', description: 'Ajusta os pontos ganhos a cada nível.', fields: [{ key: 'value', label: 'Pontos', value: 8 }] },
    { key: 'adjustSkillPointsPerRoot', label: 'Pontos por Root/Elixir Well', description: 'Multiplica os pontos ganhos.', fields: [{ key: 'factor', label: 'Multiplicador', value: 4 }] },
    { key: 'adjustFoodBuffReapply', label: 'Buffs de comida', description: 'Remove o limite para reaplicar buffs de comida.' },
    { key: 'enableCreativeMode', label: 'Modo criativo', description: 'Desbloqueia receitas e remove custo de construção.' },
    { key: 'adjustPlayerManaPerAP', label: 'Mana por atributo', description: 'Ajusta o ganho de mana por ponto.', fields: [{ key: 'value', label: 'Mana', value: 20 }] },
    { key: 'adjustPlayerHealthPerAP', label: 'Vida por atributo', description: 'Ajusta o ganho de vida por ponto.', fields: [{ key: 'value', label: 'Vida', value: 50 }] },
    { key: 'adjustPlayerStaminaPerAP', label: 'Stamina por atributo', description: 'Ajusta o ganho de stamina por ponto.', fields: [{ key: 'value', label: 'Stamina', value: 10 }] },
  ],
  inventory: [
    { key: 'adjustStackSize', label: 'Tamanho da pilha', description: 'Define o máximo de itens por pilha.', fields: [{ key: 'value', label: 'Quantidade', value: 65000 }] },
    { key: 'adjustSlotCount', label: 'Slots de armazenamento', description: 'Multiplica os slots dos baús.', fields: [{ key: 'factor', label: 'Multiplicador', value: 2 }, { key: 'cap', label: 'Limite', value: 96 }] },
    { key: 'enableHigherBackpackSlot', label: 'Mochila ampliada', description: 'Adiciona slots à mochila.' },
  ],
  world: [
    { key: 'adjustFogOfWar', label: 'Alcance do mapa', description: 'Multiplica o alcance revelado.', fields: [{ key: 'factor', label: 'Multiplicador', value: 5 }] },
    { key: 'adjustAltarLimit', label: 'Limite de altares', description: 'Ajusta a quantidade por nível da chama.', fields: [{ key: 'factor', label: 'Multiplicador', value: 3 }, { key: 'cap', label: 'Limite', value: 10 }] },
    { key: 'adjustTerrainExchange', label: 'Recursos de terreno', description: 'Ajusta o retorno da mineração de terreno.', fields: [{ key: 'factor', label: 'Fator', value: 20 }] },
    { key: 'adjustRegrowable', label: 'Plantas regeneráveis', description: 'Faz plantas colhíveis crescerem novamente.' },
    { key: 'adjustFactoryInventoryAccess', label: 'Inventário de fábrica', description: 'Acesso semelhante a baú mágico.' },
    { key: 'enableAllMarkerFastTravel', label: 'Viagem rápida', description: 'Libera viagem rápida na maioria dos marcadores.' },
    { key: 'adjustUpdraft', label: 'Corrente ascendente', description: 'Ajusta a força da corrente.', fields: [{ key: 'factor', label: 'Multiplicador', value: 2 }] },
    { key: 'enableAllBuildingBreakable', label: 'Construções quebráveis', description: 'Permite quebrar mais estruturas.' },
    { key: 'unblockBuildLimit', label: 'Sem limite de construção', description: 'Remove restrições de área para construção.' },
    { key: 'adjustShroudSettings', label: 'Parâmetros da Névoa', description: 'Ajusta densidade e espessura da Névoa.' },
  ],
  gameplay: [
    { key: 'adjustItemMaxLevel', label: 'Nível máximo de itens', description: 'Ajusta o nível máximo de aprimoramento.' },
    { key: 'adjustManaCost', label: 'Custo de mana', description: 'Multiplica o custo de mana.' },
    { key: 'adjustSpellCastTime', label: 'Tempo de conjuração', description: 'Multiplica o tempo de conjuração.' },
    { key: 'adjustBowChargeTime', label: 'Carga do arco', description: 'Multiplica o tempo de carga.' },
    { key: 'adjustPickaxeRange', label: 'Alcance da picareta', description: 'Ajusta o alcance de mineração.' },
    { key: 'adjustWoodDamage', label: 'Dano em madeira', description: 'Multiplica o dano do machado.' },
    { key: 'adjustFallDistance', label: 'Distância de queda', description: 'Ajusta distâncias de dano de queda.' },
    { key: 'adjustWandProjectileDuration', label: 'Projétil de varinha', description: 'Multiplica a duração do projétil.' },
    { key: 'adjustChestRandomSlots', label: 'Slots de baús', description: 'Ajusta os slots de loot aleatório.' },
    { key: 'enableUncapDedicatedServerSettings', label: 'Limites do servidor', description: 'Libera limites do servidor dedicado.' },
    { key: 'enableUncapClientSettings', label: 'Limites do cliente', description: 'Amplia faixas de dificuldade do cliente (compatibilidade depende da versão).' },
    { key: 'enableAdjustCraftingTime', label: 'Tempo de crafting', description: 'Multiplica o tempo de produção.' },
    { key: 'adjustMusicTime', label: 'Tempo de música', description: 'Ajusta o tempo para buff de música.' },
    { key: 'adjustMusicInstruments', label: 'Instrumentos de conforto', description: 'Ajusta o máximo de instrumentos.' },
    { key: 'adjustMusicBuff', label: 'Buff musical', description: 'Ajusta o buff de conforto musical.' },
    { key: 'adjustGemSlotProbability', label: 'Slots de gema', description: 'Ajusta chance de slot de gema.' },
    { key: 'adjustWaterSourcePerFlameLevel', label: 'Fontes de água', description: 'Ajusta fontes por nível da chama.' },
    { key: 'enableCraftOutputMultiplier', label: 'Produção de crafting', description: 'Multiplica a produção das receitas.' },
    { key: 'enableGatherLootMultipliers', label: 'Multiplicadores de loot', description: 'Ajusta loot, coleta, árvores e baús.' },
    { key: 'enableAutoLoot', label: 'Coleta automática', description: 'Coleta loot e materiais próximos automaticamente.' },
  ],
};

export const defaultPatcherConfig = () => Object.fromEntries(Object.entries(PATCHER_OPTIONS).map(([section, options]) => [section, Object.fromEntries(options.map(option => [option.key, { enabled: false, ...Object.fromEntries((option.fields ?? []).map(field => [field.key, field.value])) }]))]));
