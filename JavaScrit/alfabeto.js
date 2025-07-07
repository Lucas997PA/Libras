/***** 1. Banco de perguntas (Alfabeto em Libras) *****/
const perguntasBase = [
  { Imagem: "/imagens/alfabeto/a.png", correta: "A", opcoes: ["A", "E", "O", "U"] },
  { Imagem: "/imagens/alfabeto/b.png", correta: "B", opcoes: ["B", "C", "D", "F"] },
  { Imagem: "/imagens/alfabeto/c.png", correta: "C", opcoes: ["C", "G", "F", "H"] },
  { Imagem: "/imagens/alfabeto/d.png", correta: "D", opcoes: ["D", "L", "M", "N"] },
  { Imagem: "/imagens/alfabeto/e.png", correta: "E", opcoes: ["E", "I", "O", "U"] },
  { Imagem: "/imagens/alfabeto/f.png", correta: "F", opcoes: ["F", "E", "G", "H"] },
  { Imagem: "/imagens/alfabeto/g.png", correta: "G", opcoes: ["G", "J", "C", "Q"] },
  { Imagem: "/imagens/alfabeto/h.png", correta: "H", opcoes: ["H", "K", "L", "M"] },
  { Imagem: "/imagens/alfabeto/i.png", correta: "I", opcoes: ["I", "E", "J", "Y"] },
  { Imagem: "/imagens/alfabeto/j.png", correta: "J", opcoes: ["J", "I", "G", "K"] },
  { Imagem: "/imagens/alfabeto/k.png", correta: "K", opcoes: ["K", "L", "X", "Y"] },
  { Imagem: "/imagens/alfabeto/l.png", correta: "L", opcoes: ["L", "I", "M", "N"] },
  { Imagem: "/imagens/alfabeto/m.png", correta: "M", opcoes: ["M", "N", "H", "W"] },
  { Imagem: "/imagens/alfabeto/n.png", correta: "N", opcoes: ["N", "M", "U", "Z"] },
  { Imagem: "/imagens/alfabeto/o.png", correta: "O", opcoes: ["O", "Q", "C", "D"] },
  { Imagem: "/imagens/alfabeto/p.png", correta: "P", opcoes: ["P", "R", "B", "T"] },
  { Imagem: "/imagens/alfabeto/q.png", correta: "Q", opcoes: ["Q", "G", "O", "C"] },
  { Imagem: "/imagens/alfabeto/r.png", correta: "R", opcoes: ["R", "P", "S", "B"] },
  { Imagem: "/imagens/alfabeto/s.png", correta: "S", opcoes: ["S", "C", "Z", "R"] },
  { Imagem: "/imagens/alfabeto/t.png", correta: "T", opcoes: ["T", "F", "P", "D"] },
  { Imagem: "/imagens/alfabeto/u.png", correta: "U", opcoes: ["U", "O", "V", "I"] },
  { Imagem: "/imagens/alfabeto/v.png", correta: "V", opcoes: ["V", "W", "B", "F"] },
  { Imagem: "/imagens/alfabeto/w.png", correta: "W", opcoes: ["W", "M", "V", "N"] },
  { Imagem: "/imagens/alfabeto/x.png", correta: "X", opcoes: ["X", "K", "Y", "Z"] },
  { Imagem: "/imagens/alfabeto/y.png", correta: "Y", opcoes: ["Y", "I", "J", "X"] },
  { Imagem: "/imagens/alfabeto/z.png", correta: "Z", opcoes: ["Z", "S", "X", "C"] }
];

/***** 2. Função para embaralhar *****/
function embaralharArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

/***** 3. Variáveis de controle *****/
let perguntas   = embaralharArray([...perguntasBase]);
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

  document.getElementById("sinal-img").src   = pergunta.Imagem;
  document.getElementById("status").textContent  = 
    `${indiceAtual + 1} de ${perguntas.length}`;
  document.getElementById("acertos").textContent = 
    `Acertos: ${pontuacao.toString().padStart(2, "0")}`;
  document.getElementById("feedback").textContent = "";

  const btnProx = document.getElementById("btn-proximo");
  btnProx.disabled = true;
  btnProx.classList.remove("btn-ativo");

  const opcoesContainer = document.getElementById("opcoes");
  opcoesContainer.innerHTML = "";
  pergunta.opcoes.forEach(op => {
    const b = document.createElement("button");
    b.textContent = op;
    b.classList.add("menu-button");
    b.onclick = () => verificarResposta(op);
    opcoesContainer.appendChild(b);
  });

  iniciarTimer();
}

/* ---------- Verifica resposta ---------- */
function verificarResposta(resposta) {
  clearInterval(timer);

  const pergunta = perguntas[indiceAtual];
  const feedback = document.getElementById("feedback");

  document.querySelectorAll("#opcoes button")
          .forEach(btn => btn.disabled = true);

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
  btn.classList.add("btn-ativo");
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
  const p = document.getElementById("pontuacao");
  if (p) p.textContent = `Pontuação: ${pontuacao} / ${perguntas.length}`;
}

/* ---------- Iniciar jogo ---------- */
carregarPergunta();
