document.addEventListener("DOMContentLoaded", () => {
  const galleryContainer = document.getElementById("galleryContainer");

  if (galleryContainer) {
    fetch("gallery.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to load gallery.json");
        }
        return response.json();
      })
      .then(data => {
        data.forEach(project => {
          const projectDiv = document.createElement("div");
          projectDiv.classList.add("project");

          const title = document.createElement("h3");
          title.textContent = project.job;

          const description = document.createElement("p");
          description.textContent = project.description;

          const imagesDiv = document.createElement("div");
          imagesDiv.classList.add("gallery-images");

          project.images.forEach(imgPath => {
            const img = document.createElement("img");
            img.src = imgPath;
            img.alt = project.job;
            imagesDiv.appendChild(img);
          });

          projectDiv.appendChild(title);
          projectDiv.appendChild(description);
          projectDiv.appendChild(imagesDiv);

          galleryContainer.appendChild(projectDiv);
        });
      })
      .catch(err => {
        galleryContainer.textContent = "Failed to load gallery.";
        console.error(err);
      });
  }
});
