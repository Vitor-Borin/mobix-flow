export const navegacao = [
  { href: "/#solucao", nome: "Solução" },
  { href: "/#diferencial", nome: "Diferencial" },
  { href: "/#publico", nome: "Público" },
  { href: "/#galeria", nome: "Galeria" },
  { href: "/#equipe", nome: "Equipe" },
  { href: "/#contato", nome: "Contato" },
]

// Modos da câmera que aparecem no hero: o título troca junto com o modo escolhido
export const modos = [
  { nome: "Lousa", titulo: "A lousa" },
  { nome: "Slide", titulo: "O slide" },
  { nome: "Livro", titulo: "O livro" },
  { nome: "Caderno", titulo: "O caderno" },
]

// Um dia de aula: os registros que acabam esquecidos na galeria do celular
export const diaDoEstudante = [
  {
    hora: "08:10",
    lugar: "Sala 402",
    registro: "Foto da lousa",
    detalhe: "Tirada de lado, com reflexo da janela em cima da fórmula.",
    fotos: 14,
  },
  {
    hora: "10:45",
    lugar: "Auditório",
    registro: "Slide do professor",
    detalhe: "A apresentação passou rápido. Sobrou um print torto da tela do projetor.",
    fotos: 37,
  },
  {
    hora: "15:20",
    lugar: "Biblioteca",
    registro: "Página do livro",
    detalhe: "O livro volta para a estante hoje. O capítulo fica só na foto.",
    fotos: 52,
  },
  {
    hora: "22:30",
    lugar: "Quarto",
    registro: "Hora de revisar",
    detalhe: "Entre memes e prints de conversa, achar a lousa de cálculo leva vinte minutos.",
    fotos: 1284,
  },
]

export const etapas = [
  {
    numero: "1",
    titulo: "Aponte",
    texto: "A câmera JOVI reconhece se é lousa, slide, livro ou caderno e já entra no modo certo.",
    rotulo: "Modo aula",
  },
  {
    numero: "2",
    titulo: "Corrija",
    texto: "O reflexo some, a perspectiva endireita e o traço do giz ganha contraste.",
    rotulo: "Reflexo removido",
  },
  {
    numero: "3",
    titulo: "Leia",
    texto: "O texto da imagem vira texto de verdade, que dá para buscar, copiar e editar.",
    rotulo: "Texto extraído",
  },
  {
    numero: "4",
    titulo: "Guarde",
    texto: "A captura vai direto para a pasta da matéria, com data e aula. A galeria fica livre.",
    rotulo: "Salvo em Front-End",
  },
]

export const textoReconhecido = "Derivada: f'(x) = lim h→0 [f(x+h) − f(x)] / h"

export const telas = [
  {
    imagem: "/img/img4.png",
    alt: "Tela da câmera do FLOW apontada para uma tela de código, com os modos Lousa, Slide e Caderno",
    titulo: "Modo aula",
    texto: "A câmera detecta o tipo de conteúdo e sugere anti-reflexo e correção de perspectiva.",
  },
  {
    imagem: "/img/img2.png",
    alt: "Tela do FLOW mostrando o conteúdo identificado, a disciplina e o texto extraído da foto",
    titulo: "Conteúdo identificado",
    texto: "A foto vira texto e o FLOW descobre de qual disciplina ela é.",
  },
  {
    imagem: "/img/img5.png",
    alt: "Tela do FLOW escolhendo a pasta Design, Front-End Design, onde a captura será salva",
    titulo: "Pasta certa",
    texto: "Cada captura cai na pasta da matéria, com a data da aula.",
  },
  {
    imagem: "/img/img6.png",
    alt: "Tela do FLOW confirmando o conteúdo salvo, com opções de gerar resumo, criar questões e revisar",
    titulo: "Depois da aula",
    texto: "Resumo, questões e flashcards a partir do que foi capturado.",
  },
]

export const publico = {
  naAula: [
    "Professor apagou a lousa antes de você terminar de copiar.",
    "Slide passou em dez segundos.",
    "Sentou longe e a foto saiu torta.",
  ],
  naRevisao: [
    "Procura a matéria pela matéria, não pela data da foto.",
    "Copia o texto da lousa direto para o resumo.",
    "Estuda pelas questões geradas do próprio conteúdo.",
  ],
}

export const equipe = [
  { nome: "Beatriz Albuquerque", rm: "RM572055", funcao: "Landing page e Front-End" },
  { nome: "Nicole Couto", rm: "RM569191", funcao: "UX/UI e protótipo" },
  { nome: "Robert Josino", rm: "RM571622", funcao: "Pesquisa e Storytelling" },
  { nome: "Ryan Maick", rm: "RM573051", funcao: "Python e dados" },
  { nome: "Vitor Borin", rm: "RM573194", funcao: "App FLOW e React" },
]

export const dicasDeEstudo = [
  "Revise a captura no mesmo dia: o que foi visto hoje fica mais fácil de lembrar amanhã.",
  "Transforme o texto da lousa em três perguntas antes de dormir.",
  "Junte as capturas da semana e explique a matéria em voz alta, como se fosse dar aula.",
  "Comece pela matéria com menos capturas revisadas.",
  "Estude em blocos de 25 minutos com 5 de pausa.",
]

// O que só a câmera da JOVI consegue fazer, segundo a proposta do grupo
export const ajustesModoAula = [
  { nome: "Vários quadros", texto: "Junta várias fotos em uma só para tirar o ruído e a tremida." },
  { nome: "Sem reflexo", texto: "Apaga o brilho da luz e da janela em cima da lousa." },
  { nome: "Perspectiva", texto: "Endireita a lousa fotografada de lado." },
  { nome: "Traço em destaque", texto: "Dá contraste ao giz e à caneta, não ao rosto de quem está na frente." },
]

export const gradeHoraria = [
  { dia: "Seg", hora: "08:00", materia: "Front-End Design", sala: "A-210" },
  { dia: "Ter", hora: "10:00", materia: "Cálculo I", sala: "A-312" },
  { dia: "Qua", hora: "19:00", materia: "Web Development", sala: "B-105" },
  { dia: "Qui", hora: "08:00", materia: "Python", sala: "Lab 4" },
]

// APIs abertas do Google que tornam o FLOW viável
export const apisGoogle = [
  {
    nome: "ML Kit Document Scanner",
    etapa: "Corrigir",
    texto: "Encontra as bordas da lousa ou da folha, recorta, endireita e limpa a imagem.",
  },
  {
    nome: "ML Kit Text Recognition",
    etapa: "Ler",
    texto: "Transforma o texto da foto em texto digital no próprio celular, sem depender de internet.",
  },
  {
    nome: "Google Calendar API",
    etapa: "Organizar",
    texto: "Lê a grade de aulas do estudante para confirmar de qual matéria é a captura.",
  },
  {
    nome: "Gemini API",
    etapa: "Estudar",
    texto: "Gera o resumo, as questões e os flashcards a partir do texto capturado.",
  },
]
