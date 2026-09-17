const helloForm = document.querySelector(".hello-form");
const helloInput = document.querySelector("#helloInput");
const hint = document.querySelector(".hint");

helloForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = helloInput.value.trim().toLowerCase();

  if (value === "hello") {
    hint.textContent = "Door opened.";
    document.body.classList.add("leaving");
    window.setTimeout(() => window.location.assign("./gift.html"), 420);
    return;
  }

  hint.textContent = value ? "So close. Try hello." : "The page is waiting for hello.";
  helloInput.focus();
});

window.setTimeout(() => helloInput.focus(), 500);
