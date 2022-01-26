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


function mouseMoved(event) {
    game.mouseMoved();
}

function keyPressed() {
    game.keyPressed();
}

function mouseClicked() {
    game.mouseClicked();
}