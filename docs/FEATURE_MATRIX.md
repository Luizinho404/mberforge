# Matriz de recursos — EmberForge

Este documento define o escopo do EmberForge sem depender de executáveis fechados.
A referência externa `Embervale Toolkit v2.2.0` foi usada apenas para levantar
possibilidades de produto. Nenhum código, arquivo, marca, texto ou instalador dele
faz parte deste repositório.

## Legenda

- **Patcher**: configurável pelo `config.json`; exige aplicar o patch e reiniciar.
- **Live — pesquisa**: a tabela Cheat Engine ou a referência externa indicam que a
  alteração já foi tentada na comunidade, mas ainda não é uma função do EmberForge.
- **Experimental**: pode afetar física, memória, save ou estabilidade; precisa de
  validação na versão exata do jogo.
- **Permanente**: pode gravar mudança no mundo/salvamento e exige backup.

## Escopo de implementação

| Área | Recurso | Patcher hoje | Live Mode futuro | Prioridade |
| --- | --- | --- | --- | --- |
| Jogador | nível máximo e pontos de habilidade | Sim | Não necessário | P0 |
| Jogador | vida, mana e stamina | Ajustes por atributo | Pesquisa | P1 |
| Jogador | regeneração, proteção contra dano e oxigênio | Não | Pesquisa | P2 |
| Inventário | tamanho de pilha, slots e mochila | Sim | Não necessário | P0 |
| Inventário | divisão de pilha e durabilidade | Parcial | Pesquisa | P2 |
| Construção | modo criativo, craft sem custo e mais produção | Sim | Pesquisa | P0 |
| Construção | quebrar estruturas e remover limites | Sim | Pesquisa | P1 |
| Construção | selecionar materiais/objetos especiais | Não | Experimental | P3 |
| Mundo | viagem rápida, altares, Névoa, terreno e plantas | Sim | Não necessário | P0 |
| Mundo | horário, luz ambiente e remover névoa visual | Parcial | Pesquisa | P2 |
| Mundo | revelar mapa inteiro | Não | Permanente / experimental | P3 |
| Movimento | queda, salto, velocidade e gravidade | Parcial | Experimental | P2 |
| Movimento | voo e caminhar no ar | Não | Experimental | P3 |
| Combate | dano crítico, dano por tipo e multiplicador geral | Não | Pesquisa | P2 |
| Combate | um golpe e sem dano de inimigo | Não | Experimental | P3 |
| Planador | sustentação, subida, descida e curva | Não | Experimental | P3 |
| Administração | backup do save/configuração antes de aplicar | Não | Local, sem tocar no jogo | P1 |
| Administração | verificação de versão e compatibilidade | Não | Local | P1 |

P0 significa o núcleo útil que conseguimos editar e exportar com segurança pelo
`config.json`. P1 vem após a validação completa da edição/exportação. P2 e P3 não
entram como promessa de funcionamento: dependem de pesquisa e testes em
single-player ou servidor privado sob controle do usuário.

## O que o EmberForge fará primeiro

1. Importar, validar e exportar o `config.json`, preservando valores existentes.
2. Expor todos os controles do patcher por Jogador, Inventário, Mundo e Construção.
3. Criar backup do arquivo antes de substituir a configuração.
4. Verificar a versão e explicar quando o patch/reinício é necessário.

## Live Mode: regra de entrada

Um recurso só pode aparecer como acionável no Live Mode após cumprir todos estes
critérios:

1. padrão/integração revalidado na versão atual do jogo;
2. teste em mundo descartável, em single-player ou servidor privado;
3. desligamento limpo e ausência de alteração persistente inesperada;
4. aviso de risco e compatibilidade no painel;
5. teste repetível documentado no repositório.

Recursos permanentes, como revelar o mapa, só poderão ser habilitados com uma
confirmação explícita e aviso para fazer backup do save.

## Limites

O EmberForge não redistribui arquivos de terceiros e não deve ser usado em
servidores públicos. O objetivo é criar uma ferramenta transparente, open source,
para uso pessoal, single-player e mundos privados.
