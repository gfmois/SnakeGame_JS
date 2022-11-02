document.addEventListener("DOMContentLoaded", async () => {
  if (localStorage.getItem("token")) {
    let token = JSON.parse(atob(localStorage.getItem("token")));
    let username = document.getElementById("username");
    let mode_ranking = document.getElementById("mode-ranking");
    let user_ranking = [];

    let headColor = document.getElementById("head-color");
    let bodyColor = document.getElementById("body-color");
    let appleColor = document.getElementById("apple-bg-color");

    headColor.value = localStorage.getItem("hcolor") || "black";
    bodyColor.value = localStorage.getItem("bcolor") || "black";
    appleColor.value = localStorage.getItem("acolor") || "black";

    let ranking_div = Array.from(mode_ranking.childNodes)
      .filter((e) => e.nodeName != "#text" && e.tagName != "H3")
      .sort((a, b) => a > b);

    user_ranking = await fetch(
      `http://localhost:3000/score/getUserScore?uuid=${token.uuid}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((e) => e);

    username.appendChild(
      document.createTextNode(`Username: ${token.username}`)
    );

    user_ranking
      .sort((a, b) => a < b)
      .map((e, i) => {
        ranking_div.map((k) => {
          if (k.className.includes(e.mode)) {
            k.appendChild(
              document.createTextNode(`${e.points} - ${e.mode.toUpperCase()}`)
            );
          }
        });
      });

    headColor.addEventListener("change", () => {
      localStorage.setItem("hcolor", headColor.value);
    });

    bodyColor.addEventListener("change", () => {
      localStorage.setItem("bcolor", bodyColor.value);
    });

    appleColor.addEventListener("change", () => {
      localStorage.setItem("acolor", appleColor.value);
    });
  } else window.location = "index.html";

  document.getElementById("backbtn").addEventListener("click", (e) => {
    e.preventDefault();
    window.location = "index.html";
  });

  document.getElementById("logout").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location = "index.html";
  });
});
