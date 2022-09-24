import { SnakeBody } from "./SnakeBody.js";

export class Player {
    constructor(x, y, color, name, ctx) {
        this.x = x;
        this.y = y;
        this.oldX;
        this.oldY;
        this.color = color;
        this.name = name;
        this.ctx = ctx;
        this.direction = ''
        this.body = []
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, 20, 20)
    }

    update(newX, newY) {
        this.ctx.clearRect(this.x, this.y, 20, 20)

        this.x = newX;
        this.y = newY;

        this.ctx.fillRect(newX, newY, 20, 20)
    }

    updateBody() {
        if (this.body.length > 0) {
            this.body.forEach((bodyPart, index) => {
                bodyPart.draw()
                switch (this.getDirection()) {
                    case 'DOWN':
                        index == 0
                            ? bodyPart.update(this.oldX, this.oldY)
                            : bodyPart.update(this.oldX, this.body[index - 1].y - 20)
                        break;
                    case 'UP':
                        index == 0
                            ? bodyPart.update(this.oldX, this.oldY)
                            : bodyPart.update(this.oldX, this.body[index - 1].y + 20)
                        break;
                    case 'LEFT':
                        index == 0
                            ? bodyPart.update(this.oldX, this.oldY)
                            : bodyPart.update(this.body[index - 1].x + 20, this.oldY)
                        break;
                    case 'RIGHT':
                        index == 0
                            ? bodyPart.update(this.oldX, this.oldY)
                            : bodyPart.update(this.body[index - 1].x - 20, this.oldY)
                        break;
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
    }

    setDirection(direction) {
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
                const colors = ['red', 'yellow', 'blue', 'green']
                let selectedColor = Math.floor(Math.random() * colors.length - 0);

                console.log(colors[selectedColor]);

                let newBody = new SnakeBody(this.x, this.y, colors[selectedColor], this.ctx)
                newBody.draw()
                this.body.push(newBody)
            }
    }
    
}