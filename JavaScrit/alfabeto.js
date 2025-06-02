const perguntas = [
  {
    Imagem: "/imagens/alfabeto/a.png",
    correta: "A",
    opcoes: ["A", "E", "O", "U"]
  },
  {
    Imagem: "/imagens/alfabeto/b.png",
    correta: "B",
    opcoes: ["B", "C", "D", "F"]
  },
  {
    Imagem: "/imagens/alfabeto/c.png",
    correta: "C",
    opcoes: ["C", "G", "F", "H"]
  },
  {
    Imagem: "/imagens/alfabeto/d.png",
    correta: "D",
    opcoes: ["D", "L", "M" , "N"]
  },
  {
    Imagem: "/imagens/alfabeto/e.png",
    correta: "E",
    opcoes: ["E", "F", "I", "J"]
  },
  {
    Imagem: "/imagens/alfabeto/e.png",
    correta: "F",
    opcoes: ["E", "F", "I", "J"]
  },
  {
    Imagem: "/imagens/alfabeto/e.png",
    correta: "G",
    opcoes: ["E", "F", "I", "J"]
  },
  {
    Imagem: "/imagens/alfabeto/e.png",
    correta: "H",
    opcoes: ["E", "F", "I", "J"]
  },
  {
    Imagem: "/imagens/alfabeto/e.png",
    correta: "I",
    opcoes: ["E", "F", "I", "J"]
  },
  {
    Imagem: "/imagens/alfabeto/e.png",
    correta: "J",
    opcoes: ["E", "F", "I", "J"]
  },
  {
    Imagem: "/imagens/alfabeto/e.png",
    correta: "K",
    opcoes: ["E", "F", "I", "J"]
  },
  {
    Imagem: "/imagens/alfabeto/e.png",
    correta: "L",
    opcoes: ["E", "F", "I", "J"]
  },
  {
    Imagem: "/imagens/alfabeto/e.png",
    correta: "M",
    opcoes: ["E", "F", "I", "J"]
  },
  {
    Imagem: "/imagens/alfabeto/e.png",
    correta: "N",
    opcoes: ["E", "F", "I", "J"]
  },
  {
    Imagem: "/imagens/alfabeto/e.png",
    correta: "O",
    opcoes: ["E", "F", "I", "J"]
  },
  {
    Imagem: "/imagens/alfabeto/e.png",
    correta: "P",
    opcoes: ["E", "F", "I", "J"]
  },
  {
    Imagem: "/imagens/alfabeto/e.png",
    correta: "Q",
    opcoes: ["E", "F", "I", "J"]
  },
  {
    Imagem: "/imagens/alfabeto/e.png",
    correta: "R",
    opcoes: ["E", "F", "I", "J"]
  },
  {
    Imagem: "/imagens/alfabeto/e.png",
    correta: "S",
    opcoes: ["E", "F", "I", "J"]
  },
  {
    Imagem: "/imagens/alfabeto/e.png",
    correta: "T",
    opcoes: ["E", "F", "I", "J"]
  },
  {
    Imagem: "/imagens/alfabeto/e.png",
    correta: "U",
    opcoes: ["E", "F", "I", "J"]
  },
  {
    Imagem: "/imagens/alfabeto/e.png",
    correta: "V",
    opcoes: ["E", "F", "I", "J"]
  },
  {
    Imagem: "/imagens/alfabeto/e.png",
    correta: "W",
    opcoes: ["E", "F", "I", "J"]
  },
  {
    Imagem: "/imagens/alfabeto/e.png",
    correta: "Y",
    opcoes: ["E", "F", "I", "J"]
  },
  {
    Imagem: "/imagens/alfabeto/e.png",
    correta: "X",
    opcoes: ["E", "F", "I", "J"]
  },
  {
    Imagem: "/imagens/alfabeto/e.png",
    correta: "Z",
    opcoes: ["E", "F", "I", "J"]
  },
];

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
      <a href="jogo.html" class="menu-button">🔙 Voltar ao Menu de Categorias</a>
    `;
  }
}

function atualizarPontuacao() {
  document.getElementById("pontuacao").textContent = `Pontuação: ${pontuacao} / ${perguntas.length}`;
}

carregarPergunta();
