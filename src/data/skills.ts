export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: SkillItem[];
}

export interface SkillItem {
  name: string;
  description: string;
  highlight?: boolean;
  relatedTags?: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    name: "Linguagens de Programação",
    description: "Linguagens utilizadas cotidianamente para construir ferramentas, serviços e aplicações web.",
    skills: [
      {
        name: "TypeScript",
        description: "Tipagem estrita, interfaces genéricas, refatoração segura em larga escala e modelagem de domínio.",
        highlight: true,
        relatedTags: ["typescript", "fullstack", "react"]
      },
      {
        name: "JavaScript (ESNext)",
        description: "Concorrência assíncrona, event loop, manipulação avançada de DOM e arquitetura modular moderna.",
        highlight: true,
        relatedTags: ["javascript", "web", "node"]
      },
      {
        name: "Python",
        description: "Scripts de automação, processamento de dados, APIs REST e prototipagem ágil.",
        highlight: true,
        relatedTags: ["python", "automation", "api"]
      },
      {
        name: "Shell / Bash",
        description: "Scripts de automação de sistema operacional, pipelines de compilação e rotinas Unix.",
        highlight: true,
        relatedTags: ["bash", "linux", "automation"]
      },
      {
        name: "SQL",
        description: "Consultas analíticas, modelagem relacional, junções eficientes e integridade referencial.",
        relatedTags: ["sql", "database", "postgres"]
      }
    ]
  },
  {
    id: "frontend",
    name: "Frontend & Interfaces Web",
    description: "Criação de interfaces reativas, responsivas e visualmente autênticas com altos padrões de UX.",
    skills: [
      {
        name: "React & React 19",
        description: "Hooks customizados, arquitetura de componentes reutilizáveis, gerenciamento de estado e renderização eficiente.",
        highlight: true,
        relatedTags: ["react", "ui", "frontend"]
      },
      {
        name: "Tailwind CSS & CSS Tokens",
        description: "Sistemas de design orientados a tokens, variáveis CSS globais, animações sutis e layouts responsivos flex/grid.",
        highlight: true,
        relatedTags: ["tailwind", "css", "design-system"]
      },
      {
        name: "Vite & Tooling Web",
        description: "Bundling veloz, configuração de plugins, pipelines de build estáticos e otimização de assets.",
        relatedTags: ["vite", "tooling", "performance"]
      },
      {
        name: "Framer Motion / Motion",
        description: "Micro-interações fluidas, transições de estado, animações de layout e feedback gestual.",
        relatedTags: ["motion", "animation", "ux"]
      },
      {
        name: "Acessibilidade & Web Standards",
        description: "Navegação completa por teclado, semântica HTML5, gerenciamento de foco e contraste estrito.",
        relatedTags: ["a11y", "html5", "standards"]
      }
    ]
  },
  {
    id: "backend",
    name: "Backend & Arquitetura de APIs",
    description: "Serviços de retaguarda focados em previsibilidade, integridade de dados e baixa latência.",
    skills: [
      {
        name: "Node.js & Express",
        description: "APIs RESTful, middlewares de segurança, autenticação e comunicação com serviços externos.",
        highlight: true,
        relatedTags: ["node", "express", "backend"]
      },
      {
        name: "FastAPI / Python",
        description: "Endpoints modernos assíncronos com validação via Pydantic e documentação OpenAPI automática.",
        relatedTags: ["fastapi", "python", "rest"]
      },
      {
        name: "Arquitetura REST & Contratos",
        description: "Design de endpoints RESTful, paginação, idempotência, versionamento e tratamento centralizado de erros.",
        relatedTags: ["api", "rest", "architecture"]
      }
    ]
  },
  {
    id: "databases",
    name: "Bancos de Dados & Armazenamento",
    description: "Persistência segura e recuperação eficiente de informações.",
    skills: [
      {
        name: "PostgreSQL",
        description: "Modelagem relacional, índices para performance, constraints de integridade e migrações.",
        highlight: true,
        relatedTags: ["postgresql", "database", "sql"]
      },
      {
        name: "IndexedDB & Local Storage",
        description: "Armazenamento em cache no cliente para suporte offline e persistência de preferências de interface.",
        relatedTags: ["browser-storage", "cache", "offline"]
      }
    ]
  },
  {
    id: "linux_systems",
    name: "Linux, Sistemas & Ferramentas",
    description: "O ambiente primário de trabalho e a base conceitual de toda a estação Hubert OS.",
    skills: [
      {
        name: "Ambiente Linux & Shell",
        description: "Configuração de distros Arch/Debian, Wayland compositors (Hyprland), dotfiles e automação de workflow.",
        highlight: true,
        relatedTags: ["linux", "hyprland", "dotfiles"]
      },
      {
        name: "Git & GitHub Workflow",
        description: "Versionamento semântico, fluxo de branches, pull requests organizados e GitHub Actions para CI/CD.",
        highlight: true,
        relatedTags: ["git", "github", "cicd"]
      },
      {
        name: "Docker & Containers",
        description: "Criação de imagens de desenvolvimento, Dockerfile otimizado e orquestração de serviços com compose.",
        relatedTags: ["docker", "containers", "devops"]
      }
    ]
  },
  {
    id: "automation_ai",
    name: "Automação & Integrações",
    description: "Conexão de APIs públicas, automação de tarefas manuais e integração com ecossistemas externos.",
    skills: [
      {
        name: "Integração com GitHub API",
        description: "Consumo de dados públicos, tratamento de rate limiting, estratégias de cache e sanitização.",
        highlight: true,
        relatedTags: ["github-api", "integrations", "data"]
      },
      {
        name: "Engenharia de Automações",
        description: "Rotinas agendadas (cron), webhooks, extração e sincronização de dados entre plataformas.",
        relatedTags: ["automation", "cron", "webhooks"]
      }
    ]
  }
];
