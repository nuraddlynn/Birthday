const replayButton = document.querySelector(".replay-button");
const canvas = document.querySelector("#confettiCanvas");
const ctx = canvas.getContext("2d");
let confetti = [];
let animationFrame = 0;

function resizeCanvas() {
  const scale = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * scale);
  canvas.height = Math.floor(window.innerHeight * scale);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
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

  animationFrame = window.requestAnimationFrame(drawConfetti);
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
  window.cancelAnimationFrame(animationFrame);
  drawConfetti();
}

replayButton.addEventListener("click", () => {
  sessionStorage.removeItem("birthdayWish");
  window.cancelAnimationFrame(animationFrame);
  document.body.classList.add("leaving");
  window.setTimeout(() => window.location.assign("./home.html"), 360);
});

window.addEventListener("resize", resizeCanvas);
startConfetti();
