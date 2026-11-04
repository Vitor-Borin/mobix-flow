# FLOW: referências e direção visual da Sprint 4

Pesquisa feita pelo grupo antes de redesenhar a landing page em React. Para cada referência anotamos o que observamos e onde usamos no FLOW.

## Referências do Awwwards

| Site | Prêmio | O que levamos | Onde aparece no FLOW |
|---|---|---|---|
| **Zentry** (zentry.com) · [Awwwards](https://www.awwwards.com/sites/zentry) | Site of the Day e Site of the Month, ago/2024 | Menu em retângulo flutuante que some ao descer a página e volta ao subir | `Menu.jsx`: retângulo sólido solto do topo, que abre expandindo o próprio retângulo no celular |
| **Opal Tadpole** (opalcamera.com) · [Awwwards](https://www.awwwards.com/sites/opal-tadpole) | Site of the Day, jan/2024, e Developer Award | A câmera é apresentada recurso por recurso, mostrando em vez de explicar | `Solucao.jsx`: o celular fica parado e a tela muda a cada passo (aponte, corrija, leia, guarde) |
| **Daylight** (daylightcomputer.com) · [Awwwards](https://www.awwwards.com/sites/daylight) | Site of the Day, jun/2024 | A luz do site muda conforme o dia avança no scroll | `Problema.jsx`: um dia de aula das 08:10 às 22:30, com a página escurecendo à noite e a galeria de fotos enchendo |
| **Lando Norris** (landonorris.com) · [Awwwards](https://www.awwwards.com/sites/lando-norris) | Site of the Day, nov/2025 | Duas metades de alto contraste ("On Track / Off Track") | `Publico.jsx`: "Na aula" e "Na revisão" |
| **Superlist** (superlist.com) · [Awwwards](https://www.awwwards.com/sites/superlist) | Site of the Day e Site of the Month, abr/2021 | A interface do app como protagonista | `Galeria.jsx`: grade irregular com as telas do protótipo |
| **Osmo** (osmo.supply) · [Awwwards](https://www.awwwards.com/sites/osmo-1) | Site of the Day, dez/2025 | Microinterações em GSAP, como revelação de texto e hover | Revelação de títulos e da lista da equipe |

## Conceito: o site como uma câmera

- **Visor:** os quatro cantos de foco aparecem no hero, no login e na página 404.
- **Foco:** o celular do hero começa desfocado e entra em foco. O título "estica" junto, usando o eixo de largura da fonte, como uma lente ajustando.
- **Obturador:** um flash rápido fecha a abertura.
- **Leitura:** o texto lido pelo FLOW aparece embaralhado e se resolve, como o OCR funcionando.
- **REC:** o ponto vermelho do logo e do visor.

## Tipografia

- **Bricolage Grotesque** (Google Fonts) nos títulos. É uma fonte variável em largura, o que permite a animação de foco.
- **Switzer** (Fontshare) no texto e nos botões.
- **Martian Mono** (Google Fonts) para a voz da máquina: texto reconhecido, horários, contadores e etiquetas.

## Cor

O azul do protótipo do app (`#2e4bff`) é a única cor de destaque, sobre um quase-preto e um papel claro. O vermelho fica só no REC e nos erros.

## Hero

O hero não segue o padrão de texto de um lado e imagem do outro. A tela inteira funciona como o visor da câmera: os cantos de foco ficam nas bordas, o celular JOVI fica no centro e o título atravessa o celular, invertendo a cor onde passa por cima dele (`mix-blend-mode: difference`). Embaixo, o seletor de modo (Lousa, Slide, Livro, Caderno) troca a primeira palavra do título, como os modos do app de câmera.

Ao rolar a página, as duas linhas do título saem pelos lados e só o celular continua, descendo.

## Botões

Um único padrão de botão para o site inteiro, definido em `index.css`: `.botao-flow` (azul), `.botao-claro`, `.botao-linha` (contorno) e `.botao-icone`.

## Animação e acessibilidade

- Todas as animações usam `gsap.matchMedia()` e não rodam quando o sistema pede movimento reduzido.
- A inclinação das telas da galeria fica desligada em telas de toque.
