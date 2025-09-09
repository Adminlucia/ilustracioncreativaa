// Importar SDKs de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Tu configuración
const firebaseConfig = {
  apiKey: "AIzaSyAJQbiywU6kMF7TlkbodQ3QkzfSgqFZ7rE",
  authDomain: "ilustracioncreativa-7fb70.firebaseapp.com",
  projectId: "ilustracioncreativa-7fb70",
  storageBucket: "ilustracioncreativa-7fb70.firebasestorage.app",
  messagingSenderId: "565471051263",
  appId: "1:565471051263:web:3d5b02f8d431711ae6fbca",
  measurementId: "G-0JFVNHGWB3"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportar para usar en otros archivos
export { db };



