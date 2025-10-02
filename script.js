// ----------------- GALLERY -----------------
async function loadGallery() {
  try {
    const res = await fetch("gallery.json");
    const data = await res.json();

    // Handles if JSON root is array or { projects: [...] }
    const projects = Array.isArray(data) ? data : data.projects;

    const container = document.getElementById("galleryContainer");
    if (!container) return;

    projects.forEach(project => {
      const section = document.createElement("section");
      section.className = "gallery-project";

      const title = document.createElement("h3");
      title.textContent = project.title;

      const desc = document.createElement("p");
      desc.textContent = project.description;

      const grid = document.createElement("div");
      grid.className = "gallery-grid";

      project.images.forEach(imgData => {
        let imgSrc = imgData;
        let imgAlt = "";
        let caption = "";

        if (typeof imgData === "object") {
          imgSrc = imgData.src;
          imgAlt = imgData.alt || "";
          caption = imgData.caption || "";
        }

        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = imgAlt;
        img.className = "gallery-img";

        img.addEventListener("click", () => openModal(imgSrc, caption || project.description));
        grid.appendChild(img);
      });

      section.appendChild(title);
      section.appendChild(desc);
      section.appendChild(grid);
      container.appendChild(section);
    });
  } catch (err) {
    console.error("Failed to load gallery:", err);
  }
}

function openModal(src, caption) {
  const overlay = document.createElement("div");
  overlay.className = "modal";
  overlay.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <img src="${src}" alt="${caption}" />
      <p>${caption}</p>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector(".close").onclick = () => overlay.remove();
  overlay.onclick = (e) => {
    if (e.target === overlay) overlay.remove();
  };
}

document.addEventListener("DOMContentLoaded", loadGallery);

// ----------------- BEFORE/AFTER SLIDER -----------------
function startBeforeAfter() {
  const container = document.querySelector(".before-after");
  if (!container) return;

  const before = container.querySelector(".before");
  const after = container.querySelector(".after");

  let showingBefore = true;

  setInterval(() => {
    if (showingBefore) {
      before.style.opacity = "0";
      after.style.opacity = "1";
    } else {
      before.style.opacity = "1";
      after.style.opacity = "0";
    }
    showingBefore = !showingBefore;
  }, 4000); // every 4s switch
}

document.addEventListener("DOMContentLoaded", startBeforeAfter);
