import React from 'react';
import { TerminalEntry } from '../../../types/os';

interface HomeBufferProps {
  entries: TerminalEntry[];
}

export const HomeBuffer: React.FC<HomeBufferProps> = ({ entries }) => {
  return (
    <div className="space-y-3 font-mono text-xs leading-relaxed select-text">
      {/* Large ASCII Art Banner */}
      <div className="select-none overflow-x-auto py-1">
        <pre className="font-mono text-[10px] sm:text-xs leading-none text-[var(--term-green)] font-bold tracking-tighter">
{`  ____   ___  _     _____ ____  ___    _    
 / ___| / _ \\| |   | ____|  _ \\|_ _|  / \\   
 \\___ \\| | | | |   |  _| | |_) || |  / _ \\  
  ___) | |_| | |___| |___|  _ < | | / ___ \\ 
 |____/ \\___/|_____|_____|_| \\_\\___/_/   \\_\\`}
        </pre>

        <div className="pt-2 text-[11px] space-y-0.5 text-[var(--term-fg)]">
          <div className="flex items-center gap-2">
            <span className="text-[var(--term-blue)] font-semibold">SOLERIA • TEXTUAL USER INTERFACE (TUI)</span>
            <span className="text-[var(--color-outline)]">•</span>
            <span className="text-[var(--color-on-surface-variant)] text-[10px]">Neovim Edition v2.4.0</span>
          </div>
          <div className="text-[10px] text-[var(--color-on-surface-variant)]">
            Estação de Trabalho Hubert OS • Digite <span className="text-[var(--term-green)] font-bold">:help</span> para ajuda ou <span className="text-[var(--term-green)] font-bold">i</span> para interagir com a Soleria.
          </div>
        </div>

        <div className="text-[var(--glass-border)] pt-1 select-none text-[10px]">
          ────────────────────────────────────────────────────────────────────────
        </div>
      </div>

      {/* Terminal History Entries */}
      <div className="space-y-2">
        {entries.map((entry) => {
          if (entry.type === 'prompt') {
            return (
              <div key={entry.id} className="flex items-baseline gap-1.5 text-[var(--term-fg)] font-medium">
                <span className="text-[var(--term-green)] font-bold">soleria</span>
                <span className="text-[var(--term-blue)] font-bold">❯</span>
                <span className="font-semibold">{entry.command}</span>
              </div>
            );
          }

          if (entry.type === 'soleria') {
            return (
              <div key={entry.id} className="py-1 px-2.5 rounded bg-[var(--surface-glass-subtle)] border-l-2 border-[var(--term-green)] text-[var(--term-fg)] space-y-1">
                <div className="flex items-center justify-between text-[10px] text-[var(--color-on-surface-variant)]">
                  <span className="text-[var(--term-green)] font-bold">soleria</span>
                  {entry.targetBuffer && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-[var(--term-green)]/15 text-[var(--term-green)] font-mono">
                      [Buffer :{entry.targetBuffer}]
                    </span>
                  )}
                </div>
                <div className="whitespace-pre-line text-xs font-mono leading-relaxed">
                  {entry.text}
                </div>
              </div>
            );
          }

          if (entry.type === 'error') {
            return (
              <div key={entry.id} className="text-[var(--term-red)] font-mono text-xs">
                {entry.text}
              </div>
            );
          }

          return (
            <div key={entry.id} className="text-[var(--term-fg)] font-mono text-xs">
              {entry.customComponent ? entry.customComponent : entry.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};
