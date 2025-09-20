// Before & After slider
const slider = document.getElementById("slider");
if (slider) {
  slider.addEventListener("input", (e) => {
    const beforeImg = document.querySelector(".slider.before");
    if (beforeImg) {
      beforeImg.style.clipPath = `inset(0 ${100 - e.target.value}% 0 0)`;
    }
  });
}

// FAQ toggles
const faqButtons = document.querySelectorAll(".faq-question");
faqButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    if (answer.style.display === "block") {
      answer.style.display = "none";
    } else {
      answer.style.display = "block";
    }
  });
});
