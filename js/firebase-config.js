// js/firebase-config.js

function initializeFirebase() {
  if (typeof firebase === "undefined") {
    console.error("❌ Firebase kütüphanesi yüklenemedi!");
    return false;
  }

  const firebaseConfig = {
    apiKey: "AIzaSyD1UKnJ7BuN3EkYTQi4T4Il5ctLDGwDY0A",
    authDomain: "vetasistan-6fdeb.firebaseapp.com",
    projectId: "vetasistan-6fdeb",
    storageBucket: "vetasistan-6fdeb.firebasestorage.app",
    messagingSenderId: "137402648793",
    appId: "1:137402648793:web:0826d5819755a23f77d6c8",
    measurementId: "G-MV4Q4KKH1X"
  };

  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    window.auth = firebase.auth();
    window.db = firebase.firestore();
    window.storage = firebase.storage();

    console.log("✅ Firebase başarıyla başlatıldı!");
    return true;
  } catch (error) {
    console.error("Firebase başlatma hatası:", error);
    return false;
  }
}

// HEMEN BAŞLAT (DOMContentLoaded BEKLEME)
initializeFirebase();