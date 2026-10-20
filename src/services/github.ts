import { GitHubRepo, GitHubStatus } from '../types/os';
import { PROFILE_DATA } from '../data/profile';

const CACHE_KEY_PREFIX = 'hubert_os_github_repos_';
const CACHE_TIME_PREFIX = 'hubert_os_github_time_';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

export interface FetchReposResult {
  repos: GitHubRepo[];
  status: GitHubStatus;
  lastUpdated: string | null;
  errorMessage?: string;
  isFromCache: boolean;
}

export async function fetchGitHubRepos(
  username: string = PROFILE_DATA.githubUsername,
  forceRefresh: boolean = false
): Promise<FetchReposResult> {
  const cacheKey = `${CACHE_KEY_PREFIX}${username}`;
  const timeKey = `${CACHE_TIME_PREFIX}${username}`;

  // Check localStorage cache first
  const cachedDataStr = localStorage.getItem(cacheKey);
  const cachedTimeStr = localStorage.getItem(timeKey);

  let cachedRepos: GitHubRepo[] | null = null;
  let cachedTimestamp: string | null = cachedTimeStr || null;

  if (cachedDataStr) {
    try {
      cachedRepos = JSON.parse(cachedDataStr);
    } catch {
      cachedRepos = null;
    }
  }

  // If cache is fresh and not forcing refresh, return cached immediately
  if (!forceRefresh && cachedRepos && cachedTimeStr) {
    const age = Date.now() - new Date(cachedTimeStr).getTime();
    if (age < CACHE_TTL_MS) {
      return {
        repos: cachedRepos,
        status: 'synced',
        lastUpdated: cachedTimeStr,
        isFromCache: true,
      };
    }
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Usuário '${username}' não encontrado no GitHub.`);
      } else if (response.status === 403) {
        throw new Error('Limite de requisições da API pública do GitHub atingido temporariamente.');
      } else {
        throw new Error(`Erro na API do GitHub (HTTP ${response.status}).`);
      }
    }

    const rawData = await response.json();

    if (!Array.isArray(rawData)) {
      throw new Error('Formato inesperado retornado pela API do GitHub.');
    }

    // Sanitize and map repository fields safely
    const sanitizedRepos: GitHubRepo[] = rawData
      .filter((repo: any) => repo && typeof repo.name === 'string')
      .map((repo: any) => ({
        id: Number(repo.id) || Math.random(),
        name: String(repo.name).trim(),
        full_name: String(repo.full_name || repo.name).trim(),
        description: repo.description ? String(repo.description).trim() : null,
        html_url: String(repo.html_url || `https://github.com/${username}/${repo.name}`),
        language: repo.language ? String(repo.language) : null,
        stargazers_count: Number(repo.stargazers_count) || 0,
        forks_count: Number(repo.forks_count) || 0,
        topics: Array.isArray(repo.topics) ? repo.topics.map(String) : [],
        updated_at: String(repo.updated_at || new Date().toISOString()),
        created_at: String(repo.created_at || new Date().toISOString()),
        homepage: repo.homepage && typeof repo.homepage === 'string' && repo.homepage.startsWith('http')
          ? repo.homepage.trim()
          : null,
        archived: Boolean(repo.archived),
        fork: Boolean(repo.fork),
      }));

    const nowIso = new Date().toISOString();
    try {
      localStorage.setItem(cacheKey, JSON.stringify(sanitizedRepos));
      localStorage.setItem(timeKey, nowIso);
    } catch (e) {
      console.warn('Could not save GitHub repos to localStorage:', e);
    }

    return {
      repos: sanitizedRepos,
      status: 'synced',
      lastUpdated: nowIso,
      isFromCache: false,
    };
  } catch (error: any) {
    const errorMsg = error?.name === 'AbortError' 
      ? 'Tempo limite de requisição excedido ao conectar com o GitHub.' 
      : (error?.message || 'Falha ao buscar repositórios no GitHub.');

    // If we have cached repos, fallback to cached gracefully
    if (cachedRepos && cachedRepos.length > 0) {
      return {
        repos: cachedRepos,
        status: 'cached',
        lastUpdated: cachedTimestamp,
        errorMessage: `${errorMsg} Exibindo dados da última sincronização bem-sucedida.`,
        isFromCache: true,
      };
    }

    return {
      repos: [],
      status: 'error',
      lastUpdated: null,
      errorMessage: errorMsg,
      isFromCache: false,
    };
  }
}
