class SnakeBody {
    constructor(x, y, ctx) {
        this.x = x
        this.y = y
        this.ctx = ctx
        this.direction
        this.oldDirection
        this.nextDirection
        this.sprite = new Image()
    }

    draw(headDirection) {
        this.direction = headDirection
        this.sprite.onload = () => {
            this.ctx.drawImage(this.sprite, this.x, this.y, 20, 20)
        }
    }

    update(newX, newY, newDirection) {
        this.ctx.clearRect(this.x, this.y, 20, 20)
        
        this.x = newX;
        this.y = newY;
        
        this.nextDirection = newDirection

        this.sprite.onload = () => {
            this.ctx.drawImage(this.sprite, this.x, this.y, 20, 20)
        }
    }

    setSnakeSpriteDirection(newDirection) {
        console.log(this.nextDirection, newDirection);
        if (this.nextDirection != newDirection) {
            switch (true) {
                case this.nextDirection == 'LEFT' && newDirection == 'DOWN':
                    this.sprite.src = 'src/assets/img/snakeBody_rotateDownLeft.png'
                    break
            }
        } else {
            console.log('A');
            switch (true) {
                case this.nextDirection == 'LEFT' || this.nextDirection == 'RIGHT':
                    this.sprite.src = 'src/assets/img/snakeBody_down.png'
                    break;
            }
        }

        this.draw()
    }
}

export { SnakeBody }
