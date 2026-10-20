export type TuiMode = 'NORMAL' | 'INSERT' | 'COMMAND';

export type TuiBuffer = 
  | 'home' 
  | 'projects' 
  | 'project_detail' 
  | 'about' 
  | 'skills' 
  | 'contact' 
  | 'help';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  created_at: string;
  homepage: string | null;
  archived: boolean;
  fork: boolean;
}

export type GitHubStatus = 'synced' | 'updating' | 'cached' | 'error';

export interface SoleriaDialogue {
  id: string;
  category: 'about_hubert' | 'projects' | 'tech' | 'soleria' | 'trivia' | 'contact';
  categoryLabel: string;
  question: string;
  answer: string;
  suggestedFollowUps?: string[];
  targetBuffer?: TuiBuffer;
}

export interface TerminalEntry {
  id: string;
  type: 'banner' | 'prompt' | 'output' | 'error' | 'soleria';
  text?: string;
  command?: string;
  targetBuffer?: TuiBuffer;
  customComponent?: React.ReactNode;
}
