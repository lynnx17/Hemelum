let password = "GodIsGroot";

function inloggenBtn() {
    console.log("Inloggen button clicked");
    var wachtwoord = document.getElementById("password").value;

    

    if (wachtwoord === "") {
        alert("Vul alstublieft alle velden in.");
        return;
    } else if (wachtwoord === password) {
        alert("Inloggen gelukt");
        window.location.href = "start.html";
    } else {
        alert("Inloggen mislukt. Probeer het opnieuw.");
    }
}