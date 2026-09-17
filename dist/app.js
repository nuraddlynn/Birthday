const scenes = Array.from(document.querySelectorAll("[data-scene]"));
const helloForm = document.querySelector(".hello-form");
const helloInput = document.querySelector("#helloInput");
const hint = document.querySelector(".hint");
const giftButton = document.querySelector(".gift-button");
const countLabel = document.querySelector("[data-count]");
const wishButtons = Array.from(document.querySelectorAll("[data-wish]"));
const chosenWish = document.querySelector("[data-chosen-wish]");
const cakeButton = document.querySelector(".cake-button");
const replayButton = document.querySelector(".replay-button");
const canvas = document.querySelector("#confettiCanvas");
const ctx = canvas.getContext("2d");

const notes = ["spark", "wish", "smile", "almost", "ready"];
let giftTaps = 0;
let confetti = [];
let animationFrame = 0;

function showScene(name) {
  scenes.forEach((scene) => {
    const isActive = scene.dataset.scene === name;
    scene.classList.toggle("active", isActive);
    scene.toggleAttribute("inert", !isActive);
    scene.setAttribute("aria-hidden", isActive ? "false" : "true");
  });
}

function showNote(text, x = window.innerWidth / 2, y = window.innerHeight / 2) {
  const note = document.createElement("span");
  note.className = "float-note";
  note.textContent = text;
  note.style.setProperty("--x", `${Math.min(x, window.innerWidth - 96)}px`);
  note.style.setProperty("--y", `${Math.max(24, y)}px`);
  document.body.append(note);
  note.addEventListener("animationend", () => note.remove(), { once: true });
}

helloForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = helloInput.value.trim().toLowerCase();

  if (value === "hello") {
    hint.textContent = "Door opened.";
    setTimeout(() => showScene("tap"), 420);
    return;
  }

  hint.textContent = value ? "So close. Try hello." : "The page is waiting for hello.";
  helloInput.focus();
});

giftButton.addEventListener("click", (event) => {
  giftTaps += 1;
  countLabel.textContent = giftTaps.toString();
  giftButton.classList.remove("pulse");
  window.requestAnimationFrame(() => giftButton.classList.add("pulse"));
  showNote(notes[(giftTaps - 1) % notes.length], event.clientX, event.clientY);

  if (giftTaps >= 5) {
    setTimeout(() => showScene("wish"), 520);
  }
});

wishButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chosenWish.textContent = button.dataset.wish;
    showScene("candle");
  });
});

cakeButton.addEventListener("click", () => {
  cakeButton.classList.add("blown");
  setTimeout(() => {
    showScene("finale");
    startConfetti();
  }, 540);
});

replayButton.addEventListener("click", () => {
  giftTaps = 0;
  countLabel.textContent = "0";
  cakeButton.classList.remove("blown");
  chosenWish.textContent = "";
  stopConfetti();
  helloInput.value = "";
  hint.textContent = "Lowercase works best. The page is listening.";
  showScene("intro");
  setTimeout(() => helloInput.focus(), 440);
});

function resizeCanvas() {
  const scale = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * scale);
  canvas.height = Math.floor(window.innerHeight * scale);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
}

function startConfetti() {
  resizeCanvas();
  const colors = ["#ffd36e", "#ff6f91", "#79f2c0", "#84d8ff", "#fffaf0"];
  confetti = Array.from({ length: 110 }, () => ({
    x: Math.random() * window.innerWidth,
    y: -Math.random() * window.innerHeight,
    size: 5 + Math.random() * 8,
    speed: 1.8 + Math.random() * 4,
    drift: -1.5 + Math.random() * 3,
    spin: Math.random() * Math.PI,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
  cancelAnimationFrame(animationFrame);
  drawConfetti();
}

function drawConfetti() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  confetti.forEach((piece) => {
    piece.y += piece.speed;
    piece.x += piece.drift;
    piece.spin += 0.08;

    if (piece.y > window.innerHeight + 20) {
      piece.y = -20;
      piece.x = Math.random() * window.innerWidth;
    }

    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.spin);
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.55);
    ctx.restore();
  });

  animationFrame = requestAnimationFrame(drawConfetti);
}

function stopConfetti() {
  cancelAnimationFrame(animationFrame);
  confetti = [];
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", () => {
  if (document.querySelector('[data-scene="finale"]').classList.contains("active")) {
    resizeCanvas();
  }
});

setTimeout(() => helloInput.focus(), 500);
