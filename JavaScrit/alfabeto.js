// Alfabeto Quiz Game
const perguntasOriginais = [
  { Imagem: "/imagens/alfabeto/a.png", correta: "A", opcoes: ["A", "E", "O", "U"] },
  { Imagem: "/imagens/alfabeto/b.png", correta: "B", opcoes: ["B", "C", "D", "F"] },
  { Imagem: "/imagens/alfabeto/c.png", correta: "C", opcoes: ["C", "G", "F", "H"] },
  { Imagem: "/imagens/alfabeto/d.png", correta: "D", opcoes: ["D", "L", "M", "N"] },
  { Imagem: "/imagens/alfabeto/e.png", correta: "E", opcoes: ["E", "I", "O", "U"] },
  { Imagem: "/imagens/alfabeto/f.png", correta: "F", opcoes: ["F", "E", "G", "H"] },
  { Imagem: "/imagens/alfabeto/g.png", correta: "G", opcoes: ["G", "J", "C", "Q"] },
  { Imagem: "/imagens/alfabeto/h.png", correta: "H", opcoes: ["H", "K", "L", "M"] },
  { Imagem: "/imagens/alfabeto/i.png", correta: "I", opcoes: ["I", "E", "J", "Y"] },
  { Imagem: "/imagens/alfabeto/j.png", correta: "J", opcoes: ["J", "I", "G", "K"] },
  { Imagem: "/imagens/alfabeto/k.png", correta: "K", opcoes: ["K", "L", "X", "Y"] },
  { Imagem: "/imagens/alfabeto/l.png", correta: "L", opcoes: ["L", "I", "M", "N"] },
  { Imagem: "/imagens/alfabeto/m.png", correta: "M", opcoes: ["M", "N", "H", "W"] },
  { Imagem: "/imagens/alfabeto/n.png", correta: "N", opcoes: ["N", "M", "U", "Z"] },
  { Imagem: "/imagens/alfabeto/o.png", correta: "O", opcoes: ["O", "Q", "C", "D"] },
  { Imagem: "/imagens/alfabeto/p.png", correta: "P", opcoes: ["P", "R", "B", "T"] },
  { Imagem: "/imagens/alfabeto/q.png", correta: "Q", opcoes: ["Q", "G", "O", "C"] },
  { Imagem: "/imagens/alfabeto/r.png", correta: "R", opcoes: ["R", "P", "S", "B"] },
  { Imagem: "/imagens/alfabeto/s.png", correta: "S", opcoes: ["S", "C", "Z", "R"] },
  { Imagem: "/imagens/alfabeto/t.png", correta: "T", opcoes: ["T", "F", "P", "D"] },
  { Imagem: "/imagens/alfabeto/u.png", correta: "U", opcoes: ["U", "O", "V", "I"] },
  { Imagem: "/imagens/alfabeto/v.png", correta: "V", opcoes: ["V", "W", "B", "F"] },
  { Imagem: "/imagens/alfabeto/w.png", correta: "W", opcoes: ["W", "M", "V", "N"] },
  { Imagem: "/imagens/alfabeto/x.png", correta: "X", opcoes: ["X", "K", "Y", "Z"] },
  { Imagem: "/imagens/alfabeto/y.png", correta: "Y", opcoes: ["Y", "I", "J", "X"] },
  { Imagem: "/imagens/alfabeto/z.png", correta: "Z", opcoes: ["Z", "S", "X", "C"] }
];

// Função para embaralhar array
function embaralharArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Variáveis do jogo
let perguntas = [];
let indiceAtual = 0;
let pontuacao = 0;

// Iniciar o jogo
function iniciarJogo() {
  perguntas = embaralharArray([...perguntasOriginais]);
  indiceAtual = 0;
  pontuacao = 0;
  carregarPergunta();
}

function carregarPergunta() {
  const pergunta = perguntas[indiceAtual];
  document.getElementById("sinal-img").src = pergunta.Imagem;

  const opcoesContainer = document.getElementById("opcoes");
  opcoesContainer.innerHTML = "";
  pergunta.opcoes.forEach(opcao => {
    const botao = document.createElement("button");
    botao.textContent = opcao;
    botao.onclick = () => verificarResposta(opcao);
    botao.classList.add("menu-button");
    opcoesContainer.appendChild(botao);
  });

  document.getElementById("feedback").textContent = "";
  document.getElementById("btn-proximo").style.display = "none";
  atualizarPontuacao();
}

function verificarResposta(resposta) {
  const pergunta = perguntas[indiceAtual];
  const feedback = document.getElementById("feedback");
  const btnProximo = document.getElementById("btn-proximo");

  if (resposta === pergunta.correta) {
    feedback.textContent = "✅ Resposta correta!";
    feedback.style.color = "green";
    pontuacao++;
  } else {
    feedback.textContent = `❌ Resposta errada. A resposta certa é: ${pergunta.correta}`;
    feedback.style.color = "red";
  }

  btnProximo.style.display = "inline-block";

  const botoes = document.querySelectorAll("#opcoes button");
  botoes.forEach(btn => btn.disabled = true);

  atualizarPontuacao();
}

function proximaPergunta() {
  indiceAtual++;
  if (indiceAtual < perguntas.length) {
    carregarPergunta();
  } else {
    document.getElementById("quiz-container").innerHTML = `
      <h2>Fim do jogo!</h2>
      <p>Sua pontuação final: ${pontuacao} de ${perguntas.length}</p>
      <a href="jogo.html" class="menu-button">🔙 Voltar ao Menu de Categorias</a>
    `;
  }
}

function atualizarPontuacao() {
  document.getElementById("pontuacao").textContent = `Pontuação: ${pontuacao} / ${perguntas.length}`;
}

// Inicializa o jogo quando a página carrega
window.onload = iniciarJogo;
