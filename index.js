function saveName() {
  const nameInput = document.getElementById('name-input');
  const name = nameInput.value;

  if (name.trim() !== "") {
    // Sla de naam op in het geheugen van de browser
    localStorage.setItem("gebruikersnaam", name);
    
    // Ga naar de homepagina in de map 'home'
    window.location.href = "home/home.html";
  } else {
    alert("Voer a.u.b. een naam in voordat je begint.");
  }
}