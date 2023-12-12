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

    await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    });
};
});
