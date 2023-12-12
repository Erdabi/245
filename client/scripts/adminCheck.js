import jwt_decode from "jwt-decode";

function checkAdminRole() {
    // Verstecken Sie das Dropdown-Menü standardmäßig
    const dropdownMenu = document.getElementById('dropdown');
    dropdownMenu.style.display = 'none';

    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = jwt_decode(token);
            if (decoded.role === 'admin') {
                // Zeigt das Dropdown-Menü an, wenn der Benutzer ein Admin ist
                dropdownMenu.style.display = 'block';
            }
        } catch (error) {
            console.error("Fehler beim Decodieren des Tokens: ", error);
            // Das Dropdown-Menü bleibt versteckt, falls das Token ungültig ist
        }
    }
    // Das Dropdown-Menü bleibt versteckt, falls kein Token vorhanden ist
}

document.addEventListener('DOMContentLoaded', checkAdminRole);
