const VIEWPORT_WIDTH = window.innerWidth;
const VIEWPORT_HEIGHT = window.innerHeight;

const game = new Game(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

function preload() {
    game.preload();
}


function setup() {
    createCanvas(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
    noCursor();
    game.setup();
}

function draw() {
    game.draw();
}


// function keyPressed() {
//     if (keyCode === 38) {
//         game.spaceship.jump();
//     }
// }

function mouseMoved(event) {
    game.moveSpaceship(new Position(maxBetween(mouseX, 0), maxBetween(mouseY, 0)));
}