import React from 'react';
import { TUI_COMMANDS } from '../../../data/commands';

export const HelpBuffer: React.FC = () => {
  return (
    <div className="font-mono text-xs select-text space-y-4 max-w-4xl">
      {/* File Header */}
      <div className="pb-1 border-b border-[var(--color-outline)] flex items-center justify-between text-[var(--color-on-surface-variant)]">
        <div className="text-[var(--term-green)] font-bold">
          :: MANUAL DO HUBERT OS TUI :: NEOVIM CHEATSHEET
        </div>
        <div className="text-[10px]">
          help.txt • [help]
        </div>
      </div>

      {/* Modes Explanation */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-[var(--term-green)]">
          == MODOS DE NAVEGAÇÃO ==
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="p-2 rounded bg-[var(--color-surface-variant)]/60 border border-[var(--color-outline)]">
            <div className="font-bold text-[var(--term-green)]">NORMAL</div>
            <div className="text-[11px] text-[var(--color-on-surface-variant)] mt-1">
              Modo padrão. Use as teclas <kbd className="text-[var(--term-green)]">j</kbd>, <kbd className="text-[var(--term-green)]">k</kbd>, <kbd className="text-[var(--term-green)]">g</kbd>, <kbd className="text-[var(--term-green)]">G</kbd> para navegar pelo conteúdo e <kbd className="text-[var(--term-green)]">:</kbd> para digitar comandos.
            </div>
          </div>

          <div className="p-2 rounded bg-[var(--color-surface-variant)]/60 border border-[var(--color-outline)]">
            <div className="font-bold text-[var(--term-blue)]">INSERT</div>
            <div className="text-[11px] text-[var(--color-on-surface-variant)] mt-1">
              Pressione <kbd className="text-[var(--term-blue)]">i</kbd> para conversar diretamente com a Soleria ou escrever no buffer. Pressione <kbd className="text-[var(--term-blue)]">Esc</kbd> para retornar ao modo NORMAL.
            </div>
          </div>

          <div className="p-2 rounded bg-[var(--color-surface-variant)]/60 border border-[var(--color-outline)]">
            <div className="font-bold text-[var(--color-primary)]">COMMAND (:)</div>
            <div className="text-[11px] text-[var(--color-on-surface-variant)] mt-1">
              Pressione <kbd className="text-[var(--color-primary)]">:</kbd> para abrir a linha de comando inferior com autocomplete dinâmico. Pressione <kbd className="text-[var(--color-primary)]">Enter</kbd> para executar.
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Cheatsheet Table */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-[var(--term-green)]">
          == ATALHOS EM MODO NORMAL ==
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
          <div className="p-1.5 rounded bg-[var(--color-surface-variant)]/40 flex justify-between border border-[var(--color-outline)]/40">
            <span className="text-[var(--term-green)] font-bold">j  ou  ↓</span>
            <span className="text-[var(--color-on-surface-variant)]">Mover foco para o próximo item</span>
          </div>
          <div className="p-1.5 rounded bg-[var(--color-surface-variant)]/40 flex justify-between border border-[var(--color-outline)]/40">
            <span className="text-[var(--term-green)] font-bold">k  ou  ↑</span>
            <span className="text-[var(--color-on-surface-variant)]">Mover foco para o item anterior</span>
          </div>
          <div className="p-1.5 rounded bg-[var(--color-surface-variant)]/40 flex justify-between border border-[var(--color-outline)]/40">
            <span className="text-[var(--term-green)] font-bold">Enter</span>
            <span className="text-[var(--color-on-surface-variant)]">Abrir ou inspecionar item selecionado</span>
          </div>
          <div className="p-1.5 rounded bg-[var(--color-surface-variant)]/40 flex justify-between border border-[var(--color-outline)]/40">
            <span className="text-[var(--term-green)] font-bold">g  ou  Home</span>
            <span className="text-[var(--color-on-surface-variant)]">Ir para o topo do buffer</span>
          </div>
          <div className="p-1.5 rounded bg-[var(--color-surface-variant)]/40 flex justify-between border border-[var(--color-outline)]/40">
            <span className="text-[var(--term-green)] font-bold">G  ou  End</span>
            <span className="text-[var(--color-on-surface-variant)]">Ir para o final do buffer</span>
          </div>
          <div className="p-1.5 rounded bg-[var(--color-surface-variant)]/40 flex justify-between border border-[var(--color-outline)]/40">
            <span className="text-[var(--term-green)] font-bold">:</span>
            <span className="text-[var(--color-on-surface-variant)]">Entrar na barra de comandos</span>
          </div>
          <div className="p-1.5 rounded bg-[var(--color-surface-variant)]/40 flex justify-between border border-[var(--color-outline)]/40">
            <span className="text-[var(--term-green)] font-bold">/</span>
            <span className="text-[var(--color-on-surface-variant)]">Filtrar repositórios em :projects</span>
          </div>
          <div className="p-1.5 rounded bg-[var(--color-surface-variant)]/40 flex justify-between border border-[var(--color-outline)]/40">
            <span className="text-[var(--term-green)] font-bold">Esc</span>
            <span className="text-[var(--color-on-surface-variant)]">Cancelar ação ou retornar a NORMAL</span>
          </div>
        </div>
      </div>

      {/* Available Commands Table */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-[var(--term-green)]">
          == REGISTRO DE COMANDOS (:) ==
        </div>
        <div className="space-y-1">
          {TUI_COMMANDS.map((cmd) => (
            <div
              key={cmd.command}
              className="p-1.5 rounded bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)] flex items-baseline justify-between gap-4 text-[11px]"
            >
              <div className="flex items-center gap-2">
                <span className="text-[var(--term-green)] font-bold w-28">{cmd.command}</span>
                <span className="text-[var(--color-on-surface)]">{cmd.description}</span>
              </div>
              <span className="text-[10px] text-[var(--color-outline)] font-mono shrink-0 hidden sm:inline">
                {cmd.aliases.join(', ')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation Hints */}
      <div className="pt-2 border-t border-[var(--color-outline)] text-[10px] text-[var(--color-on-surface-variant)] flex gap-4">
        <span>Digite:</span>
        <span className="text-[var(--term-green)]">:home (voltar à Soleria)</span>
        <span className="text-[var(--term-green)]">:q (fechar manual)</span>
      </div>
    </div>
  );
};
