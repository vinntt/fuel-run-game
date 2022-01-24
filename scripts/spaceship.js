class Spaceship extends GameObject {
    constructor(x, y, width, height, img) {
        super(x, y, width, height, img);

        this.fuel = 100;
        this.lives = 3;
    }


}