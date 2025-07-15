window.addEventListener("DOMContentLoaded", () => {
  // 🔊 Muziek starten
  const audio = document.getElementById("background-music");
  const toggleBtn = document.getElementById("music-toggle");

  if (audio) {
    audio.play().then(() => {
      console.log("🎶 Muziek speelt op home");
    }).catch(err => {
      console.warn("🎧 Kon muziek niet automatisch afspelen:", err);
    });

    // 🎵 Muziekknop functionaliteit
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        if (audio.paused) {
          audio.play();
          toggleBtn.textContent = "🎵"; // Speelt
        } else {
          audio.pause();
          toggleBtn.textContent = "🔇"; // Gepauzeerd
        }
      });

      // Zet juiste status bij laden
      toggleBtn.textContent = audio.paused ? "🔇" : "🎵";
    }
  }

  // 🍔 Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // 🧑 Gebruikersnaam ophalen
  const naam = localStorage.getItem("gebruikersnaam");
  const naamPlaceholder = document.getElementById("naam-placeholder");

  if (naamPlaceholder) {
    naamPlaceholder.textContent = naam ? naam : "gast";
  }
});
