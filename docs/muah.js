const continueButton = document.querySelector(".muah-continue");

continueButton.addEventListener("click", () => {
  document.body.classList.add("leaving");
  window.setTimeout(() => window.location.assign("./cake.html"), 360);
});
