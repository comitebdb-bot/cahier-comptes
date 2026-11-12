// Configuration de l'application « Cahier des comptes ».
// Tant que apiKey est vide, l'application fonctionne en mode démonstration
// (données enregistrées uniquement sur l'appareil, sans compte).
//
// Collez ici les valeurs fournies par la console Firebase :
// Paramètres du projet → Général → Vos applications → Application Web → « Configuration ».
// Ces valeurs ne sont pas secrètes : la protection des données repose sur les règles
// de sécurité Firestore (fichier firestore.rules).

window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyDRH2t3rgbXdQupZbX4nsfJihtwRKMh25Y",
  authDomain: "cahier-comptes-bastide.firebaseapp.com",
  projectId: "cahier-comptes-bastide",
  storageBucket: "cahier-comptes-bastide.firebasestorage.app",
  messagingSenderId: "923767180868",
  appId: "1:923767180868:web:518cf9d029d18c5060b611"
};

// Nom affiché sous le titre.
window.NOM_ASSOCIATION = "Comité des Fêtes de La Bastide-de-Bousignac";
