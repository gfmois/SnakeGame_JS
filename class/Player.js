class Player {
  constructor(x, y, color, name, ctx) {
    this.x = x;
    this.oldX;
    this.oldY;
    this.y = y;
    this.color = color;
    this.name = name;
    this.ctx = ctx;
    this.bodyParts = [];
    this.direction = "";
    this.collision = false;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, 20, 20);
  }

  update(newX, newY) {
    this.ctx.clearRect(this.x, this.y, 20, 20);

    this.oldX = this.x;
    this.oldY = this.y;

    this.x = newX;
    this.y = newY;

    this.bodyParts.forEach((item) => {
        this.checkCollision(item)
    })

    this.ctx.fillRect(newX, newY, 20, 20);
    this.updateBody();
  }

  updateBody() {
    if (this.bodyParts.length > 0) {
      this.bodyParts.forEach((bodyItem, index) => {
        index == 0
          ? bodyItem.update(this.oldX, this.oldY)
          : bodyItem.update(
              this.bodyParts[index - 1].oldX,
              this.bodyParts[index - 1].oldY
            );
      });
    }
  }

  movement() {
    switch (this.direction) {
      case "DOWN":
        this.y != 380
          ? this.update(this.x, this.y + 20)
          : this.update(this.x, 0);
        break;
      case "UP":
        this.y == 0
          ? this.update(this.x, 380)
          : this.update(this.x, this.y - 20);
        break;
      case "LEFT":
        this.x == 0
          ? this.update(380, this.y)
          : this.update(this.x - 20, this.y);
        break;
      case "RIGHT":
        this.x != 380
          ? this.update(this.x + 20, this.y)
          : this.update(0, this.y);
        break;
      default:
        break;
    }
  }

  setDirection(direction) {
    this.direction = direction;
  }

  getDirection() {
    return this.direction;
  }

  checkCollision(block) {
    console.log(this.collision);

      if (
        block.x < this.x + 20 &&
        block.x + 20 > this.x &&
        block.y < this.y + 20 &&
        block.y + 20 > this.y
      ) {
        if (block.constructor.name == "Food") {
            let body = new Body(this.oldX, this.oldY, this.ctx);
            body.draw();
            this.bodyParts.push(body);
        } else {
            this.collision = true;
        }
    }
  }
}
