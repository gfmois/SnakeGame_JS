export class Food {
    constructor(x, y, color, ctx) {
        this.x = x
        this.y = y
        this.color = color
        this.ctx = ctx
    }

    draw() {
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.x, this.y, 20, 20)
    }

    update(newX, newY) {
        this.x = newX;
        this.y = newY;

        this.ctx.fillRect(newX, newY, 20, 20)
    }
}