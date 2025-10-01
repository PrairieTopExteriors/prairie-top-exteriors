 // Before/After Slider Functionality
const range = document.querySelector(".slider-range");
const overlay = document.querySelector(".slider-overlay");

if (range && overlay) {
  // Manual drag
  range.addEventListener("input", () => {
    overlay.style.width = range.value + "%";
  });

  // Auto animate back and forth
  let direction = 1;
  setInterval(() => {
    let val = parseInt(range.value);
    if (val >= 100) direction = -1;
    if (val <= 0) direction = 1;
    range.value = val + direction;
    overlay.style.width = range.value + "%";
  }, 80); // speed (lower = faster, higher = slower)
}
   
