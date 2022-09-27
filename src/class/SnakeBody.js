class SnakeBody {
    constructor(x, y, ctx, direction = '') {
        this.x = x
        this.y = y
        this.oldX
        this.oldY
        this.ctx = ctx
        this.direction
        this.oldDirection
        this.sprite = new Image()
    }

    draw(headDirection) {
        this.direction = headDirection
        this.sprite.onload = () => {
            this.ctx.drawImage(this.sprite, this.x, this.y, 20, 20)
        }
    }

    update(newX, newY, newDirection) {
        let oldValue = this.direction
        this.setDirection(newDirection)
        this.oldDirection = oldValue

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

    setSnakeSpriteDirection(newDirection) {
        console.log(this.direction, newDirection);
        switch(true) {
            case this.direction == 'DOWN' && newDirection == 'LEFT':
                this.sprite.src = 'src/assets/img/snakeBody_rotateDownLeft.png'
                break
            case this.direction == 'UP' || this.direction == 'UP' 
            && newDirection == 'DOWN' || this.direction == 'DOWN':
                this.sprite.src = 'src/assets/img/snakeBody_down.png'
                break;
            case this.direction == 'RIGHT' || this.direction == 'RIGHT' 
            && newDirection == 'LEFT' || this.direction == 'LEFT':
                this.sprite.src = 'src/assets/img/snakeBody_left.png'
                break;
            default:
                this.sprite.src = 'src/assets/img/snakeBody_left.png'
                break;
        }

        this.draw()
    }
}

export { SnakeBody }
