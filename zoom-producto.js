const mainImage = document.getElementById('main-image');
const lens = document.getElementById('zoom-lens');
const thumbs = document.querySelectorAll('.thumb');

let zoomLevel = 3; // Zoom inicial
const minZoom = 1.5;
const maxZoom = 5;

// Cambiar imagen principal y lupa
function setZoomImage(src) {
  mainImage.src = src;
  lens.style.backgroundImage = `url('${src}')`;
}

thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    setZoomImage(thumb.src);
  });
});

// Inicialización
setZoomImage(mainImage.src);

// Mostrar / Ocultar lupa
mainImage.addEventListener('mouseenter', () => {
  lens.style.visibility = 'visible';
});

mainImage.addEventListener('mouseleave', () => {
  lens.style.visibility = 'hidden';
});

// Movimiento del lente
mainImage.addEventListener('mousemove', moveLens);

function moveLens(e) {
  const rect = mainImage.getBoundingClientRect();
  const lensSize = lens.offsetWidth / 2;
  let x = e.clientX - rect.left - lensSize;
  let y = e.clientY - rect.top - lensSize;

  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x > rect.width - lens.offsetWidth) x = rect.width - lens.offsetWidth;
  if (y > rect.height - lens.offsetHeight) y = rect.height - lens.offsetHeight;

  lens.style.left = `${x}px`;
  lens.style.top = `${y}px`;

  // Ajustar tamaño y posición con zoomLevel
  lens.style.backgroundSize = `${rect.width * zoomLevel}px ${rect.height * zoomLevel}px`;
  lens.style.backgroundPosition = `-${x * zoomLevel}px -${y * zoomLevel}px`;
}

// ✅ NUEVO: Zoom con rueda del ratón
mainImage.addEventListener('wheel', (e) => {
  e.preventDefault();

  if (e.deltaY < 0) {
    zoomLevel = Math.min(zoomLevel + 0.2, maxZoom);
  } else {
    zoomLevel = Math.max(zoomLevel - 0.2, minZoom);
  }

  // Actualizamos la lupa con el nuevo zoom
  const rect = mainImage.getBoundingClientRect();
  lens.style.backgroundSize = `${rect.width * zoomLevel}px ${rect.height * zoomLevel}px`;
});
