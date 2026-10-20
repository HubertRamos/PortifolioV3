import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  TuiMode, 
  TuiBuffer, 
  TerminalEntry, 
  GitHubRepo, 
  GitHubStatus 
} from '../../types/os';
import { HomeBuffer } from './buffers/HomeBuffer';
import { ProjectsBuffer } from './buffers/ProjectsBuffer';
import { ProjectDetailBuffer } from './buffers/ProjectDetailBuffer';
import { AboutBuffer } from './buffers/AboutBuffer';
import { SkillsBuffer } from './buffers/SkillsBuffer';
import { ContactBuffer } from './buffers/ContactBuffer';
import { HelpBuffer } from './buffers/HelpBuffer';
import { TuiStatusLine } from './TuiStatusLine';
import { TuiCommandBar } from './TuiCommandBar';
import { 
  findDialogueByQuestion, 
  SOLERIA_RANDOM_COMMENTS 
} from '../../data/soleria-dialogues';
import { playKeyClick, playSuccessChime } from '../../utils/audio';

interface TuiWorkspaceProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onSetTheme: (th: 'dark' | 'light') => void;
  repos: GitHubRepo[];
  githubStatus: GitHubStatus;
  lastSyncTime: string | null;
  githubError?: string;
  onRefreshGitHub: () => void;
}

export const TuiWorkspace: React.FC<TuiWorkspaceProps> = ({
  theme,
  onToggleTheme,
  onSetTheme,
  repos,
  githubStatus,
  lastSyncTime,
  githubError,
  onRefreshGitHub,
}) => {
  const [currentBuffer, setCurrentBuffer] = useState<TuiBuffer>('home');
  const [previousBuffer, setPreviousBuffer] = useState<TuiBuffer>('home');
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [selectedRepoIndex, setSelectedRepoIndex] = useState(0);
  const [projectsFilter, setProjectsFilter] = useState('');

  const [mode, setMode] = useState<TuiMode>('NORMAL');
  const [notification, setNotification] = useState<string | null>(null);

  // Terminal History (for HomeBuffer / Soleria session)
  const [terminalEntries, setTerminalEntries] = useState<TerminalEntry[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bufferScrollRef = useRef<HTMLDivElement>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 4000);
  };

  // Switch buffer helper
  const navigateToBuffer = useCallback((target: TuiBuffer) => {
    playKeyClick();
    setPreviousBuffer(currentBuffer);
    setCurrentBuffer(target);
    setMode('NORMAL');

    // Scroll buffer to top on change
    setTimeout(() => {
      if (bufferScrollRef.current) {
        bufferScrollRef.current.scrollTop = 0;
      }
    }, 20);
  }, [currentBuffer]);

  // Execute Command or Natural Language
  const handleExecute = (rawText: string) => {
    const text = rawText.trim();
    if (!text) return;

    playKeyClick();

    // Check if it's a colon command
    if (text.startsWith(':')) {
      const parts = text.slice(1).trim().split(/\s+/);
      const cmd = parts[0]?.toLowerCase();
      const arg = parts.slice(1).join(' ').trim();

      switch (cmd) {
        case 'help':
        case 'h':
        case 'ajuda':
        case '?':
          navigateToBuffer('help');
          showNotification('Exibindo manual de navegação (:help)');
          return;

        case 'home':
        case 'inicio':
        case 'main':
          navigateToBuffer('home');
          return;

        case 'about':
        case 'sobre':
        case 'perfil':
        case 'bio':
          navigateToBuffer('about');
          return;

        case 'projects':
        case 'p':
        case 'projetos':
        case 'repos':
          if (arg && !isNaN(Number(arg))) {
            const idx = Number(arg) - 1;
            if (repos[idx]) {
              setSelectedRepo(repos[idx]);
              setSelectedRepoIndex(idx);
              navigateToBuffer('project_detail');
              showNotification(`Inspecionando projeto [${arg}]: ${repos[idx].name}`);
              return;
            }
          }
          navigateToBuffer('projects');
          return;

        case 'skills':
        case 'stack':
        case 'habilidades':
        case 'tech':
          navigateToBuffer('skills');
          return;

        case 'contact':
        case 'contato':
        case 'email':
          navigateToBuffer('contact');
          return;

        case 'github':
        case 'gh':
          if (arg.toLowerCase() === 'sync' || arg.toLowerCase() === 'atualizar') {
            onRefreshGitHub();
            showNotification('Sincronizando repositórios com a API do GitHub...');
          } else {
            navigateToBuffer('projects');
          }
          return;

        case 'theme':
        case 'tema':
          if (arg.toLowerCase() === 'light' || arg.toLowerCase() === 'claro') {
            onSetTheme('light');
            showNotification('Tema definido: CLARO');
          } else if (arg.toLowerCase() === 'dark' || arg.toLowerCase() === 'escuro') {
            onSetTheme('dark');
            showNotification('Tema definido: ESCURO');
          } else {
            onToggleTheme();
            showNotification(`Tema alternado para: ${theme === 'dark' ? 'CLARO' : 'ESCURO'}`);
          }
          return;

        case 'clear':
        case 'cls':
        case 'limpar':
          setTerminalEntries([]);
          showNotification('Buffer limpo.');
          return;

        case 'q':
        case 'quit':
        case 'sair':
          if (currentBuffer === 'project_detail') {
            navigateToBuffer('projects');
          } else if (currentBuffer !== 'home') {
            navigateToBuffer('home');
          } else {
            showNotification('Você já está no buffer inicial (:home)');
          }
          return;

        case 'neofetch':
        case 'fetch':
        case 'specs':
          navigateToBuffer('home');
          setTerminalEntries((prev) => [
            ...prev,
            {
              id: `p-${Date.now()}`,
              type: 'prompt',
              command: text,
            },
            {
              id: `nf-${Date.now()}`,
              type: 'output',
              customComponent: (
                <div className="font-mono text-[11px] leading-tight py-2 flex flex-col sm:flex-row gap-4">
                  <pre className="text-[var(--term-green)] select-none font-bold leading-tight">
{`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣥⣬⣿⣶⣶⣶⣤⣤⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣰⣾⣿⣿⣿⣿⠿⠿⠿⠿⠿⠿⣿⣿⣿⣿⣶⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣾⣿⣿⣿⡿⣫⡴⠖⠒⠒⠒⠒⠲⠤⣌⡉⠛⠿⣿⣿⣿⣶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⡤⠶⠖⠒⠒⠲⠶⣾⣿⣿⡿⠃⣿⣿⣿⣿⣼⣅⡀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡦⣄⠙⠿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠶⠋⠥⠀⠀⢀⣀⣀⣠⣾⣿⣿⣿⠃⠀⢿⣿⣿⣿⡿⣿⣿⣷⣦⣄⣀⠀⠀⠀⢸⣿⣿⠃⠈⠳⢦⡈⠻⣿⣿⣿⣆⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣧⠴⠶⠚⠛⠛⢿⣿⣿⣿⣿⣿⣿⣿⠀⣴⠞⠛⢿⣿⣷⠀⠉⠛⠻⢿⣿⣷⣦⠀⣾⣿⣿⠀⠀⠀⠈⠳⣄⠘⣿⣿⣿⡙⢦⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⣠⠶⠾⠻⠿⢦⣄⣀⣤⣄⣀⣀⣀⣈⣿⣿⣿⣿⣿⣿⣇⣿⣦⣤⡼⣸⣿⣧⡀⠀⠀⠀⠘⣿⣿⠀⠘⠿⣿⣷⣦⣄⠀⠀⠘⣆⠈⣿⣿⣷⣾⡇⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢠⡾⠁⠀⠀⠀⠀⢀⣾⠁⠀⠀⠀⠀⠉⢉⣿⠛⢿⣿⣿⣿⣿⣿⢿⣯⠶⠛⢿⣿⣿⣦⡀⠀⢰⣿⣿⠀⠀⠀⠈⠙⠿⣿⣿⣶⣤⣹⡄⢹⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀
⠀⢠⠟⠀⢀⣤⣤⣄⡀⣼⠃⠀⠀⠀⠀⠀⢀⡾⠁⠀⠀⠻⣿⣿⣿⣿⣦⡀⠀⠀⠀⠙⢿⣿⣿⣶⣾⣿⡏⠀⠀⠀⠀⠀⠀⠀⠙⠻⣿⣿⠁⣼⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀
⠀⡾⠀⣰⣿⣿⣿⣿⣿⣷⣶⣶⣶⣶⣶⣶⣾⡅⠀⠀⠀⢀⡿⣿⣿⣿⣿⣷⣆⠀⠀⠀⠀⠉⠻⢿⣿⣿⣷⣦⣄⣀⡀⠀⠀⠀⠀⣀⣴⣧⣾⣿⣿⣿⣿⣷⣀⠀⠀⠀⠀⠀⠀
⢀⡇⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⣰⡟⠁⠈⢿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠉⢻⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⢿⣿⣿⠟⢃⣿⣿⡛⠲⢦⣄⠀⠀
⢸⡇⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡋⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣷⣤⣀⠀⠀⡟⠀⠀⠀⠉⠉⠛⠛⠛⣿⡇⣯⡀⢈⡏⠀⢀⣾⣿⣿⣧⠀⠀⠘⣷⠀
⢸⡇⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣧⣀⡀⠀⠀⠀⠀⠀⠀⠸⣿⣝⣿⡿⢃⣤⣿⣿⣿⣿⣿⡄⠀⠀⢹⡆
⠘⡇⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⣠⣾⡿⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣦⣤⣤⣤⣤⣾⣿⣿⣿⣿⣿⡟⠋⠻⣿⣇⠀⠀⠈⣧
⠀⣧⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⢡⡟⠁⠀⠘⣿⣿⣿⣿⡿⠛⢛⠿⣿⣿⣿⣿⣿⣿⣿⡿⠿⣿⣿⣿⣿⣿⣿⣿⣯⢠⡀⠀⠈⢿⣄⠀⠀⣿
⠀⢸⡄⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠋⣰⠟⠀⠀⠀⠀⠘⣿⣿⡿⠁⠀⡜⠀⠈⣻⣿⣿⣿⣿⠋⣰⠋⣡⠴⠶⢬⡙⣿⣿⣿⡄⠙⢆⠀⠀⠻⣆⠀⣿
⠀⠈⣷⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠁⣴⠟⠀⠀⠀⠀⠀⣰⢿⡟⠀⠀⡜⠁⠀⢠⣿⣿⣿⣿⡇⣠⡇⢸⠁⠈⠓⠤⢹⡜⣿⣿⣷⡀⠈⢣⠀⠀⠹⣦⣿
⠀⠀⠸⣆⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⡶⢿⡇⠀⠀⠀⠀⢀⡼⣫⠟⠀⢀⠞⠀⠀⢠⣿⣿⣿⣿⣿⣇⠙⣧⠘⣷⣤⣀⣠⣾⢃⣿⣿⣿⣿⡄⠀⢣⠀⠀⠹⡏
⠀⠀⠀⢻⡄⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠋⠁⠀⠸⣧⠀⠀⠀⣴⢏⡴⠋⠀⣠⠋⠀⠀⣠⣿⣿⣿⣿⣿⣿⣿⣆⠘⢷⣌⡙⠛⢋⣥⣾⣿⣿⣿⣿⣿⡆⠈⡆⠀⠀⡇
⠀⠀⠀⠀⢳⡀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⣿⢀⣀⣼⢡⡟⠁⠀⡴⠁⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣬⣉⣭⣽⣿⣿⣿⣿⣿⣿⣿⡇⠀⠁⠀⠀⡇
⠀⠀⠀⠀⠀⢻⣤⠘⢿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⢀⡿⠉⠉⠁⣸⠇⠀⣸⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀⣼⠁
⠀⠀⠀⠀⠀⠀⠙⣦⡀⠹⢿⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀⣴⡇⠀⠀⢀⡿⠀⢀⡇⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠋⠀⠀⠀⣠⠞⠁⠀
⠀⠀⠀⠀⠀⠀⠀⠈⢻⣄⠀⠉⠛⠻⠿⠛⠁⠀⠀⠀⢠⡟⠀⠀⢀⡾⠁⠀⡸⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠟⠛⠛⠉⠉⠉⠙⠓⠦⠤⠤⠤⠖⠚⠉⠁⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⣤⣄⠀⠀⠀⠀⠀⢀⣴⣟⣀⣀⣴⠟⠁⠀⡰⠃⠀⢀⡾⠿⠿⠟⠛⠛⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠒⠒⠲⠛⠛⠙⢿⣍⠁⠀⠀⠀⠘⠁⠀⣠⠞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠳⠤⠤⠤⠬⠤⠞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`}
                  </pre>
                  <div className="space-y-1">
                    <div>
                      <span className="text-[var(--term-green)] font-bold">hubert</span>
                      <span className="text-[var(--term-fg)]">@</span>
                      <span className="text-[var(--term-blue)] font-bold">omnitrix-os</span>
                    </div>
                    <div className="text-[var(--color-outline)]">───────────────────────</div>
                    <div><span className="text-[var(--term-blue)] font-bold">OS:</span> Hubert OS TUI (Neovim Inspired)</div>
                    <div><span className="text-[var(--term-blue)] font-bold">Editor:</span> Neovim v0.10.0-hubert</div>
                    <div><span className="text-[var(--term-blue)] font-bold">WM:</span> Hyprland + Waybar</div>
                    <div><span className="text-[var(--term-blue)] font-bold">Theme:</span> Sage Neutral [${theme.toUpperCase()}]</div>
                    <div><span className="text-[var(--term-blue)] font-bold">Unit:</span> 1 Pão de Queijo (Minas Standard)</div>
                  </div>
                </div>
              ),
            },
          ]);
          return;

        case 'whoami':
        case 'user':
          navigateToBuffer('home');
          setTerminalEntries((prev) => [
            ...prev,
            { id: `p-${Date.now()}`, type: 'prompt', command: text },
            { id: `w-${Date.now()}`, type: 'output', text: 'Hubert Prado Ramos — Engenheiro de Software' },
          ]);
          return;

        default:
          showNotification(`Comando desconhecido: "${text}". Digite :help para lista.`);
          return;
      }
    }

    // Natural Language / Chat with Soleria in Home buffer
    if (currentBuffer !== 'home') {
      navigateToBuffer('home');
    }

    const promptEntry: TerminalEntry = {
      id: `p-${Date.now()}`,
      type: 'prompt',
      command: text,
    };

    const match = findDialogueByQuestion(text);

    if (match) {
      const shouldTease = Math.random() < 0.35;
      const tease = shouldTease
        ? `\n\n[nota] ${SOLERIA_RANDOM_COMMENTS[Math.floor(Math.random() * SOLERIA_RANDOM_COMMENTS.length)]}`
        : '';

      const soleriaEntry: TerminalEntry = {
        id: `sol-${Date.now()}`,
        type: 'soleria',
        text: `${match.answer}${tease}`,
        targetBuffer: match.targetBuffer,
      };

      setTerminalEntries((prev) => [...prev, promptEntry, soleriaEntry]);
      playSuccessChime();

      if (match.targetBuffer) {
        setTimeout(() => {
          navigateToBuffer(match.targetBuffer!);
          showNotification(`Soleria abriu o buffer :${match.targetBuffer}`);
        }, 1200);
      }
    } else {
      setTerminalEntries((prev) => [
        ...prev,
        promptEntry,
        {
          id: `err-${Date.now()}`,
          type: 'error',
          text: `soleria: não reconheci esta pergunta ou comando: "${text}". Digite :help para ver os comandos disponíveis.`,
        },
      ]);
    }

    setMode('NORMAL');
  };

  // Keyboard navigation for NORMAL mode (Neovim keybindings)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');

      // If typing in input, only Escape matters
      if (isInput) {
        if (e.key === 'Escape') {
          e.preventDefault();
          setMode('NORMAL');
          inputRef.current?.blur();
        }
        return;
      }

      // NORMAL mode keybindings
      if (mode === 'NORMAL') {
        if (e.key === ':') {
          e.preventDefault();
          setMode('COMMAND');
          inputRef.current?.focus();
          return;
        }

        if (e.key === 'i') {
          e.preventDefault();
          setMode('INSERT');
          inputRef.current?.focus();
          return;
        }

        if (e.key === '?') {
          e.preventDefault();
          navigateToBuffer('help');
          return;
        }

        if (e.key === 'q') {
          e.preventDefault();
          if (currentBuffer === 'project_detail') {
            navigateToBuffer('projects');
          } else if (currentBuffer !== 'home') {
            navigateToBuffer('home');
          }
          return;
        }

        // Projects buffer specific keys (j / k / Enter / o)
        if (currentBuffer === 'projects' && repos.length > 0) {
          if (e.key === 'j' || e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedRepoIndex((prev) => Math.min(prev + 1, repos.length - 1));
            return;
          }
          if (e.key === 'k' || e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedRepoIndex((prev) => Math.max(prev - 1, 0));
            return;
          }
          if (e.key === 'Enter') {
            e.preventDefault();
            if (repos[selectedRepoIndex]) {
              setSelectedRepo(repos[selectedRepoIndex]);
              navigateToBuffer('project_detail');
            }
            return;
          }
          if (e.key === 'o') {
            e.preventDefault();
            if (repos[selectedRepoIndex]) {
              window.open(repos[selectedRepoIndex].html_url, '_blank');
            }
            return;
          }
          if (e.key === '/') {
            e.preventDefault();
            setMode('COMMAND');
            inputRef.current?.focus();
            return;
          }
        }

        // Project detail buffer keys
        if (currentBuffer === 'project_detail' && selectedRepo) {
          if (e.key === 'o') {
            e.preventDefault();
            window.open(selectedRepo.html_url, '_blank');
            return;
          }
          if (e.key === 'd' && selectedRepo.homepage) {
            e.preventDefault();
            window.open(selectedRepo.homepage, '_blank');
            return;
          }
          if (e.key === 'Escape' || e.key === 'h' || e.key === 'Backspace') {
            e.preventDefault();
            navigateToBuffer('projects');
            return;
          }
        }

        // Buffer scroll helpers
        if (e.key === 'j' || e.key === 'ArrowDown') {
          bufferScrollRef.current?.scrollBy({ top: 35, behavior: 'smooth' });
        } else if (e.key === 'k' || e.key === 'ArrowUp') {
          bufferScrollRef.current?.scrollBy({ top: -35, behavior: 'smooth' });
        } else if (e.key === 'g' || e.key === 'Home') {
          bufferScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (e.key === 'G' || e.key === 'End') {
          bufferScrollRef.current?.scrollTo({
            top: bufferScrollRef.current.scrollHeight,
            behavior: 'smooth',
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentBuffer, mode, navigateToBuffer, repos, selectedRepo, selectedRepoIndex]);

  return (
    <div 
      className="flex-1 flex flex-col p-2 md:p-3 overflow-hidden select-text font-mono text-xs text-[var(--color-on-surface)]"
      onClick={() => {
        // If clicking outside input, keep or set mode
      }}
    >
      {/* Neovim-style Terminal Frame Border with Frosted Glass */}
      <div className="flex-1 flex flex-col rounded-lg bg-[var(--surface-glass)] backdrop-blur-md border border-[var(--glass-border)] shadow-[var(--glass-shadow)] overflow-hidden transition-all duration-200">
        {/* Main Textual Buffer Content Area */}
        <div 
          ref={bufferScrollRef}
          className="flex-1 p-3 md:p-5 overflow-y-auto overflow-x-hidden leading-relaxed"
        >
          {currentBuffer === 'home' && (
            <HomeBuffer entries={terminalEntries} />
          )}

          {currentBuffer === 'projects' && (
            <ProjectsBuffer
              repos={repos}
              status={githubStatus}
              lastUpdated={lastSyncTime}
              errorMessage={githubError}
              selectedIndex={selectedRepoIndex}
              onSelectIndex={setSelectedRepoIndex}
              onOpenDetail={(repo) => {
                setSelectedRepo(repo);
                navigateToBuffer('project_detail');
              }}
              filterQuery={projectsFilter}
            />
          )}

          {currentBuffer === 'project_detail' && selectedRepo && (
            <ProjectDetailBuffer
              repo={selectedRepo}
              onBack={() => navigateToBuffer('projects')}
            />
          )}

          {currentBuffer === 'about' && <AboutBuffer />}

          {currentBuffer === 'skills' && <SkillsBuffer />}

          {currentBuffer === 'contact' && (
            <ContactBuffer onNotify={showNotification} />
          )}

          {currentBuffer === 'help' && <HelpBuffer />}
        </div>

        {/* Neovim Style Status Line */}
        <TuiStatusLine
          mode={mode}
          buffer={currentBuffer}
          notificationMessage={notification}
          itemCountInfo={currentBuffer === 'projects' ? `${selectedRepoIndex + 1}/${repos.length}` : undefined}
          theme={theme}
        />

        {/* Command Bar / Prompt with Autocomplete */}
        <TuiCommandBar
          mode={mode}
          onSetMode={setMode}
          onExecute={handleExecute}
          inputRef={inputRef}
        />
      </div>
    </div>
  );
};
