const perguntas = [
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

let indiceAtual = 0;
let pontuacao = 0;
let vidas = 3;
let tempo = 60;
let timer;

function iniciarTimer() {
  tempo = 60;
  document.getElementById("tempo").textContent = `Tempo: ${tempo}s`;
  clearInterval(timer);
  timer = setInterval(() => {
    tempo--;
    document.getElementById("tempo").textContent = `Tempo: ${tempo}s`;
    if (tempo <= 0) perderVida();
  }, 1000);
}

function perderVida() {
  vidas--;
  atualizarVidas();
  if (vidas <= 0) fimDoJogo("😵 Suas vidas acabaram!");
  else liberarBotaoProximo();
}

function atualizarVidas() {
  document.getElementById("vidas").textContent = `Vidas: ${"❤️ ".repeat(vidas).trim()}`;
}

function carregarPergunta() {
  const pergunta = perguntas[indiceAtual];
  document.getElementById("sinal-img").src = pergunta.Imagem;
  document.getElementById("status").textContent = `${indiceAtual + 1} de ${perguntas.length}`;
  document.getElementById("acertos").textContent = `Acertos: ${pontuacao.toString().padStart(2, '0')}`;
  document.getElementById("feedback").textContent = "";

  const opcoesContainer = document.getElementById("opcoes");
  opcoesContainer.innerHTML = "";

  const botaoProximo = document.getElementById("btn-proximo");
  botaoProximo.disabled = true;
  botaoProximo.classList.remove("btn-ativo");

  pergunta.opcoes.forEach(opcao => {
    const botao = document.createElement("button");
    botao.textContent = opcao;
    botao.onclick = () => verificarResposta(opcao);
    botao.classList.add("menu-button");
    opcoesContainer.appendChild(botao);
  });

  iniciarTimer();
}

function verificarResposta(resposta) {
  clearInterval(timer);
  const pergunta = perguntas[indiceAtual];
  const feedback = document.getElementById("feedback");

  const botoes = document.querySelectorAll("#opcoes button");
  botoes.forEach(btn => btn.disabled = true);

  if (resposta === pergunta.correta) {
    feedback.textContent = "✅ Resposta correta!";
    feedback.style.color = "green";
    pontuacao++;
  } else {
    feedback.textContent = `❌ Resposta errada. A resposta certa é: ${pergunta.correta}`;
    feedback.style.color = "red";
    vidas--;
    atualizarVidas();
  }

  atualizarPontuacao();

  if (vidas <= 0) fimDoJogo("😵 Suas vidas acabaram!");
  else liberarBotaoProximo();
}

function liberarBotaoProximo() {
  const botao = document.getElementById("btn-proximo");
  botao.disabled = false;
  botao.classList.add("btn-ativo");
}

function proximaPergunta() {
  indiceAtual++;
  if (indiceAtual < perguntas.length && vidas > 0) {
    carregarPergunta();
  } else {
    fimDoJogo("🎉 Fim do jogo!");
  }
}

function fimDoJogo(mensagem) {
  clearInterval(timer);
  document.getElementById("quiz-container").innerHTML = `
    <h2>${mensagem}</h2>
    <p>Sua pontuação final: ${pontuacao} de ${perguntas.length}</p>
    <a href="jogo.html" class="menu-button">🔙 Voltar ao Menu</a>
  `;
  document.getElementById("feedback").textContent = "";
  document.getElementById("btn-proximo").style.display = "none";
}

function atualizarPontuacao() {
  const pontuacaoEl = document.getElementById("pontuacao");
  if (pontuacaoEl) {
    pontuacaoEl.textContent = `Pontuação: ${pontuacao} / ${perguntas.length}`;
  }
}

// Iniciar a primeira pergunta
carregarPergunta();
