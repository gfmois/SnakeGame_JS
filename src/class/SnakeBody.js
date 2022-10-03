class SnakeBody {
    constructor(x, y, ctx, name) {
        this.x = x
        this.y = y
        this.oldX
        this.oldY
        this.ctx = ctx
        this.direction
        this.oldDirection
        this.sprite = new Image()
        this.name = name
        this.lastCorner
        this.sprites = {
            LEFT_RIGTH: 'src/assets/img/snakeBody_left.png',
            UP_RIGHT: "src/assets/img/snakeBody_rotateUpRight.png",
            UP_LEFT: 'src/assets/img/snakeBody_rotateUpLeft.png',
            DOWN_LEFT: "src/assets/img/snakeBody_rotateDownLeft.png",
            DOWN_RIGTH: "src/assets/img/snakeBody_rotateDownRight.png",
            DOWN_UP: 'src/assets/img/snakeBody_down.png',
        }
        this.directions = {
            LEFT: "LEFT",
            RIGHT: "RIGHT",
            UP: "UP",
            DOWN: "DOWN"
        }
    }

    draw() {
        this.sprite.onload = () => {
            this.ctx.drawImage(this.sprite, this.x, this.y, 20, 20)
        }
    }

    async update(newX, newY) {
        this.ctx.clearRect(this.x, this.y, 20, 20)

        this.oldX = await this.x
        this.oldY = await this.y
        this.x = newX;
        this.y = newY;
        
        this.sprite.onload = () => {
            this.ctx.drawImage(this.sprite, this.x, this.y, 20, 20)
        }
    }

    checkPart(previousBodyPart, player, nextBodyPart) {
        previousBodyPart = typeof previousBodyPart == "undefined" ? player : previousBodyPart
        nextBodyPart = typeof nextBodyPart == "undefined" ? this : nextBodyPart
        
        // FIXME RIGHT LEFT MOVEMENT
        if (previousBodyPart.x > this.x || previousBodyPart.x < this.x) {
            this.sprite.src = this.sprites.LEFT_RIGTH

            if (player.y > this.y) {
                if (player.x > this.x && player.x == previousBodyPart.x) {
                    console.log('A');
                    this.sprite.src = this.sprites.UP_LEFT
                    console.log(typeof nextBodyPart);
                    if (typeof nextBodyPart != "undefined") {
                        console.log();
                        console.log(player.y > this.y);
                        console.log(this.y == nextBodyPart.y);
                        if (this.y == previousBodyPart.y && this.x > nextBodyPart.x) {
                            if (this.y < player.y) {
                                console.log(true, "piuta");
                            }
                        }
                        console.log('B');
                    }
                    this.lastCorner = "LEFT - DOWN"
                } else if (player.x < this.x && player.x == previousBodyPart.x) {
                    this.sprite.src = this.sprites.DOWN_RIGTH
                    this.lastCorner = "RIGTH - DOWN"
                }
            } else if (player.y < this.y) {
                if (player.x > this.x && player.x == previousBodyPart.x) {
                    this.sprite.src = this.sprites.DOWN_LEFT
                    console.log("LEFT - UP");
                    this.lastCorner = "LEFT - UP"
                } else if (player.x < this.x && player.x == previousBodyPart.x) {
                    this.sprite.src = this.sprites.UP_RIGHT
                    console.log("RIGTH - UP");
                    this.lastCorner = "RIGTH - UP"
                }
            }
        } else if (previousBodyPart.y > this.y || previousBodyPart.y < this.y) {
            this.sprite.src = this.sprites.DOWN_UP
            if (player.x > this.x) {
                if (player.y > this.y && player.y == previousBodyPart.y) {
                    this.sprite.src = this.sprites.UP_RIGHT
                    console.log("DOWN - RIGTH");
                    this.lastCorner = "DOWN - RIGTH"
                } else if (player.y < this.y && player.y == previousBodyPart.y) {
                    this.sprite.src = this.sprites.DOWN_RIGTH
                    console.log("UP - RIGTH");
                    this.lastCorner = "UP - RIGTH"
                }
            } else if (player.x < this.x) {
                if (player.y > this.y && player.y == previousBodyPart.y) {
                    this.sprite.src = this.sprites.DOWN_LEFT
                    console.log("DOWN - LEFT");
                    this.lastCorner = "DOWN - LEFT"
                } else if (player.y < this.y && player.y == previousBodyPart.y) {
                    this.sprite.src = this.sprites.UP_LEFT
                    console.log("UP - LEFT");
                    this.lastCorner = "UP - LEFT"
                }
            }
        }


        this.draw()
    }

    asdf(player) {
        // Left
        if (this.x > player.x || this.x < player.x) {
            this.sprite.src = this.sprites.LEFT_RIGTH
        // Up Down
        } else if (this.y > player.y || this.y < player.y) {
            this.sprite.src = this.sprites.DOWN_UP
        }
    }
}