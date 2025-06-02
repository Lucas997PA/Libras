const perguntas = [
  {
    imagem: "imagens/sinal_agua.png",
    correta: "Água",
    opcoes: ["Água", "Casa", "Comida"]
  },
  {
    imagem: "imagens/sinal_casa.png",
    correta: "Casa",
    opcoes: ["Casa", "Trabalho", "Escola"]
  },
  {
    imagem: "imagens/sinal_comida.png",
    correta: "Comida",
    opcoes: ["Dormir", "Comida", "Livro"]
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
    feedback.textContent = `❌ Resposta errada. O correto é: ${pergunta.correta}`;
    feedback.style.color = "red";
  }

  btnProximo.style.display = "inline-block";

  // Desativar botões após resposta
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
      <a href="index.html" class="menu-button">🔙 Voltar ao Menu</a>
    `;
  }
}

function atualizarPontuacao() {
  document.getElementById("pontuacao").textContent = `Pontuação: ${pontuacao} / ${perguntas.length}`;
}

// Iniciar jogo
if (window.location.pathname.includes("jogo.html")) {
  carregarPergunta();
}

// Alfabeto 