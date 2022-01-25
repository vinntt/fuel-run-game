class Spaceship extends GameObject {
    constructor(position, width, height, img) {
        super(position, width, height, img);

        this.fuel = 100; //the default fuel for spaceship at the beginning
        this.lives = 3; //the given lives for spaceship
        this.speed = 5;
        this.destination = position;
    }

    moveTo(position) {
        this.destination = position;
    }

    increaseFuel(fuel) {
        this.fuel = minBetween(this.fuel + fuel, 100); // set max fuel to 100;
    }

    decreaseFuel(fuel) {
        this.fuel = maxBetween(this.fuel - fuel, 0);
    }

    decreaseLive() {
        this.lives--;
    }

    update() {
        if (this.destination.x < this.position.x) {
            this.position.x = maxBetween(this.position.x - this.speed, this.destination.x);
        } else if (this.destination.x > this.position.x) {
            this.position.x = minBetween(this.position.x + this.speed, this.destination.x);
        }

        if (this.destination.y < this.position.y) {
            this.position.y = maxBetween(this.position.y - this.speed, this.destination.y);
        } else if (this.destination.y > this.position.y) {
            this.position.y = minBetween(this.position.y + this.speed, this.destination.y);
        }
    }
}