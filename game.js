document.addEventListener("DOMContentLoaded", (e) => {
  const canvasGame = document.querySelector("canvas");
  const ctx = canvasGame.getContext("2d");

  let dialog = document.getElementById('dialog')
  let score = document.getElementById('score')
  let acceptOption = document.getElementById('accept')
  let declineOption = document.getElementById('decline')

  const level = {
    difficulty: 250
  }

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
        if (parseInt(score.textContent) % 10 == 0 && parseInt(score.textContent) != 0 && changed == false) {
            if (level.difficulty >= 300) {
                changed = true;
                continueSpeed ? level.difficulty -= 50 : null
                clearInterval(interval)
                startInterval()
            } else {
                // Mostrar diálogo para poner el modo ultra díficil
                dialog.classList.remove('hide')
                clearInterval(interval)
            }
        } else if (parseInt(score.textContent) % 10 != 0) changed = false;


      player.movement();
      player.checkCollision(food);
      food.collision(player);
      player.draw();
      food.draw();
      drawGrid();
    } else clearInterval(interval);
  };

  startInterval = () => {
    interval = setInterval(() => {
        checkGame()
      }, level.difficulty)
  }

  startInterval()
  drawGrid();
  drawPlayer();
});
