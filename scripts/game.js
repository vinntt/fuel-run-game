class Game {
    constructor(screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.backgroundImage;
        this.spaceshipImage;
        this.asteroidImages = [];
        this.obstacles = [];
        this.fuelImage;
    }

    preload() {
        this.backgroundImage = loadImage('assets/background1.jpg');
        // this.backgroundImage = [
        //     { src: loadImage('assets/background-starfield1.png'), x: 0, speed: 0 },
        //     { src: loadImage('assets/background-starfield2.png'), x: 0, speed: 1 },
        //     { src: loadImage('assets/background-starfield3.png'), x: 0, speed: 2 },
        //     { src: loadImage('assets/background-starfield4.png'), x: 0, speed: 3 },
        //     { src: loadImage('assets/background-starfield5.png'), x: 0, speed: 4 },
        //     { src: loadImage('assets/background-starfield6.png'), x: 0, speed: 5 },
        //     { src: loadImage('assets/background-starfield7.png'), x: 0, speed: 6 },
        //     { src: loadImage('assets/background-starfield8.png'), x: 0, speed: 7 }
        // ];

        this.spaceshipImage = loadImage('assets/spaceship4.gif');
        this.asteroidImages = [
            loadImage('assets/asteroid1.png'),
            loadImage('assets/asteroid2.png'),
            loadImage('assets/asteroid3.png'),
            loadImage('assets/asteroid4.png'),
            loadImage('assets/asteroid5.png'),
            loadImage('assets/asteroid6.png')
        ];
        this.fuelImage = loadImage('assets/oil2.png');

        this.font = loadFont('assets/font-strong-brain.otf');
    }

    setup() {
        const width = this.screenWidth / 10;

        this.spaceship = new Spaceship(
            new Position(this.screenWidth / 4, this.screenHeight / 2),
            width, getHeight(width, this.spaceshipImage.width, this.spaceshipImage.height),
            this.spaceshipImage
        );
    }

    //used to get the random height of obstacles (asteroids & fuel) on the screen. The objectHeight is different between asteroids & fuel => parameter.
    createRandomPosition(objectHeight) {
        return new Position(
            this.screenWidth,
            getRandom(0 + 0.5 * this.spaceship.height, this.screenHeight - objectHeight - 0.5 * this.spaceship.height),
        );
    }

    //create a random asteroid per time
    createAsteroid() {
        const width = getRandom(70, 100);
        const img = this.asteroidImages[getRandom(0, this.asteroidImages.length - 1)]
        const height = getHeight(width, img.width, img.height);

        return new Asteroid(
            this.createRandomPosition(height),
            width, height,
            img
        );
    }

    createFuel() {
        const width = getRandom(70, 100);
        const height = getHeight(width, this.fuelImage.width, this.fuelImage.height);

        return new Fuel(
            this.createRandomPosition(height), // object of class Position
            width, height,
            this.fuelImage
        );
    }

    //create obstacles
    shouldSpawnNewObstacle() {
        if (this.obstacles.length === 0) { //empty obstacle
            return true;
        }

        const lastObstacle = this.obstacles[this.obstacles.length - 1];
        const minX = this.screenWidth - getRandom(1, 2) * lastObstacle.width;

        return lastObstacle.position.x < minX;
    }

    //happens if the obstacles length is not empty
    createObstable() {
        if (!this.shouldSpawnNewObstacle()) {
            return;
        }
        //limit/reduce the chance of fuel appearance
        if (getRandom(0, 2) % 3 === 0) {
            this.obstacles.push(this.createFuel());

            return;
        }

        this.obstacles.push(this.createAsteroid());
    }

    moveSpaceship(position) {
        if (position.x > this.screenWidth - this.spaceship.width) {
            position.x = this.screenWidth - this.spaceship.width;
        }
        if (position.y > this.screenHeight - this.spaceship.height) {
            position.y = this.screenHeight - this.spaceship.height;
        }

        this.spaceship.moveTo(position);
    }

    update() {
        this.spaceship.update()
        this.obstacles.forEach((obstacle) => obstacle.update());

        //display obstacles per 60 frames
        if (frameCount % 60 === 0) {
            this.createObstable();
            this.spaceship.decreaseFuel(3);
        };

        this.obstacles = this.obstacles.filter(obstacle => {
            const hit = obstacle.collide(this.spaceship);

            if (hit) {
                //JS function .isPrototypeOf()
                if (Fuel.prototype.isPrototypeOf(obstacle)) {
                    this.spaceship.increaseFuel(obstacle.fuel);
                } else {
                    this.spaceship.decreaseLive();
                    console.log(this.spaceship.lives)
                }
            }

            if (hit || obstacle.isOutOfViewPort()) {
                // if (obstacle.collideWithPlayer(this.player) || obstacle.isOutOfViewPort()) {
                return false;
            }

            return true;
        })
    }

    isEnd() {
        return this.spaceship.fuel === 0 || this.spaceship.lives === 0;
    }


    draw() {
        if (!this.isEnd()) {
            this.update();
        }

        clear();
        image(this.backgroundImage, 0, 0, this.screenWidth, this.screenHeight);

        textFont(this.font);
        textSize(20);
        strokeWeight(0);
        fill(255);
        text('Fuel', 20, 40);
        text('Live', 20, 70);
        textFont('sans-serif');

        const lives = minBetween(this.spaceship.lives, 3);
        text('♥ '.repeat(lives) + '♡'.repeat(3 - lives), 80, 70);

        // fuel rect outside
        strokeWeight(2);
        stroke(255);
        fill('rgba(0, 0, 0, 0)');
        rect(80, 22, 206, 22);

        // fuel rect inside
        strokeWeight(0);
        fill(255);
        rect(83, 25, Math.ceil(this.spaceship.fuel / 10) * 20, 16); //20px for every 10% fuel

        this.spaceship.draw();
        this.obstacles.forEach((obstacle) => obstacle.draw()); //display obstacle by looping everytime
    }

}