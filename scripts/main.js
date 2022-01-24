const VIEWPORT_WIDTH = 1000;
const VIEWPORT_HEIGHT = 600;

const game = new Game(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

function preload() {
    game.preload();
}


function setup() {
    createCanvas(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
    game.setup();
}

function draw() {
    game.draw();
}


function keyPressed() {}