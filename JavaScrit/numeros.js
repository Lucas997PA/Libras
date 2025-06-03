const perguntas = [
  {
    imagem: "imagens/numeros/numero_0.png",
    correta: "0",
    opcoes: ["0", "5", "9", "8"]
  },
  {
    imagem: "imagens/numeros/numero_1.png",
    correta: "1",
    opcoes: ["1", "3", "7", "4"]
  },
  {
    imagem: "imagens/numeros/numero_2.png",
    correta: "2",
    opcoes: ["2", "4", "6", "5"]
  },
  {
    imagem: "imagens/numeros/numero_3.png",
    correta: "3",
    opcoes: ["3", "5", "8", "2"]
  },
  {
    imagem: "imagens/numeros/numero_4.png",
    correta: "4",
    opcoes: ["4", "0", "9", "1"]
  },
  {
    imagem: "imagens/numeros/numero_5.png",
    correta: "5",
    opcoes: ["5", "1", "6", "3"]
  },
  {
    imagem: "imagens/numeros/numero_6.png",
    correta: "6",
    opcoes: ["6", "2", "7", "4"]
  },
  {
    imagem: "imagens/numeros/numero_7.png",
    correta: "7",
    opcoes: ["7", "3", "8", "5"]
  },
  {
    imagem: "imagens/numeros/numero_8.png",
    correta: "8",
    opcoes: ["8", "6", "9", "2"]
  },
  {
    imagem: "imagens/numeros/numero_9.png",
    correta: "9",
    opcoes: ["9", "7", "1", "0"]
  }
];

let indiceAtual = 0;
let pontuacao = 0;

function carregarPergunta() {
  const pergunta = perguntas[indiceAtual];
  document.getElementById("sinal-img").src = pergunta.imagem;

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

carregarPergunta();
