/***** 1. Banco de perguntas (números em Libras) *****/
const perguntasBase = [
  { Imagem: "/imagens/numeros/0.mp4",  correta: "0",  opcoes: ["0", "1", "2", "3"] },
  { Imagem: "/imagens/numeros/1.mp4",  correta: "1",  opcoes: ["1", "0", "4", "7"] },
  { Imagem: "/imagens/numeros/2.mp4",  correta: "2",  opcoes: ["2", "3", "5", "9"] },
  { Imagem: "/imagens/numeros/3.mp4",  correta: "3",  opcoes: ["3", "6", "4", "1"] },
  { Imagem: "/imagens/numeros/4.mp4",  correta: "4",  opcoes: ["4", "2", "0", "7"] },
  { Imagem: "/imagens/numeros/5.mp4",  correta: "5",  opcoes: ["5", "3", "9", "6"] },
  { Imagem: "/imagens/numeros/6.mp4",  correta: "6",  opcoes: ["6", "5", "8", "4"] },
  { Imagem: "/imagens/numeros/7.mp4",  correta: "7",  opcoes: ["7", "1", "0", "9"] },
  { Imagem: "/imagens/numeros/8.mp4",  correta: "8",  opcoes: ["8", "2", "6", "3"] },
  { Imagem: "/imagens/numeros/9.mp4",  correta: "9",  opcoes: ["9", "8", "7", "5"] },
  { Imagem: "/imagens/numeros/10.mp4", correta: "10", opcoes: ["10", "8", "7", "5"] }
];

function embaralharArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

let perguntas = embaralharArray([...perguntasBase]);
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
  document.getElementById("vidas").textContent =
    `Vidas: ${"❤️ ".repeat(vidas).trim()}`;
}

function carregarPergunta() {
  const pergunta = perguntas[indiceAtual];

  // Atualiza o vídeo
  const videoElement = document.getElementById("sinal-video");
  if (videoElement) {
    videoElement.src = pergunta.Imagem;
    videoElement.load();
  }

  document.getElementById("status").textContent = 
    `${indiceAtual + 1} de ${perguntas.length}`;
  document.getElementById("acertos").textContent = 
    `Acertos: ${pontuacao.toString().padStart(2, "0")}`;
  document.getElementById("feedback").textContent = "";

  const btnProx = document.getElementById("btn-proximo");
  btnProx.disabled = true;
  btnProx.classList.remove("btn-ativo");

  const opcoesContainer = document.getElementById("opcoes");
  opcoesContainer.innerHTML = "";
  pergunta.opcoes.forEach(opcao => {
    const botao = document.createElement("button");
    botao.textContent = opcao;
    botao.classList.add("menu-button");
    botao.onclick = () => verificarResposta(opcao);
    opcoesContainer.appendChild(botao);
  });

  iniciarTimer();
}

function verificarResposta(resposta) {
  clearInterval(timer);

  const pergunta = perguntas[indiceAtual];
  const feedback = document.getElementById("feedback");

  document
    .querySelectorAll("#opcoes button")
    .forEach(btn => (btn.disabled = true));

  if (resposta === pergunta.correta) {
    feedback.textContent = "✅ Resposta correta!";
    feedback.style.color = "green";
    pontuacao++;
  } else {
    feedback.textContent = `❌ Resposta errada. A certa é: ${pergunta.correta}`;
    feedback.style.color = "red";
    vidas--;
    atualizarVidas();
  }

  atualizarPontuacao();

  if (vidas <= 0) fimDoJogo("😵 Suas vidas acabaram!");
  else liberarBotaoProximo();
}

function liberarBotaoProximo() {
  const btn = document.getElementById("btn-proximo");
  btn.disabled = false;
  btn.classList.add("btn-ativo");
}

function proximaPergunta() {
  indiceAtual++;
  if (indiceAtual < perguntas.length && vidas > 0) carregarPergunta();
  else fimDoJogo("🎉 Fim do jogo!");
}

function fimDoJogo(msg) {
  clearInterval(timer);
  document.getElementById("quiz-container").innerHTML = `
    <h2>${msg}</h2>
    <p>Sua pontuação final: ${pontuacao} de ${perguntas.length}</p>
    <a href="jogo.html" class="menu-button">🔙 Voltar ao Menu</a>
  `;
  document.getElementById("feedback").textContent = "";
  document.getElementById("btn-proximo").style.display = "none";
}

function atualizarPontuacao() {
  const pEl = document.getElementById("pontuacao");
  if (pEl) pEl.textContent = `Pontuação: ${pontuacao} / ${perguntas.length}`;
}

carregarPergunta();

// Tema escuro e claro
const toggleButton = document.getElementById("toggle-theme");
  const body = document.body;

  // Verifica se já existe um tema salvo no localStorage
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggleButton.textContent = "☀️";
  }

  toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      toggleButton.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    } else {
      toggleButton.textContent = "🌙";
      localStorage.setItem("theme", "light");
    }
  });


// Carrega vídeos das fases
document.addEventListener("DOMContentLoaded", () => {
  const fases = document.querySelectorAll(".fase-button");

  fases.forEach(fase => {
    const src = fase.dataset.src;
    const video = document.createElement("video");
    video.src = src;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = "none";
    video.width = 150;
    fase.appendChild(video);
  });
});



