import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Función para mostrar notificación en un div específico
function showSuccessMessage(msg, elementId) {
    const successDiv = document.getElementById(elementId);
    if (!successDiv) return;
    successDiv.textContent = msg;
    successDiv.style.display = "block";
    successDiv.classList.add("show");

    setTimeout(() => {
        successDiv.classList.remove("show");
        setTimeout(() => successDiv.style.display = "none", 500);
    }, 3000);
}

// ------------------------------
// FORMULARIO DE SOLICITUDES
// ------------------------------
const solicitudForm = document.getElementById('solicitudForm');

if (solicitudForm) {
  solicitudForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = solicitudForm.email.value.trim();
    const servicio = solicitudForm.servicio.value;
    const fecha = solicitudForm.fecha.value;
    const detalles = solicitudForm.detalles.value.trim();

    if (!email || !servicio || !fecha) {
      showSuccessMessage("Por favor completa todos los campos requeridos.", "solicitudMessage");
      return;
    }

    try {
      await addDoc(collection(db, "solicitudes"), {
        email,
        servicio,
        fecha,
        detalles,
        createdAt: serverTimestamp()
      });

      showSuccessMessage("¡Solicitud enviada con éxito!", "solicitudMessage");
      solicitudForm.reset();

    } catch (err) {
      console.error(err);
      showSuccessMessage("Error al enviar la solicitud. Intenta de nuevo.", "solicitudMessage");
    }
  });
}

// ------------------------------
// FORMULARIO DE RESEÑAS CON ESTRELLAS
// ------------------------------
const reviewForm = document.getElementById('review-form');

if (reviewForm) {
  reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = reviewForm.name.value.trim();
    const review = reviewForm.review.value.trim();
    const rating = reviewForm.rating ? reviewForm.rating.value : null;

    if (!name || !review || !rating) {
      showSuccessMessage("Por favor completa todos los campos, incluida la puntuación.", "reviewMessage");
      return;
    }

    try {
      await addDoc(collection(db, "pending_reviews"), {
        name,
        review,
        rating: parseInt(rating),
        approved: false,
        createdAt: serverTimestamp()
      });

      showSuccessMessage("¡Gracias! Tu reseña será revisada pronto.", "reviewMessage");
      reviewForm.reset();

    } catch (err) {
      console.error(err);
      showSuccessMessage("Error al enviar la reseña. Intenta de nuevo.", "reviewMessage");
    }
  });
}
