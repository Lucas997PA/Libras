const perguntasBase = [
 { Imagem: "/imagens/semana/domingo.png", correta: "Domingo", opcoes: ["Domingo", "Segunda", "Terça", "Quarta"] },
  { Imagem: "/imagens/semana/segunda.png", correta: "Segunda", opcoes: ["Segunda", "Domingo", "Quinta", "Sábado"] },
  { Imagem: "/imagens/semana/terca.png", correta: "Terça", opcoes: ["Terça", "Sexta", "Quarta", "Segunda"] },
  { Imagem: "/imagens/semana/quarta.png", correta: "Quarta", opcoes: ["Quarta", "Quinta", "Terça", "Domingo"] },
  { Imagem: "/imagens/semana/quinta.png", correta: "Quinta", opcoes: ["Quinta", "Sexta", "Segunda", "Sábado"] },
  { Imagem: "/imagens/semana/sexta.png", correta: "Sexta", opcoes: ["Sexta", "Quarta", "Domingo", "Terça"] },
  { Imagem: "/imagens/semana/sabado.png", correta: "Sábado", opcoes: ["Sábado", "Segunda", "Sexta", "Quinta"] }
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
