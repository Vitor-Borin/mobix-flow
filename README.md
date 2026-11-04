# MOBIX / FLOW

Projeto do grupo MOBIX para o Challenge FIAP 2026 com a JOVI. O FLOW é uma proposta de câmera para estudantes: lê lousa, slide, livro e caderno, corrige a imagem, extrai o texto e guarda cada captura na pasta da matéria.

Esta é a entrega da **Sprint 4**, feita em conjunto para **Front-End Design** e **Web Development**. Ela evolui a landing page da Sprint 3, que era em HTML e CSS, para React, e acrescenta login, área privada e consumo de API.

- **Deploy na Vercel:** https://mobix-flow.vercel.app/
- **Repositório:** https://github.com/Vitor-Borin/mobix-flow

## Integrantes

| Nome | RM | Função no projeto |
| --- | --- | --- |
| Beatriz Albuquerque | RM572055 | Landing page e Front-End |
| Nicole Couto | RM569191 | UX/UI e protótipo |
| Robert Josino | RM571622 | Pesquisa e Storytelling |
| Ryan Maick | RM573051 | Python e dados |
| Vitor Borin | RM573194 | App FLOW e React |

## O que tem no site

| Rota | Acesso | O que faz |
| --- | --- | --- |
| `/` | Pública | Landing page com A Solução, Diferencial, Galeria, Viabilidade técnica (APIs do Google), Público-alvo, Nossa Equipe e Contato |
| `/login` | Pública | Entrada do estudante |
| `/meu-flow` | **Privada** | Resumo das capturas, dica de estudo, busca no texto das capturas e lista de matérias |
| `/meu-flow/materia/:id` | **Privada** | Capturas da matéria: adicionar, apagar e fixar no topo |
| qualquer outra | Pública | Página não encontrada |

Quem tenta abrir uma rota privada sem ter entrado é levado para o `/login`.

## Usuários para teste

| E-mail | Senha |
| --- | --- |
| `ana@flow.com` | `flow123` |
| `professor@fiap.com.br` | `fiap2026` |

O login é simulado no front-end (não existe back-end próprio). A sessão fica salva no `localStorage`.

## Tecnologias

- React 19 e Vite 8
- React Router 7 (rotas aninhadas, rota com parâmetro e rotas privadas)
- Tailwind CSS 4
- GSAP 3 com `@gsap/react` (ScrollTrigger, SplitText e ScrambleText)
- React Icons (pacote Phosphor)
- MockAPI como API mockada (recursos `materias` e `capturas`)
- FormSubmit para o formulário de contato
- Fontes: Bricolage Grotesque e Martian Mono (Google Fonts) e Switzer (Fontshare)

## Como instalar e executar

Pré-requisitos: Node.js 20.19+ ou 22.12+, npm e Git.

```bash
git clone https://github.com/Vitor-Borin/mobix-flow.git
cd mobix-flow/flow-react
npm install
```

```bash
npm run dev
```

Abra o endereço que o Vite mostrar (normalmente `http://localhost:5173`).

O projeto já usa a MockAPI do grupo, então não é preciso criar nenhum arquivo de configuração. Para apontar para outra API, crie `flow-react/.env` a partir do `.env.example`:

```
VITE_API_URL=https://6aea801e3d3dd3d37be6ae89.mockapi.io/api/v1
```

Para gerar a versão de produção: `npm run build` e `npm run preview`.

### Servidores

Não há back-end próprio para rodar. Os dados vêm da MockAPI, que já fica no ar.

Para testar sem internet, existe uma imitação local da MockAPI:
1. Crie `flow-react/.env.local` com `VITE_API_URL=http://localhost:4010`.
2. Num terminal, rode `npm run api:local`.
3. Em outro terminal, rode `npm run dev`.

Os dados vêm de `mockapi/*.json` e voltam ao original quando o servidor reinicia.

### Como montar a MockAPI do zero

1. Crie um projeto em https://mockapi.io.
2. Crie o recurso `materias` com os campos `nome`, `professor` e `cor` (todos texto).
3. Crie o recurso `capturas` com os campos `materiaId`, `titulo`, `tipo`, `texto`, `data` (texto) e `nitidez` (número).
4. Cole os dados de `flow-react/mockapi/materias.json` e `flow-react/mockapi/capturas.json` na aba de dados de cada recurso.
5. Copie o endereço do projeto para o `VITE_API_URL` do `.env` e para as variáveis de ambiente da Vercel.

## Como os requisitos foram atendidos

| Requisito | Onde |
| --- | --- |
| Componentização e props | `src/components/` (seções da home em `components/home/`, `TituloSecao`, `CapturaCard`, `Estado`, `Visor`, `Menu`) |
| Rotas públicas e privadas | `src/main.jsx` e `src/components/RotaPrivada.jsx` |
| Hooks nativos | `useState`, `useEffect`, `useRef`, `useContext`, `useParams`, `useNavigate`, `useLocation` |
| Hooks customizados | `src/hooks/`: `useAuth`, `useMaterias`, `useCapturas`, `useContato`, `useLocalStorage`, `useMenuVisivel` |
| Lógica separada do visual | Os componentes só chamam os hooks. Login, busca, criação e remoção na API e envio do formulário de contato ficam em `hooks/`, `context/` e `services/api.js` |
| Consumo de API | `src/services/api.js` (GET, POST e DELETE na MockAPI) |
| Tailwind CSS | Toda a estilização. Tokens de cor e fonte em `@theme`, no `src/index.css` |
| Responsividade | Layout mobile first, com ajustes para tablet (`md`) e desktop (`lg`) |
| localStorage | Sessão do login e capturas fixadas (`useLocalStorage`) |
| Math | Média de capturas por matéria, dica de estudo sorteada, estimativa de nitidez e contadores das animações |

## Uso de IA no projeto

Usamos o Claude (Anthropic) como apoio durante a Sprint 4, em três pontos: pesquisa de referências visuais no Awwwards, sugestão de como dividir o código da Sprint 3 em componentes, hooks e páginas, e ajuda nas animações com GSAP. A proposta, as telas do protótipo, a direção visual e os textos são do grupo, e todo o código foi revisado e testado pela equipe antes da entrega. Não usamos imagens geradas por IA no site.

## Estrutura

```text
.
├── INTEGRANTES.TXT
├── docs/referencias.md    # Referências do Awwwards e direção visual
└── flow-react/            # Sprint 4 (React)
    ├── mockapi/           # Dados para montar a MockAPI
    ├── public/img/        # Telas do protótipo e foto do celular
    └── src/
        ├── components/    # Menu, rodapé, cartões e seções da home
        ├── context/       # Contexto do login
        ├── data/          # Textos fixos e usuários de teste
        ├── hooks/         # Hooks customizados
        ├── pages/         # Páginas de cada rota
        ├── services/      # Chamadas à API
        ├── gsap.js        # Registro dos plugins do GSAP
        ├── index.css      # Tailwind, tokens de cor e fonte e classes dos botões
        └── main.jsx       # Rotas
```

## Publicação na Vercel

| Configuração | Valor |
| --- | --- |
| Root Directory | `flow-react` |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Environment Variables | `VITE_API_URL` com o endereço da MockAPI |

O `vercel.json` também redireciona as rotas para o `index.html`. Sem isso, recarregar a página em `/meu-flow` dá 404.

## Entrega em ZIP

O ZIP leva este `README.md`, o `INTEGRANTES.TXT`, a pasta `docs/` e a pasta `flow-react/` com todo o código-fonte. Ficam de fora `node_modules/`, `dist/` e `.git/`. Para rodar a partir do ZIP: entrar em `flow-react/`, `npm install` e `npm run dev`.

## Atividade

FIAP · Engenharia de Software · 1ESPX · Front-End Design + Web Development · Sprint 4
