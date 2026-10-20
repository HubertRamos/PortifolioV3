import React, { useState } from 'react';
import { PROFILE_DATA } from '../../../data/profile';
import { playKeyClick, playSuccessChime } from '../../../utils/audio';

interface ContactBufferProps {
  onNotify: (msg: string) => void;
}

export const ContactBuffer: React.FC<ContactBufferProps> = ({ onNotify }) => {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderMsg, setSenderMsg] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const handleCopyEmail = () => {
    playKeyClick();
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopied(true);
    playSuccessChime();
    onNotify('Email copiado para a área de transferência: ' + PROFILE_DATA.email);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderMsg.trim()) return;

    const subject = encodeURIComponent(`[Contato Hubert OS] Mensagem de ${senderName || 'Visitante'}`);
    const body = encodeURIComponent(senderMsg);
    window.location.href = `mailto:${PROFILE_DATA.email}?subject=${subject}&body=${body}`;
    onNotify('Abrindo cliente de email padrão com o rascunho...');
  };

  return (
    <div className="font-mono text-xs select-text space-y-4 max-w-3xl">
      {/* File Header */}
      <div className="pb-1 border-b border-[var(--color-outline)] flex items-center justify-between text-[var(--color-on-surface-variant)]">
        <div className="text-[var(--term-green)] font-bold">
          :: BUFFER: contact.txt :: CANAIS DE COMUNICAÇÃO DIRETA
        </div>
        <div className="text-[10px]">
          Status: {PROFILE_DATA.availability}
        </div>
      </div>

      <p className="text-xs text-[var(--color-on-surface)] leading-relaxed">
        Interessado em propostas profissionais, engenharia de software full stack ou colaborações open source? Utilize os canais verificados abaixo:
      </p>

      {/* Actionable Contact Rows */}
      <div className="space-y-2 pt-1">
        {/* Email option */}
        <div className="p-2.5 rounded bg-[var(--color-surface-variant)]/60 border border-[var(--color-outline)] flex items-center justify-between flex-wrap gap-2">
          <div className="space-y-0.5">
            <div className="text-[10px] text-[var(--color-outline)] font-bold">
              [CANAL PRIMÁRIO] EMAIL
            </div>
            <div className="text-xs text-[var(--term-green)] font-bold select-all">
              {PROFILE_DATA.email}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopyEmail}
              className="px-2.5 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-outline)] hover:border-[var(--term-green)] text-[11px] text-[var(--color-on-surface)] transition cursor-pointer"
            >
              {copied ? '[✓ Copiado]' : '[y] Copiar'}
            </button>
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="px-2.5 py-1 rounded bg-[var(--term-green)] text-[var(--color-on-primary)] font-bold text-[11px] transition"
            >
              [e] Escrever
            </a>
          </div>
        </div>

        {/* GitHub option */}
        <div className="p-2.5 rounded bg-[var(--color-surface-variant)]/60 border border-[var(--color-outline)] flex items-center justify-between flex-wrap gap-2">
          <div className="space-y-0.5">
            <div className="text-[10px] text-[var(--color-outline)] font-bold">
              [REPOSITÓRIOS &amp; CÓDIGO] GITHUB
            </div>
            <div className="text-xs text-[var(--color-on-surface)]">
              github.com/{PROFILE_DATA.githubUsername}
            </div>
          </div>
          <a
            href={PROFILE_DATA.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-outline)] hover:border-[var(--term-blue)] text-[11px] text-[var(--term-blue)] transition"
          >
            [o] Acessar Perfil ↗
          </a>
        </div>

        {/* LinkedIn option */}
        <div className="p-2.5 rounded bg-[var(--color-surface-variant)]/60 border border-[var(--color-outline)] flex items-center justify-between flex-wrap gap-2">
          <div className="space-y-0.5">
            <div className="text-[10px] text-[var(--color-outline)] font-bold">
              [REDE PROFISSIONAL] LINKEDIN
            </div>
            <div className="text-xs text-[var(--color-on-surface)]">
              linkedin.com/in/hubertprado
            </div>
          </div>
          <a
            href={PROFILE_DATA.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-outline)] hover:border-[var(--term-blue)] text-[11px] text-[var(--term-blue)] transition"
          >
            [l] Conectar ↗
          </a>
        </div>
      </div>

      {/* Interactive Textual Composer toggle */}
      <div className="pt-2">
        {!isComposing ? (
          <button
            onClick={() => setIsComposing(true)}
            className="text-[11px] text-[var(--term-green)] hover:underline cursor-pointer"
          >
            › Pressione aqui para rascunhar uma mensagem rápida diretamente no terminal...
          </button>
        ) : (
          <form onSubmit={handleSendDraft} className="p-3 bg-[var(--color-surface-variant)]/40 rounded border border-[var(--color-outline)] space-y-2">
            <div className="text-xs font-bold text-[var(--term-green)]">
              -- COMPOSITOR TEXTUAL DE MENSAGEM --
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-[var(--color-on-surface-variant)] block">Seu nome / empresa:</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Ex: Ana Silva"
                className="w-full bg-[var(--color-surface)] border border-[var(--color-outline)] rounded px-2 py-1 text-xs text-[var(--color-on-surface)] focus:outline-none focus:border-[var(--term-green)]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-[var(--color-on-surface-variant)] block">Mensagem:</label>
              <textarea
                rows={3}
                value={senderMsg}
                onChange={(e) => setSenderMsg(e.target.value)}
                placeholder="Escreva brevemente o assunto ou escopo da proposta..."
                className="w-full bg-[var(--color-surface)] border border-[var(--color-outline)] rounded px-2 py-1 text-xs text-[var(--color-on-surface)] focus:outline-none focus:border-[var(--term-green)]"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                disabled={!senderMsg.trim()}
                className="px-3 py-1 rounded bg-[var(--term-green)] text-[var(--color-on-primary)] font-bold text-xs disabled:opacity-50 cursor-pointer"
              >
                Gerar Email (mailto:)
              </button>
              <button
                type="button"
                onClick={() => setIsComposing(false)}
                className="px-2 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-outline)] text-xs text-[var(--color-on-surface-variant)] cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Footer Navigation Hints */}
      <div className="pt-2 border-t border-[var(--color-outline)] text-[10px] text-[var(--color-on-surface-variant)] flex gap-4">
        <span>Atalhos:</span>
        <span className="text-[var(--term-green)]">:home (voltar)</span>
        <span className="text-[var(--term-green)]">:projects (projetos)</span>
      </div>
    </div>
  );
};
