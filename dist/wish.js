const wishButtons = Array.from(document.querySelectorAll("[data-wish]"));

wishButtons.forEach((button) => {
  button.addEventListener("click", () => {
    sessionStorage.setItem("birthdayWish", button.dataset.wish);
    document.body.classList.add("leaving");
    window.setTimeout(() => window.location.assign("./cake.html"), 360);
  });
});
