const perguntas = [
  { Imagem: "/imagens/familia/pai.png", correta: "Pai", opcoes: ["Pai", "Mãe", "Avô", "Tio"] },
  { Imagem: "/imagens/familia/mae.png", correta: "Mãe", opcoes: ["Mãe", "Tia", "Avó", "Neta"] },
  { Imagem: "/imagens/familia/irma.png", correta: "Irmã", opcoes: ["Irmã", "Prima", "Amiga", "Sogra"] },
  { Imagem: "/imagens/familia/irmao.png", correta: "Irmão", opcoes: ["Irmão", "Primo", "Amigo", "Sogro"] },
  { Imagem: "/imagens/familia/tio.png", correta: "Tio", opcoes: ["Tio", "Pai", "Avô", "Sogro"] },
  { Imagem: "/imagens/familia/tia.png", correta: "Tia", opcoes: ["Tia", "Mãe", "Avó", "Sogra"] },
  { Imagem: "/imagens/familia/avo.png", correta: "Avó", opcoes: ["Avó", "Mãe", "Tia", "Sogra"] },
  { Imagem: "/imagens/familia/avo-homem.png", correta: "Avô", opcoes: ["Avô", "Pai", "Tio", "Sogro"] },
  { Imagem: "/imagens/familia/primo.png", correta: "Primo", opcoes: ["Primo", "Irmão", "Amigo", "Neto"] },
  { Imagem: "/imagens/familia/prima.png", correta: "Prima", opcoes: ["Prima", "Irmã", "Amiga", "Neta"] },
  { Imagem: "/imagens/familia/sogra.png", correta: "Sogra", opcoes: ["Sogra", "Avó", "Mãe", "Tia"] },
  { Imagem: "/imagens/familia/sogro.png", correta: "Sogro", opcoes: ["Sogro", "Avô", "Pai", "Tio"] },
  { Imagem: "/imagens/familia/amigo.png", correta: "Amigo", opcoes: ["Amigo", "Primo", "Irmão", "Sogro"] },
  { Imagem: "/imagens/familia/amiga.png", correta: "Amiga", opcoes: ["Amiga", "Prima", "Irmã", "Sogra"] },
  { Imagem: "/imagens/familia/neto.png", correta: "Neto", opcoes: ["Neto", "Primo", "Irmão", "Amigo"] },
  { Imagem: "/imagens/familia/neta.png", correta: "Neta", opcoes: ["Neta", "Prima", "Irmã", "Amiga"] }
];

function embaralharArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

let perguntasEmbaralhadas = embaralharArray([...perguntas]);
let indiceAtual = 0;
let pontuacao = 0;

function carregarPergunta() {
  const pergunta = perguntasEmbaralhadas[indiceAtual];
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
  const pergunta = perguntasEmbaralhadas[indiceAtual];
  const feedback = document.getElementById("feedback");

  if (resposta === pergunta.correta) {
    feedback.textContent = "✅ Resposta correta!";
    feedback.style.color = "green";
    pontuacao++;
  } else {
    feedback.textContent = `❌ Resposta errada. A resposta certa é: ${pergunta.correta}`;
    feedback.style.color = "red";
  }

  document.getElementById("btn-proximo").style.display = "inline-block";

  const botoes = document.querySelectorAll("#opcoes button");
  botoes.forEach(btn => btn.disabled = true);

  atualizarPontuacao();
}

function proximaPergunta() {
  indiceAtual++;
  if (indiceAtual < perguntasEmbaralhadas.length) {
    carregarPergunta();
  } else {
    document.getElementById("quiz-container").innerHTML = `
      <h2>Fim do jogo!</h2>
      <p>Sua pontuação final: ${pontuacao} de ${perguntasEmbaralhadas.length}</p>
      <a href="jogo.html" class="menu-button">🔙 Voltar ao Menu de Categorias</a>
    `;
  }
}

function atualizarPontuacao() {
  document.getElementById("pontuacao").textContent = `Pontuação: ${pontuacao} / ${perguntasEmbaralhadas.length}`;
}

carregarPergunta();
