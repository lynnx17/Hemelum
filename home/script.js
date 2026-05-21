window.addEventListener("DOMContentLoaded", () => {
  /* ELEMENTEN OPHALEN */
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
  const vader = document.getElementById("vader-knop");

  const contactLink = document.getElementById("contact-link");
  const aboutLink = document.getElementById("about-link");

  /* NAAM TONEN */
  const naam = localStorage.getItem("gebruikersnaam");
  if (naamPlaceholder) naamPlaceholder.textContent = naam || "gast";

  /* HAMBURGER MENU */
  hamburger?.addEventListener("click", () => navLinks?.classList.toggle("show"));

  /* MUZIEKBEHEER */
  if (audio && toggleBtn) {

    // 1. Probeer autoplay (wordt vaak geblokkeerd, dat is oké)
    audio.play().then(() => {
      toggleBtn.textContent = "🎵";
    }).catch(() => {
      toggleBtn.textContent = "🔇";
    });

    // 2. De Toggle: kijkt ALTIJD naar de werkelijke status
    toggleBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        toggleBtn.textContent = "🎵";
      } else {
        audio.pause();
        toggleBtn.textContent = "🔇";
      }
    });

  }

  /* HEILIGEN ANIMATIE */
  let beurt = 1;

  function resetEnSpeelGeluid() {
    if (!klinkel) return;
    klinkel.pause();
    klinkel.currentTime = 0;
    klinkel.loop = true;
    klinkel.muted = false;
    klinkel.volume = 1;
    klinkel.play().catch(() => { });
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

  /* AUDIO NA  */
  function enableAudioOnUserGesture() {
    if (klinkel) { klinkel.muted = false; klinkel.volume = 0.7; klinkel.play().catch(() => { }); }
    if (audio) { audio.muted = false; audio.play().catch(() => { }); }
    document.body.removeEventListener("click", enableAudioOnUserGesture);
  }
  document.body.addEventListener("click", enableAudioOnUserGesture);

  /* OVERLAY FUNCTIES */
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

  /* OVERLAY CLICKS */
  deur?.addEventListener("click", () => {
    window.location.href = "binnen.html";
  });

  bord?.addEventListener("click", () => {
    openOverlay(`
    <article class="overlay-article">
      <h2>25 jaar klooster in dienst van God. </h2>
      <p><em>Het klooster van de H. Nicolaas, gesticht in 1999 en ingewijd in 2001, is niet weg te denken uit het maatschappelijke leven van Súdwest-Fryslân. En in deze 25 jaar sinds het wijding jaar is een hoop geschiedenis geschreven. Uit dit klooster zijn twee orthodoxe gemeenschappen geboren (Zwolle en Leeuwarden) en is er zowaar een relatief grote orthodoxe gemeenschap in Noord-Nederland ontstaan.</em></p>
<div style=" width: 80%; ">
        <img src="../images/intro.jpg" alt="klooster met gelovige Odulfus" style="width:100%; border-radius:8px;">
    </div><br>
<p>In 1999 is de Synodaal Gereformeerde Kerk van Hemelum  opgekocht door de Stichting Orthodox Welzijn, die formeel eigenaar is van het klooster. Sindsdien is de gehele kerk gerenoveerd om toegewijd te worden voor de Goddelijke Liturgie. Desondanks zijn er knipogen naar het voorheen gereformeerde karakter van de kerk. Zo is de voorste analoi (houten standaart waar een icoon op rust in het midden van de kerk) gemaakt van het hout van de gereformeerde kansel.
Het achterbalkon maakt plaats voor een overnachtingsplek voor reizende geestelijken. En een grote iconostase komt tussen de altaarruimte en de rest van de kerk, al is die iconostase nog eens vervangen in 2006 door de hedendaagse iconostase die afkomstig is uit Belgrado.
Vanuit het klooster worden meerdere religieuze activiteiten georganiseerd om het religieuze leven van de gemeenschap te bevorderen. Op 12 juni wordt de jaarlijkse Odulfusbedevaart georganiseerd, waar gelovigen met de boot vanuit Stavoren varen en bloemen op de plaats waar de oude St Odulfus abdij in de middeleeuwen heeft gelegen. Die bedevaart gaat verder naar Bakhuizen, waar een vesper ter ere van Odulfus wordt gebeden. Vanuit de St Odulfus abdij is een klooster filiaal gesticht in Hemelum, anno de 12de eeuw, die gewijd was aan de H Nicolaas. Aan dat klooster ontleent het huidige klooster haar naam.
Er is nog een broeder geweest die heeft gekozen om het monastieke leven op te pakken in Hemelum. zijn naam is Priestermonnik vader Johannes (Roodvoet), die na zijn monastieke wijding gevraagd is om in Den Haag te dienen voor de parochie van de Heilige Maria Magdalena.
Vanuit Zwolle en Leeuwarden heeft het klooster meerdere bezoekers dan voorheen. Daarmee is het klooster ook gegroeid in ruimte. Zo is het oude pastoriegebouw opgekocht en dient het als het gasthuis van het klooster. Het staat bekend als het Odulfushuis. God heeft ons voorzien van twee diakens die momenteel onze gemeenschappen in Zwolle en Leeuwarden dienen. Zo zijn vader Georgii en vader Michael beiden in 2024 gewijd. Naast hun eigen gemeenschappen dienen zij ook in het klooster tijdens Goddelijke Liturgieen.
Verder is in Bakhuizen een zuster van onze gemeenschap een skete (klein klooster) begonnen onder de bescherming van de Moeder Gods. In de Skete is een kleine kapel ingebouwd. In de kapel houd Zuster Maria haar gebedsregel
Natuurlijk is er nog veel meer gebeurd in deze 25 jaar en is dit een hele kleine samenvatting. Ook onze gemaakte en verzamelde media vertellen niet alles wat in 25 jaar gebeurd is. Zoals de Bijbel ook zegt: “Als die ieder afzonderlijk beschreven zouden worden, dan zou, denk ik, de wereld zelf de geschreven boeken niet kunnen bevatten. Amen.”
</p>
    </article>
  `);
  });

  aboutLink?.addEventListener("click", (e) => {
    if (e) e.preventDefault();

    openOverlay(`
    <article class="overlay-jubileum">
      <h2>🎉 Jubileum – Klooster van Hemelum 🎉</h2>

      <p>Het Klooster van Hemelum bestaat dit jaar <strong>25 jaar</strong>! Ter gelegenheid van dit jubileum hebben wij deze interactieve website ontwikkeld.</p>

      <p>Deze site is een gezamenlijke creatie van <strong>Art</strong>, <strong>Lynn</strong> & <strong>Vader Jewsewy</strong>, en biedt bezoekers een unieke blik op de geschiedenis, sfeer en beleving van het klooster.</p>

      <p>Het project is mogelijk gemaakt door het klooster zelf, met steun van vrijwilligers en liefhebbers.</p>

      <p>Duik in verhalen, foto's en video's en vier samen met ons dit bijzondere jubileum jaar!</p>
    </article>
  `);
  });



  const overlayData = [
    {
      element: raam, html: `<h2 class="videowijding">Video klooster wijding</h2>
      <p>Een samenvattende video over de wijding van het klooster.</p>

      <div class="video-container">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/K7I3hZXsnhw?si=CENcSWwmXr_WU7Au"
                    title="
samenvattende video van de wijding van het H Nicolaas klooster" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
      </div>

      <p>
      <a href="archief.html#volledige-weiding" target="_blank"> Klik hier </a> &nbsp;om de hele video te bekijken
      </p>
    ` },

    {
  element: vader,
  html: `
    <article class="overlay-article">
      <h2>Vader Jewsewy</h2>

      <p> <em>
        Hiëromonnik Jewsewy (Vaillant) werd in 1954 geboren; in 1998 is hij gewijd. Hij is rector van
het klooster van de Heilige Nikolaas van Myra te Hemelum, en van de parochies van de
Heilige Aartsengel Michaël te Zwolle en van de Heilige Johannes de Doper te Leeuwarden.</em><br><br>
      <div style="width: 100%;">
        <img src="../images/vader.jpg"
             alt="Vader Jewsewy"
             style="width:100%; border-radius:8px;">
      </div>
Vader Jewsewy is samen met zijn broer geboren in Sneek. Beide hij en zijn broer zijn
orthodox geworden in de orthodoxe parochie in Groningen, waar zijn broer, vader Onufry, nu
dient. Jewsewy studeerde sociologie aan de Rijksuniversiteit Groningen en heeft een
langere tijd vluchtelingenwerk gedaan. Vader Jewsewy koos later voor het monastieke leven
en is in het Supraśl-klooster gewijd, waar hij nu zijn huidige monastieke naam heeft
genomen. <br>Toen zijn broer werd gevraagd te dienen in Groningen, vroeg hij aan Jewsewy in
de zoveel tijd naar Nederland te reizen om tweede priester te zijn voor de noordelijkste
parochie van het bisdom. Toen Jewsewy de zegen van zijn bisschop vroeg om dit plan te
realiseren, gaf zijn bisschop hem een antwoord waar Jewsewy, toen der tijd, teleurgesteld
van werd. Hij werd gevraagd om permanent terug te gaan om de orthodoxe kerk te dienen in
het noorden van Nederland. <br><br>
Jewsewy heeft bij zijn terugkomst de synodaal-gereformeerde kerk van Hemelum in bezit
gekregen. Dat is nu het huidige klooster van de H. Nicolaas. De eerste monnikswijding in
het klooster vond plaats op 15 maart 2019. De toenmalige broeder Adriaan ontving de
monniksnaam Johannes. Nadien werd vader Johannes op verzoek van onze aartsbisschop
Jelisey toegevoegd aan de geestelijkheid in Den Haag. Sinds mei 2020 is het klooster
uitgebreid met de naastgelegen voormalige pastorie, die als Odulphus-huis aan het
kloostercomplex is toegevoegd. Het Odulphus-huis is vooral bedoeld om kloostergasten te
ontvangen en pelgrims slaapplaats te bieden en wordt ook als trapeza na de diensten
gebruikt. Er is een kleine kloosterkapel in het Odulphus-huis gepland. <br>br>
Het klooster heeft sinds enkele jaren belangrijke relieken ontvangen, waaronder een kleine
relieken van de H. Apostel Andreas de Eerstgeroepene (1e eeuw), H. Nicolaas van Myra (4e
eeuw), H. Bisschop Willibrord, Apostel der Friezen (+739), H. Bisschop-martelaar Bonifatius
(+754 Dokkum), en de H. Odulphus (+855). Onder het klooster ressorteren twee podvoryes
(parochie-filialen) te weten in Leeuwarden sinds 2009 en in Zwolle sinds 2017. Daar worden
de diensten ook geleid door vader Jewsewy. <br><br>

Vanuit het klooster zijn meerdere orthodoxe gemeenschappen gesticht, zijnde: Leeuwarden
en Zwolle
      </p>



    </article>
  `
},

    {
      element: heilige1Knop, html: `<article class="overlay-article">
      <h2 class="michealh2">Vader Micheal</h2><br>

<b class="micheal">Vader Michael, kwam tot geloof in een Russische leefgemeenschap. Hoe heeft hij
Gods geduld ervaren? </b>
<p class="micheal"> Vader Michael is diaken in de Orthodoxe parochie van Johannes de Doper in Leeuwarden. Zijn reis naar de Orthodoxe kerk is bijzonder, spontaan en gaat over meerdere landsgrenzen heen. Hoe kwam hij tot de Orthodoxe kerk? En wat waren zijn worstelingen?
“Mijn religieuze achtergrond?” Vader Michael kijkt bedenkelijk de verte in. Een lange baard en een hoodie zouden net zo goed van een hipster kunnen zijn, maar in dit geval zijn ze van een diaken. “Ik ben geboren in een gemengd gezin. Mijn moeder is katholiek, mijn vader protestants. De opvoeding was algemeen christelijk. Bijbelverhalen en kerk waren belangrijk. De ene keer gingen we naar de protestantse kerk, de andere keer naar de katholieke. Beide stromingen heb ik meegekregen. Het verhaal van het christendom heb ik in het algemeen meegekregen. Eigenlijk wat je op een christelijke basisschool krijgt.”
“Wie was God voor mij? Ik zou het omschrijven als een vader, een hemelse vader die over je waakt. Dat bleef door mijn jeugd onveranderd. God had geen prominente rol in mijn leven. Ik wist dat Hij er was en dat Hij over ons waakte, maar verder was ik er niet mee bezig.”
Tot zover ging het interview zoals ik het had verwacht. Maar toen Vader Michael begon te praten over zijn introductie in de Orthodoxe kerk, nam het interview een heel andere richting.
“In 2011 reisde ik door meerdere ex Sovjetlanden. Oekraïne, Letland, maar vooral Rusland. Daar ben ik terechtgekomen in een Orthodoxe leefgemeenschap. Het waren meerdere priesters en gezinnen die samen op een grote woonboerderij woonden. Ik was diep onder de indruk van hun levenswijze en hun wandel met God. Voor het eerst zag ik dat geloven ook zo praktisch kon zijn. Dat het zo centraal in je leven kan staan. Deze mensen leefden dat zo sterk, dat het als een soort openbaring binnenkwam en ik wist: dit is het geloof.”
Ondanks alles was het leven in de leefgemeenschap zwaar.
</p>

<div style=" width: 80%; ">
        <img src="../images/micheal1.jpg" alt="Vader Michael 1" style="width:100%; border-radius:8px;">
    </div><br>

    <p>“Het was een woonboerderij met land dat bewerkt moest worden en met dieren. De hele dag bestond eigenlijk uit bidden en werken. In de avond kwamen we bij elkaar en waren er goede gesprekken, spelletjes en traditionele volksdans. Het leven bestond eruit om alles te doen tot eer van God. De rode draad was het kerkelijk leven, met de priesters die dienden in de dorpskerk.”
“Het had er ook mee te maken dat zij leefden met het verlangen om Christus te dienen. Dat zag je niet alleen in werk en gebed, maar ook in hoe ze met mij omgingen. Ze behandelden mij zonder enig oordeel en met liefde.”
In die boerderij werd Michael ontvangen in de Orthodoxe kerk. Al had dat een bijzondere kanttekening
”</p>


<div style=" width: 80%; ">
        <img src="../images/micheal2.jpg" alt="Vader Michael 1" style="width:100%; border-radius:8px;">
    </div><br>
<b>Hoe heeft u de catechese ervaren?</b>
<p>“Niet,” zei de diaken terwijl er een lach boven zijn baard verscheen.
“Naast dat ik onder de indruk was van hun leven, was het leven daar heel zwaar. In die tijd was het tussen de twintig en dertig graden onder nul, met veel buitenwerk en lange dagen. Daarnaast was ik naar Rusland gekomen om, noem het seculier, leuke dingen te doen. Feesten, uitgaan, dingen die je daar niet deed. ”

“Toen ik aangaf Orthodox te willen worden, bespraken ze dat en waren ze open om mij in de kerk te ontvangen. Een of twee dagen later gebeurde dat. Het ging heel snel. Maar toen ik eenmaal ontvangen was, zei iets in mij: ik moet hier weg. Om seculiere dingen te doen. Dat was misschien wel een geestelijke strijd.”
“Er was een priester die een beetje Engels kon. Die priester zei eigenlijk: we hebben je net ontvangen en we gingen ervan uit dat je nog zou blijven, zodat we je dingen konden leren. Een catechese na de doop. Ze wilden me nog adressen geven om naartoe te gaan als ik echt weg wilde. Maar eigenlijk heb ik gezegd: ik ben nu orthodox, bedankt en doei.”
“Toen ik verder reisde door Rusland had ik wel het besef dat ik orthodox was, maar nog steeds leefde ik het wanneer het mij uitkwam. Met dezelfde mentaliteit waarmee ik was opgegroeid. Je las wat en je bezocht wel eens een kerk. <br> Er was een groot gat tussen het feit dat ik orthodox was en dat ik begreep wat het inhield.”
“Nu we het toch hebben over liefdevol zijn en niet oordelen. Toen ik een jaar later terugging naar die leefgemeenschap, met schaamte omdat ik nooit meer contact met ze had gehad, werd ik onthaald als de verloren zoon. Geen enkel moment van waarom ben je weggegaan. Alsof ik nooit was weggeweest. Net als in het verhaal van de verloren zoon hielden ze een feest toen ik terug was.”
“Terug in Nederland ging ik af en toe naar diensten, maar niet veel. In Hemelum en Leeuwarden. Ik was nog heel sterk verbonden aan het wereldse leven. Veel uitgaan, stappen, drinken. Alles doen behalve wat goed is voor je ziel. Je kunt natuurlijk feesten, maar de overmatigheid was sterk aanwezig. Ik woonde toen in Utrecht en het was een vrijgezellenleven, hedonistisch. Er was een bepaalde cirkel van hedonisme. Dan liep je ergens tegenaan en vluchtte ik weer naar het klooster in Hemelum. Je stond met één been in het hedonistische leven en met het andere been in het orthodoxe leven.”
“Toen ben ik ergens anders gaan wonen en kwam ik tot de conclusie dat ik mijn leven serieus moest gaan oppakken. Ik ging het sacramentele leven oppakken. Asketischer leven, met meer bidden en vasten. Ik vroeg aan God: Heer, vertel mij wat U met mij van plan bent. In die drie jaar ben ik getrouwd en heb ik een gezin gesticht. Toen merkte ik dat ik steeds meer in de kerk was. Er kwamen meer taken bij en ik raakte steeds meer betrokken in het altaar. Zo ben ik uiteindelijk in het diakenschap gerold.”
</p>

<div style=" width: 80%; ">
        <img src="../images/micheal3.jpg" alt="Vader Michael 1" style="width:100%; border-radius:8px;">
    </div>
<b>Welke rode draad liep door uw tijd vanaf uw ontvangst in de kerk tot uw diakenwijding?</b>
<p>“Heel veel geduld van Christus. Vanaf mijn snelle ontvangst en mijn traagheid, met alle hedonistische dingen en verkeerde afslagen, heeft de Heer mij heel geleidelijk geleid. Hij zal vast een paar keer hebben gedacht: waarom snapt hij het niet. Wat ik soms met mijn kinderen heb, heeft de hemelse Vader heel vaak met mij gehad, nog steeds denk ik, Die geleidelijkheid waarmee Hij mij tot geloof bracht was cruciaal. Hij heeft niet alles tegelijk geopenbaard, want klaarblijkelijk wilde ik dat niet. Dat Hij toch het geduld had om jaren te wachten tot ik zelf tot dat inzicht kwam, dat is de rode draad.”
</p>

    </article>` },

    {
      element: heilige2Knop, html: `<article class="overlay-article">
      <h2>Vader Georgii viert voor het eerst Pasen als diaken</h2>
    <b>Vader Georgii, diaken van de St. Michaëlparochie in Zwolle, viert dit jaar zijn eerste Pasen als diaken. De in 2024 gewijde geestelijke was parochiaan van het eerste uur. Hoe ervaart hij de Grote Vastentijd voorafgaand aan Pasen? En hoe heeft hij de parochie door de jaren heen zien groeien?</b><br><br>
<div style=" width: 80%; ">
        <img src="../images/georgi1.jpg" alt="Vader Georgii 1" style="width:100%; border-radius:8px;">
    </div><br>
<p>"Voordat ik als lezer werd gewijd, was ik op audiëntie bij de bisschop. De bisschop vroeg mij: ‘So you dream to be a priest?’ Ik antwoordde: ‘Dromen is wel een heel groot woord.’ De bisschop vervolgde met een korte preek over waarom de kerk geen priesters wil die ervan dromen om priester te worden,” vertelt vader Georgii, met een glimlach verscholen achter zijn baard.
Het is geen droom, maar een pad dat de diaken al lange tijd bewandelt, zelfs van vóór zijn ontdekking van de Orthodoxie. “Ik kom uit een protestants nest. Ik was dermate actief in de kerk dat het idee opkwam om dominee te worden. Ik begon aan een theologiestudie, waar meer vragen op me afkwamen dan antwoorden. Een van mijn klasgenoten stond op het punt priester te worden in de Syrisch-Orthodoxe Kerk, en ik raakte zo geïnteresseerd dat ik met hem weleens naar het Syrisch-Orthodoxe klooster in Twente ging. Daar heb ik voor het eerst een kruis en iconen vereerd. Door het bestuderen van theologie begon ik mezelf vragen te stellen: ‘Wat is nou de kerk?’ ‘Waarom moet er een man in een pak voor de kerk een verhaal uit de Bijbel voorlezen, waarna we een lied met een of twee coupletten zingen, gevolgd door gebed en modulatie?’ Ik ging me afvragen waarom we dingen doen zoals we ze doen. Toen kwam ik tot de conclusie dat de Orthodoxe Kerk betere papieren had.”
Vader Georgii had wel een probleem voordat hij Orthodox wilde worden: de cultuur. “Alles wat ik in de Orthodoxe Kerk vond, was niet Nederlands. Mijn redenering was: ‘Ik ben Nederlands, dus ik kan het beste bij een Nederlandse kerk blijven.’ Maar toen kwam ik mijn vrouw tegen,” lacht de beginnend geestelijke, “die Russisch is.” “Toen verviel mijn argument dat ik niets had met de culturen van de Orthodoxie. Daarna was er geen reden meer om niet Orthodox te worden.”
</p>
<div style=" width: 80%; ">
        <img src="../images/georgi2.jpg" alt="Vader Georgii 1" style="width:100%; border-radius:8px;">
    </div>
<p>Vader Georgii is parochiaan van het eerste uur. Daarvoor was hij lid van de Orthodoxe parochie in Deventer. “Ik had veel gestudeerd, maar in Deventer leerde ik de praktijk van het geloof. De eerste Paasdienst zal ik nooit vergeten.” Toen hij hoorde dat er diensten werden georganiseerd in Zwolle, ging hij meteen helpen. “Er waren veel mensen vanuit Deventer die geholpen hebben met de eerste bijeenkomst van de gemeenschap in Zwolle.” De eerste kerkbijeenkomsten van de toekomstige St. Michaëlparochie waren vesperdiensten. Deze vespers werden gehouden in de souterrain van de vrijgemaakte Plantagekerk, aan de rand van het centrum. Op zaterdag 16 februari 2019 werd de eerste Goddelijke Liturgie gevierd in de podorye van Zwolle. De ruimte in de Plantagekerk bleek eigenlijk te klein om de gemeenschap voldoende ruimte te bieden. Er deed zich de gezegende omstandigheid voor naar een grotere pas gerestaureerde voormalige RK Theodora kapel te kunnen gaan aan de rand van de Zwolse binnenstad 
</p>
<h3>Diakenambt</h3>
<p>De recent gewijde diaken merkt verschil tussen zijn eerste keren en de meer recente keren dat hij dient bij het altaar. “In het begin dacht je alleen maar na over waar je allemaal naartoe moet, hoe je goed bewierookt, je moet door het dienstenboek kunnen navigeren, en dat vraagt veel aandacht. Het is evident dat dienen aan het altaar genade met zich meebrengt.”
Vader Georgii vindt het lastig om die genade precies te beschrijven. “Ik kan het verder moeilijk uitleggen,” zegt de jonge geestelijke terwijl hij vanuit zijn kantoor in de verte kijkt. Hij concludeert: “Binnen de Orthodoxie schieten woorden vaak tekort om dingen volledig recht te doen.”
Zachtjes maar zeker klom vader Georgii de ladder op binnen de rangen van de parochie. Hij begon als altaardienaar en werd daarna hypo-diaken, voordat hij werd gewijd tot diaken van de St. Michaëlparochie. “Vader Michael en ik gaan regelmatig naar het klooster in Hemelum, waar we les krijgen in onder andere kerkslavisch en geestelijke ontwikkeling. Een soort catechese-plus, met veel nadruk op theorie en minder op de persoon. Daarnaast bezoeken we vader Johannes in Den Haag, die ons een soort masterclass over de liturgie geeft.”
</p>
</article>
      ` },
    {
      element: contactLink, html: `<h2 class"black">Contact – Klooster van Hemelum</h2>
      <hr>
      <div class="contact-info">
        <p><strong>Adres</strong><br>Buorren 18, 8584 VC Hemelum</p>
        <p><strong>E-mail</strong><br>info@kloosterhemelum.nl</p>
        <p><strong>Rekening-nummer</strong><br>NL65 INGB 00069 10488</p>
      </div>`, preventDefault: true
    }
  ];

  overlayData.forEach(item => {
    item.element?.addEventListener("click", e => {
      if (item.preventDefault) e.preventDefault();
      openOverlay(item.html);
    });
  });

  /* CONTACTFORM SUBMIT */
  document.addEventListener("submit", e => {
    if (e.target.id === "contact-form") {
      e.preventDefault();
      openOverlay(`<h2>Dank u</h2><p>Uw bericht is ontvangen.</p><p>Wij nemen spoedig contact met u op.</p>`);
    }
  });
});
