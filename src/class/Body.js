class Body {
    constructor(x, y, ctx) {
        this.x = x
        this.oldX
        this.y = y
        this.oldY
        this.ctx = ctx
    }

    draw() {
        this.ctx.fillStyle = localStorage.getItem('bcolor') || localStorage.getItem('hcolor');
        this.ctx.fillRect(this.x, this.y, 20, 20)
    }

    update(newX, newY) {
        this.ctx.clearRect(this.x, this.y, 20, 20)

        this.oldX = this.x
        this.oldY = this.y

        this.x = newX
        this.y = newY
        
        this.ctx.fillStyle = localStorage.getItem('bcolor') || localStorage.getItem('hcolor');
        this.ctx.fillRect(this.x, this.y, 20, 20)
    }
}