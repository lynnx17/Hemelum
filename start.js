function saveName() {
  const name = document.getElementById('name-input').value;
  if (name.trim() !== "") {
    localStorage.setItem("gebruikersnaam", name);
    window.location.href = "home/home.html";
  }
}
