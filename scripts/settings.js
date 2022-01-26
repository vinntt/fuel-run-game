class Settings {
    constructor(screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.backgroundImage = null;
        this.backgroundMainScreen = null;
        this.spaceshipImage;
        this.fuelImage;
        this.asteroidImages = [];
        this.fonts = [];
        this.backgroundMusic;
        this.explosionEffect;
        this.fuelEffect;
        //     this.endMusic;
    }

    preload() {
        this.backgroundMainScreen = loadImage('assets/background-mainscreen.jpg')
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
        // ]
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

        this.fonts = [
            loadFont('assets/font-strong-brain.otf'),
            loadFont('assets/font-speed-grams.otf'),
            loadFont('assets/font-karma-future.otf')
        ]

        soundFormats('mp3', 'ogg');
        this.backgroundMusic = loadSound('assets/sound-background-low.ogg');
        this.explosionEffect = loadSound('assets/sound-explosion.ogg');
        this.fuelEffect = loadSound('assets/sound-fuel-shimmer.ogg');
        // this.endMusic = loadSound('assets/sound_win_end.ogg');
    }
}

// class MainScreen {
//     constructor(screenWidth, screenHeight) {
//         this.astronautIcon = null;

//     }

//     draw() {
//         clear();
//         image(this.settings.backgroundImage, 0, 0, this.settings.screenWidth, this.settings.screenHeight);
//         textFont(this.settings.fonts[1]);
//         textSize(100);
//         strokeWeight(0);
//         fill(40);
//         text('FUEL RUN', this.settings.screenWidth / 2, this.settings.screenHeight / 3);

//         //drawStartButton
//         fill('rgba(255, 255, 255, 0.5)');
//         rect(this.settings.screenWidth / 2, this.settings.screenHeight / 3 + 150, 150, 50);
//         textSize(50);
//         fill(40);
//         text('START', this.settings.screenWidth / 2, this.settings.screenHeight / 3);
//         //drawSettingsButton
//         fill('rgba(255, 255, 255, 0.5)');
//         rect(this.settings.screenWidth / 2, this.settings.screenHeight / 3 + 300, 150, 50);
//         text('SETTINGS', this.settings.screenWidth / 2, this.settings.screenHeight / 3);
//         // drawSoundButton
//         fill('rgba(255, 255, 255, 0.5)');
//         rect(this.settings.screenWidth / 2, this.settings.screenHeight / 3 + 450, 150, 50);
//         text('SOUND ON', this.settings.screenWidth / 2, this.settings.screenHeight / 3);
//         // drawAstronautIcon
//         image(this.settings.astronautIcon, this.settings.screenWidth, 0, 100, 100);
//     }

//     // }