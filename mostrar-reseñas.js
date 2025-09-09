import { db } from './firebase-config.js';
import { collection, getDocs, query, where, orderBy } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const reviewsContainer = document.getElementById('reviews-container');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentIndex = 0; // índice inicial
let reviews = [];     // array para almacenar las reseñas

// Cargar reseñas desde Firebase
async function cargarReseñas() {
  try {
    const q = query(
      collection(db, "pending_reviews"),
      where("approved", "==", true),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    reviewsContainer.innerHTML = "";
    reviews = [];

    if (snapshot.empty) {
      reviewsContainer.innerHTML = "<p>No hay reseñas aprobadas aún.</p>";
      return;
    }

    snapshot.forEach(doc => {
      const data = doc.data();
      let stars = '';
      for (let i = 1; i <= 5; i++) {
        stars += i <= data.rating ? '★' : '☆';
      }

      const reviewHTML = document.createElement('div');
      reviewHTML.classList.add('review-card');
      reviewHTML.innerHTML = `
        <h3>${data.name}</h3>
        <p>"${data.review}"</p>
        <div class="stars">${stars}</div>
      `;
      reviews.push(reviewHTML);
    });

    mostrarReseñas(); // mostrar las primeras 3 reseñas al cargar

  } catch (error) {
    console.error("Error al cargar reseñas:", error);
    reviewsContainer.innerHTML = "<p>Error al cargar reseñas.</p>";
  }
}

// Función para mostrar 3 reseñas a la vez
function mostrarReseñas() {
  reviewsContainer.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const index = (currentIndex + i) % reviews.length; // ciclo infinito
    reviewsContainer.appendChild(reviews[index]);
  }
}

// Botón siguiente
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 3) % reviews.length;
  mostrarReseñas();
});

// Botón anterior
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 3 + reviews.length) % reviews.length;
  mostrarReseñas();
});

// Llamar a la función para cargar reseñas al iniciar
cargarReseñas();
