import React from 'react';
import { GitHubRepo, GitHubStatus } from '../../../types/os';

interface ProjectsBufferProps {
  repos: GitHubRepo[];
  status: GitHubStatus;
  lastUpdated: string | null;
  errorMessage?: string;
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenDetail: (repo: GitHubRepo) => void;
  filterQuery: string;
}

export const ProjectsBuffer: React.FC<ProjectsBufferProps> = ({
  repos,
  status,
  lastUpdated,
  errorMessage,
  selectedIndex,
  onSelectIndex,
  onOpenDetail,
  filterQuery,
}) => {
  const filtered = repos.filter((r) => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      (r.description && r.description.toLowerCase().includes(q)) ||
      (r.language && r.language.toLowerCase().includes(q)) ||
      r.topics.some((t) => t.toLowerCase().includes(q))
    );
  });

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
      return iso;
    }
  };

  return (
    <div className="font-mono text-xs select-text space-y-2">
      {/* Buffer Header */}
      <div className="pb-1 border-b border-[var(--glass-border)] text-[var(--color-on-surface-variant)] flex flex-wrap items-center justify-between gap-2">
        <div className="text-[var(--term-green)] font-bold">
          :: PROJETOS &amp; REPOSITÓRIOS GITHUB ::
        </div>
        <div className="text-[10px]">
          Status: <span className="text-[var(--term-green)]">{status.toUpperCase()}</span>
          {lastUpdated && ` • Atualizado: ${new Date(lastUpdated).toLocaleTimeString('pt-BR')}`}
        </div>
      </div>

      {/* Instructions header */}
      <div className="text-[10px] text-[var(--color-on-surface-variant)] py-0.5">
        Navegação: <kbd className="text-[var(--term-green)]">[j]</kbd> descer • <kbd className="text-[var(--term-green)]">[k]</kbd> subir • <kbd className="text-[var(--term-green)]">[Enter]</kbd> detalhes • <kbd className="text-[var(--term-green)]">[o]</kbd> abrir no GitHub • <kbd className="text-[var(--term-green)]">[:q]</kbd> voltar
      </div>

      {filterQuery && (
        <div className="text-[11px] text-[var(--term-blue)] bg-[var(--surface-glass-subtle)] px-2 py-0.5 rounded border border-[var(--glass-border)]">
          Filtro ativo: &quot;{filterQuery}&quot; ({filtered.length} encontrados)
        </div>
      )}

      {errorMessage && (
        <div className="text-[11px] text-[var(--term-red)] bg-[var(--surface-glass-subtle)] p-1.5 rounded border border-[var(--glass-border)]">
          [aviso] {errorMessage}
        </div>
      )}

      {/* Repositories List */}
      <div className="space-y-1.5 pt-1">
        {filtered.map((repo, idx) => {
          const isSelected = idx === selectedIndex;
          const numStr = String(idx + 1).padStart(2, '0');

          return (
            <div
              key={repo.id}
              onClick={() => {
                onSelectIndex(idx);
                onOpenDetail(repo);
              }}
              className={`p-2 rounded transition cursor-pointer flex flex-col gap-0.5 ${
                isSelected
                  ? 'bg-[var(--surface-glass-active)] border-l-2 border-[var(--term-green)] pl-2 text-[var(--color-on-surface)] shadow-xs'
                  : 'hover:bg-[var(--surface-glass-hover)] text-[var(--color-on-surface-variant)] border-l-2 border-transparent pl-2'
              }`}
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className={isSelected ? 'text-[var(--term-green)] font-bold' : 'text-[var(--color-outline)]'}>
                    [{numStr}]
                  </span>
                  <span className={`font-semibold ${isSelected ? 'text-[var(--term-green)]' : 'text-[var(--color-on-surface)]'}`}>
                    {repo.name}
                  </span>
                  {repo.language && (
                    <span className="text-[10px] text-[var(--term-blue)]">
                      [{repo.language}]
                    </span>
                  )}
                  {repo.archived && (
                    <span className="text-[9px] text-[var(--color-outline)] border border-[var(--color-outline)] px-1 rounded">
                      arquivado
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-[10px] text-[var(--color-on-surface-variant)]">
                  <span>★ {repo.stargazers_count}</span>
                  <span>⑂ {repo.forks_count}</span>
                  <span className="hidden sm:inline">({formatDate(repo.updated_at)})</span>
                </div>
              </div>

              <div className="text-[11px] text-[var(--color-on-surface-variant)] line-clamp-2 leading-relaxed">
                {repo.description || 'Sem descrição pública fornecida no GitHub.'}
              </div>

              {repo.topics && repo.topics.length > 0 && (
                <div className="text-[10px] text-[var(--color-outline)] pt-0.5 flex flex-wrap gap-1.5">
                  {repo.topics.map((t) => (
                    <span key={t}>#{t}</span>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-8 text-center text-xs text-[var(--color-on-surface-variant)]">
            Nenhum repositório correspondente encontrado.
          </div>
        )}
      </div>
    </div>
  );
};
