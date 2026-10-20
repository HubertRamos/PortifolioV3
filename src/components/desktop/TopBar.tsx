import React, { useState, useEffect } from 'react';
import { 
  Battery, 
  BatteryCharging, 
  Clock, 
  Music, 
  Volume2, 
  VolumeX, 
  Sun,
  Radio
} from 'lucide-react';
import { playKeyClick } from '../../utils/audio';

interface TopBarProps {
  audioMuted: boolean;
  onToggleAudio: () => void;
  brightness: number;
  onCycleBrightness: () => void;
}

interface BatteryState {
  level: number | null;
  charging: boolean | null;
  supported: boolean;
}

interface MediaState {
  title: string | null;
  artist: string | null;
  playbackState: 'playing' | 'paused' | 'none';
}

export const TopBar: React.FC<TopBarProps> = ({
  audioMuted,
  onToggleAudio,
  brightness,
  onCycleBrightness,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  
  // Real Battery Status API
  const [battery, setBattery] = useState<BatteryState>({
    level: null,
    charging: null,
    supported: false,
  });

  // Real Media Session API
  const [media, setMedia] = useState<MediaState>({
    title: null,
    artist: null,
    playbackState: 'none',
  });

  // Clock in 24h format
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false })
      );
      setDateStr(
        now.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Battery Status API (Chrome / Edge / Opera / supported browsers)
  useEffect(() => {
    let batteryObj: any = null;

    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      (navigator as any).getBattery().then((batt: any) => {
        batteryObj = batt;
        const updateBatt = () => {
          setBattery({
            level: Math.round(batt.level * 100),
            charging: batt.charging,
            supported: true,
          });
        };
        updateBatt();
        batt.addEventListener('levelchange', updateBatt);
        batt.addEventListener('chargingchange', updateBatt);
      }).catch(() => {
        setBattery({ level: null, charging: null, supported: false });
      });
    } else {
      setBattery({ level: null, charging: null, supported: false });
    }

    return () => {
      if (batteryObj) {
        try {
          batteryObj.removeEventListener('levelchange', () => {});
          batteryObj.removeEventListener('chargingchange', () => {});
        } catch {}
      }
    };
  }, []);

  // Media Session API
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
      const ms = navigator.mediaSession;
      const updateMedia = () => {
        if (ms.metadata) {
          setMedia({
            title: ms.metadata.title || null,
            artist: ms.metadata.artist || null,
            playbackState: (ms.playbackState as any) || 'none',
          });
        }
      };
      updateMedia();
    }
  }, []);

  return (
    <header className="h-7 w-full bg-[var(--surface-glass)] backdrop-blur-md border-b border-[var(--glass-border)] shadow-xs flex items-center justify-end px-3 text-xs font-mono select-none z-40 transition-colors duration-200">
      {/* Exclusively: Media, Lighting, Volume, Battery, Time */}
      <div className="flex items-center gap-3 text-[11px]">
        {/* 2.3 Mídia em reprodução */}
        <div 
          className="flex items-center gap-1.5 text-[var(--color-on-surface-variant)] cursor-default"
          title={
            media.title
              ? `Mídia da sessão: ${media.title} ${media.artist ? `— ${media.artist}` : ''} (${media.playbackState})`
              : 'Nenhuma mídia ativa na Media Session API do navegador'
          }
        >
          {media.playbackState === 'playing' ? (
            <Radio className="w-3 h-3 text-[var(--color-primary)] animate-pulse" />
          ) : (
            <Music className="w-3 h-3 text-[var(--color-on-surface-variant)]/70" />
          )}
          {media.title ? (
            <span className="max-w-[140px] truncate text-[var(--color-on-surface)]">
              {media.title}
            </span>
          ) : (
            <span className="text-[10px] text-[var(--color-on-surface-variant)]/60">
              sem mídia
            </span>
          )}
        </div>

        <span className="text-[var(--color-outline)]">|</span>

        {/* 2.5 Iluminação (Brilho visual da interface do portfólio) */}
        <button
          onClick={() => {
            playKeyClick();
            onCycleBrightness();
          }}
          className="flex items-center gap-1 text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition cursor-pointer"
          title={`Brilho visual do portfólio: ${Math.round(brightness * 100)}% (Clique para alternar 100% / 85% / 70%)`}
        >
          <Sun className="w-3 h-3 text-[var(--color-primary)]" />
          <span>{Math.round(brightness * 100)}%</span>
        </button>

        <span className="text-[var(--color-outline)]">|</span>

        {/* 2.4 Volume (Áudio da aplicação) */}
        <button
          onClick={() => {
            playKeyClick();
            onToggleAudio();
          }}
          className="flex items-center gap-1 text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)] transition cursor-pointer"
          title={
            audioMuted
              ? 'Áudio do Hubert OS: Silenciado (Clique para ativar feedback mecânico)'
              : 'Áudio do Hubert OS: Ativado (Clique para silenciar)'
          }
        >
          {audioMuted ? (
            <>
              <VolumeX className="w-3 h-3 text-[var(--color-outline)]" />
              <span className="text-[10px] text-[var(--color-outline)]">mudo</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3 h-3 text-[var(--color-primary)]" />
              <span className="text-[10px] text-[var(--color-on-surface)]">som</span>
            </>
          )}
        </button>

        <span className="text-[var(--color-outline)]">|</span>

        {/* 2.1 Bateria (Real Battery Status API) */}
        <div 
          className="flex items-center gap-1 text-[var(--color-on-surface-variant)] cursor-default"
          title={
            battery.supported && battery.level !== null
              ? `Bateria real do dispositivo: ${battery.level}% ${battery.charging ? '(Carregando)' : '(Na bateria)'}`
              : 'Battery Status API não suportada ou não permitida neste navegador'
          }
        >
          {battery.charging ? (
            <BatteryCharging className="w-3.5 h-3.5 text-[var(--color-primary)]" />
          ) : (
            <Battery className="w-3.5 h-3.5 text-[var(--color-on-surface-variant)]" />
          )}
          {battery.supported && battery.level !== null ? (
            <span className={battery.level <= 20 ? 'text-[var(--color-error)]' : 'text-[var(--color-on-surface)]'}>
              {battery.level}%
            </span>
          ) : (
            <span className="text-[10px] text-[var(--color-outline)]" title="API de bateria indisponível no navegador">
              n/a
            </span>
          )}
        </div>

        <span className="text-[var(--color-outline)]">|</span>

        {/* 2.2 Hora (24h, data em tooltip) */}
        <div 
          className="flex items-center gap-1 text-[var(--color-on-surface)] font-medium cursor-default"
          title={dateStr || 'Data local'}
        >
          <Clock className="w-3 h-3 text-[var(--color-primary)]" />
          <span>{timeStr || '00:00'}</span>
        </div>
      </div>
    </header>
  );
};
