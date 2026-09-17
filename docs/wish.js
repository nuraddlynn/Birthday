const loveBoxes = Array.from(document.querySelectorAll("[data-love]"));
const finalBox = document.querySelector(".final-box");
const finalIcon = document.querySelector("[data-final-icon]");
const videoDialog = document.querySelector(".video-dialog");
const memoryVideo = document.querySelector(".memory-video");
const videoContinue = document.querySelector(".video-continue");
let openedBoxes = 0;

loveBoxes.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("opened")) {
      return;
    }

    button.classList.add("opened");
    button.setAttribute("aria-label", button.dataset.openLabel || "Love sudah dibuka");
    openedBoxes += 1;

    if (openedBoxes === loveBoxes.length) {
      finalBox.disabled = false;
      finalBox.classList.add("unlocked");
      finalBox.setAttribute("aria-label", "Buka video terakhir");
      finalIcon.textContent = "\uD83D\uDD13";
    }
  });
});

finalBox.addEventListener("click", () => {
  if (finalBox.disabled) {
    return;
  }

  videoDialog.showModal();
  memoryVideo.play().catch(() => {});
});

videoDialog.addEventListener("close", () => memoryVideo.pause());

videoContinue.addEventListener("click", () => {
  memoryVideo.pause();
  videoDialog.close();
  document.body.classList.add("leaving");
  window.setTimeout(() => window.location.assign("./cake.html"), 360);
});
