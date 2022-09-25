export class Food {
    constructor(x, y, color, ctx) {
        this.x = x
        this.y = y
        this.color = color
        this.ctx = ctx
    }

    draw() {
        let img = new Image()

        img.src = 'src/assets/img/apple.png'
        img.onload = () => {
            this.ctx.drawImage(img, this.x, this.y, 20, 20);
            // this.ctx.fillStyle = this.color
            // this.ctx.fillRect(this.x, this.y, 20, 20)
        }

    }

    update(newX, newY) {
        this.ctx.clearRect(this.x, this.y, 20, 20)

        this.x = newX;
        this.y = newY;

        // this.ctx.fillRect(newX, newY, 20, 20)
    }

    collision(player) {
        let newX = (Math.floor(Math.random() * 19 - 0 + 1)) * 20;
        let newY = (Math.floor(Math.random() * 19 - 0 + 1)) * 20;

        if (
            player.x < this.x + 20 &&
            player.x + 20 > this.x &&
            player.y < this.y + 20 &&
            player.y + 20 > this.y
            ) {
                this.update(newX, newY)
            }
    }
}