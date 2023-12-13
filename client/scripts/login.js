document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginButton = document.getElementById("login");
  const errorText = document.getElementById("error");
  const resultText = document.getElementById("resultText");

  if (!usernameInput || !passwordInput || !loginButton || !errorText || !resultText) {
    console.error("One or more elements not found. Check HTML structure and IDs.");
    return;
  }

  loginButton.addEventListener("click", async () => {
    postLoginData();
        
  });
  const postLoginData = async () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    const loginData = {
        username: username,
        password: password
    };

    const response = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    });
    if (response.ok) {
      const result = await response.json();
      window.location.href = '../index.html';
    } else {
      alert("Der Benutzername oder das Passwort ist falsch");
      console.log("22")
    }
};
});
