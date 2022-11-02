document.addEventListener("DOMContentLoaded", async () => {
  let lgButton = document.getElementById("loginBtn");

  let login = async () => {
    return fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      }),
    })
      .then((res) => res.json())
      .then((e) => e);
  };

  let register = async () => {
    let valPasswd = document.getElementById("val-password").value;
    let passwd = document.getElementById("password").value;

    if (valPasswd == passwd) {
      fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: document.getElementById("username").value,
          password: document.getElementById("password").value,
        }),
      });

      await login();
    }
  };

  lgButton.addEventListener("click", async (e) => {
    e.preventDefault();

    if (window.location.href.includes('register')) {
      await register()
    }

    let userObj = await login();

    if (Object.keys(userObj).includes("uuid")) {
      localStorage.setItem("token", window.btoa(JSON.stringify(userObj)));
      window.location = "/index.html";
    }
  });
});
