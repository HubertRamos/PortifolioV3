# Hubert OS — Portfólio de Hubert Ramos

Portfólio pessoal de **Hubert Ramos**, apresentado como uma experiência de desktop inspirada em ambientes Linux. O projeto reúne a apresentação profissional, projetos autorais e experimentos de interface em uma experiência web interativa.

## Tecnologias

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Motion
- Lucide React

## Executar localmente

Requisitos: Node.js e npm.

```bash
npm install
npm run dev
```

Gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Estrutura

```text
src/
├── components/   # Componentes da interface
├── data/         # Conteúdo e dados apresentados
├── services/     # Integrações e serviços
├── types/        # Tipos TypeScript
├── utils/        # Utilitários
├── App.tsx
├── index.css
└── main.tsx
```

## Deploy

O projeto contém configuração para deploy na Vercel, com build via `npm run build` e saída em `dist/`.

## Sobre

Este repositório contém o código-fonte do portfólio pessoal. Os projetos apresentados possuem seus próprios repositórios e ciclos de desenvolvimento.

Desenvolvido por [Hubert Ramos](https://github.com/HubertRamos).
