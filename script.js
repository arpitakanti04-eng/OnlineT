const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-img');
const closeButton = document.querySelector('.lightbox-close');
const prevButton = document.querySelector('.lightbox-nav.prev');
const nextButton = document.querySelector('.lightbox-nav.next');

let currentFilter = 'all';
let visibleIndexes = [];
let currentImageIndex = 0;

function updateGallery() {
  visibleIndexes = galleryItems
    .filter((item) => currentFilter === 'all' || item.dataset.category === currentFilter)
    .map((item) => Number(item.dataset.index));

  galleryItems.forEach((item) => {
    const matches = currentFilter === 'all' || item.dataset.category === currentFilter;
    item.style.display = matches ? 'block' : 'none';
  });

  if (!visibleIndexes.length) {
    closeLightbox();
    return;
  }

  if (currentImageIndex >= visibleIndexes.length) {
    currentImageIndex = 0;
  }
}

function openLightbox(index) {
  const selectedIndex = Number(index);
  const visiblePosition = visibleIndexes.indexOf(selectedIndex);

  if (visiblePosition === -1) {
    return;
  }

  currentImageIndex = visiblePosition;
  const selectedItem = galleryItems.find((item) => Number(item.dataset.index) === selectedIndex);
  lightboxImage.src = selectedItem.querySelector('img').src;
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
}

function changeImage(step) {
  if (!visibleIndexes.length) {
    return;
  }

  currentImageIndex = (currentImageIndex + step + visibleIndexes.length) % visibleIndexes.length;
  const nextIndex = visibleIndexes[currentImageIndex];
  const selectedItem = galleryItems.find((item) => Number(item.dataset.index) === nextIndex);
  lightboxImage.src = selectedItem.querySelector('img').src;
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    currentFilter = button.dataset.filter;
    currentImageIndex = 0;
    updateGallery();
  });
});

galleryItems.forEach((item) => {
  item.addEventListener('click', () => openLightbox(item.dataset.index));
});

closeButton.addEventListener('click', closeLightbox);
prevButton.addEventListener('click', () => changeImage(-1));
nextButton.addEventListener('click', () => changeImage(1));

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('active')) {
    return;
  }

  if (event.key === 'Escape') {
    closeLightbox();
  } else if (event.key === 'ArrowRight') {
    changeImage(1);
  } else if (event.key === 'ArrowLeft') {
    changeImage(-1);
  }
});

updateGallery();