// Perguntas dos Dias da Semana
const perguntasSemana = [
  { Imagem: "/imagens/semana/domingo.png", correta: "Domingo", opcoes: ["Domingo", "Segunda", "Terça", "Quarta"] },
  { Imagem: "/imagens/semana/segunda.png", correta: "Segunda", opcoes: ["Segunda", "Domingo", "Quinta", "Sábado"] },
  { Imagem: "/imagens/semana/terca.png", correta: "Terça", opcoes: ["Terça", "Sexta", "Quarta", "Segunda"] },
  { Imagem: "/imagens/semana/quarta.png", correta: "Quarta", opcoes: ["Quarta", "Quinta", "Terça", "Domingo"] },
  { Imagem: "/imagens/semana/quinta.png", correta: "Quinta", opcoes: ["Quinta", "Sexta", "Segunda", "Sábado"] },
  { Imagem: "/imagens/semana/sexta.png", correta: "Sexta", opcoes: ["Sexta", "Quarta", "Domingo", "Terça"] },
  { Imagem: "/imagens/semana/sabado.png", correta: "Sábado", opcoes: ["Sábado", "Segunda", "Sexta", "Quinta"] }
];

// Embaralhar array
function embaralharArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

let perguntas = embaralharArray([...perguntasSemana]);
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
