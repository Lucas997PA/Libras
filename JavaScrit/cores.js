const perguntasBase = [
  { Imagem: "/imagens/cores/vermelho.mp4", correta: "Vermelho", opcoes: ["Marrom", "Vermelho", "Amarelo", "Verde"] },
  { Imagem: "/imagens/cores/azul.mp4", correta: "Azul", opcoes: ["Preto", "Rosa", "Azul", "Laranja"] },
  { Imagem: "/imagens/cores/amarelo.mp4", correta: "Amarelo", opcoes: ["Cinza", "Marrom", "Azul", "Amarelo"] },
  { Imagem: "/imagens/cores/verde.mp4", correta: "Verde", opcoes: ["Verde", "Preto", "Branco", "Roxo"] },
  { Imagem: "/imagens/cores/rosa.mp4", correta: "Rosa", opcoes: ["Azul", "Rosa", "Cinza", "Laranja"] },
  { Imagem: "/imagens/cores/preto.mp4", correta: "Preto", opcoes: ["Cinza", "Branco", "Preto", "Marrom"] },
  { Imagem: "/imagens/cores/branco.mp4", correta: "Branco", opcoes: ["Branco", "Preto", "Roxo", "Amarelo"] },
  { Imagem: "/imagens/cores/laranja.mp4", correta: "Laranja", opcoes: ["Roxo", "Laranja", "Marrom", "Azul"] },
  { Imagem: "/imagens/cores/roxo.mp4", correta: "Roxo", opcoes: ["Roxo", "Rosa", "Cinza", "Verde"] },
  { Imagem: "/imagens/cores/cinza.mp4", correta: "Cinza", opcoes: ["Branco", "Branco", "Cinza", "Roxo"] },
  { Imagem: "/imagens/cores/marrom.mp4", correta: "Marrom", opcoes: ["Verde", "Roxo", "Marrom", "Branco"] }
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



