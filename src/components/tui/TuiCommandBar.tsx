import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CornerDownLeft } from 'lucide-react';
import { TuiMode } from '../../types/os';
import { TuiCommand, findMatchingTuiCommands } from '../../data/commands';
import { playKeyClick } from '../../utils/audio';

interface TuiCommandBarProps {
  mode: TuiMode;
  onSetMode: (mode: TuiMode) => void;
  onExecute: (input: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export const TuiCommandBar: React.FC<TuiCommandBarProps> = ({
  mode,
  onSetMode,
  onExecute,
  inputRef,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  // Autocomplete suggestions
  const suggestions = useMemo<TuiCommand[]>(() => {
    if (!inputValue.trim() || isDismissed) return [];
    return findMatchingTuiCommands(inputValue);
  }, [inputValue, isDismissed]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [suggestions]);

  // Synchronize input prefix when switching to COMMAND mode
  useEffect(() => {
    if (mode === 'COMMAND' && !inputValue.startsWith(':')) {
      setInputValue(':');
      setIsDismissed(false);
      setTimeout(() => inputRef.current?.focus(), 20);
    } else if (mode === 'NORMAL') {
      setInputValue('');
      setIsDismissed(false);
    }
  }, [mode]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % suggestions.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
        return;
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        const chosen = suggestions[selectedIndex] || suggestions[0];
        if (chosen) {
          setInputValue(chosen.command + ' ');
          setIsDismissed(true);
        }
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsDismissed(true);
        return;
      }
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      // If suggestions are visible and user hits enter, take chosen command or typed input
      const chosen = suggestions.length > 0 && selectedIndex >= 0 ? suggestions[selectedIndex] : null;
      const cmdToSend = chosen ? chosen.command : inputValue;
      onExecute(cmdToSend);
      setInputValue('');
      setIsDismissed(false);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onSetMode('NORMAL');
      setInputValue('');
      setIsDismissed(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setIsDismissed(false);

    if (val.startsWith(':') && mode !== 'COMMAND') {
      onSetMode('COMMAND');
    } else if (!val.startsWith(':') && mode === 'COMMAND') {
      onSetMode('INSERT');
    }
  };

  const renderHighlighted = (cmdStr: string, query: string) => {
    const q = query.trim().toLowerCase().replace(/^:/, '');
    const cleanCmd = cmdStr.toLowerCase();
    const idx = cleanCmd.indexOf(q);

    if (idx === -1 || !q) return <span>{cmdStr}</span>;

    const before = cmdStr.slice(0, idx);
    const match = cmdStr.slice(idx, idx + q.length);
    const after = cmdStr.slice(idx + q.length);

    return (
      <span>
        {before}
        <span className="text-[var(--term-green)] underline font-bold">{match}</span>
        {after}
      </span>
    );
  };

  return (
    <div className="relative w-full bg-[var(--surface-glass)] backdrop-blur-sm border-t border-[var(--glass-border)] font-mono text-xs select-text shrink-0">
      {/* Autocomplete Popup floating directly above command bar with Frosted Glass */}
      {suggestions.length > 0 && (
        <div className="absolute bottom-full mb-1 left-2 max-w-lg w-[calc(100%-1rem)] bg-[var(--surface-glass-variant)] backdrop-blur-md border border-[var(--glass-border)] rounded-md shadow-[var(--glass-shadow)] z-30 overflow-hidden font-mono text-xs animate-in fade-in duration-100">
          <div className="px-2.5 py-1 bg-[var(--surface-glass)] border-b border-[var(--glass-border)] flex items-center justify-between text-[10px] text-[var(--color-on-surface-variant)]">
            <span>Comandos sugeridos ({suggestions.length})</span>
            <span>↑↓ Navegar • Tab Completar • Enter Executar • Esc Fechar</span>
          </div>
          <div className="max-h-44 overflow-y-auto p-1 space-y-0.5">
            {suggestions.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.command}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => {
                    playKeyClick();
                    onExecute(cmd.command);
                    setInputValue('');
                    setIsDismissed(false);
                  }}
                  className={`px-2 py-1.5 rounded flex items-center justify-between cursor-pointer transition select-none ${
                    isSelected
                      ? 'bg-[var(--surface-glass-active)] text-[var(--color-on-surface)] border border-[var(--term-green)]/80 shadow-xs'
                      : 'text-[var(--color-on-surface-variant)] hover:bg-[var(--surface-glass-hover)]'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="font-bold text-[var(--term-green)]">
                      {renderHighlighted(cmd.command, inputValue)}
                    </span>
                    <span className="text-[11px] text-[var(--color-on-surface-variant)] truncate">
                      {cmd.description}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 text-[10px]">
                    <span className="px-1 rounded bg-[var(--color-surface-variant)] border border-[var(--color-outline)] text-[var(--color-on-surface-variant)]">
                      {cmd.category}
                    </span>
                    {isSelected && <CornerDownLeft className="w-3 h-3 text-[var(--term-green)]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Command prompt bar line */}
      <div 
        className="h-8 px-3 flex items-center gap-1.5 cursor-text"
        onClick={() => {
          if (mode === 'NORMAL') {
            onSetMode('COMMAND');
          }
          inputRef.current?.focus();
        }}
      >
        {mode === 'COMMAND' ? (
          <span className="text-[var(--term-green)] font-bold text-sm">:</span>
        ) : (
          <span className="text-[var(--term-green)] font-bold">soleria ❯</span>
        )}

        <input
          ref={inputRef as any}
          type="text"
          value={mode === 'COMMAND' ? inputValue.replace(/^:/, '') : inputValue}
          onChange={(e) => {
            const raw = e.target.value;
            handleChange({
              ...e,
              target: {
                ...e.target,
                value: mode === 'COMMAND' ? `:${raw}` : raw,
              },
            });
          }}
          onKeyDown={handleKeyDown}
          placeholder={
            mode === 'NORMAL' 
              ? "pressione ':' para comandos (:help, :projects, :about) ou 'i' para conversar..."
              : mode === 'COMMAND'
              ? "digite um comando (help, projects, about, skills, contact, theme)..."
              : "escreva uma dúvida sobre Hubert, projetos ou Soleria..."
          }
          className="flex-1 bg-transparent outline-none border-none text-[var(--term-fg)] font-mono text-xs p-0 m-0 placeholder:text-[var(--color-on-surface-variant)]/40"
          spellCheck={false}
          autoComplete="off"
        />

        {mode !== 'NORMAL' && (
          <kbd className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)] border border-[var(--color-outline)]">
            ESC NORMAL
          </kbd>
        )}
      </div>
    </div>
  );
};
