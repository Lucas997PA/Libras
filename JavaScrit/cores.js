// Perguntas de Cores em Libras
const perguntasCores = [
  { Imagem: "/imagens/cores/vermelho.gif", correta: "Vermelho", opcoes: ["Vermelho", "Azul", "Amarelo", "Verde"] },
  { Imagem: "/imagens/cores/azul.gif", correta: "Azul", opcoes: ["Azul", "Rosa", "Vermelho", "Laranja"] },
  { Imagem: "/imagens/cores/amarelo.gif", correta: "Amarelo", opcoes: ["Amarelo", "Marrom", "Azul", "Cinza"] },
  { Imagem: "/imagens/cores/verde.gif", correta: "Verde", opcoes: ["Verde", "Preto", "Branco", "Roxo"] },
  { Imagem: "/imagens/cores/rosa.gif", correta: "Rosa", opcoes: ["Rosa", "Azul", "Cinza", "Laranja"] },
  { Imagem: "/imagens/cores/preto.gif", correta: "Preto", opcoes: ["Preto", "Branco", "Cinza", "Marrom"] },
  { Imagem: "/imagens/cores/branco.gif", correta: "Branco", opcoes: ["Branco", "Preto", "Roxo", "Amarelo"] },
  { Imagem: "/imagens/cores/laranja.gif", correta: "Laranja", opcoes: ["Laranja", "Vermelho", "Marrom", "Azul"] },
  { Imagem: "/imagens/cores/roxo.gif", correta: "Roxo", opcoes: ["Roxo", "Rosa", "Cinza", "Verde"] },
  { Imagem: "/imagens/cores/cinza.gif", correta: "Cinza", opcoes: ["Cinza", "Branco", "Preto", "Roxo"] }
];

// Embaralhar perguntas
function embaralharArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

let perguntas = embaralharArray([...perguntasCores]);
let indiceAtual = 0;
let pontuacao = 0;

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

// Inicia automaticamente
carregarPergunta();
