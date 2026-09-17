const loveBoxes = Array.from(document.querySelectorAll("[data-love]"));
const finalBox = document.querySelector(".final-box");
const finalIcon = document.querySelector("[data-final-icon]");
const photoDialog = document.querySelector(".photo-dialog");
const memoryPhoto = document.querySelector(".memory-photo");
const photoCaption = document.querySelector("#photoCaption");
const photoContinue = document.querySelector(".photo-continue");
const videoDialog = document.querySelector(".video-dialog");
const memoryVideo = document.querySelector(".memory-video");
const videoContinue = document.querySelector(".video-continue");
const comeHereButton = document.querySelector(".come-here-button");
let openedBoxes = 0;
let videoOpened = false;

loveBoxes.forEach((button) => {
  button.addEventListener("click", () => {
    if (!button.classList.contains("opened")) {
      button.classList.add("opened");
      button.setAttribute("aria-label", `${button.dataset.caption}. Tekan untuk tengok lagi`);
      openedBoxes += 1;

      if (openedBoxes === loveBoxes.length) {
        finalBox.disabled = false;
        finalBox.classList.add("unlocked");
        finalBox.setAttribute("aria-label", "Buka video terakhir");
        finalIcon.textContent = "\uD83D\uDD13";
      }
    }

    memoryPhoto.src = button.dataset.image;
    memoryPhoto.alt = button.dataset.imageAlt;
    photoCaption.textContent = button.dataset.caption;
    photoDialog.showModal();
  });
});

photoContinue.addEventListener("click", () => photoDialog.close());

finalBox.addEventListener("click", () => {
  if (finalBox.disabled) {
    return;
  }

  if (!videoOpened) {
    videoOpened = true;
    finalBox.classList.add("opened");
    finalBox.setAttribute("aria-label", "Video sudah dibuka");
    comeHereButton.hidden = false;
    window.requestAnimationFrame(() => comeHereButton.classList.add("show"));
  }

  videoDialog.showModal();
  memoryVideo.play().catch(() => {});
});

videoDialog.addEventListener("close", () => memoryVideo.pause());

videoContinue.addEventListener("click", () => {
  memoryVideo.pause();
  videoDialog.close();
});

comeHereButton.addEventListener("click", () => {
  document.body.classList.add("leaving");
  window.setTimeout(() => window.location.assign("./muah.html"), 360);
});
