class SnakeBody {
    constructor(x, y, ctx) {
        this.x = x
        this.y = y
        this.oldX
        this.oldY
        this.ctx = ctx
        this.direction
        this.oldDirection
        this.sprite = new Image()
        this.sprites = {
            LEFT_RIGTH: 'src/assets/img/snakeBody_left.png',
            UP_RIGHT: "src/assets/img/snakeBody_rotateUpRight.png",
            UP_LEFT: 'src/assets/img/snakeBody_rotateUpLeft.png',
            DOWN_LEFT: "src/assets/img/snakeBody_rotateDownLeft.png",
            DOWN_RIGTH: "src/assets/img/snakeBody_rotateDownRight.png",
            DOWN_UP: 'src/assets/img/snakeBody_down.png',
        }
    }

    draw(headDirection) {
        this.direction = headDirection
        this.sprite.onload = () => {
            this.ctx.drawImage(this.sprite, this.x, this.y, 20, 20)
        }
    }

    async update(newX, newY, newDirection) {
        this.oldDirection =  await this.direction
        this.direction =  newDirection

        this.ctx.clearRect(this.x, this.y, 20, 20)

        this.oldX = this.x
        this.oldY = this.y
        this.x = newX;
        this.y = newY;
        
        this.sprite.onload = () => {
            this.ctx.drawImage(this.sprite, this.x, this.y, 20, 20)
        }
    }

    setDirection(nDirection) {
        this.oldDirection = this.direction
        this.direction = nDirection
    }

    getDirection() {
        return this.direction
    }

    checkPart(nextMove, player, nextBodyPart) {
        // ANCHOR: Left Site
        // if (player.x == nextMove.x && nextMove.x < this.x) {
        //     // NOTE U Movement Up from Left
        //     if (this.y > player.y) {
        //         this.sprite.src = 'src/assets/img/snakeBody_rotateUpRight.png'
        //         if (typeof nextBodyPart != "undefined" && player.x < this.x) {
        //             console.log('A');
        //             // nextBodyPart.sprite.src = "src/assets/img/snakeBody_rotateUpLeft.png"
        //         } else if (typeof nextBodyPart != "undefined") {
        //             nextBodyPart.sprite.src = 'src/assets/img/snakeBody_rotateDownLeft.png'
        //         }
        //     // NOTE ⋂ Movement from Left
        //     } else if (this.y < player.y) {
        //         this.sprite.src = 'src/assets/img/snakeBody_rotateDownRight.png'
        //         if (typeof nextBodyPart != "undefined") {
        //             nextBodyPart.sprite.src = 'src/assets/img/snakeBody_rotateUpLeft.png'
        //         }
        //     }
        // // ANCHOR Right Site
        // } else if (player.x == nextMove.x && nextMove.x > this.x) {
        //     // NOTE U ⊐ Movement from Left
        //     if (this.y > player.y) {
        //         this.sprite.src = 'src/assets/img/snakeBody_rotateDownLeft.png'
        //         if (typeof nextBodyPart != "undefined") {
        //             nextBodyPart.sprite.src = 'src/assets/img/snakeBody_rotateUpRight.png'
        //         }
        //     // NOTE ⋂⊐ Movement from Left
        //     } else if (this.y < player.y) {
        //         this.sprite.src = 'src/assets/img/snakeBody_rotateUpLeft.png'
        //         if (typeof nextBodyPart != "undefined") {
        //             nextBodyPart.sprite.src = 'src/assets/img/snakeBody_rotateDownRight.png'
        //         }
        //     }
        // // ANCHOR Right and Left Movement    
        // } else if (
        //     player.x > nextMove.x && nextMove.x > this.x || 
        //     player.x < nextMove.x && nextMove.x < this.x
        // ) {
        //     this.sprite.src = 'src/assets/img/snakeBody_left.png'
        // // ANCHOR Up Down Movement
        // } else if (
        //     player.y > nextMove.y && nextMove.y > this.y ||
        //     player.y < nextMove.y && nextMove.y < this.y
        // ) {
        //     this.sprite.src = 'src/assets/img/snakeBody_down.png'
        // }
        
        // FIXME RIGHT LEFT MOVEMENT
        if (nextMove.x > this.x || nextMove.x < this.x) {
            this.sprite.src = this.sprites.LEFT_RIGTH
            if (player.y > this.y) {
                if (player.x > this.x && player.x == nextMove.x) {
                    this.sprite.src = this.sprites.UP_LEFT
                } else if (player.x < this.x && player.x == nextMove.x) {
                    this.sprite.src = this.sprites.DOWN_RIGTH
                }
            } else if (player.y < this.y) {
                if (player.x > this.x && player.x == nextMove.x) {
                    this.sprite.src = this.sprites.DOWN_LEFT
                } else if (player.x < this.x && player.x == nextMove.x) {
                    this.sprite.src = this.sprites.UP_RIGHT
                }
            }
        } else if (nextMove.y > this.y || nextMove.y < this.y) {
            this.sprite.src = this.sprites.DOWN_UP
            if (player.x > this.x) {
                if (player.y > this.y && player.y == nextMove.y) {
                    this.sprite.src = this.sprites.UP_RIGHT
                } else if (player.y < this.y && player.y == nextMove.y) {
                    this.sprite.src = this.sprites.DOWN_RIGTH
                }
            } else if (player.x < this.x) {
                if (player.y > this.y && player.y == nextMove.y) {
                    this.sprite.src = this.sprites.UP_RIGHT
                } else if (player.y < this.y && player.y == nextMove.y) {
                    this.sprite.src = this.sprites.DOWN_RIGTH
                }
            }
        }


        this.draw()
    }

    setSnakeSpriteDirection(newDirection) {
        // switch(true) {
        //     case this.direction == 'DOWN' && newDirection == 'LEFT':
        //         this.sprite.src = 'src/assets/img/snakeBody_rotateDownLeft.png'
        //         break
        //     case this.direction == 'UP' || this.direction == 'UP' 
        //     && newDirection == 'DOWN' || this.direction == 'DOWN':
        //         this.sprite.src = 'src/assets/img/snakeBody_down.png'
        //         break;
        //     case this.direction == 'RIGHT' || this.direction == 'RIGHT' 
        //     && newDirection == 'LEFT' || this.direction == 'LEFT':
        //         this.sprite.src = 'src/assets/img/snakeBody_left.png'
        //         break;
        //     default:
        //         this.sprite.src = 'src/assets/img/snakeBody_left.png'
        //         break;
        // }

        // this.draw()
    }
}