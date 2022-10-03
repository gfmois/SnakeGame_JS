class Player {
    constructor(x, y, name, ctx) {
        this.x = x;
        this.y = y;
        this.oldX;
        this.oldY;
        this.name = name;
        this.ctx = ctx;
        this.direction
        this.direction = ['RIGHT', 'LEFT', 'UP', 'DOWN']
        this.oldDirection
        this.body = []
        this.sprite = new Image()
        this.counter = 0;
        this.interval
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

    async update(newX, newY) {
        this.ctx.clearRect(this.x, this.y, 20, 20)

        this.x = await newX;
        this.y = await newY;
    }

    destroy(interval) {
        clearInterval(interval)
    }

    updateBody() {
        if (this.body.length > 0) {
            this.body.forEach((bodyPart, index) => {
                this.checkCollision(bodyPart, this.interval)
                if( index == 0 ) {
                    bodyPart.update(this.x, this.y)
                    bodyPart.asdf(this)
                } else {
                    bodyPart.update(
                        this.body[index - 1].x, 
                        this.body[index - 1].y, 
                        this.body[index - 1].direction
                    )
                    if (index + 1 != this.body.length) {
                        bodyPart.checkPart(this.body[index - 1], this, this.body[index + 1])
                    } else {
                        bodyPart.checkPart(this.body[index - 1], this, undefined)
                    }
                }
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

    checkCollision(block, interval) {
        if (
            this.x < block.x + 20 &&
            this.x + 20 > block.x &&
            this.y < block.y + 20 &&
            this.y + 20 > block.y
            ) {
                if (block.constructor.name == "Food") {
                    let name = this.body.length
                    let newBody = new SnakeBody(this.x, this.y, this.ctx, name)
                    this.body.push(newBody)
                } else {
                    if (block.constructor.name == "SnakeBody" && block.x == this.x && this.y == block.y) {
                        console.log(this.x, block.x);
                        this.destroy(this.interval)
                    }
                }
            }
    }
    
}