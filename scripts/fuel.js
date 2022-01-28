class Fuel extends GameObject {
    constructor(position, width, height, img) {
        super(position, width, height, img);

        this.fuel = 6; //set value of everyfuel equals to 5
        this.speed = 12;
    }

    update() {
        this.position.x -= this.speed; //the fuel will move per every frameCount
    }
}