import { Food } from './class/Food.js';
import { Player } from './class/Player.js'

document.addEventListener('DOMContentLoaded', (e) => {
    const canvasGame = document.querySelector('canvas')
    const ctx = canvasGame.getContext('2d')
    
    const 
    cHeight = canvasGame.height = 400,
    cWidth = canvasGame.width = 400;

    let cells = 20;

    const drawGrid = () => {
        ctx.lineWidth = 1.1
        ctx.strokeStyle = '#232332'
        ctx.shadowBlur = 0

        for (let i = 0; i < cells; i++) {
            let f = (cHeight / cells) * i

            ctx.beginPath()
            ctx.moveTo(f, 0);
            ctx.lineTo(f, cHeight)
            ctx.stroke()

            ctx.beginPath();
            ctx.moveTo(0, f)
            ctx.lineTo(cHeight, f)
            ctx.stroke()

            ctx.closePath()
            
        }
    }

    const drawPlayer = () => {
        let playerX = Math.floor(Math.random() * 19 - 0 + 1) * 20
        let playerY = Math.floor(Math.random() * 19 - 0 + 1) * 20

        let food = new Food(100, 100, 'red', ctx)
        let player = new Player(playerX, playerY, 'blue', 'Moises', ctx)


        player.draw()

        document.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case 37:
                    player.x == 0
                        ? player.update(380, player.y)
                        : player.update(player.x - 20, player.y)
                    break;
                case 39:
                    player.x != 380
                        ? player.update(player.x + 20, player.y)
                        : player.update(0, player.y)
                    break
                case 38:
                    player.y == 0
                        ? player.update(player.x, 380)
                        : player.update(player.x, player.y - 20)
                    break
                case 40:
                    player.y != 380
                        ? player.update(player.x, player.y + 20)
                        : player.update(player.x, 0)
                    break;
            }

            if (
                player.x < food.x + 20 &&
                player.x + 20 > food.x &&
                player.y < food.y + 20 &&
                player.y + 20 > food.y
            ) {
                let newX = (Math.floor(Math.random() * 19 - 0 + 1)) * 20;
                let newY = (Math.floor(Math.random() * 19 - 0 + 1)) * 20;

                food.update(newX, newY)
            }

            drawGrid()
            
        })
        
        food.draw()
    }
    
    drawGrid()
    drawPlayer()
})
