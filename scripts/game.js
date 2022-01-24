class Game {
    constructor(screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.backgroundImage;
        this.spaceshipImage;
        this.asteroidImages = [];
        this.obstacles = [];
    }

    preload() {
        this.backgroundImage = loadImage('assets/background1.jpg');
        this.spaceshipImage = loadImage('assets/spaceship4.gif');
        this.asteroidImages = [
            loadImage('assets/asteroid1.png'),
            loadImage('assets/asteroid2.png'),
            loadImage('assets/asteroid3.png'),
            loadImage('assets/asteroid4.png'),
            loadImage('assets/asteroid5.png'),
            loadImage('assets/asteroid6.png')
        ];
        // this.obstacles = [
        //     //image objects, add the x (the start position) and speed as addtional properties
        //     { src: loadImage('assets/fuel1.png') }, //fuelImage
        //     { src: loadImage('assets/fuel2.png') },
        //     { src: loadImage('assets/fuel3.png') },
        //     { src: loadImage('assets/fuel4.png') },
        //     { src: loadImage('assets/fuel5.png') },
        //
        //     { src: loadImage('assets/bomb1.png') }, //bombImage
        //     { src: loadImage('assets/bomb2.png') },
        //     { src: loadImage('assets/bomb3.png') },
        //     { src: loadImage('assets/bomb4.png') },
        // ]
    }

    setup() {
        // this.background = new Background(); // tai sao?
        // this.spaceship = new Spaceship(this.spaceshipImage);
        // this.backgroundImage()
    }

    createAsteroid() {
        const width = getRandom(70, 100);
        const img = this.asteroidImages[getRandom(0, this.asteroidImages.length - 1)]
        const height = getHeight(width, img.width, img.height);

        return new Asteroid(
            this.screenWidth,
            getRandom(0, this.screenHeight - height),
            width, height,
            img
        );
    }

    shouldSpawnNewObstacle() {
        if (this.obstacles.length === 0) {
            return true;
        }

        const lastObstacle = this.obstacles[this.obstacles.length - 1];
        const minX = this.screenWidth - getRandom(2, 4) * lastObstacle.width;

        return lastObstacle.position.x < minX;
    }

    draw() {
        clear();
        image(this.backgroundImage, 0, 0, this.screenWidth, this.screenHeight);

        if (frameCount % 60 === 0 && this.shouldSpawnNewObstacle()) {
            this.obstacles.push(this.createAsteroid());
        }

        this.obstacles.forEach((obstacle) => obstacle.draw());

        this.obstacles = this.obstacles.filter(obstacle => {

            if (obstacle.isOutOfViewPort()) {
                return false;
            }

            return true;
        })
    }
}