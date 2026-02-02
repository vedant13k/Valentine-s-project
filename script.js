const app = document.getElementById("app");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const inputArea = document.getElementById("inputArea");
const buttons = document.getElementById("buttons");
const music = document.getElementById("bgMusic");

let answers = {};
let musicStarted = false;

const TYPE_SPEED = 55;
const POEM_DELAY = 2200;

/* ---------- AUDIO (HOSTING SAFE) ---------- */
function playMusicOnce() {
  if (musicStarted) return;

  music.volume = 0.45;
  music.play().then(() => {
    musicStarted = true;
  }).catch(err => {
    console.log("Audio blocked:", err);
  });
}

/* ---------- HELPERS ---------- */
function bg(img) {
  app.style.backgroundImage = `url('assets/${img}')`;
}

function clearUI() {
  title.innerHTML = "";
  subtitle.innerHTML = "";
  inputArea.innerHTML = "";
  buttons.innerHTML = "";
}

function typeText(el, text, cb) {
  el.innerHTML = "";
  let i = 0;
  const interval = setInterval(() => {
    el.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (cb) setTimeout(cb, 500);
    }
  }, TYPE_SPEED);
}

function scrollDown() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

function enableFinalMode() {
  document.body.classList.add("final-page");
}

function disableFinalMode() {
  document.body.classList.remove("final-page");
}

/* ---------- FLOW ---------- */

function start() {
  disableFinalMode();
  bg("bg_intro.jpg");

  typeText(title, "Hey Chaman ✨", () => {
    typeText(subtitle, "I made this… because you matter to me 💖");
    buttons.innerHTML = `
      <button onclick="firstClick()">Okay… I’m curious 😌</button>
    `;
  });
}

/* 🔑 THIS is the FIRST user interaction */
function firstClick() {
  playMusicOnce();   // ✅ audio starts legally here
  game();
}

function game() {
  bg("bg_game.jpg");
  clearUI();

  typeText(title, "Let’s play a small game 🎮", () => {
    typeText(subtitle, "No pressure. Just honesty. Just us.");
    buttons.innerHTML = `<button onclick="q1()">Let’s go 💫</button>`;
  });
}

function q1() {
  bg("bg_q1.jpg");
  clearUI();

  typeText(title, "Why me? 🤍", () => {
    typeText(subtitle, "Out of all the people… why did you choose me?");
    inputArea.innerHTML = `<textarea id="ans"></textarea>`;
    buttons.innerHTML = `<button onclick="save('why', q2)">Next ➝</button>`;
  });
}

function q2() {
  bg("bg_q2.jpg");
  clearUI();

  typeText(title, "Our future 🌱", () => {
    typeText(subtitle, "When you imagine us ahead… what do you see?");
    inputArea.innerHTML = `<textarea id="ans"></textarea>`;
    buttons.innerHTML = `<button onclick="save('future', q3)">Next ➝</button>`;
  });
}

function q3() {
  bg("bg_q3.jpg");
  clearUI();

  typeText(title, "Four years… 💭", () => {
    typeText(subtitle, "What’s your favourite memory of us?");
    inputArea.innerHTML = `<textarea id="ans"></textarea>`;
    buttons.innerHTML = `<button onclick="save('memory', forever)">Continue 💖</button>`;
  });
}

function save(key, next) {
  const v = document.getElementById("ans").value.trim();
  if (!v) return;
  answers[key] = v;
  next();
}

function forever() {
  bg("bg_forever.jpg");
  clearUI();

  typeText(title, "Chaman… 🌹", () => {
    typeText(subtitle, "One honest question. From my heart.");
    buttons.innerHTML = `
      <button onclick="yes()">Will you be my forever Valentine? ❤️</button>
      <button id="noBtn" class="secondary" onmouseover="run()">Hmm… 😏</button>
    `;
  });
}

function run() {
  const b = document.getElementById("noBtn");
  b.style.transform = `translate(${Math.random()*120-60}px,${Math.random()*80-40}px)`;
}

function yes() {
  bg("bg_plan.jpg");
  clearUI();

  typeText(title, "Valentine’s plans 💘", () => {
    typeText(subtitle, "What should be our Valentine’s plan?");
    inputArea.innerHTML = `<textarea id="ans"></textarea>`;
    buttons.innerHTML = `<button onclick="save('plan', gift)">Next 💫</button>`;
  });
}

function gift() {
  bg("bg_gift.jpg");
  clearUI();

  typeText(title, "One last thing 🎁", () => {
    typeText(subtitle, "If I could get you anything… what would you want?");
    inputArea.innerHTML = `<textarea id="ans"></textarea>`;
    buttons.innerHTML = `<button onclick="save('gift', final)">Finish 💖</button>`;
  });
}

function final() {
  enableFinalMode();
  bg("bg_final.jpg");
  clearUI();

  typeText(title, "From my heart to yours 💖", () => {
    const poem = document.createElement("div");
    poem.className = "poem";
    subtitle.appendChild(poem);

    const lines = [
      "My only regret in life…",
      "is that I didn’t meet you earlier ⏳",
      "But here we are — and you stayed 🤍",
      "I promise effort, patience, and choosing you — always 🌱",
      "If eternity has a beginning…",
      "I hope it starts with us ♾️"
    ];

    let i = 0;
    function typePoem() {
      if (i < lines.length) {
        poem.innerHTML += lines[i] + "<br><br>";
        scrollDown();
        i++;
        setTimeout(typePoem, POEM_DELAY);
      }
    }
    typePoem();
  });
}

start();
