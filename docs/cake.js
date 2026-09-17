const cakeButton = document.querySelector(".cake-button");
const chosenWish = document.querySelector("[data-chosen-wish]");

chosenWish.textContent = sessionStorage.getItem("birthdayWish") || "A year full of gentle surprises.";

cakeButton.addEventListener("click", () => {
  cakeButton.disabled = true;
  cakeButton.classList.add("blown");
  window.setTimeout(() => window.location.assign("./finale.html"), 540);
});
