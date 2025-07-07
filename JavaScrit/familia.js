const perguntasBase = [
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

/***** 2. Função para embaralhar *****/
function embaralharArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

/***** 3. Variáveis de controle *****/
let perguntas   = embaralharArray([...perguntasBase]); // <- já embaralhadas
let indiceAtual = 0;
let pontuacao   = 0;
let vidas       = 3;
let tempo       = 60;
let timer;

/* ============ REGRAS DO JOGO ============ */
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

/* ---------- Carrega a pergunta atual ---------- */
function carregarPergunta() {
  const pergunta = perguntas[indiceAtual];

  /* UI básica */
  document.getElementById("sinal-img").src = pergunta.Imagem;
  document.getElementById("status").textContent = 
    `${indiceAtual + 1} de ${perguntas.length}`;
  document.getElementById("acertos").textContent = 
    `Acertos: ${pontuacao.toString().padStart(2, "0")}`;
  document.getElementById("feedback").textContent = "";

  /* Desativa botão Próximo */
  const btnProx = document.getElementById("btn-proximo");
  btnProx.disabled = true;
  btnProx.classList.remove("btn-ativo");

  /* Monta opções */
  const opcoesContainer = document.getElementById("opcoes");
  opcoesContainer.innerHTML = "";
  pergunta.opcoes.forEach(opcao => {
    const botao = document.createElement("button");
    botao.textContent  = opcao;
    botao.classList.add("menu-button");
    botao.onclick      = () => verificarResposta(opcao);
    opcoesContainer.appendChild(botao);
  });

  iniciarTimer();
}

/* ---------- Verifica resposta ---------- */
function verificarResposta(resposta) {
  clearInterval(timer);

  const pergunta = perguntas[indiceAtual];
  const feedback = document.getElementById("feedback");

  /* Bloqueia botões */
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

/* ---------- Libera botão Próximo ---------- */
function liberarBotaoProximo() {
  const btn = document.getElementById("btn-proximo");
  btn.disabled = false;
  btn.classList.add("btn-ativo"); // muda p/ azul
}

/* ---------- Avança ou finaliza ---------- */
function proximaPergunta() {
  indiceAtual++;
  if (indiceAtual < perguntas.length && vidas > 0) carregarPergunta();
  else fimDoJogo("🎉 Fim do jogo!");
}

/* ---------- Tela de fim ---------- */
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

/* ---------- Iniciar jogo ---------- */
carregarPergunta();
