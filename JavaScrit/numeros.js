// Perguntas dos Números
const perguntasNumeros = [
  { Imagem: "/imagens/numeros/0.png", correta: "0", opcoes: ["0", "1", "2", "3"] },
  { Imagem: "/imagens/numeros/1.png", correta: "1", opcoes: ["1", "0", "4", "7"] },
  { Imagem: "/imagens/numeros/2.png", correta: "2", opcoes: ["2", "3", "5", "9"] },
  { Imagem: "/imagens/numeros/3.png", correta: "3", opcoes: ["3", "6", "4", "1"] },
  { Imagem: "/imagens/numeros/4.png", correta: "4", opcoes: ["4", "2", "0", "7"] },
  { Imagem: "/imagens/numeros/5.png", correta: "5", opcoes: ["5", "3", "9", "6"] },
  { Imagem: "/imagens/numeros/6.png", correta: "6", opcoes: ["6", "5", "8", "4"] },
  { Imagem: "/imagens/numeros/7.png", correta: "7", opcoes: ["7", "1", "0", "9"] },
  { Imagem: "/imagens/numeros/8.png", correta: "8", opcoes: ["8", "2", "6", "3"] },
  { Imagem: "/imagens/numeros/9.png", correta: "9", opcoes: ["9", "8", "7", "5"] },
  { Imagem: "/imagens/numeros/10.gif", correta: "10", opcoes: ["10", "8", "7", "5"] }
];

// Embaralhar array
function embaralharArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

let perguntas = embaralharArray([...perguntasNumeros]);
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

// Inicia o quiz automaticamente
carregarPergunta();
