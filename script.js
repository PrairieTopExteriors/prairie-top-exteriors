/* ===========================
   Homepage Slideshow (auto from gallery.json)
=========================== */
async function initSlideshow() {
  const slideshowContainer = document.querySelector(".slideshow");
  if (!slideshowContainer) return;

  try {
    const response = await fetch("gallery.json");
    const data = await response.json();
    const slides = data.slice(0, 8); // First 8 images

    slides.forEach((item, i) => {
      const slide = document.createElement("div");
      slide.classList.add("slide");
      if (i === 0) slide.classList.add("active-slide");
      slide.innerHTML = `<img src="${item.src}" alt="${item.alt}">`;
      slideshowContainer.appendChild(slide);
    });

    startSlideshow();
  } catch (err) {
    console.error("Error loading slideshow:", err);
  }
}

let slideIndex = 0;

function startSlideshow() {
  const slides = document.querySelectorAll(".slide");
  if (!slides.length) return;

  setInterval(() => {
    slides.forEach((slide, i) => {
      slide.style.display = i === slideIndex ? "block" : "none";
    });
    slideIndex = (slideIndex + 1) % slides.length;
  }, 5000); // 5 seconds per slide
}

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

    setupLightbox();
  } catch (err) {
    console.error("Error loading gallery:", err);
  }
}

/* ===========================
   Lightbox
=========================== */
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

/* ===========================
   Page Initialization
=========================== */
window.addEventListener("DOMContentLoaded", () => {
  initSlideshow();
  loadGallery();
});
