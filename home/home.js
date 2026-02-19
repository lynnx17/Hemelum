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
  deur?.addEventListener("click", () => {
  window.location.href = "binnen.html";
});

bord?.addEventListener("click", () => {
  openOverlay(`
    <article class="overlay-article">
      <h2>Artikel over het Klooster </h2>
      <p><em>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<em></p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </article>
  `);
});

aboutLink?.addEventListener("click", (e) => {
  if (e) e.preventDefault();

  openOverlay(`
    <article class="overlay-jubileum">
      <h2>🎉 Jubileum – Klooster van Hemelum 🎉</h2>

      <p>Het Klooster van Hemelum bestaat dit jaar <strong>XX jaar</strong>! Ter gelegenheid van dit jubileum hebben wij deze interactieve website ontwikkeld.</p>

      <p>Deze site is een gezamenlijke creatie van <strong>Art</strong>, <strong>Lynn</strong> & <strong>Vader...</strong>, en biedt bezoekers een unieke blik op de geschiedenis, sfeer en beleving van het klooster.</p>

      <p>Het project is mogelijk gemaakt door het klooster zelf, met steun van vrijwilligers en liefhebbers.</p>

      <p>Duik in verhalen, foto's en video's en vier samen met ons dit bijzondere jubileumjaar!</p>
    </article>
  `);
});



  const overlayData = [
    { element: raam, html: `<h2>Het Raam</h2>
    <p>Een documontaire over het Klooster.</p>
    <div class="video-container">
      <video controls autoplay>
        <source src="../video/voorbeeld.mp4" type="video/mp4">
        Je browser ondersteunt deze video niet.
      </video>
    </div>` },
    { element: heilige1Knop, html: `<h2 class="michealh2">Vader Micheal</h2><br>

<b class="micheal">Vader Michael, kwam tot geloof in een Russische leefgemeenschap. Hoe heeft hij
Gods geduld ervaren? </b>
<p class="micheal"> Vader Michael is diaken in de Orthodoxe parochie van Johannes de Doper in Leeuwarden.
Zijn reis naar de Orthodoxe kerk is bijzonder, spontaan en gaat over meerdere landsgrenzen
heen. Hoe kwam hij tot de Orthodoxe kerk? En wat waren zijn worstelingen?</p>
<p class="micheal">“Mijn religieuze achtergrond?” Vader Michael kijkt bedenkelijk de verte in. Een lange baard
en een hoodie zouden net zo goed van een hipster kunnen zijn, maar in dit geval zijn ze van
een diaken.
“Ik ben geboren in een gemengd gezin. Mijn moeder is katholiek, mijn vader protestants. De
opvoeding was algemeen christelijk. Bijbelverhalen en kerk waren belangrijk. De ene keer
gingen we naar de protestantse kerk, de andere keer naar de katholieke. Beide stromingen
heb ik meegekregen. Het verhaal van het christendom heb ik in het algemeen meegekregen.
Eigenlijk wat je op een christelijke basisschool krijgt.”</p>

<div style=" width: 80%; ">
        <img src="../images/micheal1.jpg" alt="Vader Michael 1" style="width:100%; border-radius:8px;">
    </div><br>

<p>“Wie was God voor mij? Ik zou het omschrijven als een vader, een hemelse vader die over
je waakt. Dat bleef door mijn jeugd onveranderd. God had geen prominente rol in mijn leven.
Ik wist dat Hij er was en dat Hij over ons waakte, maar verder was ik er niet mee bezig.”</p>
<p>Tot zover ging het interview zoals ik het had verwacht. Maar toen Vader Michael begon te
praten over zijn introductie in de Orthodoxe kerk, nam het interview een heel andere richting.</p>
<p>“In 2011 reisde ik door meerdere ex Sovjetlanden. Oekraïne, Letland, maar vooral Rusland.
Daar ben ik terechtgekomen in een Orthodoxe leefgemeenschap. Het waren meerdere
priesters en gezinnen die samen op een grote woonboerderij woonden. Ik was diep onder de
indruk van hun levenswijze en hun wandel met God. Voor het eerst zag ik dat geloven ook
zo praktisch kon zijn. Dat het zo centraal in je leven kan staan. Deze mensen leefden dat zo
sterk, dat het als een soort openbaring binnenkwam en ik wist: dit is het geloof.”</p>
<p>Ondanks alles was het leven in de leefgemeenschap zwaar.
“Het was een woonboerderij met land dat bewerkt moest worden en met dieren. De hele dag
bestond eigenlijk uit bidden en werken. In de avond kwamen we bij elkaar en waren er
goede gesprekken, spelletjes en traditionele volksdans. Het leven bestond eruit om alles te
doen tot eer van God. De rode draad was het kerkelijk leven, met de priesters die dienden in
de dorpskerk.”</p>
<p>“Het had er ook mee te maken dat zij leefden met het verlangen om Christus te dienen. Dat
zag je niet alleen in werk en gebed, maar ook in hoe ze met mij omgingen. Ze behandelden
mij zonder enig oordeel en met liefde.”</p>
<p>In die boerderij werd Michael ontvangen in de Orthodoxe kerk. Al had dat een bijzondere
kanttekening</p>
<div style=" width: 80%; ">
        <img src="../images/micheal2.jpg" alt="Vader Michael 1" style="width:100%; border-radius:8px;">
    </div><br>
<b>Hoe heeft u de catechese ervaren?</b>
<p>“Niet,” zei de diaken terwijl er een lach boven zijn baard verscheen.

“Naast dat ik onder de indruk was van hun leven, was het leven daar heel zwaar. In die tijd
was het tussen de twintig en dertig graden onder nul, met veel buitenwerk en lange dagen.
Daarnaast was ik naar Rusland gekomen om, noem het seculier, leuke dingen te doen.
Feesten, uitgaan, dingen die je daar niet deed. ”</p>

<p>“Toen ik aangaf Orthodox te willen worden, bespraken ze dat en waren ze open om mij in de
kerk te ontvangen. Een of twee dagen later gebeurde dat. Het ging heel snel. Maar toen ik
eenmaal ontvangen was, zei iets in mij: ik moet hier weg. Om seculiere dingen te doen. Dat
was misschien wel een geestelijke strijd.”</p>
<p>“Er was een priester die een beetje Engels kon. Die priester zei eigenlijk: we hebben je net
ontvangen en we gingen ervan uit dat je nog zou blijven, zodat we je dingen konden leren.
Een catechese na de doop. Ze wilden me nog adressen geven om naartoe te gaan als ik
echt weg wilde. Maar eigenlijk heb ik gezegd: ik ben nu orthodox, bedankt en doei.”</p>
<p>“Toen ik verder reisde door Rusland had ik wel het besef dat ik orthodox was, maar nog
steeds leefde ik het wanneer het mij uitkwam. Met dezelfde mentaliteit waarmee ik was
opgegroeid. Je las wat en je bezocht wel eens een kerk. Er was een groot gat tussen het feit
dat ik orthodox was en dat ik begreep wat het inhield.”</p>
<p>“Nu we het toch hebben over liefdevol zijn en niet oordelen. Toen ik een jaar later terugging
naar die leefgemeenschap, met schaamte omdat ik nooit meer contact met ze had gehad,
werd ik onthaald als de verloren zoon. Geen enkel moment van waarom ben je weggegaan.
Alsof ik nooit was weggeweest. Net als in het verhaal van de verloren zoon hielden ze een
feest toen ik terug was.”</p>
<p>“Terug in Nederland ging ik af en toe naar diensten, maar niet veel. In Hemelum en
Leeuwarden. Ik was nog heel sterk verbonden aan het wereldse leven. Veel uitgaan,
stappen, drinken. Alles doen behalve wat goed is voor je ziel. Je kunt natuurlijk feesten,
maar de overmatigheid was sterk aanwezig. Ik woonde toen in Utrecht en het was een
vrijgezellenleven, hedonistisch. Er was een bepaalde cirkel van hedonisme. Dan liep je
ergens tegenaan en vluchtte ik weer naar het klooster in Hemelum. Je stond met één been
in het hedonistische leven en met het andere been in het orthodoxe leven.”</p>
<p>“Toen ben ik ergens anders gaan wonen en kwam ik tot de conclusie dat ik mijn leven
serieus moest gaan oppakken. Ik ging het sacramentele leven oppakken. Asketischer leven,
met meer bidden en vasten. Ik vroeg aan God: Heer, vertel mij wat U met mij van plan bent.
In die drie jaar ben ik getrouwd en heb ik een gezin gesticht. Toen merkte ik dat ik steeds
meer in de kerk was. Er kwamen meer taken bij en ik raakte steeds meer betrokken in het
altaar. Zo ben ik uiteindelijk in het diakenschap gerold.”</p>
<b>Welke rode draad liep door uw tijd vanaf uw ontvangst in de kerk tot uw
diakenwijding?</b>

<p>“Heel veel geduld van Christus. Vanaf mijn snelle ontvangst en mijn traagheid, met alle
hedonistische dingen en verkeerde afslagen, heeft de Heer mij heel geleidelijk geleid. Hij zal
vast een paar keer hebben gedacht: waarom snapt hij het niet. Wat ik soms met mijn

kinderen heb, heeft de hemelse Vader heel vaak met mij gehad, nog steeds denk ik, Die
geleidelijkheid waarmee Hij mij tot geloof bracht was cruciaal. Hij heeft niet alles tegelijk
geopenbaard, want klaarblijkelijk wilde ik dat niet. Dat Hij toch het geduld had om jaren te
wachten tot ik zelf tot dat inzicht kwam, dat is de rode draad.”</p> 
<div style=" width: 80%; ">
        <img src="../images/micheal3.jpg" alt="Vader Michael 1" style="width:100%; border-radius:8px;">
    </div>` },
    { element: heilige2Knop, html: `<h2>Heilige 2</h2>
    <p>Een documontaire.</p>
    <div class="video-container">
      <video controls autoplay>
        <source src="../video/voorbeeld.mp4" type="video/mp4">
        Je browser ondersteunt deze video niet.
      </video>
    </div>
    <p><em>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<em></p>
      ` },
    { element: contactLink, html: `<h2 class"black">Contact – Klooster van Hemelum</h2>
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
