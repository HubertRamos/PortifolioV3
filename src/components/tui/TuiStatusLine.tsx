import React from 'react';
import { TuiMode, TuiBuffer } from '../../types/os';

interface TuiStatusLineProps {
  mode: TuiMode;
  buffer: TuiBuffer;
  notificationMessage?: string | null;
  itemCountInfo?: string;
  theme: 'dark' | 'light';
}

export const TuiStatusLine: React.FC<TuiStatusLineProps> = ({
  mode,
  buffer,
  notificationMessage,
  itemCountInfo,
  theme,
}) => {
  const getModeBadgeClass = () => {
    switch (mode) {
      case 'NORMAL':
        return 'bg-[var(--term-green)] text-[var(--color-on-primary)]';
      case 'INSERT':
        return 'bg-[var(--term-blue)] text-[var(--color-on-tertiary)]';
      case 'COMMAND':
        return 'bg-[var(--color-secondary)] text-[var(--color-on-secondary)]';
    }
  };

  const getBufferLabel = () => {
    switch (buffer) {
      case 'home':
        return 'soleria.sh [HOME]';
      case 'projects':
        return `projects.list ${itemCountInfo ? `[${itemCountInfo}]` : ''}`;
      case 'project_detail':
        return 'project.md';
      case 'about':
        return 'about.md';
      case 'skills':
        return 'skills.txt';
      case 'contact':
        return 'contact.txt';
      case 'help':
        return 'help.txt [RO]';
    }
  };

  return (
    <div className="h-6 w-full bg-[var(--surface-glass-variant)] backdrop-blur-sm border-t border-[var(--glass-border)] px-2 flex items-center justify-between font-mono text-[11px] select-none shrink-0 transition-colors">
      {/* Left: Mode badge & Buffer file name */}
      <div className="flex items-center gap-2">
        <span className={`px-1.5 py-0.2 rounded-xs font-bold text-[10px] ${getModeBadgeClass()}`}>
          {mode}
        </span>
        <span className="text-[var(--color-on-surface)] font-semibold">
          {getBufferLabel()}
        </span>
      </div>

      {/* Center: Notification or hints */}
      <div className="hidden sm:flex items-center text-[10px] text-[var(--term-green)] truncate px-2">
        {notificationMessage ? (
          <span className="animate-pulse">› {notificationMessage}</span>
        ) : (
          <span className="text-[var(--color-on-surface-variant)]">
            {mode === 'NORMAL' && "pressione ':' para comandos ou 'i' para conversar"}
            {mode === 'INSERT' && "modo inserção • Esc para normal"}
            {mode === 'COMMAND' && "modo comando • Enter para executar • Esc para cancelar"}
          </span>
        )}
      </div>

      {/* Right: Technical editor indicators */}
      <div className="flex items-center gap-3 text-[10px] text-[var(--color-on-surface-variant)]">
        <span className="hidden md:inline">utf-8</span>
        <span className="hidden md:inline">[unix]</span>
        <span className="text-[var(--term-green)]">:help</span>
        <span className="text-[var(--color-outline)]">:q</span>
      </div>
    </div>
  );
};
