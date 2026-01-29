window.addEventListener("DOMContentLoaded", () => {
  /* =======================
     ELEMENTEN OPHALEN
  ======================== */
  const audio = document.getElementById("background-music");
  const toggleBtn = document.getElementById("music-toggle");
  const naamPlaceholder = document.getElementById("naam-placeholder");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  const heilige1 = document.querySelector(".heilige1-container");
  const heilige2 = document.querySelector(".heilige2-container");
  const klinkel = document.getElementById("heilige-sound");

  const overlay = document.getElementById("overlay");
  const overlayBody = document.getElementById("overlay-body");
  const overlayClose = document.getElementById("overlay-close");

  const bord = document.getElementById("bord-knop");
  const deur = document.getElementById("deur-knop");
  const raam = document.getElementById("raam-knop");
  const heilige1Knop = document.getElementById("heilige1-knop");
  const heilige2Knop = document.getElementById("heilige2-knop");

  const contactLink = document.getElementById("contact-link");
  const aboutLink = document.getElementById("about-link");

  /* =======================
     NAAM TONEN
  ======================== */
  const naam = localStorage.getItem("gebruikersnaam");
  if (naamPlaceholder) naamPlaceholder.textContent = naam || "gast";

  /* =======================
     HAMBURGER MENU
  ======================== */
  hamburger?.addEventListener("click", () => navLinks?.classList.toggle("show"));

  /* =======================
     MUZIEKBEHEER
  ======================== */
  if (audio && toggleBtn) {
    audio.play().then(() => toggleBtn.textContent = "🎵").catch(() => toggleBtn.textContent = "🔇");

    toggleBtn.addEventListener("click", () => {
      if (audio.paused) audio.play().then(() => toggleBtn.textContent = "🎵");
      else {
        audio.pause();
        toggleBtn.textContent = "🔇";
      }
    });
  }

  /* =======================
     HEILIGEN ANIMATIE
  ======================== */
  let beurt = 1;

  function resetEnSpeelGeluid() {
    if (!klinkel) return;
    klinkel.pause();
    klinkel.currentTime = 0;
    klinkel.loop = true;
    klinkel.muted = false;
    klinkel.volume = 1;
    klinkel.play().catch(() => {});
    setTimeout(() => { klinkel.pause(); klinkel.currentTime = 0; }, 28000);
  }

  function startHeiligeAnimatie() {
    if (beurt === 1 && heilige1) {
      heilige1.classList.remove("animate-slide-heilige1");
      void heilige1.offsetWidth;
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

  startHeiligeAnimatie();
  setInterval(startHeiligeAnimatie, 45000);

  /* =======================
     AUDIO NA USER GESTURE
  ======================== */
  function enableAudioOnUserGesture() {
    if (klinkel) { klinkel.muted = false; klinkel.volume = 0.7; klinkel.play().catch(() => {}); }
    if (audio) { audio.muted = false; audio.play().catch(() => {}); }
    document.body.removeEventListener("click", enableAudioOnUserGesture);
  }
  document.body.addEventListener("click", enableAudioOnUserGesture);

  /* =======================
     OVERLAY FUNCTIES
  ======================== */
  function openOverlay(html) {
    if (!overlay || !overlayBody) return;
    overlayBody.innerHTML = html;
    overlay.classList.remove("hidden");
  }

  function closeOverlay() {
    if (!overlay || !overlayBody) return;
    overlay.classList.add("hidden");
    overlayBody.innerHTML = "";
  }

  overlayClose?.addEventListener("click", closeOverlay);
  overlay?.addEventListener("click", e => { if (e.target === overlay) closeOverlay(); });

  /* =======================
     OVERLAY CLICKS
  ======================== */
  const overlayData = [
    { element: bord, html: `<h2>Mededelingenbord</h2><p>Welkom in het klooster van Hemelum.</p>` },
    { element: deur, html: `<h2>De Kloosterdeur</h2><p>De deur kraakt langzaam open...</p>` },
    { element: raam, html: `<h2>Het Raam</h2><p>Je kijkt naar binnen.</p>` },
    { element: heilige1Knop, html: `<h2>Heilige I</h2><p>Een zwijgende wachter van het klooster.</p><p>Zijn ogen lijken je te volgen.</p>` },
    { element: heilige2Knop, html: `<h2>Heilige II</h2><p>Deze heilige fluistert oude gebeden.</p><p>Je voelt een lichte rilling.</p>` },
    { element: aboutLink, html: `<h2>Over deze website</h2><p>Deze website is een digitaal project rondom het <strong>Klooster van Hemelum</strong>.</p><p>Het doel van deze site is om bezoekers op een interactieve en verhalende manier kennis te laten maken met de sfeer, geschiedenis en beleving van het klooster.</p><p>In de toekomst zal hier meer informatie verschijnen over het ontstaan van deze website, de motivatie achter het project en de mensen die eraan hebben meegewerkt.</p><p>Deze website is in de maak.</p>`, preventDefault: true },
    { element: contactLink, html: `<h2>Contact – Klooster van Hemelum</h2>
      <form id="contact-form" class="contact-form">
        <label>Naam<input type="text" name="naam" placeholder="Uw naam" required></label>
        <label>E-mail<input type="email" name="email" placeholder="uw@email.nl" required></label>
        <label>Bericht<textarea name="bericht" rows="4" placeholder="Uw bericht..." required></textarea></label>
        <button type="submit">Verzend bericht</button>
      </form>
      <hr>
      <div class="contact-info">
        <p><strong>Adres</strong><br>Hemelumstraat 12, 8584 XX Hemelum</p>
        <p><strong>E-mail</strong><br>info@kloostervanhemelum.nl</p>
        <p><strong>Telefoon</strong><br>+31 (0)514 123 456</p>
      </div>`, preventDefault: true }
  ];

  overlayData.forEach(item => {
    item.element?.addEventListener("click", e => {
      if (item.preventDefault) e.preventDefault();
      openOverlay(item.html);
    });
  });

  /* =======================
     CONTACTFORM SUBMIT
  ======================== */
  document.addEventListener("submit", e => {
    if (e.target.id === "contact-form") {
      e.preventDefault();
      openOverlay(`<h2>Dank u</h2><p>Uw bericht is ontvangen.</p><p>Wij nemen spoedig contact met u op.</p>`);
    }
  });
});
