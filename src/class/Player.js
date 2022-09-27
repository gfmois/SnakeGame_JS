class Player {
    constructor(x, y, name, ctx) {
        this.x = x;
        this.y = y;
        this.oldX;
        this.oldY;
        this.name = name;
        this.ctx = ctx;
        this.direction
        this.oldDirection
        this.body = []
        this.sprite = new Image()
        this.counter = 0;
    }

    draw() {
        switch (this.getDirection()) {
            case 'UP':
                this.sprite.src = 'src/assets/img/snakeHead.png'
                break;
            case 'DOWN':
                this.sprite.src = 'src/assets/img/snakeHead_down.png'
                break;
            case 'RIGHT':
                this.sprite.src = 'src/assets/img/snakeHead_right.png'
                break;
            case 'LEFT':
                this.sprite.src = 'src/assets/img/snakeHead_left.png'
                break;
            default: 
                this.sprite.src = 'src/assets/img/snakeHead.png'
                break;
        }

        this.sprite.onload = () => {
            this.ctx.drawImage(this.sprite, this.x, this.y, 20, 20)
        }
    }

    update(newX, newY) {
        this.ctx.clearRect(this.x, this.y, 20, 20)

        this.x = newX;
        this.y = newY;
    }

    updateBody() {
        if (this.body.length > 0) {
            this.body.forEach((bodyPart, index) => {
                index == 0
                    ? (
                        bodyPart.update(this.x, this.y, this.oldDirection),
                        bodyPart.setSnakeSpriteDirection(this.direction)
                    )
                    : (
                        bodyPart.update(
                            this.body[index - 1].oldX, 
                            this.body[index - 1].oldY, 
                            this.body[index - 1].oldDirection
                        ),
                        bodyPart.setSnakeSpriteDirection(this.body[index - 1].getDirection())   
                    )
            })
        }
    }

    
    movement() {
        this.updateBody()
        this.oldY = this.y
        this.oldX = this.x

        switch (this.direction) {
            case 'DOWN':
                this.y != 380
                    ? this.update(this.x, this.y + 20)
                    : this.update(this.x, 0)
                break;
            case 'UP':
                this.y == 0
                    ? this.update(this.x, 380)
                    : this.update(this.x, this.y - 20)
                break;
            case 'LEFT':
                this.x == 0
                    ? this.update(380, this.y)
                    : this.update(this.x - 20, this.y)
                break;
            case 'RIGHT':
                this.x != 380
                    ? this.update(this.x + 20, this.y)
                    : this.update(0, this.y)
                break;
            default:
                break;
        }

        this.oldDirection = this.direction
    }

    setDirection(direction) {
        this.oldDirection = this.direction
        this.direction = direction
    }

    getDirection() {
        return this.direction
    }

    checkCollision(block) {
        if (
            this.x < block.x + 20 &&
            this.x + 20 > block.x &&
            this.y < block.y + 20 &&
            this.y + 20 > block.y
            ) {
                let newBody = new SnakeBody(this.x, this.y, this.ctx)
                console.log(newBody);
                newBody.setDirection()
                this.body.push(newBody)
            }
    }
    
}