class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class GameObject {
    constructor(x, y, width, height, img) {
        this.position = new Position(x, y);
        this.width = width;
        this.height = height;
        this.img = img;
    }

    draw() {
        image(this.img, this.position.x, this.position.y, this.width, this.height);
    }

    isOutOfViewPort() {
        return (this.position.x + this.width) < 0;
    }
}