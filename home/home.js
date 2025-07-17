window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("background-music");
  const toggleBtn = document.getElementById("music-toggle");
  const naamPlaceholder = document.getElementById("naam-placeholder");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  const heilige1 = document.querySelector(".heilige1-container");
  const heilige2 = document.querySelector(".heilige2-container");

  const klinkel = document.getElementById("heilige-sound");

  // --- Naam tonen ---
  const naam = localStorage.getItem("gebruikersnaam");
  if (naamPlaceholder) {
    naamPlaceholder.textContent = naam || "gast";
  }

  // --- Hamburger toggle ---
  hamburger?.addEventListener("click", () => {
    navLinks?.classList.toggle("show");
  });

  // --- Muziekbeheer ---
  if (audio && toggleBtn) {
    audio.play().then(() => {
      toggleBtn.textContent = "🎵";
    }).catch(() => {
      toggleBtn.textContent = "🔇";
    });

    toggleBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play().then(() => toggleBtn.textContent = "🎵");
      } else {
        audio.pause();
        toggleBtn.textContent = "🔇";
      }
    });
  }

  // --- Heiligen animatie om de beurt ---
  let beurt = 1;

  function resetEnSpeelGeluid() {
    if (!klinkel) return;
    klinkel.pause();
    klinkel.currentTime = 0;
    klinkel.loop = true;
    klinkel.muted = false;
    klinkel.volume = 1;
    klinkel.play().catch(err => console.warn("🔇 Geluid niet afgespeeld:", err));

    // Stop geluid na 28 sec
    setTimeout(() => {
      klinkel.pause();
      klinkel.currentTime = 0;
    }, 28000);
  }

  function startHeiligeAnimatie() {
    if (beurt === 1 && heilige1) {
      heilige1.classList.remove("animate-slide-heilige1");
      void heilige1.offsetWidth; // Force reflow om animatie te herstarten
      heilige1.classList.add("animate-slide-heilige1");
      resetEnSpeelGeluid();
      beurt = 2;
    } else if (beurt === 2 && heilige2) {
      heilige2.classList.remove("animate-slide-heilige2");
      void heilige2.offsetWidth;
      heilige2.classList.add("animate-slide-heilige2");
      resetEnSpeelGeluid();
      beurt = 1;
    }
  }

  // Start direct en herhaal elke 45 sec
  startHeiligeAnimatie();
  setInterval(startHeiligeAnimatie, 45000);

  // --- Audio toestaan na gebruikersactie ---
  function enableAudioOnUserGesture() {
    if (klinkel) {
      klinkel.muted = false;
      klinkel.volume = 0.7;
      klinkel.play().catch(() => {});
    }
    if (audio) {
      audio.muted = false;
      audio.play().catch(() => {});
    }
    document.body.removeEventListener("click", enableAudioOnUserGesture);
  }

  document.body.addEventListener("click", enableAudioOnUserGesture);
});
