// Mostrar/ocultar menú hamburguesa
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('show');
});

// Submenús móviles
const submenus = document.querySelectorAll('.submenu > a');

submenus.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const parent = item.parentElement;
    parent.classList.toggle('open');
  });
});
