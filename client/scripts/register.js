document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const cityInput = document.getElementById("city");
  const streetInput = document.getElementById("street");
  const eMailInput = document.getElementById("eMail");
  const phoneNumberInput = document.getElementById("number");
  const registerButton = document.getElementById("register");
  const resultText = document.getElementById("resultText");

  registerButton.addEventListener("click", async () => {

    postRegisterData();
    alert("Die Registrierung war erfolgreich");
  console.log("Granat");
  });
});
const postRegisterData = async () => {
  const username = document.getElementById('username').value;
  const city = document.getElementById('city').value;
  const street = document.getElementById('street').value;
  const eMail = document.getElementById('eMail').value;
  const phoneNumber = document.getElementById('number').value;
  const password = document.getElementById('password').value;

  const registerData = {
      username: username,
      city: city,
      street: street,
      eMail: eMail,
      phoneNumber: phoneNumber,
      password: password
  };

  await fetch("/api/users", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
  });
};

function formatPhoneNumber(input) {
    // Remove non-numeric characters
    let phoneNumber = input.value.replace(/\D/g, '');
  
    // Apply the pattern (xxx-xxx-xx-xx)
    if (phoneNumber.length > 2) {
      phoneNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
    }
  
    // Limit the length to the pattern's length
    if (phoneNumber.length >= 13) {
      phoneNumber = phoneNumber.slice(0, 13);
    }
  
    // Update the input value
    input.value = phoneNumber;
  }
  
