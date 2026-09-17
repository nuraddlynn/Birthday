const yesButton = document.querySelector(".yes-button");
const noButton = document.querySelector(".no-button");
const choiceArena = document.querySelector(".choice-arena");
const teaseText = document.querySelector("[data-tease-text]");
const flowerDialog = document.querySelector(".flower-dialog");
const continueButton = document.querySelector(".continue-button");

const confirmations = ["Betul nakk???", "Betulll ehh nakk??"];
let confirmationStep = 0;

function moveNoButton(event) {
  event.preventDefault();

  const arena = choiceArena.getBoundingClientRect();
  const button = noButton.getBoundingClientRect();
  const padding = 10;
  const maxX = Math.max(padding, arena.width - button.width - padding);
  const maxY = Math.max(padding, arena.height - button.height - padding);
  const x = padding + Math.random() * (maxX - padding);
  const y = padding + Math.random() * (maxY - padding);

  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
  noButton.style.right = "auto";
  noButton.style.bottom = "auto";
  noButton.style.transform = `rotate(${Math.random() * 12 - 6}deg)`;
  teaseText.textContent = "Eh, tak boleh pilih tuu.";
}

noButton.addEventListener("pointerenter", moveNoButton);
noButton.addEventListener("pointerdown", moveNoButton);
noButton.addEventListener("click", moveNoButton);

yesButton.addEventListener("click", () => {
  if (confirmationStep < confirmations.length) {
    yesButton.textContent = confirmations[confirmationStep];
    yesButton.classList.add("is-confirming");
    teaseText.textContent = confirmationStep === 0 ? "Sure ke ni?" : "Last confirmation!";
    confirmationStep += 1;
    return;
  }

  flowerDialog.showModal();
});

flowerDialog.addEventListener("cancel", (event) => event.preventDefault());

continueButton.addEventListener("click", () => {
  flowerDialog.close();
  document.body.classList.add("leaving");
  window.setTimeout(() => window.location.assign("./gift.html"), 360);
});
