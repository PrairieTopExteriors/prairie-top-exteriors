document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("slideshowContainer");

  // Images from gallery folder
  const galleryImages = [
    "gallery/image1.jpg",
    "gallery/image2.jpg",
    "gallery/image3.jpg",
    "gallery/image4.jpg",
    "gallery/image5.jpg",
    "gallery/image6.jpg",
    "gallery/image7.jpg",
    "gallery/image8.jpg"
  ];

  // Shuffle and select 5 random images
  const shuffled = galleryImages.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 5);

  // Add them to the slideshow
  selected.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("slide");
    if (index === 0) img.classList.add("active");
    container.appendChild(img);
  });

  // Slide logic
  const slides = container.querySelectorAll(".slide");
  let current = 0;

  function showNextSlide() {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }

  // Change every 5 seconds
  setInterval(showNextSlide, 5000);
});
