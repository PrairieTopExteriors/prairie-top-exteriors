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
// GALLERY LOADER
document.addEventListener("DOMContentLoaded", () => {
  const galleryContainer = document.getElementById("galleryContainer");

  if (galleryContainer) {
    fetch("gallery.json")
      .then((response) => response.json())
      .then((data) => {
        data.projects.forEach((project) => {
          // Create group section
          const group = document.createElement("div");
          group.classList.add("gallery-group");

          const title = document.createElement("h3");
          title.textContent = project.title;
          group.appendChild(title);

          const desc = document.createElement("p");
          desc.textContent = project.description;
          group.appendChild(desc);

          // Images grid
          const grid = document.createElement("div");
          grid.classList.add("gallery-grid");

          project.images.forEach((imgPath) => {
            const img = document.createElement("img");
            img.src = imgPath;
            img.alt = project.title;
            img.className = "gallery-img";

            // Modal functionality
            img.addEventListener("click", () => {
              const overlay = document.createElement("div");
              overlay.className = "modal";
              overlay.innerHTML = `
                <div class="modal-content">
                  <span class="close">&times;</span>
                  <img src="${img.src}" alt="${project.title}" />
                  <p>${project.description}</p>
                </div>
              `;
              document.body.appendChild(overlay);

              overlay.querySelector(".close").onclick = () => overlay.remove();
              overlay.onclick = (e) => {
                if (e.target === overlay) overlay.remove();
              };
            });

            grid.appendChild(img);
          });

          group.appendChild(grid);
          galleryContainer.appendChild(group);
        });
      })
      .catch((error) => console.error("Error loading gallery:", error));
  }
});
   
