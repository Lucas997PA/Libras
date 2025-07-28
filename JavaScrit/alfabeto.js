/***** 1. Banco de perguntas (Alfabeto em Libras) *****/
const perguntasBase = [
  { Imagem: "/imagens/alfabeto/a.mp4", correta: "A", opcoes: ["S", "A", "O", "U"] },
  { Imagem: "/imagens/alfabeto/b.mp4", correta: "B", opcoes: ["U", "C", "B", "F"] },
  { Imagem: "/imagens/alfabeto/c.mp4", correta: "C", opcoes: ["Ç", "G", "F", "C"] },
  { Imagem: "/imagens/alfabeto/ç.mp4", correta: "Ç", opcoes: ["C", "Ç", "A", "H"] },
  { Imagem: "/imagens/alfabeto/d.mp4", correta: "D", opcoes: ["I", "D", "M", "B"] },
  { Imagem: "/imagens/alfabeto/e.mp4", correta: "E", opcoes: ["F", "I", "E", "U"] },
  { Imagem: "/imagens/alfabeto/f.mp4", correta: "F", opcoes: ["H", "E", "G", "F"] },
  { Imagem: "/imagens/alfabeto/g.mp4", correta: "G", opcoes: ["G", "J", "C", "Q"] },
  { Imagem: "/imagens/alfabeto/h.mp4", correta: "H", opcoes: ["P", "H", "L", "M"] },
  { Imagem: "/imagens/alfabeto/i.mp4", correta: "I", opcoes: ["J", "E", "I", "Y"] },
  { Imagem: "/imagens/alfabeto/j.mp4", correta: "J", opcoes: ["Z", "I", "A", "J"] },
  { Imagem: "/imagens/alfabeto/k.mp4", correta: "K", opcoes: ["B", "L", "X", "K"] },
  { Imagem: "/imagens/alfabeto/l.mp4", correta: "L", opcoes: ["L", "T", "C", "N"] },
  { Imagem: "/imagens/alfabeto/m.mp4", correta: "M", opcoes: ["N", "M", "H", "W"] },
  { Imagem: "/imagens/alfabeto/n.mp4", correta: "N", opcoes: ["E", "M", "N", "Z"] },
  { Imagem: "/imagens/alfabeto/o.mp4", correta: "O", opcoes: ["B", "Q", "C", "O"] },
  { Imagem: "/imagens/alfabeto/p.mp4", correta: "P", opcoes: ["P", "R", "K", "T"] },
  { Imagem: "/imagens/alfabeto/q.mp4", correta: "Q", opcoes: ["A", "Q", "O", "C"] },
  { Imagem: "/imagens/alfabeto/r.mp4", correta: "R", opcoes: ["B", "P", "R", "E"] },
  { Imagem: "/imagens/alfabeto/s.mp4", correta: "S", opcoes: ["Z", "C", "S", "R"] },
  { Imagem: "/imagens/alfabeto/t.mp4", correta: "T", opcoes: ["T", "F", "P", "D"] },
  { Imagem: "/imagens/alfabeto/u.mp4", correta: "U", opcoes: ["U", "O", "W", "I"] },
  { Imagem: "/imagens/alfabeto/v.mp4", correta: "V", opcoes: ["Y", "W", "V", "F"] },
  { Imagem: "/imagens/alfabeto/w.mp4", correta: "W", opcoes: ["A", "M", "S", "W"] },
  { Imagem: "/imagens/alfabeto/x.mp4", correta: "X", opcoes: ["B", "K", "Y", "X"] },
  { Imagem: "/imagens/alfabeto/y.mp4", correta: "Y", opcoes: ["I", "Y", "J", "X"] },
  { Imagem: "/imagens/alfabeto/z.mp4", correta: "Z", opcoes: ["X", "S", "Z", "C"] }
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



