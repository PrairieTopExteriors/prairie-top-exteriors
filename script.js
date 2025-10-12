// ====== GALLERY LOADER ======
document.addEventListener("DOMContentLoaded", () => {
  const galleryContainer = document.getElementById("galleryContainer");

  if (galleryContainer) {
    fetch("gallery.json")
      .then(response => response.json())
      .then(data => {
        data.groups.forEach(group => {
          const title = document.createElement("h3");
          title.textContent = group.title;
          galleryContainer.appendChild(title);

          group.images.forEach(image => {
            const div = document.createElement("div");
            div.className = "gallery-item";
            div.innerHTML = `
              <img src="gallery/${image.src}" alt="${image.desc}">
              <div class="gallery-desc">${image.desc}</div>
            `;
            div.addEventListener("click", () => openLightbox(`gallery/${image.src}`));
            galleryContainer.appendChild(div);
          });
        });
      });
  }

  // ====== LIGHTBOX ======
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.innerHTML = "<img src='' alt=''>";
  document.body.appendChild(lightbox);

  lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  window.openLightbox = function (src) {
    lightbox.querySelector("img").src = src;
    lightbox.style.display = "flex";
  };

  // ====== SLIDESHOW ======
  let slideIndex = 0;
  const slides = document.querySelectorAll(".slide");

  function showSlides() {
    slides.forEach(slide => (slide.style.display = "none"));
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 4000);
  }

  if (slides.length > 0) showSlides();
});
