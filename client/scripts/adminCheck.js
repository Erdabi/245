// Importieren des jwt-decode Moduls
import jwt_decode from "jwt-decode";

// Definition der Funktion checkAdminRole
function checkAdminRole() {
    // Holen des Menü-Elements
    const menuButton = document.getElementById('menu-button');
    
    // Abrufen des Tokens aus dem lokalen Speicher
    const token = localStorage.getItem('token');
    if (token) {
        try {
            // Decodieren des Tokens
            const decoded = jwt_decode(token);
            // Überprüfen, ob der Benutzer die Admin-Rolle hat
            if (decoded.role === 'admin') {
                // Anzeigen des Menü-Elements, wenn der Benutzer ein Admin ist
                menuButton.style.display = 'block';
            } else {
                // Verstecken des Menü-Elements, wenn der Benutzer kein Admin ist
                menuButton.style.display = 'none';
            }
        } catch (error) {
            // Fehlerbehandlung, falls das Token nicht decodiert werden kann
            console.error("Fehler beim Decodieren des Tokens: ", error);
            menuButton.style.display = 'none';
        }
    } else {
        // Verstecken des Menü-Elements, falls kein Token vorhanden ist
        menuButton.style.display = 'none';
    }
}

// Exportieren der Funktion, falls notwendig
export { checkAdminRole };
