// Abigail Chase
// Rocket Patrol 2: Spacetime Continuum
// It took 6 hours
// Created a new scrolling tile sprite for the background (1 point)
// Tracked a high score that persists across scenes and display it in the UI (1 point)
// Created a new title screen (e.g., new artwork, typography, layout) (3 points)
// Displayed the time remaining (in seconds) on the screen, and created a custom clock asset (3 points)
// Implemented mouse control for player movement and left mouse click to fire (5 points)
// Created a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5 points)
// Implemented a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5 points)

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set global variable high score
game.highScore = 0;

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT