const giftButton = document.querySelector(".gift-button");
const encouragement = document.querySelector(".encouragement");
const requiredTaps = 100;
let giftTaps = 0;

function showNote(text, x, y) {
  const note = document.createElement("span");
  note.className = "float-note";
  note.textContent = text;
  note.style.setProperty("--x", `${Math.min(x, window.innerWidth - 96)}px`);
  note.style.setProperty("--y", `${Math.max(24, y)}px`);
  document.body.append(note);
  note.addEventListener("animationend", () => note.remove(), { once: true });
}

giftButton.addEventListener("click", (event) => {
  giftTaps += 1;
  giftButton.classList.remove("pulse");
  window.requestAnimationFrame(() => giftButton.classList.add("pulse"));
  showNote("\u2764\uFE0F", event.clientX, event.clientY);

  if (giftTaps === 50) {
    encouragement.textContent = "cepat cepat, sikitt lagiiii";
    encouragement.classList.add("show");
  }

  if (giftTaps >= requiredTaps) {
    giftButton.disabled = true;
    document.body.classList.add("leaving");
    window.setTimeout(() => window.location.assign("./wish.html"), 520);
  }
});
