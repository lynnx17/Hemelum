window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("background-music");
  const toggleBtn = document.getElementById("music-toggle");
  const naamPlaceholder = document.getElementById("naam-placeholder");
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  // Naam tonen
  const naam = localStorage.getItem("gebruikersnaam");
  if (naamPlaceholder) {
    naamPlaceholder.textContent = naam ? naam : "gast";
  }

  // Hamburger menu toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  if (audio && toggleBtn) {
    // Probeer muziek automatisch te starten
    audio.play().then(() => {
      toggleBtn.textContent = "🎵"; // muziek speelt
      console.log("🎶 Muziek automatisch gestart");
    }).catch(err => {
      toggleBtn.textContent = "🔇"; // muziek niet gestart, wacht op klik
      console.warn("🎧 Automatisch afspelen geblokkeerd:", err);
    });

    // Play/pauze knop
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
});
