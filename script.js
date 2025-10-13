/* ===========================
   Slideshow (Home Page)
=========================== */
let slideIndex = 0;

function showSlides() {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide, i) => {
    slide.style.display = i === slideIndex ? "block" : "none";
  });
  slideIndex = (slideIndex + 1) % slides.length;
  setTimeout(showSlides, 5000); // Change every 5 seconds
}

// Start slideshow automatically if on home page
window.addEventListener("load", () => {
  if (document.querySelector(".slideshow")) {
    showSlides();
  }
});

/* ===========================
   Gallery Page
=========================== */
async function loadGallery() {
  const galleryContainer = document.getElementById("galleryContainer");
  if (!galleryContainer) return;

  try {
    const response = await fetch("gallery.json");
    const data = await response.json();

    data.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("gallery-item");

      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.alt;

      div.appendChild(img);
      galleryContainer.appendChild(div);
    });

    // Add lightbox
    setupLightbox();
  } catch (err) {
    console.error("Error loading gallery:", err);
  }
}

function setupLightbox() {
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  document.body.appendChild(lightbox);

  const img = document.createElement("img");
  lightbox.appendChild(img);

  document.querySelectorAll(".gallery-item img").forEach(thumbnail => {
    thumbnail.addEventListener("click", () => {
      img.src = thumbnail.src;
      lightbox.style.display = "flex";
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
}

window.addEventListener("DOMContentLoaded", loadGallery);
