// -------- GALLERY JSON LOADER --------
async function loadGallery() {
  try {
    const res = await fetch("gallery.json");
    const projects = await res.json();
    const container = document.getElementById("galleryContainer");
    container.innerHTML = "";

    projects.forEach(project => {
      const group = document.createElement("div");
      group.className = "gallery-group";
      group.innerHTML = `<h3>${project.title}</h3><p>${project.description}</p>`;

      const grid = document.createElement("div");
      grid.className = "gallery-grid";

      project.images.forEach(img => {
        const imageEl = document.createElement("img");
        imageEl.src = img.src;
        imageEl.alt = img.alt || project.title;
        imageEl.className = "gallery-img";

        // Click to enlarge modal
        imageEl.onclick = () => {
          const overlay = document.createElement("div");
          overlay.className = "modal";
          overlay.innerHTML = `
            <div class="modal-content">
              <span class="close">&times;</span>
              <img src="${img.src}" alt="${img.alt || project.title}" />
              <p>${img.caption || ""}</p>
            </div>
          `;
          document.body.appendChild(overlay);
          overlay.querySelector(".close").onclick = () => overlay.remove();
          overlay.onclick = (e) => {
            if (e.target === overlay) overlay.remove();
          };
        };

        grid.appendChild(imageEl);
      });

      group.appendChild(grid);
      container.appendChild(group);
    });
  } catch (err) {
    console.error("Gallery load error:", err);
  }
}

// Run only on gallery page
if (document.getElementById("galleryContainer")) {
  loadGallery();
}

// -------- BEFORE / AFTER SLIDER --------
document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".ba-slider");
  sliders.forEach(slider => {
    const handle = slider.querySelector(".handle");
    const resize = slider.querySelector(".resize");

    function slideIt(x) {
      let shift = Math.max(0, Math.min(x, slider.offsetWidth));
      resize.style.width = shift + "px";
      handle.style.left = shift - (handle.offsetWidth / 2) + "px";
    }

    function onMouseMove(e) {
      slideIt(e.pageX - slider.offsetLeft);
    }

    slider.addEventListener("mousemove", onMouseMove);
    slider.addEventListener("touchmove", (e) => {
      slideIt(e.touches[0].pageX - slider.offsetLeft);
    }
document.querySelectorAll('.ba-slider').forEach(slider => {
  let handle = slider.querySelector('.handle');
  let resize = slider.querySelector('.resize');
  let direction = 1; // 1 = right, -1 = left

  function autoSlide() {
    let rect = slider.getBoundingClientRect();
    let target = direction === 1 ? rect.width : 0;

    resize.style.width = target + "px";
    handle.style.left = target + "px";

    direction *= -1; // flip direction

    setTimeout(autoSlide, 4000); // wait before moving again
  }

  // kick it off after load
  setTimeout(autoSlide, 1000);
});                            
  });
});
