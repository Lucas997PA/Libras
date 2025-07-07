const perguntasBase = [
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
