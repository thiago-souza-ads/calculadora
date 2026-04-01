# 🧮 Calculadora

Calculadora web moderna construída com React, TypeScript e Tailwind CSS.

**Live:** [calculadora.nextagent.com.br](https://calculadora.nextagent.com.br)

## ✨ Features

- Operações básicas: soma, subtração, multiplicação, divisão
- Porcentagem e inversão de sinal
- Suporte a teclado
- Design responsivo e dark mode
- Deploy automático via GitHub Actions

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Estilo:** Tailwind CSS 4
- **Testes:** Vitest + React Testing Library
- **Deploy:** Docker + Nginx + Traefik (Let's Encrypt)
- **CI/CD:** GitHub Actions

## 🚀 Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar em modo dev
npm run dev

# Rodar testes
npm test

# Build de produção
npm run build

# Preview do build
npm run preview
```

## 🐳 Docker

```bash
# Build da imagem
docker build -t calculadora .

# Rodar local
docker run -p 3000:80 calculadora
```

## 📦 Deploy

O deploy é automático via GitHub Actions:

1. Push na branch `main`
2. CI roda os testes
3. Build da imagem Docker
4. Deploy via SSH no servidor (Docker Swarm + Traefik)

### Secrets necessários no GitHub:

| Secret | Descrição |
|--------|-----------|
| `SSH_HOST` | IP/hostname do servidor |
| `SSH_USER` | Usuário SSH |
| `SSH_PRIVATE_KEY` | Chave privada SSH |

## 🏗️ Arquitetura

```
src/
├── components/     # Componentes React (UI)
│   ├── Calculator.tsx
│   ├── Display.tsx
│   └── Button.tsx
├── engine/         # Lógica de cálculo (sem dependências de UI)
│   └── calculator.ts
├── hooks/          # Custom hooks
│   └── useCalculator.ts
├── types/          # TypeScript types
│   └── index.ts
├── utils/          # Utilitários
├── __tests__/      # Testes
│   └── calculator.test.ts
├── App.tsx
└── main.tsx
```

## 👥 Time

- 🏛️ **Arthur** — Arquitetura
- 🎨 **Lucas** — Frontend
- ⚙️ **Marina** — Backend/Engine
- 🔍 **Rafael** — QA
- 🚀 **Hamart** — DevOps
- 📋 **Pedro** — Scrum Master

---

Feito com 💚 pela equipe NexAgent.
