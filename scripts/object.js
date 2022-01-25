class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // distance(pos) {
    //     return dist(this.x, this.y, pos.x, pos.y)
    // }
}

class GameObject {
    //position instead of x,y and avoid to repeat it (set toa do)
    constructor(position, width, height, img) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.img = img;
    }

    draw() {
        // fill(51);
        // rect(this.position.x, this.position.y, this.width, this.height);
        image(this.img, this.position.x, this.position.y, this.width, this.height);
    }

    isOutOfViewPort() {
        return (this.position.x + this.width) < 0;
    }

    // https://github.com/bmoren/p5.collide2D#colliderectrect
    collide(target) {
        return collideRectRect(
            this.position.x, this.position.y, this.width, this.height,
            target.position.x, target.position.y, target.width, target.height
        );
    }

    //hoi lai
    // center() {
    //     return new Position(
    //         this.position.x + this.width / 2,
    //         this.position.y + this.height / 2,
    //     )
    // }

    // collide(target) {
    //     return this.center().distance(target.center()) < (this.width / 2)
    // }
}