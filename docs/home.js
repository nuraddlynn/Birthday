const helloForm = document.querySelector(".hello-form");
const helloInput = document.querySelector("#nameInput");
const hint = document.querySelector(".hint");
const correctName = "yiyidd";
let wrongAttempts = 0;

helloForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = helloInput.value.trim().toLowerCase();

  if (value === correctName) {
    sessionStorage.setItem("birthdayName", "Yiyidd");
    hint.textContent = "Yayyy betulll!";
    helloInput.disabled = true;
    helloForm.querySelector("button").disabled = true;
    document.body.classList.add("leaving");
    window.setTimeout(() => window.location.assign("./loading.html"), 420);
    return;
  }

  wrongAttempts += 1;
  hint.textContent = wrongAttempts === 1
    ? "hmm apa ni takkan lupa dah :("
    : "ee salah lagi, awak tak sayang saya ke?";
  helloInput.focus();
  helloInput.select();
});

window.setTimeout(() => helloInput.focus(), 500);
