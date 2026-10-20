import React, { useState, useEffect, useCallback } from 'react';
import { TopBar } from './components/desktop/TopBar';
import { TuiWorkspace } from './components/tui/TuiWorkspace';
import { GitHubRepo, GitHubStatus } from './types/os';
import { fetchGitHubRepos } from './services/github';
import { PROFILE_DATA } from './data/profile';
import { 
  getAudioMuted, 
  setAudioMuted 
} from './utils/audio';

export default function App() {
  // Theme state: dark is default as mandated
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [audioMuted, setAudioMutedState] = useState<boolean>(false);
  const [brightness, setBrightness] = useState<number>(1.0); // 1.0 (100%), 0.85 (85%), 0.70 (70%)

  // GitHub state
  const [githubUsername] = useState<string>(PROFILE_DATA.githubUsername);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [githubStatus, setGithubStatus] = useState<GitHubStatus>('synced');
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [githubError, setGithubError] = useState<string | undefined>();

  // Load theme and audio preference on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('hubert_os_theme') as 'dark' | 'light' | null;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
      }

      const muted = getAudioMuted();
      setAudioMutedState(muted);

      const savedBrightness = localStorage.getItem('hubert_os_brightness');
      if (savedBrightness) {
        setBrightness(parseFloat(savedBrightness));
      }
    } catch {}
  }, []);

  // Theme toggle
  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    try {
      localStorage.setItem('hubert_os_theme', nextTheme);
    } catch {}
  };

  const handleSetTheme = (th: 'dark' | 'light') => {
    setTheme(th);
    document.documentElement.setAttribute('data-theme', th);
    try {
      localStorage.setItem('hubert_os_theme', th);
    } catch {}
  };

  // Audio toggle
  const handleToggleAudio = () => {
    const next = !audioMuted;
    setAudioMutedState(next);
    setAudioMuted(next);
  };

  // Cycle Visual Brightness (100% -> 85% -> 70% -> 100%)
  const handleCycleBrightness = () => {
    const levels = [1.0, 0.85, 0.70];
    const currentIndex = levels.indexOf(brightness);
    const nextBrightness = levels[(currentIndex + 1) % levels.length];
    setBrightness(nextBrightness);
    try {
      localStorage.setItem('hubert_os_brightness', nextBrightness.toString());
    } catch {}
  };

  // GitHub Data Sync
  const loadGitHubData = useCallback(async (user: string, force: boolean = false) => {
    setGithubStatus('updating');

    const result = await fetchGitHubRepos(user, force);

    setRepos(result.repos);
    setGithubStatus(result.status);
    setLastSyncTime(result.lastUpdated);
    setGithubError(result.errorMessage);
  }, []);

  useEffect(() => {
    loadGitHubData(githubUsername, false);
  }, [githubUsername, loadGitHubData]);

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden flex flex-col text-[var(--color-on-surface)] transition-all duration-200"
      style={{ filter: brightness < 1.0 ? `brightness(${brightness})` : undefined }}
    >
      {/* High-Resolution Desktop Scenic Wallpaper (Fixed full-screen) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat transition-all duration-300"
        style={{
          backgroundImage: `url('/wallpaper.jpg')`,
        }}
      />

      {/* Atmospheric Wallpaper Tint Overlay for Visual Comfort and High Contrast */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-colors duration-300"
        style={{
          backgroundColor: 'var(--wallpaper-overlay)',
        }}
      />

      {/* Minimalist Top Bar in Frosted Glass containing exclusively battery, time, media, volume, lighting */}
      <TopBar
        audioMuted={audioMuted}
        onToggleAudio={handleToggleAudio}
        brightness={brightness}
        onCycleBrightness={handleCycleBrightness}
      />

      {/* Neovim-Inspired Textual TUI Environment with Frosted Translucency */}
      <main className="relative z-10 flex-1 overflow-hidden flex flex-col">
        <TuiWorkspace
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onSetTheme={handleSetTheme}
          repos={repos}
          githubStatus={githubStatus}
          lastSyncTime={lastSyncTime}
          githubError={githubError}
          onRefreshGitHub={() => loadGitHubData(githubUsername, true)}
        />
      </main>
    </div>
  );
}
