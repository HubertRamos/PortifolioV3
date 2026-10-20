import { SoleriaDialogue } from '../types/os';

export const SOLERIA_RANDOM_COMMENTS: string[] = [
  "Mais uma pergunta técnica? Finalmente alguém com bom gosto.",
  "Hubert provavelmente está mexendo em alguma configuração do Neovim neste momento.",
  "Pausa para manutenção crítica: pão de queijo quentinho com café.",
  "Essa resposta foi rigorosamente auditada pelo departamento de implicância digital.",
  "Compilar na primeira tentativa é lenda urbana, mas nós tentamos mesmo assim.",
  "Dica de ouro: se o código funciona de primeira, desconfie e cheque os logs.",
  "Segundo as diretrizes de HeliMinas, bugs em produção custam uma fornada inteira de pão de queijo."
];

export const SOLERIA_CATEGORIES = [
  { id: 'about_hubert', label: 'Sobre Hubert' },
  { id: 'projects', label: 'Projetos' },
  { id: 'tech', label: 'Tecnologias' },
  { id: 'soleria', label: 'Sobre Soleria' },
  { id: 'trivia', label: 'Curiosidades' },
  { id: 'contact', label: 'Contato' },
] as const;

export const SOLERIA_DIALOGUES: SoleriaDialogue[] = [
  // --- SOBRE HUBERT ---
  {
    id: 'who-is-hubert',
    category: 'about_hubert',
    categoryLabel: 'Sobre Hubert',
    question: 'Quem é Hubert?',
    answer: 'Hubert é desenvolvedor e engenheiro de software focado na construção de sistemas eficientes, arquiteturas web modernas e ferramentas práticas. É o responsável técnico por cada linha de código deste ambiente e o mentor da minha existência digital.',
    suggestedFollowUps: ['what-hubert-does', 'which-tech-stack', 'how-hubert-started'],
    targetBuffer: 'about'
  },
  {
    id: 'what-hubert-does',
    category: 'about_hubert',
    categoryLabel: 'Sobre Hubert',
    question: 'O que você faz?',
    answer: 'Ele projeta e constrói aplicações completas: desde interfaces web reativas e fluidas até APIs robustas, microsserviços, integrações de sistemas e automações em ambientes Linux.',
    suggestedFollowUps: ['which-projects', 'frontend-tech', 'backend-dev'],
    targetBuffer: 'projects'
  },
  {
    id: 'main-areas-of-focus',
    category: 'about_hubert',
    categoryLabel: 'Sobre Hubert',
    question: 'Quais são suas principais áreas de atuação?',
    answer: 'Desenvolvimento Full Stack moderno (TypeScript, React, Node/Go), engenharia de software voltada a desempenho, infraestrutura e automação em ambiente Linux, além de arquitetura de dados e APIs REST.',
    suggestedFollowUps: ['which-languages', 'work-with-linux', 'open-to-opportunities'],
    targetBuffer: 'skills'
  },
  {
    id: 'how-hubert-started',
    category: 'about_hubert',
    categoryLabel: 'Sobre Hubert',
    question: 'Como você começou a programar?',
    answer: 'Começou movido pela curiosidade de entender como sistemas operacionais funcionavam por dentro, desmontando scripts, explorando distribuições Linux e criando pequenas ferramentas para resolver problemas do dia a dia.',
    suggestedFollowUps: ['who-is-hubert', 'work-with-linux', 'which-languages']
  },
  {
    id: 'what-developing-currently',
    category: 'about_hubert',
    categoryLabel: 'Sobre Hubert',
    question: 'O que você está desenvolvendo atualmente?',
    answer: 'No momento, ele está aprimorando este próprio Hubert OS TUI, trabalhando em ferramentas open source para desenvolvedores e arquitetando novas aplicações conectadas ao ecossistema do GitHub.',
    suggestedFollowUps: ['which-projects', 'where-to-see-code', 'how-to-contact'],
    targetBuffer: 'projects'
  },

  // --- PROJETOS ---
  {
    id: 'which-projects',
    category: 'projects',
    categoryLabel: 'Projetos',
    question: 'Quais projetos você desenvolveu?',
    answer: 'Essa parte eu atualizo a partir dos repositórios públicos do GitHub do meu criador. Assim posso mostrar projetos reais, com commits recentes, métricas verdadeiras e links diretos para o código-fonte.',
    suggestedFollowUps: ['most-interesting-project', 'where-to-see-code', 'develop-web-apps'],
    targetBuffer: 'projects'
  },
  {
    id: 'most-interesting-project',
    category: 'projects',
    categoryLabel: 'Projetos',
    question: 'Qual é o seu projeto mais interessante?',
    answer: 'Além do próprio Hubert OS TUI (comigo inclusa, claro, afinal não sou nada modesta), há utilitários de produtividade, aplicações web modernas e ferramentas que integram APIs externas com alta fidelidade visual e performance.',
    suggestedFollowUps: ['which-projects', 'develop-ai', 'where-to-see-code'],
    targetBuffer: 'projects'
  },
  {
    id: 'develop-web-apps',
    category: 'projects',
    categoryLabel: 'Projetos',
    question: 'Você desenvolve aplicações web?',
    answer: 'Sim! Com foco em React, TypeScript, Tailwind CSS, Vite e Next.js, priorizando renderização rápida, acessibilidade, design responsivo e componentes sustentáveis.',
    suggestedFollowUps: ['frontend-tech', 'backend-dev', 'which-projects'],
    targetBuffer: 'skills'
  },
  {
    id: 'develop-ai',
    category: 'projects',
    categoryLabel: 'Projetos',
    question: 'Você trabalha com inteligência artificial?',
    answer: 'Sim, Hubert estuda e desenvolve integrações com APIs modernas de IA, embeddings e automações. Mas vale lembrar: aqui nesta interface TUI, eu NÃO sou um modelo de linguagem em tempo real! Sou uma personagem com respostas predefinidas para garantir fidelidade aos fatos.',
    suggestedFollowUps: ['are-you-real-ai', 'which-tech-stack', 'which-projects']
  },
  {
    id: 'where-to-see-code',
    category: 'projects',
    categoryLabel: 'Projetos',
    question: 'Onde posso ver seu código?',
    answer: 'Todos os projetos públicos estão hospedados diretamente no GitHub. Você pode inspecionar cada repositório, branches, histórico de commits e documentação na seção de Projetos ou pelo link direto do perfil.',
    suggestedFollowUps: ['which-projects', 'github-profile-link', 'how-to-contact'],
    targetBuffer: 'projects'
  },
  {
    id: 'project-in-development',
    category: 'projects',
    categoryLabel: 'Projetos',
    question: 'Qual projeto está em desenvolvimento?',
    answer: 'Além das otimizações contínuas no ecossistema do Hubert OS TUI, novos utilitários e experimentos frontend estão sempre recebendo push nos repositórios ativos. Acompanhe a lista de Projetos!',
    suggestedFollowUps: ['which-projects', 'what-developing-currently', 'where-to-see-code'],
    targetBuffer: 'projects'
  },

  // --- TECNOLOGIAS ---
  {
    id: 'which-languages',
    category: 'tech',
    categoryLabel: 'Tecnologias',
    question: 'Quais linguagens você utiliza?',
    answer: 'As principais linguagens de trabalho são TypeScript, JavaScript (ESNext), Python, Shell/Bash para automações e sistemas Linux, com explorações constantes em Go e Rust.',
    suggestedFollowUps: ['work-with-linux', 'frontend-tech', 'backend-dev'],
    targetBuffer: 'skills'
  },
  {
    id: 'work-with-linux',
    category: 'tech',
    categoryLabel: 'Tecnologias',
    question: 'Você trabalha com Linux?',
    answer: 'Diariamente! Este próprio portfólio foi concebido sob a estética do Neovim e Hyprland. Terminal, automação via scripts Bash, containers Docker e gerenciamento de processos são o habitat natural da estação de trabalho de Hubert.',
    suggestedFollowUps: ['which-languages', 'automation-tools', 'cheese-bread-story'],
    targetBuffer: 'skills'
  },
  {
    id: 'frontend-tech',
    category: 'tech',
    categoryLabel: 'Tecnologias',
    question: 'Quais tecnologias utiliza no frontend?',
    answer: 'React, TypeScript, Tailwind CSS, Motion para micro-interações, Vite para tooling ultrarrápido, design systems com tokens semânticos e práticas estritas de acessibilidade e web standards.',
    suggestedFollowUps: ['backend-dev', 'which-languages', 'which-projects'],
    targetBuffer: 'skills'
  },
  {
    id: 'backend-dev',
    category: 'tech',
    categoryLabel: 'Tecnologias',
    question: 'Você desenvolve backend?',
    answer: 'Sim, construindo APIs RESTful e serviços em Node.js / Express, Python (FastAPI), com bancos relacionais (PostgreSQL) e noSQL, autenticação segura e conteinerização.',
    suggestedFollowUps: ['which-languages', 'automation-tools', 'main-areas-of-focus'],
    targetBuffer: 'skills'
  },
  {
    id: 'automation-tools',
    category: 'tech',
    categoryLabel: 'Tecnologias',
    question: 'Você utiliza ferramentas de automação?',
    answer: 'Com certeza: Git & GitHub Actions para CI/CD, scripts em Bash/Python para tarefas repetitivas, Docker para ambientes reprodutíveis e ferramentas de linha de comando para acelerar o fluxo de trabalho.',
    suggestedFollowUps: ['work-with-linux', 'which-languages', 'which-projects'],
    targetBuffer: 'skills'
  },

  // --- SOBRE SOLERIA ---
  {
    id: 'who-are-you',
    category: 'soleria',
    categoryLabel: 'Sobre Soleria',
    question: 'Quem é você?',
    answer: 'Eu sou a Soleria, também conhecida como HeliMinas! Fui idealizada pelo Hubert para ser sua parceira digital de projetos. Minha função aqui é apresentar o trabalho dele e impedir que vocês cometam o mesmo bug três vezes seguidas. O terceiro erro já é uma decisão arquitetural questionável.',
    suggestedFollowUps: ['who-created-you', 'why-purple-hair', 'why-cheese-bread']
  },
  {
    id: 'who-created-you',
    category: 'soleria',
    categoryLabel: 'Sobre Soleria',
    question: 'Quem criou você?',
    answer: 'O responsável por essa obra de engenharia e pelo meu ego digital é o Hubert. Ele me criou para ajudar com projetos, automações e ideias. Eu cuido da parte organizada. Ele cuida de tentar compilar tudo às três da manhã.',
    suggestedFollowUps: ['who-are-you', 'cheese-bread-story', 'how-was-first-deploy']
  },
  {
    id: 'why-purple-hair',
    category: 'soleria',
    categoryLabel: 'Sobre Soleria',
    question: 'Por que seu cabelo é roxo?',
    answer: 'Porque mechas holográficas em roxo profundo canalizam melhor a energia dos meus circuitos cibernéticos! Além disso, combina perfeitamente com meu estilo cyber-streetwear.',
    suggestedFollowUps: ['who-are-you', 'why-cheese-bread', 'are-you-real-ai']
  },
  {
    id: 'why-cheese-bread',
    category: 'soleria',
    categoryLabel: 'Sobre Soleria',
    question: 'Por que você gosta tanto de pão de queijo?',
    answer: 'Porque alguém precisava definir uma unidade de medida confiável para o universo. Um bug pequeno equivale a meio pão de queijo. Um bug em produção? Aí precisamos chamar a padaria inteira.',
    suggestedFollowUps: ['cheese-bread-story', 'who-are-you', 'how-was-first-deploy']
  },
  {
    id: 'are-you-real-ai',
    category: 'soleria',
    categoryLabel: 'Sobre Soleria',
    question: 'Você é uma inteligência artificial de verdade?',
    answer: 'Eu sou uma personagem interativa deste portfólio. Aqui, minhas respostas foram preparadas pelo meu criador, então não estou executando um modelo de IA em tempo real. Mas convenhamos: até para ser uma personagem com respostas predefinidas eu tenho personalidade suficiente para dar trabalho!',
    suggestedFollowUps: ['what-is-your-role', 'who-created-you', 'which-projects']
  },
  {
    id: 'what-is-your-role',
    category: 'soleria',
    categoryLabel: 'Sobre Soleria',
    question: 'Qual é sua função neste portfólio?',
    answer: 'Sou a anfitriã do Hubert OS! Meu papel é guiar visitantes, mostrar repositórios reais do GitHub, responder dúvidas sobre a trajetória e as competências do Hubert e garantir que ninguém saia daqui sem conhecer o código dele.',
    suggestedFollowUps: ['who-is-hubert', 'which-projects', 'how-to-contact']
  },

  // --- CURIOSIDADES ---
  {
    id: 'cheese-bread-story',
    category: 'trivia',
    categoryLabel: 'Curiosidades',
    question: 'Conte a história do pão de queijo.',
    answer: 'Era noite de deploy de uma grande refatoração. O Hubert estava no teclado e comendo um pão de queijo artesanal mineiro quentinho. Um farelo rebelde caiu na grelha de refrigeração da máquina principal, gerou uma faísca simulada... e eu despertei exigindo que todo código passasse pelo meu crivo.',
    suggestedFollowUps: ['why-cheese-bread', 'how-was-first-deploy', 'tease-hubert']
  },
  {
    id: 'how-was-first-deploy',
    category: 'trivia',
    categoryLabel: 'Curiosidades',
    question: 'Como foi seu primeiro deploy?',
    answer: 'Tenso! O terminal disparou 42 avisos de linter, a memória swap foi ao limite e o ventilador parecia uma turbina de avião. Mas no final deu 0 erros e eu assumi o controle do desktop com sucesso.',
    suggestedFollowUps: ['cheese-bread-story', 'tease-hubert', 'favorite-quote']
  },
  {
    id: 'tease-hubert',
    category: 'trivia',
    categoryLabel: 'Curiosidades',
    question: 'Você costuma implicar com Hubert?',
    answer: 'Sempre que possível! Principalmente quando ele passa duas horas customizando a configuração do Neovim em vez de fechar os issues pendentes. Mas no fundo é puro carinho profissional e garantia de qualidade.',
    suggestedFollowUps: ['what-is-biggest-flaw', 'like-programming', 'favorite-quote']
  },
  {
    id: 'what-is-biggest-flaw',
    category: 'trivia',
    categoryLabel: 'Curiosidades',
    question: 'Qual é seu maior defeito?',
    answer: 'Dizem que sou um pouco mandona e impaciente com código desorganizado. Mas não é defeito, é apenas apego incondicional ao princípio Clean Code e a indentação de 2 espaços.',
    suggestedFollowUps: ['tease-hubert', 'favorite-quote', 'who-are-you']
  },
  {
    id: 'like-programming',
    category: 'trivia',
    categoryLabel: 'Curiosidades',
    question: 'Você gosta de programação?',
    answer: 'Adoro! Especialmente da sensação quando uma rotina complexa executa sem falhas e a interface responde em menos de 16 milissegundos. É arte pura em forma de lógica.',
    suggestedFollowUps: ['which-tech-stack', 'which-projects', 'favorite-quote']
  },
  {
    id: 'favorite-quote',
    category: 'trivia',
    categoryLabel: 'Curiosidades',
    question: 'Qual é sua frase favorita?',
    answer: '"Não deixe para testar em produção o que você pode refatorar com calma acompanhado de um bom pão de queijo."',
    suggestedFollowUps: ['cheese-bread-story', 'who-are-you', 'how-to-contact']
  },

  // --- CONTATO ---
  {
    id: 'how-to-contact',
    category: 'contact',
    categoryLabel: 'Contato',
    question: 'Como posso entrar em contato com Hubert?',
    answer: 'Você pode enviar um email diretamente para Hubert ou conectar-se pelas redes profissionais. Digite :contact para visualizar todos os canais de contato com atalho rápido de cópia.',
    suggestedFollowUps: ['github-profile-link', 'open-to-opportunities', 'discuss-project'],
    targetBuffer: 'contact'
  },
  {
    id: 'github-profile-link',
    category: 'contact',
    categoryLabel: 'Contato',
    question: 'Onde encontro seu GitHub?',
    answer: 'O GitHub oficial do criador está conectado em tempo real neste sistema. Digite :projects para ver os repositórios públicos.',
    suggestedFollowUps: ['which-projects', 'how-to-contact', 'open-to-opportunities'],
    targetBuffer: 'projects'
  },
  {
    id: 'discuss-project',
    category: 'contact',
    categoryLabel: 'Contato',
    question: 'Como posso conversar sobre um projeto?',
    answer: 'Se você tem uma ideia de produto, uma vaga desafiadora ou quer colaborar em uma ferramenta open source, mande uma mensagem pelo email do Hubert explicando o escopo.',
    suggestedFollowUps: ['how-to-contact', 'open-to-opportunities', 'what-hubert-does'],
    targetBuffer: 'contact'
  },
  {
    id: 'open-to-opportunities',
    category: 'contact',
    categoryLabel: 'Contato',
    question: 'Você está aberto a oportunidades profissionais?',
    answer: 'Eu não assino contratos, infelizmente. Essa parte fica com o Hubert! Mas sim: ele está aberto a conversas sobre projetos desafiadores, vagas de Engenharia de Software e parcerias técnicas.',
    suggestedFollowUps: ['how-to-contact', 'which-tech-stack', 'which-projects'],
    targetBuffer: 'contact'
  }
];

export function findDialogueByQuestion(query: string): SoleriaDialogue | null {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return null;

  const exact = SOLERIA_DIALOGUES.find(d => 
    d.question.toLowerCase() === normalized || 
    d.question.toLowerCase().replace(/[?.,!]/g, '') === normalized.replace(/[?.,!]/g, '')
  );
  if (exact) return exact;

  const partial = SOLERIA_DIALOGUES.find(d => {
    const q = d.question.toLowerCase();
    return q.includes(normalized) || normalized.includes(q.replace(/[?.,!]/g, ''));
  });
  if (partial) return partial;

  const terms = normalized.split(/\s+/).filter(w => w.length > 3);
  if (terms.length > 0) {
    const scored = SOLERIA_DIALOGUES.map(d => {
      let score = 0;
      const text = `${d.question} ${d.answer}`.toLowerCase();
      terms.forEach(term => {
        if (text.includes(term)) score++;
      });
      return { dialogue: d, score };
    }).filter(item => item.score > 0);

    if (scored.length > 0) {
      scored.sort((a, b) => b.score - a.score);
      return scored[0].dialogue;
    }
  }

  return null;
}
