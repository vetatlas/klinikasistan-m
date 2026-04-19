// js/auth.js - TAMAMEN DÜZELTİLMİŞ VERSİYON

// Önce auth'u güvenli şekilde al
const auth = (() => {
  if (window.auth) return window.auth;
  if (typeof firebase !== "undefined" && firebase.auth) {
    return firebase.auth();
  }
  console.error("❌ Firebase auth kullanılamıyor!");
  return null;
})();

let isLoggingOut = false;

// ====================== ÇIKIŞ YAP ======================
function logout() {
  if (!auth) {
    alert("Oturum servisi şu anda kullanılamıyor.");
    return;
  }

  if (isLoggingOut) return;
  isLoggingOut = true;

  console.log("🚪 Çıkış başlatıldı...");

  const msg = document.createElement("div");
  msg.textContent = "Çıkış yapılıyor...";
  msg.style.cssText = "position:fixed;top:30px;left:50%;transform:translateX(-50%);background:#1f2937;color:white;padding:16px 32px;border-radius:9999px;z-index:99999;box-shadow:0 10px 15px rgba(0,0,0,0.5);";
  document.body.appendChild(msg);

  auth.signOut()
    .then(() => {
      console.log("✅ Çıkış BAŞARILI");
      msg.textContent = "Çıkış yapıldı ✓";
      msg.style.background = "#16a34a";

      setTimeout(() => {
        window.location.replace("index.html");
      }, 900);
    })
    .catch((error) => {
      console.error("Çıkış hatası:", error);
      msg.textContent = "Hata oluştu";
      msg.style.background = "#ef4444";
      setTimeout(() => msg.remove(), 2500);
      isLoggingOut = false;
    });
}

// ====================== GİRİŞ ======================
function login() {
  if (!auth) return;

  const email = document.getElementById('email')?.value.trim();
  const password = document.getElementById('password')?.value.trim();
  const message = document.getElementById('message');

  if (!email || !password) {
    if (message) message.textContent = "E-posta ve şifre giriniz!";
    return;
  }

  if (message) message.textContent = "Giriş yapılıyor...";

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      if (message) message.textContent = "Giriş başarılı!";
      setTimeout(() => {
        window.location.replace("dashboard.html");
      }, 700);
    })
    .catch(() => {
      if (message) message.textContent = "E-posta veya şifre hatalı!";
    });
}

// ====================== KAYIT ======================
function register() {
  if (!auth) return;

  const email = document.getElementById('email')?.value.trim();
  const password = document.getElementById('password')?.value.trim();
  const message = document.getElementById('message');

  if (!email || !password) {
    if (message) message.textContent = "Tüm alanları doldurun!";
    return;
  }
  if (password.length < 6) {
    if (message) message.textContent = "Şifre en az 6 karakter olmalı!";
    return;
  }

  if (message) message.textContent = "Hesap oluşturuluyor...";

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      if (message) message.textContent = "Hesap oluşturuldu! Giriş yapılıyor...";
      setTimeout(() => login(), 1000);
    })
    .catch((error) => {
      if (message) message.textContent = "Kayıt hatası: " + error.message;
    });
}

// ============ GLOBAL YAP ============
window.logout = logout;
window.login = login;
window.register = register;