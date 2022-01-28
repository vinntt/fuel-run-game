class Game {
    constructor(screenWidth, screenHeight) {
        this.screen = 'main';
        this.settings = new Settings(screenWidth, screenHeight);
        this.obstacles = [];
        this.spaceship = null;
        this.mainScreenButtons = [];
        // this.second = 0.001;
    }

    preload() {
        this.settings.preload();
        this.background = new Background(this.settings.backgroundImages, this.settings.screenWidth, this.settings.screenHeight)
    }

    setup() {
        const buttonX = this.settings.screenWidth / 2 - 170;
        const buttonY = this.settings.screenHeight / 3;

        this.mainScreenButtons = [
            new Button(new Position(buttonX, buttonY + 30), 320, 70, 'START', this.settings.fonts[0], () => this.playClicked()),
            // new Button(new Position(buttonX, buttonY + 130), 320, 70, 'SETTINGS', this.settings.fonts[0], () => playSoundOff()),
            // new Button(new Position(buttonX, buttonY + 230), 320, 70, 'SOUND ON', this.settings.fonts[0])
        ];
    }

    startNewGame() {
        const width = this.settings.screenWidth / 10;

        this.spaceship = new Spaceship(
            new Position(this.settings.screenWidth / 4, this.settings.screenHeight / 2),
            width, getHeight(width, this.settings.spaceshipImage.width, this.settings.spaceshipImage.height),
            this.settings.spaceshipImage
        );

        this.obstacles = [];
    }

    //used to get the random height of obstacles (asteroids & fuel) on the screen. The objectHeight is different between asteroids & fuel => parameter.
    createRandomPosition(objectHeight) {
        return new Position(
            this.settings.screenWidth,
            getRandom(0 + 0.5 * this.spaceship.height, this.settings.screenHeight - objectHeight - 0.5 * this.spaceship.height),
        );
    }

    //create a random asteroid per time
    createAsteroid() {
        const width = getRandom(100, 200);
        const img = this.settings.asteroidImages[getRandom(0, this.settings.asteroidImages.length - 1)]
        const height = getHeight(width, img.width, img.height);

        return new Asteroid(
            this.createRandomPosition(height),
            width, height,
            img
        );
    }

    createFuel() {
        const width = getRandom(80, 120);
        const height = getHeight(width, this.settings.fuelImage.width, this.settings.fuelImage.height);

        return new Fuel(
            this.createRandomPosition(height), // object of class Position
            width, height,
            this.settings.fuelImage
        );
    }

    //create obstacles
    shouldSpawnNewObstacle() {
        if (this.obstacles.length === 0) {
            return true;
        }

        const lastObstacle = this.obstacles[this.obstacles.length - 1];
        const minX = this.settings.screenWidth - getRandom(1, 1.5) * lastObstacle.width;

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
        if (position.x > this.settings.screenWidth - this.spaceship.width) {
            position.x = this.settings.screenWidth - this.spaceship.width;
        }
        if (position.y > this.settings.screenHeight - this.spaceship.height) {
            position.y = this.settings.screenHeight - this.spaceship.height;
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
                    this.settings.fuelEffect.play();
                    this.spaceship.increaseFuel(obstacle.fuel);
                } else {
                    this.settings.explosionEffect.play();
                    this.spaceship.decreaseLive();
                }
            }

            if (hit || obstacle.isOutOfViewPort()) {
                // if (obstacle.collideWithPlayer(this.player) || obstacle.isOutOfViewPort()) {
                return false;
            }

            return true;
        })
    }

    isMainScreen() {
        return this.screen === 'main';
    }

    //to check when the game is ended.
    isEnd() {
        return this.spaceship.fuel === 0 || this.spaceship.lives === 0;
    }

    drawEndScreen() {
        const textVerticalPosition = this.settings.screenWidth / 4;
        const textHorizontalPosition = this.settings.screenHeight / 2;

        fill('rgba(255, 255, 255, 0.5)');
        rect(textVerticalPosition - 10, textHorizontalPosition - textHorizontalPosition / 3, textVerticalPosition * 2, textHorizontalPosition / 2, textVerticalPosition / 6);

        textAlign(LEFT, BASELINE);
        textFont(this.settings.fonts[1]);
        textSize(100);
        strokeWeight(0);
        fill(40);
        text('Game Over', textVerticalPosition, textHorizontalPosition);

        textFont(this.settings.fonts[2]);
        textSize(25);
        strokeWeight(0);
        fill(255);
        text('ENTER - Main Screen', textVerticalPosition + 250, textHorizontalPosition + 100) // keycode:13
        text('SPACEBAR - Restart', textVerticalPosition + 250, textHorizontalPosition + 130) //keycode:32
    }

    drawBackgroundText() {
        textAlign(LEFT, BASELINE);
        textFont(this.settings.fonts[0]);
        textSize(20);
        strokeWeight(0);
        fill(255);
        text('Fuel', 20, 40);
        text('Live', 20, 70);
        // text('TIME:' + Math.floor(this.second * millis()), 20, 110);
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
    }

    drawGame() {
        if (!this.isEnd()) {
            this.update();
        }

        noCursor(); //hide the mouse pointer
        clear();
        // image(this.settings.backgroundImage, 0, 0, this.settings.screenWidth, this.settings.screenHeight);
        this.background.draw();
        this.drawBackgroundText();
        this.spaceship.draw();
        this.obstacles.forEach((obstacle) => obstacle.draw()); //display obstacle by looping everytime

        if (this.isEnd()) {
            this.drawEndScreen();
        }
    }

    drawMainScreen() {
        clear();
        cursor('grab');
        image(this.settings.backgroundMainScreen, 0, 0, this.settings.screenWidth, this.settings.screenHeight);
        textFont(this.settings.fonts[1]);
        textSize(110);
        strokeWeight(0);
        fill(255);
        textAlign(CENTER, CENTER);
        text('FUEL RUN', 0, 180, this.settings.screenWidth);
        // text('FUEL RUN', this.settings.screenWidth / 3, this.settings.screenHeight / 3);

        this.mainScreenButtons.forEach((button) => button.draw())
    }

    draw() {
        if (this.isMainScreen()) {
            this.drawMainScreen();
        } else {
            this.drawGame();
        }
    }

    playClicked() {
        this.screen = "game";
        this.startNewGame();

        if (!this.settings.backgroundMusic.isPlaying()) {
            this.settings.backgroundMusic.loop();
        }
    }

    keyPressed() {
        if (this.isMainScreen()) {
            return
        }

        if (this.isEnd() && keyCode === 32) {
            this.startNewGame();

        } else if (this.isEnd() && keyCode === 13) {
            this.screen = 'main';
            this.draw()
        }
    }

    mouseMoved() {
        if (this.isMainScreen()) {
            return
        }

        this.moveSpaceship(new Position(maxBetween(mouseX, 0), maxBetween(mouseY, 0)));
    }

    mouseClicked() {
        if (!this.isMainScreen()) {
            return;
        }

        this.mainScreenButtons.forEach((button) => {
            if (button.isMouseOver(mouseX, mouseY)) {
                button.onClicked();
            }
        });
    }
}