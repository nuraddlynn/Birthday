const cakeButton = document.querySelector(".cake-button");
const saturdayDialog = document.querySelector(".saturday-dialog");
const saturdayContinue = document.querySelector(".saturday-continue");

cakeButton.addEventListener("click", () => {
  cakeButton.disabled = true;
  cakeButton.classList.add("blown");
  window.setTimeout(() => saturdayDialog.showModal(), 440);
});

saturdayDialog.addEventListener("cancel", (event) => event.preventDefault());

saturdayContinue.addEventListener("click", () => {
  saturdayDialog.close();
  document.body.classList.add("leaving");
  window.setTimeout(() => window.location.assign("./finale.html"), 360);
});
