// GAME ENVIRONMENT SETUP

// initial snake setup
var snake = {
    direction:"test",
    body_coords:[],
}

// ----------------------
// SNAKE RELATED MOVEMENT
// ----------------------

window.addEventListener('keydown', function(e) {
    // disregard uppercase and lower case
    let keypressed = String(e.key).toLowerCase()

    // detect key
    switch (keypressed) {
        case "w":
            console.log("up")
            break
        case "s":
            console.log("down")
            break
        case "d":
            console.log("right")
            break
        case "a":
            console.log("left")
            break
        
    }
});
/*
    Plan:
        - when food is eaten increase body size
        - add new value to body coords if food is eaten
        - as you move through, pop out last location in unshift head location
*/