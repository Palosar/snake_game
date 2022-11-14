// Snake variable holds all snake related details
class SnakeGame {
    constructor(board_height, board_width, pixel_updator) {
        this.board_dimensions = {
            width : board_width,
            height : board_height
        }
        this.snake_direction = 'right'
        this.snake_coords = [[0, 0]]
        this.update_pixel = pixel_updator
        this.food_pos = []
        
        this.generate_food()
        this.update_pixel(this.snake_coords[0], 'snake')
    }
    
    start() {
        let movement = this.move_snake.bind(this)
        this.move_interval = setInterval(movement, 120)
    }

    update_direction(new_direction) {
        this.snake_direction = new_direction
    }

    move_snake() {
        let offset;
    
        switch(this.snake_direction) {
            case "up":
                offset = [0, -1]
                break
            case "down":
                offset = [0, 1]
                break
            case "left":
                offset = [-1, 0]
                break
            case "right":
                offset = [1, 0]
                break
        }

        // move new head to offset
        let current_head_pos = this.snake_coords[0]
        let new_head_pos = [current_head_pos[0] + offset[0], current_head_pos[1]+ offset[1]]
        
        // check edge board cases
        if (new_head_pos[0] >= this.board_dimensions.width) {
            new_head_pos[0] = 0
        } else if (new_head_pos[0] < 0) {
            new_head_pos[0] = this.board_dimensions.width - 1
        }

        if (new_head_pos[1] >= this.board_dimensions.height) {
            new_head_pos[1] = 0
        } else if (new_head_pos[1] < 0) {
            new_head_pos[1] = this.board_dimensions.height - 1
        }

        // check if body is eaten
        if (JSON.stringify(this.snake_coords).indexOf(new_head_pos) != -1) {
            alert("Game over")
            clearInterval(this.move_interval)
        }

        // add new head position to list
        this.snake_coords.unshift(new_head_pos)

        this.update_pixel(this.snake_coords[0], 'snake')
        
        if (this.snake_coords[0][0] == this.food_pos[0] && 
            this.snake_coords[0][1] == this.food_pos[1]) {
            // eat food
            this.update_pixel(this.snake_coords[0], 'snake')
            this.generate_food()
        } else {
            // remove last snake body
            let last_pos = this.snake_coords.pop()
            this.update_pixel(last_pos)
        }
    }


    generate_food() {
        let new_food_col, new_food_row
        do {
            new_food_col = Math.floor(Math.random() * this.board_dimensions.width)
            new_food_row = Math.floor(Math.random() * this.board_dimensions.height)
            
            this.food_pos = [new_food_col, new_food_row]
        } while (this.food_pos in this.snake_coords)

        this.update_pixel(this.food_pos, 'food')
    }

}

function update_board_coord(coord, type) {
    let rows = document.getElementById("board").children
    let cols = rows[coord[1]].children
    
    let pixel = cols[coord[0]]

    // clear previous state
    pixel.classList.remove('food')
    pixel.classList.remove('snake')

    // apply new state if required
    if (arguments.length > 1) {
        pixel.classList.add(type)
    }
}

window.onload = function() {
    const game = new SnakeGame(10, 10, update_board_coord)

    // TODO: 
    window.addEventListener('keydown', function(e) {
        // disregard uppercase and lower case
        let keypressed = String(e.key).toLowerCase()
        console.log(keypressed)

        // detect key
        switch (keypressed) {
            case "w":
                if (game.snake_direction)
                game.snake_direction = "up"
                console.log("up")
                break
            case "s":
                game.snake_direction = "down"
                console.log("down")
                break
            case "d":
                game.snake_direction = "right"
                console.log("right")
                break
            case "a":
                game.snake_direction = "left"
                console.log("left")
                break
            case "escape":
                this.clearInterval(game.move_interval)   
        }
    });

    game.start()
}

/*
    Plan:
        - when food is eaten increase body size
        - add new value to body coords if food is eaten
        - as you move through, pop out last location in unshift head location
*/