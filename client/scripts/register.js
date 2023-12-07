document.addEventListener("DOMContentLoaded", () => {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const cityInput = document.getElementById("city");
    const streetInput = document.getElementById("street");
    const eMailInput = document.getElementById("eMail");
    const phoneNumberInput = document.getElementById("number");
    const 
    const loginButton = document.getElementById("login");
    const errorText = document.getElementById("error");
    const resultText = document.getElementById("resultText");
  
    if (!usernameInput || !passwordInput || !loginButton || !errorText || !resultText) {
      console.error("One or more elements not found. Check HTML structure and IDs.");
      return;
    }
  
    loginButton.addEventListener("click", async () => {
      const username = usernameInput.value;
      const password = passwordInput.value;
      const city = cityInput.value;
      const street = streetInput.value;
      const eMail = eMailInput.value;
      const phoneNumber = phoneNumberInput.value;
  
      if (password.length < 6) {
        resultText.innerHTML = "Password must be at least 6 characters.";
        return;
      } else {
        resultText.innerHTML = "";
      }
  
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
  
        if (data?.token) {
          localStorage.setItem("token", data.token);
  
          window.location.href = "/";
        } else {
          errorText.innerText = data.error || "An error occurred.";
        }
      } catch (error) {
        console.error("An error occurred:", error);
        errorText.innerText = "An error occurred. Please try again.";
      }
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
  });
  