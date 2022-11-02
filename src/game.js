document.addEventListener("DOMContentLoaded", (e) => {
  if (!localStorage.getItem('token')) window.location = '/auth.html'

  let user = JSON.parse(atob(localStorage.getItem('token')))

  document.getElementById('avatar').src = user.avatar;

  const canvasGame = document.querySelector("canvas");
  const ctx = canvasGame.getContext("2d");

  let dialog = document.getElementById("dialog");
  let score = document.getElementById("score");
  let acceptOption = document.getElementById("accept");
  let declineOption = document.getElementById("decline");

  let inside = 0, h_inside = 0;

  acceptOption.addEventListener("click", () => {
    if (level.mode == 'normal') {
      console.log('Inside_N');
      level.difficulty = 75;
      level.mode = 'speed'
      dialog.classList.add("hide");
      startInterval();

      return
    }

    if (level.mode == 'speed') {
      console.log('Inside_S');
      level.difficulty = 50;
      level.mode = 'hard'
      dialog.classList.add("hide");
      startInterval();

      return
    }
  });

  declineOption.addEventListener("click", () => {
    dialog.classList.add("hide");
    level.mode = 'normal'
    startInterval();
  });

  const level = {
    difficulty: 350,
    mode: 'normal'
  };

  const cHeight = (canvasGame.height = 400),
    cWidth = (canvasGame.width = 400);

  let playerX = Math.floor(Math.random() * 19 - 0 + 1) * 20;
  let foodX = Math.floor(Math.random() * 19 - 0 + 1) * 20;
  let foodY = Math.floor(Math.random() * 19 - 0 + 1) * 20;
  let playerY = Math.floor(Math.random() * 19 - 0 + 1) * 20;

  let food = new Food(foodX, foodY, "red", ctx);
  let player = new Player(playerX, playerY, "blue", "Moises", ctx);

  let cells = 20;

  const drawGrid = () => {
    ctx.lineWidth = 1.1;
    ctx.strokeStyle = "#232332";
    ctx.shadowBlur = 0;

    for (let i = 0; i < cells; i++) {
      let f = (cHeight / cells) * i;

      ctx.beginPath();
      ctx.moveTo(f, 0);
      ctx.lineTo(f, cHeight);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, f);
      ctx.lineTo(cHeight, f);
      ctx.stroke();

      ctx.closePath();
    }
  };

  const drawPlayer = () => {
    player.draw();
    food.draw();

    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 37:
          player.setDirection("LEFT");
          break;
        case 39:
          player.setDirection("RIGHT");
          break;
        case 38:
          player.setDirection("UP");
          break;
        case 40:
          player.setDirection("DOWN");
          break;
      }
    });
  };

  let interval;
  let changed = false;
  let continueSpeed = true;

  checkGame = () => {
    if (player.collision == false) {
      if (
        parseInt(score.textContent) % 10 == 0 &&
        parseInt(score.textContent) != 0 &&
        changed == false
      ) {
        if (level.difficulty >= 300) {
          changed = true;
          continueSpeed ? (level.difficulty -= 50) : null;
          clearInterval(interval);
          startInterval();
        } else {
          if (inside == 0) {
            dialog.classList.remove("hide");
            clearInterval(interval);
            inside++
          }
        }
      } else if (parseInt(score.textContent) >= 50) {
        if (h_inside == 0) {
          dialog.classList.remove('hide')
          clearInterval(interval)
          h_inside++
        }
      } else if (parseInt(score.textContent) % 10 != 0) changed = false;

      player.movement();
      player.checkCollision(food);
      food.collision(player);
      player.draw();
      food.draw();
      drawGrid();
    } else {
      clearInterval(interval);

      fetch('http://localhost:3000/score/setScore', {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({
          uuid: user.uuid,
          mode: level.mode,
          score: score.textContent
        })
      }).then((res) => res.json()).then((e) => e)
    }
  };

  startInterval = () => {
    interval = setInterval(() => {
      checkGame();
    }, level.difficulty);
  };

  startInterval();
  drawGrid();
  drawPlayer();
});
