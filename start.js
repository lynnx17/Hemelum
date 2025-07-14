function saveName() {
    const name = document.getElementById('name-input').value;
    if (name.trim() !== "") {
      localStorage.setItem("gebruikersnaam", name);
      window.location.href = "home/home.html"; // Ga naar de volgende pagina
    }

     const audio = document.getElementById("start-audio");
      if (audio) {
      audio.play().catch(err => {
        console.warn("Audio kon niet automatisch afspelen:", err);
      });
    }
  }

 