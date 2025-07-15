const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

const naam = localStorage.getItem("gebruikersnaam");
  if (naam) {
    document.getElementById("naam-placeholder").textContent = naam;
  } else {
    document.getElementById("naam-placeholder").textContent = "gast";
  }


  