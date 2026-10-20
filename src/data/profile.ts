export interface ProfileData {
  name: string;
  shortName: string;
  title: string;
  headline: string;
  bio: string;
  detailedBio: string[];
  areasOfFocus: string[];
  location: string;
  email: string;
  githubUsername: string;
  githubUrl: string;
  linkedinUrl: string;
  availability: 'Disponível para novos projetos' | 'Disponível para oportunidades' | 'Ocupado';
  workstation: {
    os: string;
    wm: string;
    shell: string;
    terminal: string;
    editor: string;
  };
}

export const PROFILE_DATA: ProfileData = {
  name: "Hubert Prado Ramos",
  shortName: "Hubert",
  title: "Desenvolvedor & Engenheiro de Software",
  headline: "Construindo arquiteturas web contemporâneas, automações de alto desempenho e interfaces minimalistas em ambiente Linux.",
  bio: "Desenvolvedor focado em criar software veloz, resiliente e bem estruturado. Apaixonado pelo ecossistema Linux, automação de processos e desenvolvimento Full Stack moderno com TypeScript e React.",
  detailedBio: [
    "Engenheiro de software e desenvolvedor com sólida base técnica em desenvolvimento web, sistemas distribuídos e engenharia de software.",
    "Adepto ferrenho da filosofia Unix: construir ferramentas pequenas, previsíveis e que façam uma única coisa com excelência.",
    "Criador do conceito visual Hubert OS e da assistente digital Soleria (HeliMinas), combinando tecnologia pragmática com identidade autoral."
  ],
  areasOfFocus: [
    "Engenharia Frontend & Arquitetura Web (React, TypeScript, Next.js)",
    "Backend & APIs RESTful (Node.js, Express, Python)",
    "Ambientes Linux & Automação (Hyprland, Shell Scripting, Docker)",
    "Otimização de Desempenho e Acessibilidade Web",
    "Sistemas com foco em experiência de usuário técnica e refinada"
  ],
  location: "Arapongas, Paraná — Brasil",
  email: "0hubertpradoramos@gmail.com",
  githubUsername: "hubertramos",
  githubUrl: "https://github.com/hubertramos",
  linkedinUrl: "https://linkedin.com/in/hubertramos",
  availability: "Disponível para novos projetos",
  workstation: {
    os: "Hubert OS (Linux 6.12)",
    wm: "Hyprland (Wayland compositor)",
    shell: "zsh 5.9 + Starship",
    terminal: "Kitty",
    editor: "Neovim / Zed",
  }
};
