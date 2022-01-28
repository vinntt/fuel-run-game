class Settings {
    constructor(screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.backgroundImages = [];
        this.backgroundMainScreen = null;
        this.spaceshipImage;
        this.fuelImage;
        this.asteroidImages = [];
        this.fonts = [];
        this.backgroundMusic;
        this.explosionEffect;
        this.fuelEffect;
    }

    preload() {
        this.backgroundMainScreen = loadImage('assets/background-mainscreen.jpg')
            // this.backgroundImage = loadImage('assets/background1.jpg');
        this.backgroundImages = [
            { src: loadImage('assets/blue-Nebula-1.png'), x: 0, speed: 3 },
            { src: loadImage('assets/blue-Nebula-2.png'), x: 0, speed: 2.6 },
            { src: loadImage('assets/blue-Nebula-3.png'), x: 0, speed: 1.2 },
            { src: loadImage('assets/blue-Nebula-4.png'), x: 0, speed: 2.8 },
            { src: loadImage('assets/blue-Nebula-5.png'), x: 0, speed: 2 },
            { src: loadImage('assets/blue-Nebula-6.png'), x: 0, speed: 3 },
            { src: loadImage('assets/blue-Nebula-7.png'), x: 0, speed: 2.8 },
            { src: loadImage('assets/blue-Nebula-8.png'), x: 0, speed: 2.2 }
        ]
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
    }
}