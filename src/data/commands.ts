import { TuiBuffer } from '../types/os';

export interface TuiCommand {
  command: string;
  description: string;
  usage?: string;
  aliases: string[];
  category: 'Navegação' | 'Portfólio' | 'Sistema';
  targetBuffer?: TuiBuffer;
}

export const TUI_COMMANDS: TuiCommand[] = [
  {
    command: ':help',
    description: 'Exibe o manual de navegação, atalhos e comandos TUI',
    usage: ':help ou :h',
    aliases: [':h', ':ajuda', ':?'],
    category: 'Sistema',
    targetBuffer: 'help',
  },
  {
    command: ':home',
    description: 'Retorna ao buffer inicial com a Soleria e prompt de comando',
    usage: ':home',
    aliases: [':inicio', ':main'],
    category: 'Navegação',
    targetBuffer: 'home',
  },
  {
    command: ':about',
    description: 'Abre o perfil profissional, biografia e estação de Hubert',
    usage: ':about ou :sobre',
    aliases: [':sobre', ':perfil', ':bio'],
    category: 'Portfólio',
    targetBuffer: 'about',
  },
  {
    command: ':projects',
    description: 'Lista os repositórios públicos sincronizados do GitHub',
    usage: ':projects ou :p [número]',
    aliases: [':p', ':projetos', ':repos'],
    category: 'Portfólio',
    targetBuffer: 'projects',
  },
  {
    command: ':skills',
    description: 'Abre a visualização textual das tecnologias e habilidades',
    usage: ':skills ou :stack',
    aliases: [':stack', ':habilidades', ':tech'],
    category: 'Portfólio',
    targetBuffer: 'skills',
  },
  {
    command: ':contact',
    description: 'Exibe os canais de contato com cópia de email por teclado',
    usage: ':contact ou :contato',
    aliases: [':contato', ':email'],
    category: 'Portfólio',
    targetBuffer: 'contact',
  },
  {
    command: ':github',
    description: 'Consulta o status de sincronização e atualiza dados do GitHub',
    usage: ':github ou :gh [sync]',
    aliases: [':gh'],
    category: 'Portfólio',
    targetBuffer: 'projects',
  },
  {
    command: ':theme',
    description: 'Alterna ou define a paleta oficial (dark | light)',
    usage: ':theme [dark|light]',
    aliases: [':tema'],
    category: 'Sistema',
  },
  {
    command: ':neofetch',
    description: 'Exibe resumo textual estilizado da estação Hubert OS',
    aliases: [':fetch', ':specs'],
    category: 'Sistema',
  },
  {
    command: ':whoami',
    description: 'Identificação rápida do desenvolvedor',
    aliases: [':user'],
    category: 'Sistema',
  },
  {
    command: ':clear',
    description: 'Limpa o histórico de saída do buffer atual',
    usage: ':clear',
    aliases: [':cls'],
    category: 'Sistema',
  },
  {
    command: ':q',
    description: 'Fecha o buffer atual e retorna ao buffer inicial :home',
    usage: ':q ou :quit',
    aliases: [':quit', ':sair'],
    category: 'Navegação',
  },
];

export function findMatchingTuiCommands(input: string): TuiCommand[] {
  const clean = input.trim().toLowerCase();
  if (!clean) return [];

  // Normalize: if user didn't type ':', still match
  const searchPrefix = clean.startsWith(':') ? clean : `:${clean}`;

  return TUI_COMMANDS.filter((cmd) => {
    if (cmd.command.toLowerCase().startsWith(searchPrefix)) return true;
    if (cmd.aliases.some((a) => a.toLowerCase().startsWith(searchPrefix))) return true;
    if (cmd.command.toLowerCase().includes(clean)) return true;
    if (cmd.description.toLowerCase().includes(clean)) return true;
    return false;
  });
}
