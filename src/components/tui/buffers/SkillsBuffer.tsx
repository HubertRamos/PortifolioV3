import React from 'react';
import { SKILL_CATEGORIES } from '../../../data/skills';

export const SkillsBuffer: React.FC = () => {
  return (
    <div className="font-mono text-xs select-text space-y-4 max-w-4xl">
      {/* File Header */}
      <div className="pb-1 border-b border-[var(--color-outline)] flex items-center justify-between text-[var(--color-on-surface-variant)]">
        <div className="text-[var(--term-green)] font-bold">
          :: BUFFER: skills.txt :: MATRIZ DE COMPETÊNCIAS &amp; STACK
        </div>
        <div className="text-[10px]">
          [ro] • {SKILL_CATEGORIES.length} grupos
        </div>
      </div>

      <div className="text-[11px] text-[var(--color-on-surface-variant)] leading-relaxed">
        Tecnologias, linguagens e ferramentas aplicadas em projetos reais. Sem percentuais arbitrários.
      </div>

      {/* Skill Categories */}
      <div className="space-y-4 pt-1">
        {SKILL_CATEGORIES.map((cat) => (
          <div key={cat.id} className="space-y-2">
            <div className="text-xs font-bold text-[var(--term-green)] border-b border-[var(--color-outline)]/40 pb-0.5 flex items-center justify-between">
              <span>== {cat.name.toUpperCase()} ==</span>
              <span className="text-[10px] text-[var(--color-on-surface-variant)] font-normal hidden sm:inline">
                {cat.description}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {cat.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-2 rounded bg-[var(--color-surface-variant)]/50 border border-[var(--color-outline)] space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--color-on-surface)]">
                      {skill.name}
                    </span>
                    {skill.highlight && (
                      <span className="text-[9px] px-1 rounded bg-[var(--term-green)]/15 text-[var(--term-green)] font-mono">
                        principal
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[var(--color-on-surface-variant)] leading-relaxed">
                    {skill.description}
                  </p>
                  {skill.relatedTags && skill.relatedTags.length > 0 && (
                    <div className="flex flex-wrap gap-1 text-[10px] text-[var(--term-blue)] pt-0.5">
                      {skill.relatedTags.map((t) => (
                        <span key={t}>#{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Navigation Hints */}
      <div className="pt-2 border-t border-[var(--color-outline)] text-[10px] text-[var(--color-on-surface-variant)] flex gap-4">
        <span>Comandos:</span>
        <span className="text-[var(--term-green)]">:projects (ver código relacionado)</span>
        <span className="text-[var(--term-green)]">:home (voltar)</span>
      </div>
    </div>
  );
};
