import React from 'react';
import { GitHubRepo } from '../../../types/os';

interface ProjectDetailBufferProps {
  repo: GitHubRepo;
  onBack: () => void;
}

export const ProjectDetailBuffer: React.FC<ProjectDetailBufferProps> = ({ repo, onBack }) => {
  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    } catch {
      return iso;
    }
  };

  return (
    <div className="font-mono text-xs select-text space-y-4">
      {/* Header */}
      <div className="pb-1 border-b border-[var(--color-outline)] flex items-center justify-between text-[var(--color-on-surface-variant)]">
        <div className="text-[var(--term-green)] font-bold">
          :: DETALHES DO PROJETO :: {repo.name.toUpperCase()}
        </div>
        <button
          onClick={onBack}
          className="text-[10px] text-[var(--term-blue)] hover:underline cursor-pointer"
        >
          [q] ou [Esc] Voltar à lista
        </button>
      </div>

      {/* Main Details block */}
      <div className="p-3 bg-[var(--color-surface-variant)]/60 rounded border border-[var(--color-outline)] space-y-2">
        <div className="text-sm font-bold text-[var(--term-green)]">
          {repo.name}
        </div>
        <div className="text-xs text-[var(--color-on-surface)] leading-relaxed">
          {repo.description || 'Nenhuma descrição fornecida no repositório.'}
        </div>
      </div>

      {/* Metadata Table */}
      <div className="space-y-1.5 text-xs">
        <div className="flex">
          <span className="w-32 text-[var(--color-on-surface-variant)]">Repositório:</span>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--term-green)] hover:underline"
          >
            {repo.html_url}
          </a>
        </div>

        {repo.homepage && (
          <div className="flex">
            <span className="w-32 text-[var(--color-on-surface-variant)]">Homepage / Demo:</span>
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--term-blue)] hover:underline"
            >
              {repo.homepage}
            </a>
          </div>
        )}

        <div className="flex">
          <span className="w-32 text-[var(--color-on-surface-variant)]">Linguagem:</span>
          <span className="text-[var(--color-on-surface)]">{repo.language || 'Não especificada'}</span>
        </div>

        <div className="flex">
          <span className="w-32 text-[var(--color-on-surface-variant)]">Métricas:</span>
          <span className="text-[var(--color-on-surface)]">★ {repo.stargazers_count} estrelas • ⑂ {repo.forks_count} forks</span>
        </div>

        <div className="flex">
          <span className="w-32 text-[var(--color-on-surface-variant)]">Atualizado:</span>
          <span className="text-[var(--color-on-surface)]">{formatDate(repo.updated_at)}</span>
        </div>

        <div className="flex">
          <span className="w-32 text-[var(--color-on-surface-variant)]">Criado em:</span>
          <span className="text-[var(--color-on-surface)]">{formatDate(repo.created_at)}</span>
        </div>

        {repo.topics && repo.topics.length > 0 && (
          <div className="flex items-baseline">
            <span className="w-32 text-[var(--color-on-surface-variant)]">Tópicos:</span>
            <div className="flex flex-wrap gap-1.5 text-[var(--term-blue)]">
              {repo.topics.map((t) => (
                <span key={t}>#{t}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Keys Footer */}
      <div className="pt-3 border-t border-[var(--color-outline)] text-[11px] text-[var(--color-on-surface-variant)] flex flex-wrap gap-4">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--term-green)] hover:underline"
        >
          [o] Abrir código no GitHub ↗
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--term-blue)] hover:underline"
          >
            [d] Abrir demonstração ↗
          </a>
        )}
        <button
          onClick={onBack}
          className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)] cursor-pointer"
        >
          [q] Retornar à lista de projetos
        </button>
      </div>
    </div>
  );
};
