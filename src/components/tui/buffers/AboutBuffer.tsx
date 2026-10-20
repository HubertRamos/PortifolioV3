import React from 'react';
import { PROFILE_DATA } from '../../../data/profile';

export const AboutBuffer: React.FC = () => {
  return (
    <div className="font-mono text-xs select-text space-y-4 max-w-4xl">
      {/* File Header */}
      <div className="pb-1 border-b border-[var(--color-outline)] flex items-center justify-between text-[var(--color-on-surface-variant)]">
        <div className="text-[var(--term-green)] font-bold">
          :: BUFFER: about.md :: APRESENTAÇÃO PROFISSIONAL
        </div>
        <div className="text-[10px]">
          [ro] • utf-8
        </div>
      </div>

      {/* Main Profile Info */}
      <div className="space-y-1">
        <div className="text-base font-bold text-[var(--term-green)]">
          # {PROFILE_DATA.name.toUpperCase()}
        </div>
        <div className="text-xs text-[var(--term-blue)] font-semibold">
          {PROFILE_DATA.title}
        </div>
        <div className="text-[11px] text-[var(--color-on-surface-variant)] pt-0.5">
          Local: {PROFILE_DATA.location} • Status: <span className="text-[var(--term-green)]">{PROFILE_DATA.availability}</span>
        </div>
      </div>

      {/* Headline & Overview */}
      <div className="p-2.5 rounded bg-[var(--color-surface-variant)]/60 border border-[var(--color-outline)] space-y-1">
        <div className="text-[11px] text-[var(--color-outline)] font-bold">
          ## SUMÁRIO
        </div>
        <p className="text-xs text-[var(--color-on-surface)] leading-relaxed">
          {PROFILE_DATA.headline}
        </p>
      </div>

      {/* Philosophy & Detailed Bio */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-[var(--term-green)]">
          ## TRAJETÓRIA &amp; FILOSOFIA DE DESENVOLVIMENTO
        </div>
        <p className="text-xs text-[var(--color-on-surface)] leading-relaxed">
          {PROFILE_DATA.bio}
        </p>
        <div className="space-y-1.5 pt-1 text-xs text-[var(--color-on-surface-variant)]">
          {PROFILE_DATA.detailedBio.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 leading-relaxed">
              <span className="text-[var(--term-green)]">›</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Areas of Focus */}
      <div className="space-y-2 pt-1">
        <div className="text-xs font-bold text-[var(--term-green)]">
          ## PRINCIPAIS ÁREAS DE ATUAÇÃO
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
          {PROFILE_DATA.areasOfFocus.map((focus, idx) => (
            <div
              key={idx}
              className="p-1.5 rounded bg-[var(--color-surface-variant)]/40 border border-[var(--color-outline)] text-[11px] flex items-center gap-2"
            >
              <span className="text-[var(--term-green)] font-bold">[✓]</span>
              <span>{focus}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Workstation Specification */}
      <div className="space-y-2 pt-1">
        <div className="text-xs font-bold text-[var(--term-green)]">
          ## ESPECIFICAÇÕES DA ESTAÇÃO DE TRABALHO
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5 text-[11px]">
          <div className="p-1.5 rounded bg-[var(--color-surface-variant)] border border-[var(--color-outline)]">
            <span className="text-[var(--color-on-surface-variant)]">Sistema Operacional: </span>
            <span className="text-[var(--color-on-surface)] font-semibold">{PROFILE_DATA.workstation.os}</span>
          </div>
          <div className="p-1.5 rounded bg-[var(--color-surface-variant)] border border-[var(--color-outline)]">
            <span className="text-[var(--color-on-surface-variant)]">Window Manager / TUI: </span>
            <span className="text-[var(--color-on-surface)] font-semibold">{PROFILE_DATA.workstation.wm}</span>
          </div>
          <div className="p-1.5 rounded bg-[var(--color-surface-variant)] border border-[var(--color-outline)]">
            <span className="text-[var(--color-on-surface-variant)]">Shell: </span>
            <span className="text-[var(--color-on-surface)] font-semibold">{PROFILE_DATA.workstation.shell}</span>
          </div>
          <div className="p-1.5 rounded bg-[var(--color-surface-variant)] border border-[var(--color-outline)]">
            <span className="text-[var(--color-on-surface-variant)]">Editor Principal: </span>
            <span className="text-[var(--color-on-surface)] font-semibold">{PROFILE_DATA.workstation.editor}</span>
          </div>
          <div className="p-1.5 rounded bg-[var(--color-surface-variant)] border border-[var(--color-outline)] sm:col-span-2">
            <span className="text-[var(--color-on-surface-variant)]">Terminal Emulator: </span>
            <span className="text-[var(--color-on-surface)] font-semibold">{PROFILE_DATA.workstation.terminal}</span>
          </div>
        </div>
      </div>

      {/* Footer Navigation Hints */}
      <div className="pt-2 border-t border-[var(--color-outline)] text-[10px] text-[var(--color-on-surface-variant)] flex gap-4">
        <span>Comandos relacionados:</span>
        <span className="text-[var(--term-green)]">:projects (ver código)</span>
        <span className="text-[var(--term-green)]">:skills (competências)</span>
        <span className="text-[var(--term-green)]">:contact (falar com Hubert)</span>
      </div>
    </div>
  );
};
