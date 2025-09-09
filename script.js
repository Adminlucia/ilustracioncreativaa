document.querySelectorAll('.submenu').forEach(item => {
    let timeout;

    const openMenu = () => {
        clearTimeout(timeout);
        item.classList.add('open');
    };

    const closeMenu = () => {
        timeout = setTimeout(() => {
            item.classList.remove('open');
        }, 300);
    }; 

    // Abrir cuando el cursor entra al li padre
    item.addEventListener('mouseenter', openMenu);

    // Cerrar cuando el cursor sale del li padre
    item.addEventListener('mouseleave', closeMenu);

    // Abrir mientras el cursor está sobre el sub-submenú
    const subMenu = item.querySelector('.dropdown-submenu');
    if(subMenu){
        subMenu.addEventListener('mouseenter', openMenu);
        subMenu.addEventListener('mouseleave', closeMenu);
    }
});


/*CARRUSEL*/

const slides = document.querySelectorAll('.carousel-slide');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
  });
  slides[index].classList.add('active');
}


// Inicial
showSlide(current);

// Botones
prev.addEventListener('click', () => {
  current = (current === 0) ? slides.length - 1 : current - 1;
  showSlide(current);
});

next.addEventListener('click', () => {
  current = (current === slides.length - 1) ? 0 : current + 1;
  showSlide(current);
});

// Cambio automático cada 5 segundos
setInterval(() => {
  current = (current === slides.length - 1) ? 0 : current + 1;
  showSlide(current);
}, 5000);


/*reseñas*/
// contacto.js
import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const form = document.getElementById('review-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form['name'].value.trim();
    const review = form['review'].value.trim();

    if(name && review){
        try {
            await addDoc(collection(db, "pending_reviews"), {
                name,
                review,
                createdAt: serverTimestamp(),
                approved: false
            });
            alert("¡Gracias por tu reseña! Será revisada antes de publicarse.");
            form.reset();
        } catch (err) {
            console.error("Error al enviar reseña:", err);
            alert("Hubo un error, intenta de nuevo.");
        }
    } else {
        alert("Por favor completa todos los campos.");
    }
});

// reviews.js
import { db } from './firebase-config.js';
import { collection, getDocs, query, where, orderBy } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const reviewsContainer = document.getElementById('reviews-container');

async function loadReviews() {
    const q = query(
        collection(db, "public_reviews"),
        where("approved", "==", true),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    reviewsContainer.innerHTML = "";

    snapshot.forEach(doc => {
        const data = doc.data();
        const card = document.createElement("div");
        card.className = "review-card";
        card.innerHTML = `
            <h4>${data.name}</h4>
            <p>${data.review}</p>
        `;
        reviewsContainer.appendChild(card);
    });
}

loadReviews();





