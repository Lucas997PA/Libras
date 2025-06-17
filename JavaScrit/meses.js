// Perguntas dos Meses
const perguntasMeses = [
  { Imagem: "/imagens/meses/janeiro.png", correta: "Janeiro", opcoes: ["Janeiro", "Fevereiro", "Março", "Abril"] },
  { Imagem: "/imagens/meses/fevereiro.png", correta: "Fevereiro", opcoes: ["Fevereiro", "Janeiro", "Agosto", "Dezembro"] },
  { Imagem: "/imagens/meses/marco.png", correta: "Março", opcoes: ["Março", "Abril", "Julho", "Junho"] },
  { Imagem: "/imagens/meses/abril.png", correta: "Abril", opcoes: ["Abril", "Maio", "Fevereiro", "Janeiro"] },
  { Imagem: "/imagens/meses/maio.png", correta: "Maio", opcoes: ["Maio", "Junho", "Março", "Outubro"] },
  { Imagem: "/imagens/meses/junho.png", correta: "Junho", opcoes: ["Junho", "Julho", "Agosto", "Abril"] },
  { Imagem: "/imagens/meses/julho.png", correta: "Julho", opcoes: ["Julho", "Junho", "Maio", "Setembro"] },
  { Imagem: "/imagens/meses/agosto.png", correta: "Agosto", opcoes: ["Agosto", "Outubro", "Fevereiro", "Janeiro"] },
  { Imagem: "/imagens/meses/setembro.png", correta: "Setembro", opcoes: ["Setembro", "Novembro", "Dezembro", "Março"] },
  { Imagem: "/imagens/meses/outubro.png", correta: "Outubro", opcoes: ["Outubro", "Setembro", "Agosto", "Julho"] },
  { Imagem: "/imagens/meses/novembro.png", correta: "Novembro", opcoes: ["Novembro", "Outubro", "Maio", "Janeiro"] },
  { Imagem: "/imagens/meses/dezembro.png", correta: "Dezembro", opcoes: ["Dezembro", "Novembro", "Junho", "Abril"] }
];

// Embaralhar array
function embaralharArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

let perguntas = embaralharArray([...perguntasMeses]);
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
