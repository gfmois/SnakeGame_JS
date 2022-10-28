document.addEventListener("DOMContentLoaded", async () => {
  let lgButton = document.getElementById("loginBtn");

  let dummies = [
    {
        username: "gfmois",
        password: btoa('123'),
        score: {
          normal: "15",
          speed: "7",
          hard: "3"
        },
        position: "35"
    },
    {
      username: "bioskin",
      password: btoa('12345'),
      topScore: "0"
    }
  ]

  let login = async () => {
    return fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify( {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
      })
    }).then((res) => res.json()).then((e) => e)
  }

  lgButton.addEventListener("click", async (e) => {
    e.preventDefault();
    let userObj = await login();    

    if (Object.keys(userObj).includes('uuid')) {
      localStorage.setItem('token', window.btoa(JSON.stringify(userObj)))
      window.location = '/index.html'
    }
  });

});