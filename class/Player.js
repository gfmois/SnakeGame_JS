export class Player {
    constructor(x, y, color, name, ctx) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.name = name;
        this.ctx = ctx;
        this.direction = ''
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

    movement() {


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
        let newX = (Math.floor(Math.random() * 19 - 0 + 1)) * 20;
        let newY = (Math.floor(Math.random() * 19 - 0 + 1)) * 20;

        if (
            this.x < block.x + 20 &&
            this.x + 20 > block.x &&
            this.y < block.y + 20 &&
            this.y + 20 > block.y
            ) {
                this.update(newX, newY)
            }
    }
    
}