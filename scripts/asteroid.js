class Asteroid extends GameObject {
    constructor(position, width, height, img) {
        super(position, width, height, img);

        this.speed = 12;
    }

    update() {
        this.position.x -= this.speed; //the asteroid will move per every frameCount
    }
}