/***** 1. Banco de perguntas (Alfabeto em Libras) *****/
const perguntasBase = [
  { Imagem: "/imagens/alfabeto/a.mp4", correta: "A", opcoes: ["A", "E", "O", "U"] },
  { Imagem: "/imagens/alfabeto/b.mp4", correta: "B", opcoes: ["B", "C", "D", "F"] },
  { Imagem: "/imagens/alfabeto/c.mp4", correta: "C", opcoes: ["C", "G", "F", "H"] },
  { Imagem: "/imagens/alfabeto/ç.mp4", correta: "Ç", opcoes: ["Ç", "G", "F", "H"] },
  { Imagem: "/imagens/alfabeto/d.mp4", correta: "D", opcoes: ["D", "L", "M", "N"] },
  { Imagem: "/imagens/alfabeto/e.mp4", correta: "E", opcoes: ["E", "I", "O", "U"] },
  { Imagem: "/imagens/alfabeto/f.mp4", correta: "F", opcoes: ["F", "E", "G", "H"] },
  { Imagem: "/imagens/alfabeto/g.mp4", correta: "G", opcoes: ["G", "J", "C", "Q"] },
  { Imagem: "/imagens/alfabeto/h.mp4", correta: "H", opcoes: ["H", "K", "L", "M"] },
  { Imagem: "/imagens/alfabeto/i.mp4", correta: "I", opcoes: ["I", "E", "J", "Y"] },
  { Imagem: "/imagens/alfabeto/j.mp4", correta: "J", opcoes: ["J", "I", "G", "K"] },
  { Imagem: "/imagens/alfabeto/k.mp4", correta: "K", opcoes: ["K", "L", "X", "Y"] },
  { Imagem: "/imagens/alfabeto/l.mp4", correta: "L", opcoes: ["L", "I", "M", "N"] },
  { Imagem: "/imagens/alfabeto/m.mp4", correta: "M", opcoes: ["M", "N", "H", "W"] },
  { Imagem: "/imagens/alfabeto/n.mp4", correta: "N", opcoes: ["N", "M", "U", "Z"] },
  { Imagem: "/imagens/alfabeto/o.mp4", correta: "O", opcoes: ["O", "Q", "C", "D"] },
  { Imagem: "/imagens/alfabeto/p.mp4", correta: "P", opcoes: ["P", "R", "B", "T"] },
  { Imagem: "/imagens/alfabeto/q.mp4", correta: "Q", opcoes: ["Q", "G", "O", "C"] },
  { Imagem: "/imagens/alfabeto/r.mp4", correta: "R", opcoes: ["R", "P", "S", "B"] },
  { Imagem: "/imagens/alfabeto/s.mp4", correta: "S", opcoes: ["S", "C", "Z", "R"] },
  { Imagem: "/imagens/alfabeto/t.mp4", correta: "T", opcoes: ["T", "F", "P", "D"] },
  { Imagem: "/imagens/alfabeto/u.mp4", correta: "U", opcoes: ["U", "O", "V", "I"] },
  { Imagem: "/imagens/alfabeto/v.mp4", correta: "V", opcoes: ["V", "W", "B", "F"] },
  { Imagem: "/imagens/alfabeto/w.mp4", correta: "W", opcoes: ["W", "M", "V", "N"] },
  { Imagem: "/imagens/alfabeto/x.mp4", correta: "X", opcoes: ["X", "K", "Y", "Z"] },
  { Imagem: "/imagens/alfabeto/y.mp4", correta: "Y", opcoes: ["Y", "I", "J", "X"] },
  { Imagem: "/imagens/alfabeto/z.mp4", correta: "Z", opcoes: ["Z", "S", "X", "C"] }
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



