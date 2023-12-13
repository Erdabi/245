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
   
  });
});
const postRegisterData = async () => {
  const username = document.getElementById('username').value;
  const city = document.getElementById('city').value;
  const street = document.getElementById('street').value;
  const eMail = document.getElementById('eMail').value;
  const phoneNumber = document.getElementById('number').value;
  const password = document.getElementById('password').value;

  if (!eMail.value || !password.value || !username.value) {
 
  if (!eMail.value) {
    document.getElementById('eMail').style.backgroundColor = 'red';
    setTimeout(2000)
    document.getElementById('eMail').style.backgroundColor = 'white';
  }
  if (!password.value) {
    document.getElementById('password').style.backgroundColor = 'red';
    setTimeout(2000)
    document.getElementById('password').style.backgroundColor = 'white';
  }
  if (!username.value) {
    document.getElementById('username').style.backgroundColor = 'red';
    setTimeout(2000)
    document.getElementById('username').style.backgroundColor = 'white';
  }
} else {

  const registerData = {
      username: username,
      city: city,
      street: street,
      eMail: eMail,
      phoneNumber: phoneNumber,
      password: password
  };

  response = await fetch("/api/users", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
  });
  let result = await response.json();
  console.log(result)
  if (result === 0) {
    alert("Die Regestrierung war erfolgreich")
  } else if(result === 1) {
    alert("Der Benutzername ist besetzt");
  } else if(result === 2) {
    alert("Die Email ist besetzt");
  }
}
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
  
