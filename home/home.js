window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("background-music");
  const toggleBtn = document.getElementById("music-toggle");
  const naamPlaceholder = document.getElementById("naam-placeholder");
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const heilige1 = document.querySelector(".heilige1-container");
  const klinkel = document.getElementById("heilige-sound");

  // --- Naam ophalen en tonen ---
  const naam = localStorage.getItem("gebruikersnaam");
  if (naamPlaceholder) {
    naamPlaceholder.textContent = naam ? naam : "gast";
  }

  // --- Hamburger menu toggle ---
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // --- Muziek automatisch starten en toggle knop ---
  if (audio && toggleBtn) {
    // Probeer automatisch afspelen
    audio.play().then(() => {
      toggleBtn.textContent = "🎵"; // muziek speelt
      console.log("🎶 Muziek automatisch gestart");
    }).catch(err => {
      toggleBtn.textContent = "🔇"; // afspelen geblokkeerd
      console.warn("🎧 Automatisch afspelen geblokkeerd:", err);
    });

    // Toggle knop functionaliteit
    toggleBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play().then(() => {
          toggleBtn.textContent = "🎵";
        }).catch(err => {
          console.warn("🎧 Afspelen na klik mislukt:", err);
        });
      } else {
        audio.pause();
        toggleBtn.textContent = "🔇";
      }
    });
  }

  // --- Heilige animatie met klinkel geluid ---
  function startAnimatie() {
    if (!heilige1) return;

    // Reset animatie en geluid
    heilige1.classList.remove("animate-slide");
    heilige1.style.opacity = "0";

    if (klinkel) {
      klinkel.pause();
      klinkel.currentTime = 0;
      klinkel.loop = true;
      klinkel.volume = 1;
      klinkel.muted = true; // standaard muted, tot gebruikersinteractie
    }

    // Kleine delay voor animatie herstart
    setTimeout(() => {
      heilige1.classList.add("animate-slide");
      heilige1.style.opacity = "1";

      if (klinkel) {
        klinkel.muted = false; // zet geluid aan bij animatie start
        klinkel.play().catch(err => {
          console.warn("🔇 Geluid kon niet automatisch afgespeeld worden:", err);
        });

        // Stop geluid na 30 sec (loopt zolang animatie duurt)
        setTimeout(() => {
          klinkel.pause();
          klinkel.currentTime = 0;
        }, 23000);
      }
    }, 100);
  }

  // Start animatie + geluid direct en daarna elke 45 seconden
  startAnimatie();
  setInterval(startAnimatie, 45000);

  // --- Browser vereist gebruikersinteractie voor geluid ---
  // Hier maak je zeker dat geluid mag spelen na 1x klik ergens op pagina
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
    document.body.removeEventListener('click', enableAudioOnUserGesture);
  }
  document.body.addEventListener('click', enableAudioOnUserGesture);
});
