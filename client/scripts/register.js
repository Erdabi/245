const { initializeDatabase } = require('../..server/database');

document.addEventListener("DOMContentLoaded", async () => {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const cityInput = document.getElementById("city");
  const streetInput = document.getElementById("street");
  const eMailInput = document.getElementById("eMail");
  const phoneNumberInput = document.getElementById("number");
  const registerButton = document.getElementById("register");
  const errorText = document.getElementById("error");
  const resultText = document.getElementById("resultText");

  if (!usernameInput || !passwordInput || !registerButton || !errorText || !resultText) {
    console.error("One or more elements not found. Check HTML structure and IDs.");
    return;
  }

  registerButton.addEventListener("click", async () => {
      const username = usernameInput.value;
      const password = passwordInput.value;
      const city = cityInput.value;
      const street = streetInput.value;
      const eMail = eMailInput.value;
      const phoneNumber = phoneNumberInput.value;

      if (password.length < 6) {
          resultText.innerHTML = "Password must be at least 6 characters.";
          return;
      } 
      if (!city) {
          resultText.innerHTML = "City is empty";
          return;
      } 
      if (!street) {
          resultText.innerHTML = "Street is empty";
          return;
      }

      // Hier rufe die Funktion auf, um die Daten in die Datenbank einzufügen
      const db = await initializeDatabase(); // Stelle sicher, dass die Datenbank initialisiert ist
      const query = `INSERT INTO users (username, password, city, street, email, tel) VALUES (?, ?, ?, ?, ?, ?)`;
      try {
          await insertDB(db, query, [username, password, city, street, eMail, phoneNumber]);
          resultText.innerHTML = "Registration successful!";
      } catch (error) {
          resultText.innerHTML = "Error registering user.";
      }
  });
});

  function formatPhoneNumber(input) {
    // Remove non-numeric characters
    let phoneNumber = input.value.replace(/\D/g, '');
  
    // Apply the pattern (xxx-xxx-xx-xx)
    if (phoneNumber.length > 2) {
      phoneNumber = phoneNumber.replace(/(\d{3})\s?(\d{3})\s?(\d{2})\s?(\d{2})/, '$1 $2 $3 $4');
    }
    
    if (phoneNumber.length = 13) {
      phoneNumber = phoneNumber.slice(0, 13);
    }
  
    // Update the input value
    input.value = phoneNumber;
  }
  