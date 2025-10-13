// --- GALLERY ---
fetch('gallery.json')
  .then(res => res.json())
  .then(data => {
    const gallery = document.getElementById('galleryContainer');
    if (!gallery) return;
    data.groups.forEach(group => {
      const groupTitle = document.createElement('h3');
      groupTitle.textContent = group.name;
      gallery.appendChild(groupTitle);

      const groupGrid = document.createElement('div');
      groupGrid.className = 'gallery-grid';

      group.images.forEach(img => {
        const imgEl = document.createElement('img');
        imgEl.src = `gallery/${img.file}`;
        imgEl.alt = img.desc;
        imgEl.className = 'gallery-img';
        imgEl.addEventListener('click', () => openModal(imgEl.src, img.desc));
        groupGrid.appendChild(imgEl);
      });
      gallery.appendChild(groupGrid);
    });
  });

// --- MODAL ---
function openModal(src, desc) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <img src="${src}" alt="">
      <p>${desc}</p>
    </div>`;
  document.body.appendChild(modal);
  modal.querySelector('.close').onclick = () => modal.remove();
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
}

// --- SLIDESHOW ---
let slideIndex = 0;
function showSlides() {
  const slides = document.getElementsByClassName("slides");
  for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000); // 5 seconds
}
document.addEventListener('DOMContentLoaded', showSlides);
