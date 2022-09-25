class SnakeBody {
    constructor(x, y, ctx, direction = '') {
        this.x = x
        this.y = y
        this.oldX
        this.oldY
        this.ctx = ctx
        this.direction
        this.sprite = new Image()
    }

    draw(headDirection) {
        this.direction = headDirection
        this.sprite.onload = () => {
            this.ctx.drawImage(this.sprite, this.x, this.y, 20, 20)
        }
    }

    update(newX, newY, newDirection) {
        this.setDirection(newDirection)

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
        this.direction = nDirection
    }

    getDirection() {
        return this.direction
    }

    setSnakeSpriteDirection(newDirection) {
        console.log('NewDirection', newDirection, 'OldDirection', this.getDirection());
        this.draw()
    }
}

export { SnakeBody }
